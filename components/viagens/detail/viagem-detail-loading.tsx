import type { ReactNode } from "react";

function HeroSkeleton(): ReactNode {
  return (
    <section className="relative isolate min-h-[92dvh] overflow-hidden bg-muted animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 to-foreground/10" />
      <div className="relative z-10 flex min-h-[92dvh] flex-col items-center justify-center px-6">
        <div className="h-4 w-24 rounded-full bg-white/30" />
        <div className="mt-8 h-10 w-[min(18rem,70vw)] rounded-lg bg-white/25" />
      </div>
    </section>
  );
}

function SectionSkeleton(): ReactNode {
  return (
    <div className="space-y-4 py-16">
      <div className="mx-auto h-8 w-2/3 max-w-md animate-pulse rounded-lg bg-muted" />
      <div className="mx-auto h-4 w-full max-w-lg animate-pulse rounded bg-muted/80" />
      <div className="mx-auto h-4 w-5/6 max-w-lg animate-pulse rounded bg-muted/80" />
    </div>
  );
}

export function ViagemDetailLoading(): ReactNode {
  return (
    <>
      <HeroSkeleton />
      <div className="bg-[#f7f2ec]">
        <div className="mx-auto max-w-3xl px-6">
          <SectionSkeleton />
          <SectionSkeleton />
        </div>
      </div>
    </>
  );
}
