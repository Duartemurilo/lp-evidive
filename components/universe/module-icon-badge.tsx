import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type ModuleIconBadgeProps = {
  icon: LucideIcon;
  isActive?: boolean;
  variant?: "card" | "detail";
};

export function ModuleIconBadge({
  icon: Icon,
  isActive = false,
  variant = "card",
}: ModuleIconBadgeProps): ReactNode {
  const isDetail = variant === "detail";
  const isCard = variant === "card";

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center transition-all duration-500",
        isDetail && [
          "h-14 w-14 rounded-full sm:h-16 sm:w-16",
          "border-2 bg-[rgba(255,255,255,0.14)]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_16px_rgba(2,16,28,0.28)]",
          isActive
            ? "border-[#c8faf4]/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_0_22px_rgba(94,232,220,0.35)]"
            : "border-white/25",
        ],
        isCard && [
          "h-12 w-12 rounded-full sm:h-[3.35rem] sm:w-[3.35rem]",
          "max-md:border-2 max-md:bg-[rgba(255,255,255,0.14)]",
          "max-md:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_16px_rgba(2,16,28,0.28)]",
          "max-md:overflow-visible max-md:group-hover:scale-[1.08]",
          isActive
            ? "max-md:border-[#c8faf4]/55 max-md:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_0_22px_rgba(94,232,220,0.35)]"
            : "max-md:border-white/25",
          !isActive &&
            "max-md:group-hover:border-[#9af5ec]/55 max-md:group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_0_28px_rgba(94,232,220,0.42),0_0_12px_rgba(154,245,236,0.25)]",
          "md:h-auto md:w-auto md:rounded-none md:border-0 md:bg-transparent md:shadow-none",
        ],
      )}
    >
      {isCard && (
        <span
          aria-hidden
          className={cn(
            "absolute inset-[2px] rounded-full bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,0.22),transparent_58%)] transition-opacity duration-500 md:hidden",
            "group-hover:opacity-100 group-hover:bg-[radial-gradient(circle_at_32%_22%,rgba(255,255,255,0.42),transparent_52%)]",
          )}
        />
      )}

      {isCard && (
        <>
          <span
            aria-hidden
            className="module-droplet-ripple pointer-events-none absolute inset-0 rounded-full border border-[#9af5ec]/25 opacity-0 md:hidden"
          />
          <span
            aria-hidden
            className="module-droplet-highlight absolute right-1 top-1 z-[2] h-1.5 w-1.5 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.85)] transition-all duration-300 group-hover:right-0.5 group-hover:top-0.5 group-hover:h-2 group-hover:w-2 group-hover:bg-white group-hover:shadow-[0_0_18px_rgba(154,245,236,0.95),0_0_10px_rgba(255,255,255,1)] sm:right-1.5 sm:top-1.5 md:hidden"
          />
        </>
      )}

      {isDetail && (
        <span
          aria-hidden
          className="absolute inset-[2px] rounded-full bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,0.22),transparent_58%)]"
        />
      )}

      <Icon
        className={cn(
          "relative text-white drop-shadow-[0_0_10px_rgba(154,245,236,0.55)] transition-transform duration-300",
          isDetail && "h-6 w-6 sm:h-7 sm:w-7",
          isCard && [
            "h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]",
            "max-md:group-hover:scale-105 max-md:group-hover:drop-shadow-[0_0_14px_rgba(154,245,236,0.9)]",
            "md:h-11 md:w-11 lg:h-12 lg:w-12 md:group-hover:scale-110 md:group-hover:drop-shadow-[0_0_16px_rgba(154,245,236,0.95)]",
            isActive && "md:drop-shadow-[0_0_18px_rgba(154,245,236,1)]",
          ],
        )}
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      />
    </div>
  );
}
