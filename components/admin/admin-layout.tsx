"use client";

import { AdminBreadcrumbs } from "@/components/admin/admin-breadcrumbs";
import { AdminHeader } from "@/components/admin/admin-header";
import {
  AdminSidebar,
  getAdminSidebarLayoutOffset,
} from "@/components/admin/admin-sidebar";
import Box from "@mui/material/Box";
import { useCallback, useEffect, useState, type ReactNode } from "react";

const SIDEBAR_COLLAPSED_KEY = "evidive-admin-sidebar-collapsed";

type AdminLayoutProps = {
  title?: string | undefined;
  subtitle?: string | undefined;
  /** Rótulo da página atual na trilha (ex.: título da viagem). */
  breadcrumbLabel?: string | null;
  children: ReactNode;
};

export function AdminLayout({
  title,
  subtitle,
  breadcrumbLabel,
  children,
}: AdminLayoutProps): ReactNode {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
      if (stored === "true") setSidebarCollapsed(true);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleSidebarCollapsed = useCallback(() => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const sidebarLayoutOffset = getAdminSidebarLayoutOffset(sidebarCollapsed);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100dvh",
        bgcolor: "background.default",
      }}
    >
        <AdminSidebar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapsed}
        />
        <Box
          component="section"
          sx={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            ml: { lg: `${sidebarLayoutOffset}px` },
            transition: "margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <AdminHeader
            title={title}
            subtitle={subtitle}
            onMenuClick={() => setMobileOpen(true)}
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              px: { xs: 2, md: 3, xl: 4 },
              py: { xs: 2.5, md: 3.5 },
            }}
          >
            <AdminBreadcrumbs currentLabel={breadcrumbLabel} />
            {children}
          </Box>
        </Box>
      </Box>
  );
}
