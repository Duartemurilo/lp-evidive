"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type UseGetState<T> = {
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
  isValidating: boolean;
};

export type UseGetOptions = {
  enabled?: boolean;
};

/**
 * Hook genérico para GET — pronto para trocar o fetcher (mock → API) sem mudar a UI.
 */
export function useGet<T>(
  key: string | null,
  fetcher: (signal: AbortSignal) => Promise<T>,
  options?: UseGetOptions,
): UseGetState<T> & { refetch: () => void } {
  const enabled = options?.enabled !== false;
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(key && enabled));
  const [isValidating, setIsValidating] = useState(false);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const run = useCallback(
    (isRefetch: boolean) => {
      if (!key || !enabled) {
        setIsLoading(false);
        return undefined;
      }

      const controller = new AbortController();

      if (isRefetch) {
        setIsValidating(true);
      } else {
        setIsLoading(true);
      }

      fetcherRef
        .current(controller.signal)
        .then((result) => {
          if (controller.signal.aborted) return;
          setData(result);
          setError(null);
        })
        .catch((err: unknown) => {
          if (controller.signal.aborted) return;
          setError(err instanceof Error ? err : new Error(String(err)));
        })
        .finally(() => {
          if (controller.signal.aborted) return;
          setIsLoading(false);
          setIsValidating(false);
        });

      return () => {
        controller.abort();
      };
    },
    [key, enabled],
  );

  useEffect(() => {
    return run(false);
  }, [run]);

  const refetch = useCallback(() => {
    run(true);
  }, [run]);

  return { data, error, isLoading, isValidating, refetch };
}
