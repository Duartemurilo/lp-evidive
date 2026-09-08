/**
 * Negociação de `Accept` entre `text/html` e `text/markdown`, seguindo o
 * protocolo do acceptmarkdown.com (q-value e especificidade por RFC 9110).
 *
 * Fica em `lib/`, fora do `proxy.ts`, porque o runtime do proxy roda em Edge
 * e o `vitest.config.ts` só coleta teste debaixo de `lib/**\/__tests__/` — a
 * lógica real precisa estar aqui para ser testável.
 */

const PRODUCES = ["text/html", "text/markdown"] as const;

export type NegotiatedType = (typeof PRODUCES)[number];

type AcceptEntry = { type: string; q: number; specificity: number };

function parseAccept(header: string): AcceptEntry[] {
  return header.split(",").map((raw) => {
    const parts = raw
      .trim()
      .split(";")
      .map((part) => part.trim());
    const type = (parts[0] ?? "").toLowerCase();
    let q = 1;
    for (const param of parts.slice(1)) {
      const [name, value] = param.split("=").map((part) => part.trim());
      if (name === "q") {
        const parsed = Number(value);
        if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
      }
    }
    const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;
    return { type, q, specificity };
  });
}

function matches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*")) return candidate.startsWith(entry.type.slice(0, -1));
  return entry.type === candidate;
}

/**
 * Escolhe entre `text/html` e `text/markdown` a partir do header `Accept`.
 *
 * `null` = o header existe mas não aceita nenhum dos dois formatos (o
 * chamador deve responder 406). Sem header, o default é `text/html`: quem
 * nunca manda `Accept` (a maioria do tráfego real) não muda de comportamento.
 */
export function preferredResponseType(header: string | null): NegotiatedType | null {
  if (!header) return PRODUCES[0];
  const entries = parseAccept(header);
  if (entries.length === 0) return PRODUCES[0];

  let bestType: NegotiatedType | null = null;
  let bestQ = -1;
  let bestPosition = Infinity;

  for (const candidate of PRODUCES) {
    let matched: AcceptEntry | null = null;
    let matchedPosition = Infinity;
    for (let idx = 0; idx < entries.length; idx++) {
      const entry = entries[idx];
      if (!entry || !matches(entry, candidate)) continue;
      if (
        matched === null ||
        entry.specificity > matched.specificity ||
        (entry.specificity === matched.specificity && idx < matchedPosition)
      ) {
        matched = entry;
        matchedPosition = idx;
      }
    }
    if (matched === null || matched.q <= 0) continue;

    if (matched.q > bestQ || (matched.q === bestQ && matchedPosition < bestPosition)) {
      bestQ = matched.q;
      bestPosition = matchedPosition;
      bestType = candidate;
    }
  }

  return bestType;
}

/**
 * Acrescenta `Accept` ao header `Vary` sem duplicar (case-insensitive) e sem
 * descartar o que já estava lá (ex.: `Accept-Encoding` do Next).
 */
export function appendVaryAccept(headers: Headers): void {
  const existing = headers.get("Vary");
  if (!existing) {
    headers.set("Vary", "Accept");
    return;
  }
  const tokens = existing.split(",").map((token) => token.trim().toLowerCase());
  if (!tokens.includes("accept")) {
    headers.set("Vary", `${existing}, Accept`);
  }
}
