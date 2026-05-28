"use client";

import { ADMIN_SIDEBAR_BG, ADMIN_SIDEBAR_BG_HOVER } from "@/lib/admin/colors";
import { createTheme } from "@mui/material/styles";

export const adminTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#225d6d",
      contrastText: "#ffffff",
    },
    sidebar: {
      main: ADMIN_SIDEBAR_BG,
      dark: ADMIN_SIDEBAR_BG_HOVER,
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1ec4b4",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f2efe9",
      paper: "#faf8f4",
    },
    text: {
      primary: "#225d6d",
      secondary: "#6f8790",
    },
    divider: "#d8ccc0",
    success: {
      main: "#1ec4b4",
    },
    warning: {
      main: "#fba035",
    },
    error: {
      main: "#e03d3d",
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "var(--font-garet), system-ui, sans-serif",
    h4: {
      fontFamily: "var(--font-todayshop), Georgia, serif",
      fontWeight: 700,
    },
    h5: {
      fontFamily: "var(--font-todayshop), Georgia, serif",
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 6,
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          color: "#6f8790",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});
