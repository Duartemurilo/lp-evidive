"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, type ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

export type LegalDocumentTocItem = {
  id: string;
  label: string;
};

type LegalDocumentTocSheetProps = {
  open: boolean;
  onClose: () => void;
  items: readonly LegalDocumentTocItem[];
};

function TocSheetLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
}): ReactNode {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex w-full cursor-pointer flex-col rounded-xl px-4 py-3.5 text-left transition-colors",
        "bg-muted/60 text-foreground hover:bg-muted",
      )}
    >
      <span className="text-sm font-semibold leading-snug tracking-[0.02em]">
        {label}
      </span>
    </a>
  );
}

export function LegalDocumentTocSheet({
  open,
  onClose,
  items,
}: LegalDocumentTocSheetProps): ReactNode {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const handleNavigate = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100] lg:hidden" role="presentation">
          <motion.button
            type="button"
            aria-label="Fechar índice"
            className="absolute inset-0 cursor-default bg-foreground/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-toc-sheet-title"
            className="absolute inset-x-0 bottom-0 flex max-h-[min(88dvh,640px)] flex-col overflow-hidden rounded-t-3xl bg-background shadow-[0_-24px_80px_rgba(8,32,42,0.22)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.38, ease: easeOut }}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-border/50 px-5 py-4">
              <h3
                id="legal-toc-sheet-title"
                className="font-display text-xl font-bold tracking-tight text-foreground"
              >
                Neste documento
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border/60 text-foreground/70 transition-colors hover:bg-muted"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">
              <div className="space-y-2">
                {items.map((item) => (
                  <TocSheetLink
                    key={item.id}
                    href={`#${item.id}`}
                    label={item.label}
                    onNavigate={handleNavigate}
                  />
                ))}
              </div>

              <Link
                href="/"
                onClick={handleNavigate}
                className="mt-6 inline-flex text-base font-medium text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Voltar ao início
              </Link>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
