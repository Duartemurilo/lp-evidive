import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type WaveDividerProps = {
  className?: string;
};

export function WaveDivider({ className }: WaveDividerProps): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 340 28"
      className={cn("h-2.5 w-[min(12rem,42vw)] sm:h-3", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 14C25 14 25 6 46 6C67 6 67 22 88 22C109 22 109 6 130 6C151 6 151 22 172 22C193 22 193 10 214 10C235 10 235 18 256 18C277 18 277 8 298 8C319 8 319 14 336 14"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
