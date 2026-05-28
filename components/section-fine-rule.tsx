import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionFineRuleProps = {
  className?: string;
};

/** Linha fina centralizada (~90% da largura), referência de separador entre seções. */
export function SectionFineRule({ className }: SectionFineRuleProps): ReactNode {
  return (
    <div
      role="separator"
      aria-hidden
      className={cn("mx-auto w-full max-w-6xl px-6 py-10 md:py-14 lg:py-16", className)}
    >
      <hr className="mx-auto h-px w-[min(100%,92%)] border-0 bg-border/70" />
    </div>
  );
}
