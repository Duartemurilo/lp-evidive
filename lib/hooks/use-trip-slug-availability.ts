"use client";

import { checkAdminTripSlugAvailability } from "@/lib/trips/api-client";
import { isValidTripSlug } from "@/lib/trips/trip-validation";
import { useEffect, useRef, useState } from "react";

export type TripSlugAvailabilityStatus =
  | "idle"
  | "checking"
  | "available"
  | "taken"
  | "error";

type UseTripSlugAvailabilityOptions = {
  excludeId?: string | undefined;
  debounceMs?: number;
};

export function useTripSlugAvailability(
  slug: string,
  options?: UseTripSlugAvailabilityOptions,
): {
  status: TripSlugAvailabilityStatus;
  checking: boolean;
  taken: boolean;
} {
  const debounceMs = options?.debounceMs ?? 450;
  const excludeId = options?.excludeId;
  const [status, setStatus] = useState<TripSlugAvailabilityStatus>("idle");
  const requestIdRef = useRef(0);

  useEffect(() => {
    const trimmed = slug.trim();

    if (!trimmed || !isValidTripSlug(trimmed)) {
      setStatus("idle");
      return;
    }

    setStatus("checking");
    const requestId = ++requestIdRef.current;
    const controller = new AbortController();

    const timer = window.setTimeout(() => {
      void checkAdminTripSlugAvailability(trimmed, excludeId, controller.signal)
        .then(({ available }) => {
          if (requestId !== requestIdRef.current) return;
          setStatus(available ? "available" : "taken");
        })
        .catch((error: unknown) => {
          if (requestId !== requestIdRef.current) return;
          if (error instanceof DOMException && error.name === "AbortError") return;
          setStatus("error");
        });
    }, debounceMs);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [slug, excludeId, debounceMs]);

  return {
    status,
    checking: status === "checking",
    taken: status === "taken",
  };
}
