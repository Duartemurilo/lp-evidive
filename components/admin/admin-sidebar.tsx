"use client";

import { ADMIN_SIDEBAR_BG } from "@/lib/admin/colors";
import { adminNavItems } from "@/lib/admin/nav";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export { ADMIN_SIDEBAR_BG, ADMIN_SIDEBAR_BG_HOVER } from "@/lib/admin/colors";

export const ADMIN_SIDEBAR_WIDTH_EXPANDED = 280;
export const ADMIN_SIDEBAR_WIDTH_COLLAPSED = 80;
/** Espaço entre o painel lateral e as bordas da viewport (topo, base e esquerda). */
export const ADMIN_SIDEBAR_VIEWPORT_INSET = 16;
const ADMIN_SIDEBAR_CONTENT_GAP = 8;

export function getAdminSidebarWidth(collapsed: boolean): number {
  return collapsed ? ADMIN_SIDEBAR_WIDTH_COLLAPSED : ADMIN_SIDEBAR_WIDTH_EXPANDED;
}

/** Deslocamento horizontal do conteúdo principal (inset + largura + gap). */
export function getAdminSidebarLayoutOffset(collapsed: boolean): number {
  return (
    ADMIN_SIDEBAR_VIEWPORT_INSET +
    getAdminSidebarWidth(collapsed) +
    ADMIN_SIDEBAR_CONTENT_GAP
  );
}

/** @deprecated Use getAdminSidebarWidth(collapsed) */
export const ADMIN_SIDEBAR_WIDTH = ADMIN_SIDEBAR_WIDTH_EXPANDED;

const LOGO_FULL = "/logos/logo-white.png";
const LOGO_COMPACT = "/icons/icon-maskable.png";

type SidebarContentProps = {
  collapsed: boolean;
  onNavigate?: () => void;
};

function SidebarLogo({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}): ReactNode {
  return (
    <Box
      component={Link}
      href="/admin/viagens"
      {...(onNavigate ? { onClick: onNavigate } : {})}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        textDecoration: "none",
      }}
    >
      {collapsed ? (
        <Image
          src={LOGO_COMPACT}
          alt="EviDive"
          width={44}
          height={44}
          style={{ width: 44, height: 44, objectFit: "contain" }}
          priority
        />
      ) : (
        <Image
          src={LOGO_FULL}
          alt="EviDive"
          width={200}
          height={56}
          style={{
            width: "100%",
            maxWidth: 200,
            height: "auto",
            objectFit: "contain",
          }}
          priority
        />
      )}
    </Box>
  );
}

function SidebarContent({
  collapsed,
  onNavigate,
}: SidebarContentProps): ReactNode {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
        bgcolor: ADMIN_SIDEBAR_BG,
        color: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          px: collapsed ? 1.5 : 2.5,
          py: collapsed ? 2.5 : 3.5,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <SidebarLogo
          collapsed={collapsed}
          {...(onNavigate ? { onNavigate } : {})}
        />
      </Box>

      <List
        disablePadding
        sx={{
          flex: 1,
          py: 2,
          px: collapsed ? 1 : 1.5,
          width: "100%",
          minHeight: 0,
        }}
      >
        {adminNavItems.map((item) => {
          const active =
            pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;

          const button = (
            <ListItem
              key={item.href}
              disablePadding
              sx={{ width: "100%", py: 0.25 }}
            >
              <ListItemButton
                component={Link}
                href={item.href}
                disabled={item.disabled}
                {...(onNavigate ? { onClick: onNavigate } : {})}
                selected={active}
                sx={{
                  width: "100%",
                  borderRadius: 1,
                  color: "rgba(255,255,255,0.75)",
                  justifyContent: collapsed ? "center" : "flex-start",
                  px: collapsed ? 1.25 : 2,
                  py: 1.25,
                  minHeight: 44,
                  "&.Mui-selected": {
                    bgcolor: "rgba(30,196,180,0.18)",
                    color: "#fff",
                    "& .MuiListItemIcon-root": { color: "#1ec4b4" },
                  },
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.06)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? 0 : 40,
                    justifyContent: "center",
                    color: "inherit",
                  }}
                >
                  <Icon fontSize="small" />
                </ListItemIcon>
                {!collapsed ? (
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: { sx: { fontWeight: active ? 700 : 500 } },
                    }}
                  />
                ) : null}
              </ListItemButton>
            </ListItem>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.href} title={item.label} placement="right" arrow>
                <Box component="span" sx={{ display: "block", width: "100%" }}>
                  {button}
                </Box>
              </Tooltip>
            );
          }

          return button;
        })}
      </List>
    </Box>
  );
}

function SidebarCollapseToggle({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}): ReactNode {
  return (
    <Tooltip
      title={collapsed ? "Expandir menu" : "Recolher menu"}
      placement="right"
      arrow
    >
      <IconButton
        onClick={onToggle}
        size="small"
        aria-label={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          zIndex: 1301,
          transform: "translate(50%, -50%)",
          width: 32,
          height: 32,
          borderRadius: "50%",
          color: ADMIN_SIDEBAR_BG,
          bgcolor: "#faf8f4",
          border: "1px solid #d8ccc0",
          boxShadow: "0 2px 10px rgba(22, 62, 72, 0.2)",
          transition: "background-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease",
          "&:hover": {
            bgcolor: "#fff",
            color: "#1ec4b4",
            boxShadow: "0 4px 14px rgba(22, 62, 72, 0.28)",
          },
        }}
      >
        {collapsed ? (
          <ChevronRightRoundedIcon sx={{ fontSize: 20 }} />
        ) : (
          <ChevronLeftRoundedIcon sx={{ fontSize: 20 }} />
        )}
      </IconButton>
    </Tooltip>
  );
}

type AdminSidebarProps = {
  mobileOpen: boolean;
  onMobileClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
};

const drawerPaperTransition = "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)";

const mobileDrawerPaperSx = (width: number) => ({
  width,
  boxSizing: "border-box" as const,
  border: "none",
  transition: drawerPaperTransition,
});

const desktopDrawerPaperSx = (width: number) => ({
  width,
  top: ADMIN_SIDEBAR_VIEWPORT_INSET,
  left: ADMIN_SIDEBAR_VIEWPORT_INSET,
  height: `calc(100dvh - ${ADMIN_SIDEBAR_VIEWPORT_INSET * 2}px)`,
  maxHeight: `calc(100dvh - ${ADMIN_SIDEBAR_VIEWPORT_INSET * 2}px)`,
  boxSizing: "border-box" as const,
  border: "none",
  bgcolor: "transparent",
  boxShadow: "none",
  overflow: "visible",
  transition: drawerPaperTransition,
});

export function AdminSidebar({
  mobileOpen,
  onMobileClose,
  collapsed,
  onToggleCollapse,
}: AdminSidebarProps): ReactNode {
  const desktopWidth = getAdminSidebarWidth(collapsed);

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": mobileDrawerPaperSx(ADMIN_SIDEBAR_WIDTH_EXPANDED),
        }}
      >
        <SidebarContent collapsed={false} onNavigate={onMobileClose} />
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", lg: "block" },
          width: 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            ...desktopDrawerPaperSx(desktopWidth),
            position: "fixed",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              height: "100%",
              borderRadius: 1.5,
              overflow: "hidden",
              bgcolor: ADMIN_SIDEBAR_BG,
              boxShadow: "0 8px 32px rgba(22, 62, 72, 0.22)",
            }}
          >
            <SidebarContent collapsed={collapsed} />
          </Box>
          <SidebarCollapseToggle
            collapsed={collapsed}
            onToggle={onToggleCollapse}
          />
        </Box>
      </Drawer>
    </>
  );
}
