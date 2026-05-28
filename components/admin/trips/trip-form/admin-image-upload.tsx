"use client";

import { validateAdminImageFile } from "@/lib/trips/upload-admin-image";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from "react";

type AdminImageUploadProps = {
  valueUrl: string | null;
  file: File | null;
  /** Prévia estável (ex.: data URL ou blob gerenciado pelo formulário). */
  previewUrl?: string | null;
  variant?: "default" | "compact";
  onFileChange: (file: File | null) => void;
  onValueUrlChange: (url: string | null) => void;
  error?: string;
};

export function AdminImageUpload({
  valueUrl,
  file,
  previewUrl: previewUrlProp,
  variant = "default",
  onFileChange,
  onValueUrlChange,
  error,
}: AdminImageUploadProps): ReactNode {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [localBlobUrl, setLocalBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (previewUrlProp) {
      setLocalBlobUrl(null);
      return;
    }
    if (!file) {
      setLocalBlobUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setLocalBlobUrl(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file, previewUrlProp]);

  const displayUrl = previewUrlProp ?? localBlobUrl ?? valueUrl ?? null;
  const hasError = Boolean(error || fileError);
  const helperMessage = fileError ?? error ?? "JPG, PNG ou WEBP ate 5MB";
  const isCompact = variant === "compact";

  const handleSelectClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    if (!selectedFile) return;

    const validationError = validateAdminImageFile(selectedFile);
    if (validationError) {
      setFileError(validationError);
      event.target.value = "";
      return;
    }

    setFileError(null);
    onFileChange(selectedFile);
    event.target.value = "";
  };

  const handleRemoveImage = () => {
    setFileError(null);
    onFileChange(null);
    onValueUrlChange(null);
  };

  return (
    <Stack spacing={1}>
      <Box
        sx={{
          border: "1px dashed",
          borderColor: hasError ? "error.main" : "divider",
          borderRadius: isCompact ? 1 : 1.5,
          overflow: "hidden",
        }}
      >
        {displayUrl ? (
          <Stack spacing={0}>
            <Box
              component="img"
              src={displayUrl}
              alt="Prévia da imagem"
              sx={{
                width: "100%",
                aspectRatio: isCompact ? "4 / 3" : "16 / 9",
                objectFit: "cover",
                display: "block",
              }}
            />
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                justifyContent: "center",
                flexWrap: "wrap",
                px: 1,
                py: isCompact ? 0.5 : 1,
              }}
            >
              <Button
                type="button"
                variant="text"
                onClick={handleSelectClick}
                startIcon={<SwapHorizOutlinedIcon fontSize="small" />}
                size={isCompact ? "small" : "medium"}
              >
                Trocar imagem
              </Button>
              <Button
                type="button"
                variant="text"
                color="error"
                onClick={handleRemoveImage}
                startIcon={<DeleteOutlinedIcon fontSize="small" />}
                size={isCompact ? "small" : "medium"}
              >
                Remover imagem
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Stack
            sx={{
              width: "100%",
              minHeight: isCompact ? 120 : 170,
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              px: 2,
              py: 3,
              color: "text.secondary",
              textAlign: "center",
            }}
          >
            <ImageOutlinedIcon />
            <Typography variant="body2">Nenhuma imagem selecionada</Typography>
            <Button
              type="button"
              variant="text"
              size={isCompact ? "small" : "medium"}
              onClick={handleSelectClick}
              sx={{ mt: 0.5 }}
            >
              Selecionar imagem
            </Button>
          </Stack>
        )}
      </Box>

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        hidden
      />

      <Typography variant="caption" color={hasError ? "error.main" : "text.secondary"}>
        {helperMessage}
      </Typography>
    </Stack>
  );
}
