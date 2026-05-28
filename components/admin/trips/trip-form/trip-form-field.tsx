"use client";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

function SelectOptionContent({
  flag,
  label,
}: {
  flag?: string;
  label: string;
}): ReactNode {
  if (!flag) return label;

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <Box component="span" aria-hidden sx={{ fontSize: "1.15rem", lineHeight: 1 }}>
        {flag}
      </Box>
      <span>{label}</span>
    </Stack>
  );
}

type TripFormFieldProps = {
  label: string;
  required?: boolean;
  helperText?: string | undefined;
  error?: boolean | undefined;
  children: ReactNode;
};

export function TripFormField({
  label,
  required = false,
  helperText,
  error = false,
  children,
}: TripFormFieldProps): ReactNode {
  return (
    <Box>
      <Typography
        component="label"
        variant="body2"
        sx={{
          display: "block",
          mb: 1,
          fontWeight: 600,
          color: error ? "error.main" : "text.primary",
        }}
      >
        {label}
        {required ? (
          <Box component="span" sx={{ color: "error.main", ml: 0.25 }}>
            *
          </Box>
        ) : null}
      </Typography>
      {children}
      {helperText ? (
        <FormHelperText error={error} sx={{ mx: 0, mt: 0.75 }}>
          {helperText}
        </FormHelperText>
      ) : null}
    </Box>
  );
}

type TripFormTextFieldProps = Omit<TextFieldProps, "label" | "helperText"> & {
  label: string;
  helperText?: string | undefined;
};

export function TripFormTextField({
  label,
  required,
  helperText,
  error,
  placeholder,
  ...textFieldProps
}: TripFormTextFieldProps): ReactNode {
  return (
    <TripFormField
      label={label}
      required={required}
      helperText={helperText}
      error={error}
    >
      <TextField
        {...textFieldProps}
        fullWidth
        hiddenLabel
        placeholder={placeholder}
        error={error}
      />
    </TripFormField>
  );
}

type TripFormSelectOption = {
  value: string;
  label: string;
  /** Emoji de bandeira ou ícone exibido antes do rótulo. */
  flag?: string;
};

type TripFormSelectProps = {
  label: string;
  required?: boolean;
  value: string;
  options: TripFormSelectOption[];
  placeholder?: string;
  helperText?: string | undefined;
  error?: boolean | undefined;
  onChange: (event: SelectChangeEvent<string>) => void;
};

export function TripFormSelect({
  label,
  required,
  value,
  options,
  placeholder = "Selecione uma opção",
  helperText,
  error,
  onChange,
}: TripFormSelectProps): ReactNode {
  return (
    <TripFormField
      label={label}
      required={required}
      helperText={helperText}
      error={error}
    >
      <FormControl fullWidth error={error}>
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return (
                <Typography component="span" color="text.secondary">
                  {placeholder}
                </Typography>
              );
            }
            const option = options.find((item) => item.value === selected);
            if (!option) return selected;
            return <SelectOptionContent flag={option.flag} label={option.label} />;
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <SelectOptionContent flag={option.flag} label={option.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </TripFormField>
  );
}
