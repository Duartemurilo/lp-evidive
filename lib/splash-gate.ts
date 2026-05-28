const STORAGE_KEY = "diver-splash-seen";

/** Evita reexibir a splash em remounts do React (navegação client-side no App Router). */
let splashHandledThisDocument = false;

function getNavigationType(): PerformanceNavigationTiming["type"] | undefined {
  if (typeof window === "undefined") return undefined;
  const entry = performance.getEntriesByType("navigation")[0];
  if (!entry || !("type" in entry)) return undefined;
  return (entry as PerformanceNavigationTiming).type;
}

/**
 * Avalia se a splash deve rodar neste carregamento (sem efeitos colaterais).
 * Usado pelo timing da hero antes de `resolveSplashVisibility` marcar o documento.
 */
export function shouldPlaySplashOnThisLoad(options: {
  showOncePerSession: boolean;
}): boolean {
  const isReload = getNavigationType() === "reload";

  if (options.showOncePerSession && !isReload) {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        return false;
      }
    } catch {
      /* ignore */
    }
  }

  return true;
}

/**
 * Define se a splash deve rodar neste carregamento do documento.
 * - Sim: primeira entrada na aba ou reload (F5 / barra de endereço).
 * - Não: troca de rota interna (/, /niveis-avancados, etc.) sem recarregar a página.
 */
export function resolveSplashVisibility(options: {
  showOncePerSession: boolean;
}): boolean {
  if (splashHandledThisDocument) return false;

  const show = shouldPlaySplashOnThisLoad(options);

  if (!show) {
    splashHandledThisDocument = true;
    return false;
  }

  splashHandledThisDocument = true;
  return true;
}

export function persistSplashSeenInSession(): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}
