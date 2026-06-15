/** Capas de curso em `public/cursos-evi` (arquivos com `_capa`). */
export const CURSO_CAPA_BY_SLUG = {
  "emotion-dive": "/cursos-evi/Cursos/Emotion Dive/curso_emotion_dive_capa.png",
  "curso-basico-de-mergulho-com-cilindro":
    "/cursos-evi/Cursos/Curso Básico de Mergulho/curso_basico_capa.jpeg",
  "padi-scuba-diver": "/cursos-evi/Cursos/Scuba Diver/curso_scuba_capa.jpeg",
  "primeiros-socorros":
    "/cursos-evi/Cursos/Primeiros Socorros/curso_primeiros_socorros_capa.jpeg",
  resgate: "/cursos-evi/Cursos/Resgate/curso_resgate_capa.jpg",
  flutuabilidade: "/cursos-evi/Cursos/Flutuabilidade/curso_flutuabilidade_capa.jpg",
  nitrox: "/cursos-evi/Cursos/NITROX/curso_nitrox_capa.jpeg",
  "camera-de-acao": "/cursos-evi/Cursos/Câmera de Ação/curso_camera_capa.jpeg",
  "padi-divemaster":
    "/cursos-evi/Cursos/PADI Divemaster/curso_padi_divemaster_capa.jpeg",
  "mergulho-livre-basico": "/freedive/curso_freedive_capa.jpeg",
} as const satisfies Record<string, string>;

export type CursoCapaSlug = keyof typeof CURSO_CAPA_BY_SLUG;

/** Ordem do catálogo — usada no slideshow da hero da listagem (`cursos-evi` apenas). */
export const CURSO_CAPA_HERO_SLIDESHOW: readonly string[] = [
  CURSO_CAPA_BY_SLUG["emotion-dive"],
  CURSO_CAPA_BY_SLUG["curso-basico-de-mergulho-com-cilindro"],
  CURSO_CAPA_BY_SLUG["padi-scuba-diver"],
  CURSO_CAPA_BY_SLUG["primeiros-socorros"],
  CURSO_CAPA_BY_SLUG.resgate,
  CURSO_CAPA_BY_SLUG.flutuabilidade,
  CURSO_CAPA_BY_SLUG.nitrox,
  CURSO_CAPA_BY_SLUG["camera-de-acao"],
  CURSO_CAPA_BY_SLUG["padi-divemaster"],
];

export function getCursoCapaImage(slug: string): string | undefined {
  return CURSO_CAPA_BY_SLUG[slug as CursoCapaSlug];
}

export function getCursoCapaImageOrFallback(
  slug: string,
  fallback: string,
): string {
  return getCursoCapaImage(slug) ?? fallback;
}

/** Caminhos com espaços precisam de aspas no `url()` do CSS. */
export function toCssBackgroundImageUrl(path: string): string {
  return `url("${path.replace(/"/g, '\\"')}")`;
}
