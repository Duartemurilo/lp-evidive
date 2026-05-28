type ApiSuccess<T> = { ok: true; data: T };
type ApiFailure = {
  ok: false;
  error: string;
  details?: Record<string, string>;
};

export async function fetchJsonApi<T>(
  url: string,
  init?: RequestInit & { next?: NextFetchRequestConfig },
): Promise<T> {
  const { next, ...requestInit } = init ?? {};
  const response = await fetch(url, {
    ...requestInit,
    method: "GET",
    headers: {
      Accept: "application/json",
      ...requestInit.headers,
    },
    ...(next ? { next } : {}),
  });

  const json = (await response.json()) as ApiSuccess<T> | ApiFailure;

  if (!response.ok || !("ok" in json) || !json.ok) {
    const message =
      "error" in json && typeof json.error === "string"
        ? json.error
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return json.data;
}
