"use client";

import { useEffect, useRef, type RefObject } from "react";

export function useScrollRootRef(): RefObject<Element | null> {
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.querySelector("[data-scroll-root]");
  }, []);

  return ref;
}
