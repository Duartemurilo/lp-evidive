"use client";

import { useEffect, useState } from "react";

/** true após o primeiro paint no cliente — evita mismatch de animações SSR/hidratação */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
