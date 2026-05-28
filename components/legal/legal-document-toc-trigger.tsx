"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type LegalDocumentTocTriggerProps = {
  onClick: () => void;
  isOpen?: boolean;
  className?: string;
};

export function LegalDocumentTocTrigger({
  onClick,
  isOpen = false,
  className,
}: LegalDocumentTocTriggerProps): ReactNode {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      className={cn(
        "inline-flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border border-border/80 bg-transparent px-4 py-3.5 text-left transition-colors hover:border-border hover:bg-muted/50",
        className,
      )}
    >
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/75">
        Neste documento
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-foreground/45" aria-hidden />
    </button>
  );
}
