"use client";

import { GlassSurface } from "@/components/ui/glass-surface";
import {
  isExternalUniverseLink,
  type UniverseModule,
} from "@/lib/universe-modules";
import { cn } from "@/lib/utils";
import { useScrollRootRef } from "@/lib/use-scroll-root";
import { ModuleIconBadge } from "@/components/universe/module-icon-badge";
import { ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

type EcosystemModuleCardProps = {
  module: UniverseModule;
  index: number;
  isFeatured: boolean;
};

export function EcosystemModuleCard({
  module,
  index,
  isFeatured,
}: EcosystemModuleCardProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const scrollRootRef = useScrollRootRef();
  const Icon = module.icon;
  const isExternal = isExternalUniverseLink(module.href);

  return (
    <motion.a
      href={module.href}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      aria-label={`${module.title}. ${module.shortDescription}`}
      className={cn(
        "group relative z-10 w-full text-left",
        "md:mx-auto md:max-w-[10.75rem] lg:max-w-[11.25rem]",
        "rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ee8de]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        "transition-[transform,opacity] duration-500",
        "scale-100 opacity-[0.88] hover:opacity-100 hover:scale-[1.02]",
        isFeatured && "md:scale-[1.01]",
      )}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        root: scrollRootRef,
        once: true,
        amount: 0.45,
        margin: "0px 0px -6% 0px",
      }}
      transition={{
        opacity: { duration: 0.6, delay: index * 0.08, ease: easeOut },
        y: { duration: 0.6, delay: index * 0.08, ease: easeOut },
      }}
    >
      <div
        className={cn(
          "rounded-full transition-shadow duration-500",
          "shadow-[0_8px_28px_rgba(2,16,28,0.25)] group-hover:shadow-[0_0_20px_rgba(94,232,220,0.12)]",
          isFeatured &&
            "shadow-[0_0_0_1px_rgba(154,245,236,0.35),0_0_24px_rgba(94,232,220,0.2),0_12px_40px_rgba(2,16,28,0.35)]",
        )}
      >
        {prefersReducedMotion ? (
          <ModuleGlass isFeatured={isFeatured}>
            <CardInner module={module} Icon={Icon} />
          </ModuleGlass>
        ) : (
          <motion.div
            className="group-hover:-translate-y-0.5 transition-transform duration-300"
          >
            <ModuleGlass isFeatured={isFeatured}>
              <CardInner module={module} Icon={Icon} />
            </ModuleGlass>
          </motion.div>
        )}
      </div>
    </motion.a>
  );
}

function ModuleGlass({
  isFeatured,
  children,
}: {
  isFeatured: boolean;
  children: ReactNode;
}): ReactNode {
  return (
    <GlassSurface
      width="100%"
      height="auto"
      borderRadius={9999}
      borderWidth={isFeatured ? 0.09 : 0.07}
      brightness={isFeatured ? 62 : 56}
      opacity={isFeatured ? 0.94 : 0.88}
      blur={11}
      displace={isFeatured ? 0.55 : 0.4}
      backgroundOpacity={isFeatured ? 0.12 : 0.07}
      saturation={isFeatured ? 1.65 : 1.4}
      distortionScale={-180}
      redOffset={0}
      greenOffset={10}
      blueOffset={20}
      mixBlendMode="screen"
      className={cn(
        "ecosystem-glass w-full transition-transform duration-500",
        isFeatured && "ring-1 ring-[#9af5ec]/30",
        "group-hover:scale-[1.008]",
      )}
    >
      {children}
    </GlassSurface>
  );
}

function CardInner({
  module,
  Icon,
}: {
  module: UniverseModule;
  Icon: UniverseModule["icon"];
}): ReactNode {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-3.5 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3",
        "md:min-h-[8.25rem] md:flex-col md:items-center md:justify-center md:gap-3 md:px-3.5 md:py-5",
      )}
    >
      <ModuleIconBadge icon={Icon} isActive={false} variant="card" />

      <div className="min-w-0 flex-1 md:flex md:flex-1 md:items-center md:justify-center">
        <h3
          className={cn(
            "font-sans font-bold leading-tight text-white text-[0.9rem] sm:text-[0.95rem]",
            "md:text-center md:leading-snug md:text-[0.96rem] lg:text-[1rem]",
          )}
        >
          {module.title}
        </h3>
      </div>

      <ChevronRight
        className={cn(
          "h-4 w-4 shrink-0 text-white/40 transition-all duration-300",
          "md:h-3.5 md:w-3.5",
          "group-hover:translate-x-0.5 group-hover:text-[#9af5ec]/80 md:group-hover:translate-x-0 md:group-hover:translate-y-0.5",
        )}
        strokeWidth={2}
        aria-hidden
      />
    </div>
  );
}
