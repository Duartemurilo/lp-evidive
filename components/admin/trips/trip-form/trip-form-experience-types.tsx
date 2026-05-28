"use client";

import { TripFormField } from "@/components/admin/trips/trip-form/trip-form-field";
import {
  TRIP_EXPERIENCE_TYPE_OPTIONS,
  type TripExperienceType,
} from "@/lib/trips/trip-experience-types";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import type { ReactNode } from "react";

type TripFormExperienceTypesProps = {
  value: TripExperienceType[];
  onChange: (value: TripExperienceType[]) => void;
  error?: boolean;
  helperText?: string;
};

export function TripFormExperienceTypes({
  value,
  onChange,
  error = false,
  helperText,
}: TripFormExperienceTypesProps): ReactNode {
  const toggleType = (type: TripExperienceType) => {
    const isSelected = value.includes(type);
    if (isSelected) {
      if (value.length <= 1) return;
      onChange(value.filter((item) => item !== type));
      return;
    }
    onChange([...value, type]);
  };

  return (
    <TripFormField
      label="Tipos de experiência"
      required
      helperText={helperText}
      error={error}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          p: 2,
          border: "1px solid",
          borderColor: error ? "error.main" : "divider",
          borderRadius: 1.5,
        }}
      >
        {TRIP_EXPERIENCE_TYPE_OPTIONS.map((option) => {
          const selected = value.includes(option.value);
          return (
            <Chip
              key={option.value}
              label={option.label}
              clickable
              color={selected ? "primary" : "default"}
              variant={selected ? "filled" : "outlined"}
              onClick={() => toggleType(option.value)}
              sx={{ fontWeight: 600 }}
            />
          );
        })}
      </Box>
    </TripFormField>
  );
}
