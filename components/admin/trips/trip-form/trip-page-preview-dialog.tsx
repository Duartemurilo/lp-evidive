"use client";

import { TripPagePreview } from "@/components/admin/trips/trip-form/trip-page-preview";
import type { TripFormValues } from "@/lib/types/trip-admin";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

type TripPagePreviewDialogProps = {
  open: boolean;
  values: TripFormValues;
  previewImages?: {
    heroImageUrl?: string | null;
    sectionImageUrlsById?: Record<string, string>;
  };
  onClose: () => void;
  onOpenFull: () => void;
};

export function TripPagePreviewDialog({
  open,
  values,
  previewImages,
  onClose,
  onOpenFull,
}: TripPagePreviewDialogProps): ReactNode {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            display: "flex",
            flexDirection: "column",
            m: { xs: 1, sm: 2 },
            width: { xs: "calc(100% - 16px)", sm: "auto" },
            maxWidth: { xs: "100%", sm: 480 },
            maxHeight: { xs: "calc(100dvh - 16px)", sm: "min(92dvh, 720px)" },
            overflow: "hidden",
            bgcolor: "background.default",
          },
        },
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          px: 2,
          py: 1.25,
          bgcolor: "background.default",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#225d6d" }}>
          Prévia da página
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Button
            size="small"
            color="primary"
            startIcon={<OpenInFullRoundedIcon />}
            onClick={onOpenFull}
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
          >
            Abrir
          </Button>
          <IconButton
            size="small"
            color="primary"
            aria-label="Abrir prévia em tela cheia"
            onClick={onOpenFull}
            sx={{ display: { xs: "inline-flex", sm: "none" } }}
          >
            <OpenInFullRoundedIcon />
          </IconButton>
          <IconButton onClick={onClose} aria-label="Fechar prévia" size="small">
            <CloseRoundedIcon />
          </IconButton>
        </Box>
      </Box>

      <DialogContent
        sx={{
          p: 0,
          flex: 1,
          minHeight: 0,
          overflowX: "hidden",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <TripPagePreview
          values={values}
          variant="embedded"
          {...(previewImages ? { previewImages } : {})}
        />
      </DialogContent>
    </Dialog>
  );
}
