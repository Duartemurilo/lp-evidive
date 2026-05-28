"use client";

import { features, splashConfig } from "@/lib/config";
import { shouldPlaySplashOnThisLoad } from "@/lib/splash-gate";
import { useEffect, useState } from "react";

/** Com splash: alinhado ao fim da animação de entrada. */
export const PAGE_REVEAL_DELAY_WITH_SPLASH_MS = 3400;

/** Sem splash: hero revela quase imediatamente. */
export const PAGE_REVEAL_DELAY_NO_SPLASH_MS = 380;

/** Evita repetir a revelação da hero em navegação interna (App Router). */
let pageRevealCompletedThisDocument = false;

function resolvePageRevealDelayMs(): number {
  if (typeof window === "undefined") {
    return PAGE_REVEAL_DELAY_WITH_SPLASH_MS;
  }

  if (!features.splash) {
    return PAGE_REVEAL_DELAY_NO_SPLASH_MS;
  }

  return shouldPlaySplashOnThisLoad({
    showOncePerSession: splashConfig.showOncePerSession,
  })
    ? PAGE_REVEAL_DELAY_WITH_SPLASH_MS
    : PAGE_REVEAL_DELAY_NO_SPLASH_MS;
}

export function hasPageRevealCompleted(): boolean {
  return pageRevealCompletedThisDocument;
}

export function usePageRevealReady(): boolean {
  const [ready, setReady] = useState(
    () => typeof window !== "undefined" && pageRevealCompletedThisDocument,
  );

  useEffect(() => {
    if (pageRevealCompletedThisDocument) {
      setReady(true);
      return;
    }

    const delayMs = resolvePageRevealDelayMs();

    const timer = window.setTimeout(() => {
      pageRevealCompletedThisDocument = true;
      setReady(true);
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, []);

  return ready;
}

/**
 * true quando a revelação já rodou nesta aba — hero deve aparecer sem reanimar.
 */
export function usePageRevealSkipAnimation(): boolean {
  const [skip] = useState(
    () => typeof window !== "undefined" && pageRevealCompletedThisDocument,
  );
  return skip;
}
