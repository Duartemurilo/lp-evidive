"use client";

import { useEffect, useState } from "react";

/** Delay antes das animações de entrada (hero, indicador de profundidade, etc.) */
export const PAGE_REVEAL_DELAY_MS = 3400;

export function usePageRevealReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setReady(true),
      PAGE_REVEAL_DELAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, []);

  return ready;
}
