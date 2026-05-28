"use client";

import { getAdminBreadcrumbs } from "@/lib/admin/admin-breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type AdminBreadcrumbsProps = {
  /** Substitui o rótulo da página atual (último item). */
  currentLabel?: string | null;
};

export function AdminBreadcrumbs({ currentLabel }: AdminBreadcrumbsProps): ReactNode {
  const pathname = usePathname();
  const items = getAdminBreadcrumbs(
    pathname,
    currentLabel !== undefined ? { currentLabel } : undefined,
  );

  if (items.length === 0) return null;

  return (
    <Box
      component="nav"
      aria-label="Navegação do painel"
      sx={{
        mb: { xs: 2, md: 2.5 },
        minWidth: 0,
      }}
    >
      <Breadcrumbs
        maxItems={4}
        itemsBeforeCollapse={1}
        itemsAfterCollapse={1}
        separator={
          <NavigateNextRoundedIcon
            fontSize="inherit"
            sx={{ color: "text.disabled", fontSize: "1.1rem", mx: -0.25 }}
          />
        }
        sx={{
          "& .MuiBreadcrumbs-li": {
            display: "inline-flex",
            alignItems: "center",
            maxWidth: { xs: "min(42vw, 11rem)", sm: "none" },
          },
          "& .MuiBreadcrumbs-ol": {
            flexWrap: { xs: "nowrap", sm: "wrap" },
          },
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const key = `${item.href ?? "current"}-${item.label}`;

          if (!isLast && item.href) {
            return (
              <Link
                key={key}
                component={NextLink}
                href={item.href}
                underline="hover"
                color="text.secondary"
                sx={{
                  typography: "body2",
                  fontWeight: 500,
                  lineHeight: 1.4,
                  "&:hover": { color: "primary.main" },
                }}
              >
                {item.label}
              </Link>
            );
          }

          return (
            <Typography
              key={key}
              component="span"
              color="text.primary"
              noWrap={!isLast}
              title={item.label}
              sx={{
                typography: "body2",
                fontWeight: isLast ? 700 : 500,
                lineHeight: 1.4,
              }}
            >
              {item.label}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
