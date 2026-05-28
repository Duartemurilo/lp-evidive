"use client";

import { useEffect, useRef, type RefObject } from "react";

export function useScrollRootRef(): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.querySelector("[data-scroll-root]");
    ref.current = root instanceof HTMLElement ? root : null;
  }, []);

  return ref;
}
