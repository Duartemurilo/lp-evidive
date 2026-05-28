"use client";

import { useCallback } from "react";
import { useGet } from "@/lib/hooks/use-get";
import { getViagensCatalog } from "@/lib/services/viagens-service";
import type { ViagensCatalogResponse } from "@/lib/types/viagens";

const VIAGENS_QUERY_KEY = "viagens-catalog";

export function useViagens() {
  const fetcher = useCallback(
    (signal: AbortSignal) => getViagensCatalog({ signal }),
    [],
  );

  return useGet<ViagensCatalogResponse>(VIAGENS_QUERY_KEY, fetcher);
}
