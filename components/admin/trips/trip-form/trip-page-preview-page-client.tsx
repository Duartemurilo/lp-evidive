"use client";

import { TripPagePreview } from "@/components/admin/trips/trip-form/trip-page-preview";
import { loadTripPreviewPayload } from "@/lib/trips/trip-preview-storage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

export function TripPagePreviewPageClient(): ReactNode {
  const router = useRouter();
  const [payload, setPayload] = useState<ReturnType<typeof loadTripPreviewPayload>>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPayload(loadTripPreviewPayload());
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <Box
        sx={{
          minHeight: "100dvh",
          bgcolor: "#f7f2ec",
        }}
      />
    );
  }

  if (!payload) {
    return (
      <Box
        sx={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          px: 3,
          bgcolor: "#f7f2ec",
        }}
      >
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
          Nenhuma prévia disponível. Volte ao formulário e abra a prévia novamente.
        </Typography>
        <Button component={Link} href="/admin/viagens" variant="contained">
          Ir para viagens
        </Button>
      </Box>
    );
  }

  const returnHref = payload.returnTo || "/admin/viagens";

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        overflowX: "hidden",
        bgcolor: "background.default",
      }}
    >
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: { xs: 1.5, sm: 2 },
          py: 1.25,
          bgcolor: "rgba(247, 242, 236, 0.92)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Button
          size="small"
          color="inherit"
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            if (typeof window !== "undefined" && window.opener && !window.opener.closed) {
              window.opener.focus();
              window.close();
              return;
            }
            router.push(returnHref);
          }}
          sx={{ color: "#225d6d", minWidth: 0 }}
        >
          Voltar
        </Button>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: "#225d6d",
            flex: 1,
            textAlign: "center",
            pr: { xs: 5, sm: 7 },
          }}
        >
          Prévia da viagem
        </Typography>
      </Box>

      <TripPagePreview values={payload.values} variant="page" {...(payload.previewImages ? { previewImages: payload.previewImages } : {})} />
    </Box>
  );
}
