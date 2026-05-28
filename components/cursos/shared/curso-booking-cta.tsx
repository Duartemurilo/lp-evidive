import type { CursoCta } from "@/lib/types/curso-page";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type CursoBookingCtaProps = {
  cta: CursoCta;
  className?: string;
  size?: "default" | "large";
};

export function CursoBookingCta({
  cta,
  className,
  size = "default",
}: CursoBookingCtaProps): ReactNode {
  const variant = cta.variant ?? "primary";
  const isSchedule = variant === "schedule";

  return (
    <Link
      href={cta.href}
      {...(cta.external !== false
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={cn(
        "font-display group inline-flex w-full items-center justify-center gap-3 sm:w-auto",
        isSchedule
          ? "rounded-md bg-foreground py-3 pr-3 pl-5 font-medium text-background transition-all duration-500 ease-out hover:rounded-[50px]"
          : cn(
              "rounded-full bg-primary font-semibold text-white shadow-[0_12px_36px_rgba(30,196,180,0.28)] transition-all duration-300 hover:bg-[#1ad4c3] hover:shadow-[0_16px_44px_rgba(30,196,180,0.38)]",
              size === "large" ? "px-8 py-4 text-base" : "px-7 py-3.5 text-sm",
            ),
        className,
      )}
    >
      <span>{cta.label}</span>
      <span
        className={cn(
          "flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110",
          isSchedule
            ? "h-10 w-10 bg-background text-foreground"
            : "h-9 w-9 bg-white/15 group-hover:scale-105",
        )}
      >
        <ChevronRight
          className={cn("h-4 w-4", isSchedule && "relative left-px")}
          aria-hidden
        />
      </span>
    </Link>
  );
}
