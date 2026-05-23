"use client";

import type { ReactNode } from "react";

const TIER_NODES = [
  { cx: 280, cy: 72 },
  { cx: 600, cy: 72 },
  { cx: 200, cy: 200 },
  { cx: 600, cy: 200 },
  { cx: 1000, cy: 200 },
  { cx: 200, cy: 328 },
  { cx: 600, cy: 328 },
  { cx: 1000, cy: 328 },
] as const;

export function JourneyConnector(): ReactNode {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute inset-x-0 top-16 hidden h-[calc(100%-5rem)] w-full md:block"
    >
      {TIER_NODES.map((node) => (
        <circle
          key={`${node.cx}-${node.cy}`}
          cx={node.cx}
          cy={node.cy}
          r="3"
          fill="#9af5ec"
          opacity={0.65}
          className="drop-shadow-[0_0_6px_rgba(154,245,236,0.7)]"
        />
      ))}
    </svg>
  );
}
