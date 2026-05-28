"use client";

import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import type { ReactNode } from "react";

type TripMobileCardActionsProps = {
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  viewPageHref?: string | null;
};

const actionButtonSx = {
  border: "1px solid",
  borderColor: "divider",
  bgcolor: "background.paper",
} as const;

export function TripMobileCardActions({
  onEdit,
  onDuplicate,
  onDelete,
  viewPageHref,
}: TripMobileCardActionsProps): ReactNode {
  return (
    <Stack
      direction="row"
      spacing={1.25}
      sx={{
        mt: 1.5,
        pt: 1.5,
        borderTop: "1px solid",
        borderColor: "divider",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        aria-label="Editar viagem"
        onClick={onEdit}
        size="medium"
        color="primary"
        sx={{
          ...actionButtonSx,
          width: 44,
          height: 44,
        }}
      >
        <EditOutlinedIcon fontSize="small" />
      </IconButton>
      {viewPageHref ? (
        <IconButton
          component="a"
          href={viewPageHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver página da viagem"
          size="medium"
          sx={{
            ...actionButtonSx,
            width: 44,
            height: 44,
          }}
        >
          <OpenInNewOutlinedIcon fontSize="small" />
        </IconButton>
      ) : null}
      <IconButton
        aria-label="Duplicar viagem"
        onClick={onDuplicate}
        size="medium"
        sx={{
          ...actionButtonSx,
          width: 44,
          height: 44,
        }}
      >
        <ContentCopyOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton
        aria-label="Remover viagem"
        onClick={onDelete}
        size="small"
        color="error"
        sx={{
          ...actionButtonSx,
          width: 36,
          height: 36,
          borderColor: "rgba(224,61,61,0.35)",
        }}
      >
        <DeleteOutlinedIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Stack>
  );
}
