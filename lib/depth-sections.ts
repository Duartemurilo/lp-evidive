export type DepthSection = {
  id: string;
  label: string;
  depthMeters: number;
  tone: "light" | "dark";
  /** Exibe marcação clicável na régua lateral (default: true) */
  showBreakpoint?: boolean;
};

/** Profundidades do indicador lateral (ordem = jornada na página) */
export const depthSections: DepthSection[] = [
  { id: "superficie", label: "Superfície", depthMeters: 0, tone: "dark" },
  {
    id: "escolha-experiencia",
    label: "Sua jornada",
    depthMeters: 10,
    tone: "dark",
  },
  {
    id: "universo",
    label: "O ecossistema completo",
    depthMeters: 20,
    tone: "dark",
  },
  {
    id: "primeiro-mergulho",
    label: "Primeiro Mergulho",
    depthMeters: 30,
    tone: "light",
  },
  {
    id: "evilago",
    label: "O nosso EviLago",
    depthMeters: 40,
    tone: "dark",
  },
  {
    id: "explore-mergulhadores",
    label: "Mergulhadores",
    depthMeters: 50,
    tone: "light",
  },
  {
    id: "formacao",
    label: "Gateway Experience",
    depthMeters: 55,
    tone: "light",
    showBreakpoint: false,
  },
  {
    id: "aperfeicoe-sua-tecnica",
    label: "Especializações",
    depthMeters: 60,
    tone: "light",
    showBreakpoint: false,
  },
  {
    id: "profundidade-transicao",
    label: "Profundidade",
    depthMeters: 60,
    tone: "light",
    showBreakpoint: false,
  },
  {
    id: "destino",
    label: "O ecossistema",
    depthMeters: 70,
    tone: "dark",
  },
  {
    id: "comunidade",
    label: "Comunidade",
    depthMeters: 75,
    tone: "light",
  },
  { id: "fundo", label: "Fundo", depthMeters: 80, tone: "dark" },
];

export function formatDepth(meters: number): string {
  return meters === 0 ? "0m" : `-${meters}m`;
}

export function getDepthSection(id: string): DepthSection | undefined {
  return depthSections.find((section) => section.id === id);
}

export function getMaxDepthMeters(): number {
  return depthSections[depthSections.length - 1]?.depthMeters ?? 0;
}
