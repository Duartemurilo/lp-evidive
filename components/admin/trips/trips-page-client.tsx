"use client";

import { useAdminToast } from "@/components/admin/admin-toast-provider";
import { AdminLayout } from "@/components/admin/admin-layout";
import { EmptyState } from "@/components/admin/empty-state";
import { LoadingState } from "@/components/admin/loading-state";
import { ConfirmDeleteDialog } from "@/components/admin/trips/confirm-delete-dialog";
import { TripsFilters } from "@/components/admin/trips/trips-filters";
import { TripsTable } from "@/components/admin/trips/trips-table";
import {
  deleteAdminTrip,
  duplicateAdminTrip,
  fetchAdminTrips,
} from "@/lib/trips/api-client";
import { formatTripExperienceTypesLabel } from "@/lib/trips/trip-experience-types";
import type { TripListItem } from "@/lib/types/trip-admin";
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

const novaViagemButtonSx = {
  borderRadius: 0.5,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none",
  },
} as const;

const statusLabels: Record<TripListItem["status"], string> = {
  rascunho: "rascunho",
  publicado: "publicado",
  esgotado: "esgotado",
  encerrado: "encerrado",
};

export function TripsPageClient(): ReactNode {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [trips, setTrips] = useState<TripListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError } = useAdminToast();
  const [deleteTarget, setDeleteTarget] = useState<TripListItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadTrips = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminTrips();
      setTrips(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar viagens.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTrips();
  }, [loadTrips]);

  useEffect(() => {
    const saved = searchParams.get("saved");
    const updated = searchParams.get("updated");
    const removed = searchParams.get("removed");
    const duplicated = searchParams.get("duplicated");

    if (saved === "1") showSuccess("Viagem criada com sucesso.");
    else if (updated === "1") showSuccess("Viagem atualizada com sucesso.");
    else if (removed === "1") showSuccess("Viagem removida com sucesso.");
    else if (duplicated === "1") showSuccess("Viagem duplicada com sucesso.");
    else return;

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("saved");
    nextParams.delete("updated");
    nextParams.delete("removed");
    nextParams.delete("duplicated");
    const query = nextParams.toString();
    router.replace(query ? `/admin/viagens?${query}` : "/admin/viagens", {
      scroll: false,
    });
  }, [searchParams, showSuccess, router]);

  const filteredTrips = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return trips;
    return trips.filter((trip) => {
      const haystack = [
        trip.title,
        trip.location,
        trip.category,
        formatTripExperienceTypesLabel(trip.experienceTypes),
        statusLabels[trip.status],
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [query, trips]);

  const handleDuplicate = async (id: string) => {
    try {
      const copy = await duplicateAdminTrip(id);
      router.push(`/admin/viagens/${copy.id}/editar?duplicated=1`);
    } catch (err) {
      showError(
        err instanceof Error ? err.message : "Não foi possível duplicar a viagem.",
      );
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteAdminTrip(deleteTarget.id);
      setDeleteTarget(null);
      showSuccess("Viagem removida com sucesso.");
      await loadTrips();
    } catch (err) {
      showError(
        err instanceof Error ? err.message : "Não foi possível remover a viagem.",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="h4">Viagens</Typography>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            alignItems: { xs: "stretch", md: "center" },
            justifyContent: { md: "space-between" },
          }}
        >
          <TripsFilters value={query} onChange={setQuery} />
          <Button
            component={Link}
            href="/admin/viagens/nova"
            variant="contained"
            color="sidebar"
            size="large"
            startIcon={<AddIcon />}
            sx={{
              ...novaViagemButtonSx,
              width: { xs: "100%", md: "auto" },
            }}
          >
            Nova viagem
          </Button>
        </Box>

        {error ? <Alert severity="error">{error}</Alert> : null}

        {loading ? <LoadingState label="Carregando viagens..." /> : null}

        {!loading && !error && filteredTrips.length === 0 && trips.length === 0 ? (
          <EmptyState
            title="Nenhuma viagem cadastrada"
            description="Comece criando a primeira viagem para exibir no site da Evidive."
            action={
              <Button
                component={Link}
                href="/admin/viagens/nova"
                variant="contained"
                color="sidebar"
                size="large"
                startIcon={<AddIcon />}
                sx={novaViagemButtonSx}
              >
                Nova viagem
              </Button>
            }
          />
        ) : null}

        {!loading && !error && filteredTrips.length === 0 && trips.length > 0 ? (
          <EmptyState
            title="Nenhum resultado encontrado"
            description="Tente buscar por outro nome, categoria ou status."
          />
        ) : null}

        {!loading && !error && filteredTrips.length > 0 ? (
          <TripsTable
            trips={filteredTrips}
            onEdit={(id) => router.push(`/admin/viagens/${id}/editar`)}
            onDuplicate={handleDuplicate}
            onDelete={setDeleteTarget}
          />
        ) : null}
      </Box>

      <ConfirmDeleteDialog
        open={Boolean(deleteTarget)}
        title="Remover viagem?"
        description={`Tem certeza que deseja remover "${deleteTarget?.title}"? Esta ação não pode ser desfeita.`}
        loading={deleting}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />

    </AdminLayout>
  );
}
