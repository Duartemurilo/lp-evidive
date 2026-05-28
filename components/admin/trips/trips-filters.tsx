"use client";

import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

type TripsFiltersProps = {
  value: string;
  onChange: (value: string) => void;
  sx?: SxProps<Theme>;
};

export function TripsFilters({ value, onChange, sx }: TripsFiltersProps): ReactNode {
  return (
    <TextField
      size="medium"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Buscar por nome, destino ou categoria..."
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" color="action" />
            </InputAdornment>
          ),
        },
      }}
      sx={[
        {
          minWidth: 0,
          width: { xs: "100%", md: 280 },
          maxWidth: { xs: "100%", md: 320 },
          flex: { xs: "1 1 auto", md: "0 0 auto" },
          "& .MuiOutlinedInput-root": {
            borderRadius: 1,
          },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    />
  );
}
