"use client";

import { TripFormField } from "@/components/admin/trips/trip-form/trip-form-field";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import type { ReactNode } from "react";

function parseIsoDate(value: string | null): Dayjs | null {
  if (!value?.trim()) return null;
  const parsed = dayjs(value, "YYYY-MM-DD", true);
  return parsed.isValid() ? parsed : null;
}

function toIsoDate(value: Dayjs | null): string | null {
  if (!value?.isValid()) return null;
  return value.format("YYYY-MM-DD");
}

function formatDurationLabel(start: Dayjs, end: Dayjs): string {
  const days = end.startOf("day").diff(start.startOf("day"), "day") + 1;
  if (days <= 1) return "1 dia";
  return `${days} dias`;
}

type TripFormDateRangeProps = {
  startDate: string | null;
  endDate: string | null;
  startError?: string;
  endError?: string;
  onStartDateChange: (value: string | null) => void;
  onEndDateChange: (value: string | null) => void;
};

const datePickerSlotProps = {
  textField: {
    fullWidth: true,
    size: "medium" as const,
  },
  openPickerIcon: {
    sx: { color: "primary.main" },
  },
};

export function TripFormDateRange({
  startDate,
  endDate,
  startError,
  endError,
  onStartDateChange,
  onEndDateChange,
}: TripFormDateRangeProps): ReactNode {
  const startValue = parseIsoDate(startDate);
  const endValue = parseIsoDate(endDate);
  const hasRangeError = Boolean(startError || endError);
  const rangeHelperText = startError ?? endError;

  const durationLabel =
    startValue && endValue && !endValue.isBefore(startValue, "day")
      ? formatDurationLabel(startValue, endValue)
      : null;

  return (
    <TripFormField
      label="Período da viagem"
      helperText={rangeHelperText}
      error={hasRangeError}
    >
      <Paper
        variant="outlined"
        sx={{
          overflow: "hidden",
          borderRadius: 1.5,
          borderColor: hasRangeError ? "error.main" : "divider",
          bgcolor: "rgba(34,93,109,0.02)",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            px: 2,
            py: 1.25,
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "rgba(34,93,109,0.05)",
          }}
        >
          <CalendarMonthOutlinedIcon sx={{ fontSize: 20, color: "primary.main" }} />
          <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
            Selecione início e término
          </Typography>
          {durationLabel ? (
            <Typography
              variant="caption"
              sx={{
                ml: "auto",
                fontWeight: 700,
                color: "primary.main",
                bgcolor: "rgba(30,196,180,0.12)",
                px: 1,
                py: 0.25,
                borderRadius: 999,
              }}
            >
              {durationLabel}
            </Typography>
          ) : null}
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 1.5 }}
          sx={{ p: 2, alignItems: { sm: "flex-start" } }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <DatePicker
              label="Data de início"
              format="DD/MM/YYYY"
              value={startValue}
              {...(endValue ? { maxDate: endValue } : {})}
              onChange={(next) => onStartDateChange(toIsoDate(next))}
              slotProps={{
                ...datePickerSlotProps,
                textField: {
                  ...datePickerSlotProps.textField,
                  error: Boolean(startError),
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: { xs: 0, sm: 0.5 },
              pt: { xs: 0, sm: 1.75 },
              color: "text.secondary",
              typography: "body2",
              fontWeight: 600,
            }}
          >
            até
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <DatePicker
              label="Data de término"
              format="DD/MM/YYYY"
              value={endValue}
              {...(startValue ? { minDate: startValue } : {})}
              onChange={(next) => onEndDateChange(toIsoDate(next))}
              slotProps={{
                ...datePickerSlotProps,
                textField: {
                  ...datePickerSlotProps.textField,
                  error: Boolean(endError),
                },
              }}
            />
          </Box>
        </Stack>
      </Paper>
    </TripFormField>
  );
}
