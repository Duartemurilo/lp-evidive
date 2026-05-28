export class HttpError extends Error {
  readonly status: number;
  readonly url: string;

  constructor(message: string, status: number, url: string) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.url = url;
  }
}

export type HttpGetOptions = {
  signal?: AbortSignal;
  /** Opções do `fetch` do Next (cache, revalidate) — use em Server Components. */
  next?: NextFetchRequestConfig;
  headers?: HeadersInit;
};

export async function httpGet<T>(url: string, options?: HttpGetOptions): Promise<T> {
  const init: RequestInit = {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...options?.headers,
    },
  };

  if (options?.signal) {
    init.signal = options.signal;
  }

  if (options?.next) {
    init.next = options.next;
  }

  const response = await fetch(url, init);

  if (!response.ok) {
    throw new HttpError(
      `Request failed with status ${response.status}`,
      response.status,
      url,
    );
  }

  return response.json() as Promise<T>;
}
