import { toCssBackgroundImageUrl } from "@/lib/cursos-capa-images";

const VIAGENS_EVI_BASE = "/freedive/viagens-evi/Viagens";
const VIAGENS_EVI_FERNANDO = `${VIAGENS_EVI_BASE}/Fernando de Noronha`;
const VIAGENS_EVI_ENTERPRISE = `${VIAGENS_EVI_BASE}/Enterprise - RJ`;

export const VIAGENS_HERO_DEFAULT_IMAGE = `${VIAGENS_EVI_BASE}/viagens_viagens_de_grupo.png`;

/** Imagens dos formatos de viagem (seção "Formatos de viagem"). */
export const VIAGENS_FORMATO_IMAGES = {
  viagensDeGrupo: VIAGENS_HERO_DEFAULT_IMAGE,
  expedicoes: `${VIAGENS_EVI_BASE}/viagens_expedicoes.jpeg`,
  liveaboards: `${VIAGENS_EVI_BASE}/viagens_liveaboards.png`,
  fotografiaSubaquatica: `${VIAGENS_EVI_BASE}/viagens_fotografia_subaquatica.jpeg`,
  evolucaoTecnica: `${VIAGENS_EVI_BASE}/viagens_evolucao_tecnica.jpeg`,
  experienciasPremium: `${VIAGENS_EVI_BASE}/viagens_experiencias_premium.png`,
} as const;

/** Imagens da pasta `viagens-evi` para o slideshow da hero da listagem. */
export const VIAGENS_HERO_SLIDESHOW: readonly string[] = [
  VIAGENS_FORMATO_IMAGES.viagensDeGrupo,
  VIAGENS_FORMATO_IMAGES.expedicoes,
  VIAGENS_FORMATO_IMAGES.liveaboards,
  VIAGENS_FORMATO_IMAGES.fotografiaSubaquatica,
  VIAGENS_FORMATO_IMAGES.evolucaoTecnica,
  VIAGENS_FORMATO_IMAGES.experienciasPremium,
  `${VIAGENS_EVI_FERNANDO}/viagens_fernando_mergulhos.jpeg`,
  `${VIAGENS_EVI_FERNANDO}/viagens_fernando_confira.jpg`,
  `${VIAGENS_EVI_FERNANDO}/viagens_fernando_nossa_hospedagem.png`,
  `${VIAGENS_EVI_FERNANDO}/viagens_fernando_por_que.jpeg`,
  `${VIAGENS_EVI_ENTERPRISE}/viagens_enterprise_atlantis.png`,
  `${VIAGENS_EVI_ENTERPRISE}/viagens_enterprise_mergulhos.png`,
  `${VIAGENS_EVI_ENTERPRISE}/viagens_enterprise_mini_cruzeiro.png`,
  `${VIAGENS_EVI_ENTERPRISE}/viagens_enterprise_por_que.png`,
  `${VIAGENS_EVI_ENTERPRISE}/viagens_enterprise_como_chegar.png`,
];

export { toCssBackgroundImageUrl };
