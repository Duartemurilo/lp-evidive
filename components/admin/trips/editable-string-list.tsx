"use client";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import type { ReactNode } from "react";

type EditableStringListProps = {
  label: string;
  items: string[];
  placeholder?: string;
  onChange: (items: string[]) => void;
};

export function EditableStringList({
  label,
  items,
  placeholder = "Novo item",
  onChange,
}: EditableStringListProps): ReactNode {
  const updateItem = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    onChange([...items, ""]);
  };

  return (
    <Box sx={{ display: "grid", gap: 1.5 }}>
      <Box
        component="label"
        sx={{
          typography: "body2",
          fontWeight: 600,
          color: "text.primary",
        }}
      >
        {label}
      </Box>
      {items.map((item, index) => (
        <Box key={`${label}-${index}`} sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            hiddenLabel
            value={item}
            placeholder={placeholder}
            onChange={(event) => updateItem(index, event.target.value)}
          />
          <IconButton
            aria-label="Remover item"
            onClick={() => removeItem(index)}
            sx={{ mt: 0.25 }}
          >
            <DeleteOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
      <Button
        startIcon={<AddIcon />}
        onClick={addItem}
        variant="outlined"
        sx={{ alignSelf: "flex-start" }}
      >
        Adicionar item
      </Button>
    </Box>
  );
}
