"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import NoSsr from "@mui/material/NoSsr";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

const ADMIN_LOGO_MINI = "/icons/icon-maskable.png";

function getAdminUserDisplayName(
  user: NonNullable<ReturnType<typeof useUser>["user"]>,
): string {
  const fullName = user.fullName?.trim();
  if (fullName) return fullName;

  const firstLast = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  if (firstLast) return firstLast;

  return user.primaryEmailAddress?.emailAddress ?? "";
}

function AdminUserAccount(): ReactNode {
  const { isLoaded, user } = useUser();
  const [mounted, setMounted] = useState(false);
  const displayName = user ? getAdminUserDisplayName(user) : "";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
        <Box
          aria-hidden
          sx={{
            width: "3.25rem",
            height: "3.25rem",
            borderRadius: "9999px",
            bgcolor: "action.hover",
          }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
      {isLoaded && displayName ? (
        <Typography
          variant="body1"
          noWrap
          sx={{
            display: { xs: "none", md: "block" },
            fontWeight: 600,
            color: "text.primary",
            maxWidth: { md: 240 },
          }}
        >
          {displayName}
        </Typography>
      ) : null}
      <NoSsr
        fallback={
          <Box
            aria-hidden
            sx={{
              width: "3.25rem",
              height: "3.25rem",
              borderRadius: "9999px",
              bgcolor: "action.hover",
            }}
          />
        }
      >
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                width: "3.25rem",
                height: "3.25rem",
              },
            },
          }}
        />
      </NoSsr>
    </Box>
  );
}

type AdminHeaderProps = {
  title?: string | undefined;
  subtitle?: string | undefined;
  onMenuClick: () => void;
};

export function AdminHeader({
  title,
  subtitle,
  onMenuClick,
}: AdminHeaderProps): ReactNode {
  return (
    <Box
      component="header"
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        px: { xs: 2, md: 3 },
        py: 2.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, minWidth: 0 }}>
        <IconButton
          onClick={onMenuClick}
          sx={{ display: { lg: "none" }, mt: 0.25 }}
          aria-label="Abrir menu"
        >
          <MenuIcon />
        </IconButton>
        {title ? (
          <Box sx={{ minWidth: 0, display: { xs: "none", md: "block" } }}>
            <Typography variant="h5" sx={{ lineHeight: 1.2 }}>
              {title}
            </Typography>
            {subtitle ? (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            ) : null}
          </Box>
        ) : null}
      </Box>

      <Box
        component={Link}
        href="/admin/viagens"
        aria-label="EviDive Admin — ir para viagens"
        sx={{
          display: { xs: "flex", md: "none" },
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
        }}
      >
        <Image
          src={ADMIN_LOGO_MINI}
          alt="EviDive"
          width={36}
          height={36}
          style={{ width: 36, height: 36, objectFit: "contain" }}
          priority
        />
      </Box>

      <AdminUserAccount />
    </Box>
  );
}
