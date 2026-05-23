"use client";

import { GlassSurface } from "@/components/ui/glass-surface";
import { cn } from "@/lib/utils";
import type { UniverseModule } from "@/lib/universe-modules";
import { ModuleIconBadge } from "@/components/universe/module-icon-badge";
import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

type ModuleDetailPanelProps = {
  module: UniverseModule;
};

export function ModuleDetailPanel({ module }: ModuleDetailPanelProps): ReactNode {
  const Icon = module.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={module.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="mt-12 md:mt-14"
      >
        <GlassSurface
          width="100%"
          height="auto"
          borderRadius={28}
          borderWidth={0.08}
          brightness={60}
          opacity={0.92}
          blur={14}
          displace={0.35}
          backgroundOpacity={0.1}
          saturation={1.55}
          distortionScale={-160}
          mixBlendMode="screen"
          className="ecosystem-glass w-full shadow-[0_0_40px_rgba(94,232,220,0.12),0_20px_60px_rgba(2,16,28,0.4)]"
        >
          <div className="flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="flex min-w-0 flex-1 gap-4 sm:gap-5">
              <ModuleIconBadge icon={Icon} isActive variant="detail" />

              <div className="min-w-0">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#9af5ec]/90 sm:text-xs">
                  {module.detailTitle}
                </p>
                <p className="mt-3 max-w-2xl text-[0.9rem] leading-relaxed text-white/78 sm:text-base">
                  {module.detailBody}
                </p>
              </div>
            </div>

            <a
              href={module.href}
              className={cn(
                "inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3.5",
                "bg-[#1ec4b4] text-sm font-semibold text-white",
                "shadow-[0_0_24px_rgba(30,196,180,0.35)] transition-all duration-300",
                "hover:bg-[#23d4c3] hover:shadow-[0_0_32px_rgba(30,196,180,0.45)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9af5ec] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
              )}
            >
              {module.ctaLabel}
              <ChevronRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            </a>
          </div>
        </GlassSurface>
      </motion.div>
    </AnimatePresence>
  );
}
