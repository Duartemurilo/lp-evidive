export type DepthSection = {
  id: string;
  label: string;
  depthMeters: number;
  tone: "light" | "dark";
};

/** Hero + Sua jornada + O ecossistema completo = mesma profundidade (superfície) */
export const SURFACE_ZONE_IDS = [
  "superficie",
  "escolha-experiencia",
  "universo",
] as const;

export const SURFACE_DEPTH_METERS = 0;
export const PRIMEIRO_MERGULHO_DEPTH_METERS = 30;

/** Profundidades do indicador lateral (ordem = jornada na página) */
export const depthSections: DepthSection[] = [
  { id: "superficie", label: "Superfície", depthMeters: 0, tone: "light" },
  {
    id: "primeiro-mergulho",
    label: "Primeiro Mergulho",
    depthMeters: PRIMEIRO_MERGULHO_DEPTH_METERS,
    tone: "light",
  },
  { id: "evilago", label: "EviLago", depthMeters: 36, tone: "dark" },
  { id: "destino", label: "Destino", depthMeters: 42, tone: "light" },
  { id: "comunidade", label: "Comunidade", depthMeters: 55, tone: "light" },
  { id: "fundo", label: "Fundo", depthMeters: 80, tone: "dark" },
];

const depthSectionAliases: Record<string, string> = {
  "escolha-experiencia": "superficie",
  universo: "superficie",
};

export function formatDepth(meters: number): string {
  return meters === 0 ? "0m" : `-${meters}m`;
}

export function getDepthSection(id: string): DepthSection | undefined {
  const resolved = depthSectionAliases[id] ?? id;
  return depthSections.find((section) => section.id === resolved);
}

export function isSurfaceZoneId(id: string): boolean {
  return (SURFACE_ZONE_IDS as readonly string[]).includes(id);
}
