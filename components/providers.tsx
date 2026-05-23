"use client";

import { SplashScreen } from "@/components/splash-screen";
import { SmoothScroll } from "@/components/smooth-scroll";
import { features } from "@/lib/config";
import { ReducedMotionProvider } from "@/lib/motion";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }): ReactNode {
  return (
    <ReducedMotionProvider>
      {features.splash ? <SplashScreen /> : null}
      <SmoothScroll>{children}</SmoothScroll>
    </ReducedMotionProvider>
  );
}
