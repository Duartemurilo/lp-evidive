"use client";

import { ViagensCatalogFilters } from "@/components/viagens/catalog/viagens-catalog-filters";
import { ViagensCatalogFiltersSheet } from "@/components/viagens/catalog/viagens-catalog-filters-sheet";
import { ViagensCatalogFiltersTrigger } from "@/components/viagens/catalog/viagens-catalog-filters-trigger";
import {
  ViagensDateCarousel,
  ViagensDateCarouselNav,
} from "@/components/viagens/catalog/viagens-date-carousel";
import { ViagensTripCard } from "@/components/viagens/catalog/viagens-trip-card";
import { ViagensTripsCarousel } from "@/components/viagens/catalog/viagens-trips-carousel";
import { useHorizontalScrollEdges } from "@/lib/hooks/use-horizontal-scroll-edges";
import { useViagens } from "@/lib/hooks/use-viagens";
import { filterViagens } from "@/lib/viagens-filters";
import type { ViagensCatalogFilterState } from "@/lib/viagens-catalog-filters-ui";
import { defaultViagensCatalogFilters } from "@/lib/viagens-catalog-filters-ui";
import {
  sectionTitleBase,
  sectionTitleSans,
  subpagePresenceTitleDisplayInline,
} from "@/lib/typography";
import { cn } from "@/lib/utils";
import { reducedMotionVariants, useReducedMotion } from "@/lib/motion";
import { motion, type Variants } from "motion/react";
import { VIAGENS_CATALOG_SECTION_ID } from "@/lib/viagens-catalog-navigation";
import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

const gridStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.04 },
  },
};

function CatalogSkeleton({ mobileCarousel = false }: { mobileCarousel?: boolean }): ReactNode {
  const itemClass = "animate-pulse overflow-hidden rounded-2xl border border-border/30 bg-muted/50";

  if (mobileCarousel) {
    return (
      <div className="scrollbar-hide -mx-6 flex gap-4 overflow-hidden px-6 lg:hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className={cn(itemClass, "w-[min(82vw,18.5rem)] shrink-0")}>
            <div className="aspect-[4/5] bg-muted" />
            <div className="space-y-3 p-5">
              <div className="h-3 w-2/3 rounded bg-muted-foreground/15" />
              <div className="h-3 w-1/2 rounded bg-muted-foreground/15" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden grid-cols-1 gap-6 sm:grid-cols-2 lg:grid xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className={itemClass}>
          <div className="aspect-[4/5] bg-muted" />
          <div className="space-y-3 p-5">
            <div className="h-3 w-2/3 rounded bg-muted-foreground/15" />
            <div className="h-3 w-1/2 rounded bg-muted-foreground/15" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ViagensCatalogSection(): ReactNode {
  const { data, error, isLoading } = useViagens();
  const prefersReducedMotion = useReducedMotion();
  const cardVariants = prefersReducedMotion ? reducedMotionVariants : undefined;

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] =
    useState<ViagensCatalogFilterState>(defaultViagensCatalogFilters);

  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const [carouselTrackVersion, setCarouselTrackVersion] = useState(0);
  const dateSlotCount = data?.dateSlots.length ?? 0;

  const handleCarouselTrackMount = useCallback(() => {
    setCarouselTrackVersion((version) => version + 1);
  }, []);

  const {
    canScrollLeft,
    canScrollRight,
    scrollBy: scrollCarousel,
  } = useHorizontalScrollEdges(carouselTrackRef, [
    dateSlotCount,
    isLoading,
    carouselTrackVersion,
  ]);

  const filteredTrips = useMemo(() => {
    if (!data) return [];
    return filterViagens({
      trips: data.trips,
      categoryId: appliedFilters.categoryId,
      dateSlotId: appliedFilters.dateSlotId,
      scopeId: appliedFilters.scopeId,
    });
  }, [
    data,
    appliedFilters.categoryId,
    appliedFilters.dateSlotId,
    appliedFilters.scopeId,
  ]);

  const tripCountLabel =
    filteredTrips.length === 1 ? "1 viagem" : `${filteredTrips.length} viagens`;

  return (
    <section
      id={VIAGENS_CATALOG_SECTION_ID}
      aria-labelledby="viagens-catalog-heading"
      className="scroll-mt-24 bg-background px-6 py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-[minmax(13.5rem,17rem)_minmax(0,1fr)] lg:gap-x-12 lg:gap-y-0 xl:gap-x-16">
          <ViagensCatalogFilters
            className="hidden lg:block lg:pt-3"
            dateSlots={data?.dateSlots ?? []}
            categories={data?.categories ?? []}
            selectedDateSlotId={appliedFilters.dateSlotId}
            selectedScopeId={appliedFilters.scopeId}
            selectedCategoryId={appliedFilters.categoryId}
            onDateSlotChange={(dateSlotId) =>
              setAppliedFilters((prev) => ({ ...prev, dateSlotId }))
            }
            onScopeChange={(scopeId) =>
              setAppliedFilters((prev) => ({ ...prev, scopeId }))
            }
            onCategoryChange={(categoryId) =>
              setAppliedFilters((prev) => ({ ...prev, categoryId }))
            }
          />

          <div className="min-w-0">
            <motion.header
              className="flex flex-col gap-6 border-b border-border/40 pb-8 lg:gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, ease: easeOut }}
            >
              <div className="flex w-full flex-col items-center gap-5 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
                <div className="w-full min-w-0 lg:flex-1">
                  <h2
                    id="viagens-catalog-heading"
                    className={cn(
                      sectionTitleBase,
                      "mx-auto max-w-[20ch] text-balance lg:mx-0 lg:max-w-none lg:whitespace-nowrap lg:text-left",
                    )}
                  >
                    <span className={cn(sectionTitleSans, "text-black lg:hidden")}>
                      Encontre sua próxima{" "}
                      <span
                        className={cn(
                          subpagePresenceTitleDisplayInline,
                          "text-primary",
                        )}
                      >
                        viagem
                      </span>
                    </span>
                    <span
                      className={cn(
                        sectionTitleSans,
                        "hidden text-black lg:inline",
                      )}
                    >
                      Encontre sua próxima{" "}
                      <span
                        className={cn(
                          subpagePresenceTitleDisplayInline,
                          "text-primary",
                        )}
                      >
                        viagem
                      </span>
                    </span>
                  </h2>
                  {!isLoading && data ? (
                    <p className="mt-3 text-center text-sm text-muted-foreground lg:text-left">
                      {tripCountLabel}
                    </p>
                  ) : null}
                </div>
                {data ? (
                  <div className="hidden justify-center lg:flex lg:shrink-0 lg:justify-end">
                    <ViagensDateCarouselNav
                      canScrollLeft={canScrollLeft}
                      canScrollRight={canScrollRight}
                      onPrev={() => scrollCarousel(-1)}
                      onNext={() => scrollCarousel(1)}
                    />
                  </div>
                ) : null}
              </div>

              {data ? (
                <div className="hidden lg:block">
                  <ViagensDateCarousel
                    trackRef={carouselTrackRef}
                    onTrackMount={handleCarouselTrackMount}
                    dateSlots={data.dateSlots}
                    selectedDateSlotId={appliedFilters.dateSlotId}
                    onSelect={(dateSlotId) =>
                      setAppliedFilters((prev) => ({ ...prev, dateSlotId }))
                    }
                  />
                </div>
              ) : (
                <div className="hidden h-16 animate-pulse rounded-xl bg-muted/60 lg:block" />
              )}
            </motion.header>

            {data ? (
              <div className="mt-6 lg:hidden">
                <ViagensCatalogFiltersTrigger
                  filters={appliedFilters}
                  isOpen={filtersOpen}
                  onClick={() => setFiltersOpen(true)}
                />
                <ViagensCatalogFiltersSheet
                  open={filtersOpen}
                  onClose={() => setFiltersOpen(false)}
                  dateSlots={data.dateSlots}
                  categories={data.categories}
                  appliedFilters={appliedFilters}
                  onApply={setAppliedFilters}
                />
              </div>
            ) : null}

            <div className="mt-8 lg:mt-12">
              {error ? (
                <p className="text-center text-sm text-destructive" role="alert">
                  Não foi possível carregar as viagens. Tente atualizar a página.
                </p>
              ) : null}

              {isLoading ? (
                <>
                  <CatalogSkeleton mobileCarousel />
                  <div className="mt-0 hidden lg:mt-0 lg:block">
                    <CatalogSkeleton />
                  </div>
                </>
              ) : null}

              {!isLoading && data && filteredTrips.length === 0 ? (
                <p className="py-16 text-center text-sm text-muted-foreground">
                  Nenhuma viagem encontrada para os filtros selecionados.
                </p>
              ) : null}

              {!isLoading && filteredTrips.length > 0 ? (
                <>
                  <ViagensTripsCarousel trips={filteredTrips} />
                  <motion.div
                    key={`${appliedFilters.categoryId}-${appliedFilters.dateSlotId}-${appliedFilters.scopeId ?? "todos"}`}
                    className="mt-0 hidden grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-0 lg:grid xl:grid-cols-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.12 }}
                    variants={gridStagger}
                  >
                    {filteredTrips.map((trip) => (
                      <ViagensTripCard
                        key={trip.id}
                        trip={trip}
                        {...(cardVariants ? { variants: cardVariants } : {})}
                      />
                    ))}
                  </motion.div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
