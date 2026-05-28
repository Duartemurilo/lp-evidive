"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps): ReactNode {
  return (
    <Box
      sx={{
        py: 8,
        px: 3,
        textAlign: "center",
        borderRadius: 1.5,
        border: "1px dashed",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: action ? 3 : 0 }}>
        {description}
      </Typography>
      {action}
    </Box>
  );
}
