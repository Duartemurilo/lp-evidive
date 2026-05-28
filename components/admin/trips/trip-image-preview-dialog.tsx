"use client";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import type { ReactNode } from "react";

export type TripImagePreview = {
  src: string;
  alt: string;
};

type TripImagePreviewDialogProps = {
  preview: TripImagePreview | null;
  onClose: () => void;
};

export function TripImagePreviewDialog({
  preview,
  onClose,
}: TripImagePreviewDialogProps): ReactNode {
  return (
    <Dialog
      open={Boolean(preview)}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: 1.5, overflow: "hidden" },
        },
      }}
    >
      <DialogTitle
        sx={{
          pr: 6,
          fontWeight: 700,
          lineHeight: 1.3,
        }}
      >
        {preview?.alt ?? "Imagem da viagem"}
        <IconButton
          onClick={onClose}
          aria-label="Fechar visualização da imagem"
          sx={{ position: "absolute", right: 12, top: 12 }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 0, pb: { xs: 2, md: 3 }, px: { xs: 2, md: 3 } }}>
        {preview ? (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              minHeight: { xs: 220, sm: 360 },
              maxHeight: "min(70vh, 520px)",
              borderRadius: 1.5,
              overflow: "hidden",
              bgcolor: "rgba(34, 93, 109, 0.06)",
            }}
          >
            <Image
              src={preview.src}
              alt={preview.alt}
              fill
              sizes="(max-width: 900px) 100vw, 720px"
              style={{ objectFit: "contain" }}
              priority
            />
          </Box>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
