"use client";

import Chip from "@mui/material/Chip";
import type { TripStatus } from "@/lib/types/trip-admin";
import type { ReactNode } from "react";

const config: Record<
  TripStatus,
  { label: string; bgcolor: string; color: string }
> = {
  rascunho: {
    label: "Rascunho",
    bgcolor: "rgba(111,135,144,0.15)",
    color: "#6f8790",
  },
  publicado: {
    label: "Publicado",
    bgcolor: "rgba(30,196,180,0.16)",
    color: "#1a8f84",
  },
  esgotado: {
    label: "Esgotado",
    bgcolor: "rgba(251,160,53,0.18)",
    color: "#b56f12",
  },
  encerrado: {
    label: "Encerrado",
    bgcolor: "rgba(224,61,61,0.12)",
    color: "#c43333",
  },
};

const overlayConfig: Record<
  TripStatus,
  { label: string; bgcolor: string; color: string }
> = {
  rascunho: {
    label: "Rascunho",
    bgcolor: "#6f8790",
    color: "#ffffff",
  },
  publicado: {
    label: "Publicado",
    bgcolor: "#1a8f84",
    color: "#ffffff",
  },
  esgotado: {
    label: "Esgotado",
    bgcolor: "#fba035",
    color: "#ffffff",
  },
  encerrado: {
    label: "Encerrado",
    bgcolor: "#e03d3d",
    color: "#ffffff",
  },
};

type TripStatusChipProps = {
  status: TripStatus;
  variant?: "default" | "overlay";
};

export function TripStatusChip({
  status,
  variant = "default",
}: TripStatusChipProps): ReactNode {
  const style = variant === "overlay" ? overlayConfig[status] : config[status];
  const isOverlay = variant === "overlay";

  return (
    <Chip
      size="small"
      label={style.label}
      sx={{
        bgcolor: style.bgcolor,
        color: style.color,
        fontWeight: isOverlay ? 700 : 600,
        ...(isOverlay
          ? {
              border: "1px solid rgba(255,255,255,0.35)",
              boxShadow: "0 4px 14px rgba(8,32,42,0.35)",
            }
          : {}),
      }}
    />
  );
}
