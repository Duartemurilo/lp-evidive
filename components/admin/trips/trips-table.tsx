"use client";

import { TripActionsMenu } from "@/components/admin/trips/trip-actions-menu";
import {
  TripImagePreviewDialog,
  type TripImagePreview,
} from "@/components/admin/trips/trip-image-preview-dialog";
import { TripCategoryChip } from "@/components/admin/trips/trip-category-chip";
import { TripMobileCardActions } from "@/components/admin/trips/trip-mobile-card-actions";
import { TripStatusChip } from "@/components/admin/trips/trip-status-chip";
import { formatTripDateRange } from "@/lib/trips/format";
import type { TripListItem } from "@/lib/types/trip-admin";
import { getPublishedTripPublicPageHref } from "@/lib/viagens-trip-pages";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useState, type ReactNode } from "react";

type TripsTableProps = {
  trips: TripListItem[];
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (trip: TripListItem) => void;
};

function TripThumbnail({
  src,
  alt,
  onPreview,
}: {
  src: string | null;
  alt: string;
  onPreview?: (preview: TripImagePreview) => void;
}): ReactNode {
  if (src) {
    return (
      <Box
        component="button"
        type="button"
        onClick={() => onPreview?.({ src, alt })}
        aria-label={`Ver imagem de ${alt}`}
        sx={{
          position: "relative",
          display: "block",
          width: 56,
          height: 56,
          borderRadius: "50%",
          overflow: "hidden",
          p: 0,
          border: "none",
          cursor: "pointer",
          bgcolor: "rgba(34,93,109,0.08)",
          transition: "opacity 0.15s ease",
          "&:hover": { opacity: 0.88 },
          "&:focus-visible": {
            outline: "2px solid",
            outlineColor: "primary.main",
            outlineOffset: 2,
          },
        }}
      >
        <Image src={src} alt={alt} fill sizes="56px" style={{ objectFit: "cover" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        bgcolor: "rgba(34,93,109,0.08)",
        display: "grid",
        placeItems: "center",
        color: "text.secondary",
        typography: "caption",
        textAlign: "center",
        px: 0.5,
        lineHeight: 1.1,
      }}
    >
      Sem foto
    </Box>
  );
}

function TripMobileCard({
  trip,
  onEdit,
  onDuplicate,
  onDelete,
  onPreviewImage,
}: {
  trip: TripListItem;
  onPreviewImage?: (preview: TripImagePreview) => void;
} & Omit<TripsTableProps, "trips">): ReactNode {
  const imageSrc = trip.heroImageUrl;
  const viewPageHref = getPublishedTripPublicPageHref(trip);

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      <Box
        component={imageSrc ? "button" : "div"}
        type={imageSrc ? "button" : undefined}
        onClick={
          imageSrc
            ? () => onPreviewImage?.({ src: imageSrc, alt: trip.title })
            : undefined
        }
        aria-label={imageSrc ? `Ver imagem de ${trip.title}` : undefined}
        sx={{
          position: "relative",
          display: "block",
          width: "100%",
          height: { xs: 168, sm: 184 },
          bgcolor: "rgba(34,93,109,0.08)",
          p: 0,
          border: "none",
          cursor: imageSrc ? "pointer" : "default",
          textAlign: "inherit",
          ...(imageSrc
            ? {
                "&:hover": { opacity: 0.95 },
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: -2,
                },
              }
            : {}),
        }}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={trip.title}
            fill
            sizes="(max-width: 900px) 100vw, 400px"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        ) : (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              color: "text.secondary",
              typography: "caption",
            }}
          >
            Sem foto
          </Box>
        )}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "52%",
            background:
              "linear-gradient(180deg, rgba(8,32,42,0.82) 0%, rgba(8,32,42,0.45) 55%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        <Stack
          direction="row"
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            right: 10,
            zIndex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <TripCategoryChip category={trip.category} variant="overlay" />
          <TripStatusChip status={trip.status} variant="overlay" />
        </Stack>
      </Box>

      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {trip.title}
        </Typography>

        <Stack
          direction="row"
          useFlexGap
          sx={{
            mt: 1.25,
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: 0.75,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: "0.65rem",
              color: "#000",
            }}
          >
            Próxima saída
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {formatTripDateRange(trip)}
          </Typography>
        </Stack>

        <TripMobileCardActions
          onEdit={() => onEdit(trip.id)}
          onDuplicate={() => onDuplicate(trip.id)}
          onDelete={() => onDelete(trip)}
          viewPageHref={viewPageHref}
        />
      </CardContent>
    </Card>
  );
}

function TripRowCells({
  trip,
  onEdit,
  onDuplicate,
  onDelete,
  onPreviewImage,
}: {
  trip: TripListItem;
  onPreviewImage?: (preview: TripImagePreview) => void;
} & Omit<TripsTableProps, "trips">): ReactNode {
  const viewPageHref = getPublishedTripPublicPageHref(trip);

  return (
    <>
      <TableCell>
        <TripThumbnail
          src={trip.heroImageUrl}
          alt={trip.title}
          {...(onPreviewImage ? { onPreview: onPreviewImage } : {})}
        />
      </TableCell>
      <TableCell>
        <Typography sx={{ fontWeight: 700 }}>{trip.title}</Typography>
      </TableCell>
      <TableCell>
        <TripCategoryChip category={trip.category} />
      </TableCell>
      <TableCell>{formatTripDateRange(trip)}</TableCell>
      <TableCell>
        <TripStatusChip status={trip.status} />
      </TableCell>
      <TableCell align="right">
        <TripActionsMenu
          onEdit={() => onEdit(trip.id)}
          onDuplicate={() => onDuplicate(trip.id)}
          onDelete={() => onDelete(trip)}
          viewPageHref={viewPageHref}
        />
      </TableCell>
    </>
  );
}

export function TripsTable({
  trips,
  onEdit,
  onDuplicate,
  onDelete,
}: TripsTableProps): ReactNode {
  const [imagePreview, setImagePreview] = useState<TripImagePreview | null>(null);

  return (
    <>
      <TripImagePreviewDialog
        preview={imagePreview}
        onClose={() => setImagePreview(null)}
      />

      <TableContainer
        sx={{
          display: { xs: "none", md: "block" },
          borderRadius: 0.75,
          p: { xs: 1.5, md: 2 },
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={80}>Imagem</TableCell>
              <TableCell>Viagem</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Próxima saída</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map((trip) => (
              <TableRow key={trip.id} hover>
                <TripRowCells
                  trip={trip}
                  onEdit={onEdit}
                  onDuplicate={onDuplicate}
                  onDelete={onDelete}
                  onPreviewImage={setImagePreview}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={1.5} sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
        {trips.map((trip) => (
          <TripMobileCard
            key={trip.id}
            trip={trip}
            onEdit={onEdit}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
            onPreviewImage={setImagePreview}
          />
        ))}
      </Stack>
    </>
  );
}
