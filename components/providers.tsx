"use client";

import { SplashScreen } from "@/components/splash-screen";
import { SmoothScroll } from "@/components/smooth-scroll";
import { features } from "@/lib/config";
import { ReducedMotionProvider } from "@/lib/motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const AUTH_ROUTE_PREFIXES = ["/admin", "/sign-in", "/sign-up"];

function isAuthRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return AUTH_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function Providers({ children }: { children: ReactNode }): ReactNode {
  const pathname = usePathname();
  const authRoute = isAuthRoute(pathname);
  const showSplash = features.splash && !authRoute;

  return (
    <ReducedMotionProvider>
      {showSplash ? <SplashScreen /> : null}
      {authRoute ? children : <SmoothScroll>{children}</SmoothScroll>}
    </ReducedMotionProvider>
  );
}
