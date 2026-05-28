"use client";

import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const TOAST_AUTO_HIDE_MS = 5000;

export type AdminToastSeverity = "success" | "error";

type AdminToastState = {
  open: boolean;
  message: string;
  severity: AdminToastSeverity;
};

type AdminToastContextValue = {
  showToast: (message: string, severity: AdminToastSeverity) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
};

const AdminToastContext = createContext<AdminToastContextValue | null>(null);

const toastStyles: Record<
  AdminToastSeverity,
  { border: string; iconBg: string; iconColor: string }
> = {
  success: {
    border: "rgba(30, 196, 180, 0.45)",
    iconBg: "rgba(30, 196, 180, 0.14)",
    iconColor: "#1ec4b4",
  },
  error: {
    border: "rgba(224, 61, 61, 0.4)",
    iconBg: "rgba(224, 61, 61, 0.1)",
    iconColor: "#e03d3d",
  },
};

function AdminToastCard({
  message,
  severity,
  onClose,
}: {
  message: string;
  severity: AdminToastSeverity;
  onClose: () => void;
}): ReactNode {
  const style = toastStyles[severity];
  const Icon =
    severity === "success" ? CheckCircleOutlineRoundedIcon : ErrorOutlineRoundedIcon;

  return (
    <Paper
      elevation={0}
      role="status"
      aria-live="polite"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 2.25,
        py: 2,
        minWidth: { xs: "min(92vw, 20rem)", sm: 320 },
        maxWidth: { xs: "92vw", sm: 420 },
        borderRadius: 1,
        border: "1px solid",
        borderColor: style.border,
        bgcolor: "#faf8f4",
        boxShadow: "0 20px 50px rgba(22, 62, 72, 0.2)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          borderRadius: "50%",
          flexShrink: 0,
          bgcolor: style.iconBg,
          color: style.iconColor,
        }}
      >
        <Icon sx={{ fontSize: 24 }} />
      </Box>
      <Typography
        variant="body1"
        sx={{
          flex: 1,
          fontWeight: 600,
          color: "#225d6d",
          lineHeight: 1.45,
        }}
      >
        {message}
      </Typography>
      <IconButton
        size="small"
        aria-label="Fechar notificação"
        onClick={onClose}
        sx={{ color: "text.secondary" }}
      >
        <CloseRoundedIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
}

export function AdminToastProvider({ children }: { children: ReactNode }): ReactNode {
  const [toast, setToast] = useState<AdminToastState>({
    open: false,
    message: "",
    severity: "success",
  });
  const [toastKey, setToastKey] = useState(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    setToast((current) => ({ ...current, open: false }));
  }, []);

  const showToast = useCallback((message: string, severity: AdminToastSeverity) => {
    setToastKey((current) => current + 1);
    setToast({ open: true, message, severity });
  }, []);

  useEffect(() => {
    if (!toast.open) return;

    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = setTimeout(() => {
      close();
    }, TOAST_AUTO_HIDE_MS);

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };
  }, [toast.open, toast.message, toast.severity, close]);

  const showSuccess = useCallback(
    (message: string) => showToast(message, "success"),
    [showToast],
  );

  const showError = useCallback(
    (message: string) => showToast(message, "error"),
    [showToast],
  );

  const value = useMemo(
    () => ({ showToast, showSuccess, showError }),
    [showToast, showSuccess, showError],
  );

  return (
    <AdminToastContext.Provider value={value}>
      {children}
      <Snackbar
        key={toastKey}
        open={toast.open}
        autoHideDuration={TOAST_AUTO_HIDE_MS}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={(_, reason) => {
          if (reason === "clickaway") return;
          close();
        }}
        sx={{
          top: { xs: 16, sm: 24 },
        }}
      >
        {/* Grow exige um filho com ref no DOM; AdminToastCard não encaminha ref. */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <AdminToastCard message={toast.message} severity={toast.severity} onClose={close} />
        </Box>
      </Snackbar>
    </AdminToastContext.Provider>
  );
}

export function useAdminToast(): AdminToastContextValue {
  const context = useContext(AdminToastContext);
  if (!context) {
    throw new Error("useAdminToast must be used within AdminToastProvider.");
  }
  return context;
}
