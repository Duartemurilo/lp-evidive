"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";

const SCROLL_EDGE_THRESHOLD_PX = 4;

export type HorizontalScrollEdges = {
  canScrollLeft: boolean;
  canScrollRight: boolean;
};

export function useHorizontalScrollEdges(
  trackRef: RefObject<HTMLDivElement | null>,
  deps: readonly unknown[] = [],
): HorizontalScrollEdges & { scrollBy: (direction: -1 | 1) => void } {
  const [edges, setEdges] = useState<HorizontalScrollEdges>({
    canScrollLeft: false,
    canScrollRight: false,
  });

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) {
      setEdges({ canScrollLeft: false, canScrollRight: false });
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = track;
    setEdges({
      canScrollLeft: scrollLeft > SCROLL_EDGE_THRESHOLD_PX,
      canScrollRight:
        scrollLeft + clientWidth < scrollWidth - SCROLL_EDGE_THRESHOLD_PX,
    });
  }, [trackRef]);

  const scrollBy = useCallback(
    (direction: -1 | 1) => {
      const track = trackRef.current;
      if (!track) return;
      const amount = Math.max(track.clientWidth * 0.72, 240);
      track.scrollBy({ left: direction * amount, behavior: "smooth" });
    },
    [trackRef],
  );

  useEffect(() => {
    const track = trackRef.current;

    const attach = (element: HTMLDivElement) => {
      updateEdges();
      element.addEventListener("scroll", updateEdges, { passive: true });
      const resizeObserver = new ResizeObserver(updateEdges);
      resizeObserver.observe(element);
      return () => {
        element.removeEventListener("scroll", updateEdges);
        resizeObserver.disconnect();
      };
    };

    if (track) {
      return attach(track);
    }

    let detach: (() => void) | undefined;
    const frame = requestAnimationFrame(() => {
      const el = trackRef.current;
      if (el) detach = attach(el);
    });

    return () => {
      cancelAnimationFrame(frame);
      detach?.();
    };
  }, [trackRef, updateEdges, ...deps]);

  useEffect(() => {
    const frame = requestAnimationFrame(updateEdges);
    return () => cancelAnimationFrame(frame);
  }, [updateEdges, ...deps]);

  return { ...edges, scrollBy };
}
