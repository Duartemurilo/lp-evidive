"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import type { TripCategory } from "@/lib/types/trip-admin";
import type { ReactNode } from "react";

const labels: Record<TripCategory, string> = {
  nacional: "Nacional",
  internacional: "Internacional",
};

const flags: Record<TripCategory, string> = {
  nacional: "🇧🇷",
  internacional: "🌍",
};

type TripCategoryChipProps = {
  category: TripCategory;
  variant?: "default" | "overlay";
};

export function TripCategoryChip({
  category,
  variant = "default",
}: TripCategoryChipProps): ReactNode {
  const isOverlay = variant === "overlay";

  return (
    <Chip
      size="small"
      icon={
        <Box component="span" aria-hidden sx={{ fontSize: "1rem", lineHeight: 1, display: "flex" }}>
          {flags[category]}
        </Box>
      }
      label={labels[category]}
      sx={{
        "& .MuiChip-icon": { ml: 0.75, mr: -0.25, color: "inherit" },
        ...(isOverlay
          ? {
              bgcolor: category === "nacional" ? "#225d6d" : "#1ec4b4",
              color: "#fff",
              fontWeight: 700,
              border: "1px solid rgba(255,255,255,0.35)",
              boxShadow: "0 4px 14px rgba(8,32,42,0.35)",
            }
          : {
              bgcolor:
                category === "nacional" ? "rgba(34,93,109,0.1)" : "rgba(30,196,180,0.14)",
              color: "primary.main",
              fontWeight: 600,
            }),
      }}
    />
  );
}
