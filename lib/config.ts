/**
 * Site Configuration
 *
 * Central configuration file for easy customization.
 * Update these values to personalize your template.
 */

import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const siteConfig = {
  name: "Evidive",
  tagline: "Concept Dive Center",
  description:
    "A Evidive é um concept dive center urbano que transforma o mergulho em uma experiência completa, acessível, segura e memorável.",
  url: "https://www.evidive.com.br",
  social: {
    facebook: "https://www.facebook.com/evidive",
    instagram: "https://www.instagram.com/evidivecenter/",
    youtube: "https://www.youtube.com/@EvidiveEscoladeMergulho",
    tiktok: "https://www.tiktok.com/@evidivecenter",
    linkedin:
      "https://br.linkedin.com/company/evidive-escola-de-mergulho",
  },
  nav: {
    cta: {
      text: "Explorar",
      href: "#",
    },
    signIn: {
      text: "Contato",
      href: "#",
    },
  },
} as const;

export const heroConfig = {
  headline: {
    prefix: "Get the",
    accent: "Evidive",
    suffix: "on anything",
  },
  description: "Summarize articles, videos, podcasts, and PDFs instantly. Read smarter, not longer.",
  cta: {
    primary: {
      text: "Add to Chrome — It's Free",
      href: "#",
    },
    secondary: {
      text: "See How It Works",
      href: "#how-it-works",
    },
  },
  carousel: [
    "Tech News",
    "Research Papers",
    "YouTube Videos",
    "Podcasts",
    "Blog Posts",
    "Documentation",
    "Email Threads",
    "Meeting Notes",
    "Legal Documents",
    "Financial Reports",
    "Product Reviews",
    "Academic Articles",
  ],
} as const;

export const howItWorksConfig = {
  title: "Three steps to clarity",
  description: "Get key insights from any content in seconds. No more endless scrolling.",
  cta: {
    text: "Start Summarizing",
    href: "#",
  },
} as const;

export const featuresConfig = {
  title: "Everything you need",
  description: "Powerful features to help you consume content faster and smarter.",
} as const;

export const statsConfig = {
  title: "Trusted by thousands",
  description: "Join the growing community of smarter readers.",
} as const;

export const testimonialsConfig = {
  title: "What People Are Saying",
} as const;

export const pricingConfig = {
  title: "Pricing",
  description: "Start for free and upgrade to unlock more features.",
  cta: {
    primary: {
      text: "Go Pro",
      href: "#",
    },
    secondary: {
      text: "Start For Free",
      href: "#",
    },
  },
} as const;

export const faqConfig = {
  title: "Common Questions",
  contact: {
    text: "Still have questions? We're here to help.",
    cta: {
      text: "Get in Touch",
      href: "mailto:hello@tldr.app",
    },
  },
} as const;

export const eviLagoVideoConfig = {
  /** Menor clip da pasta — trocar pelo ID do vídeo final quando definir */
  driveFileId: "1A7JAdAMtVKIxnNFaKeiiMPJIJhFoDZZK",
  /** Arquivo local (sempre disponível no deploy) */
  fallbackSrc: "/assets/hero/GH010278.MP4",
  /**
   * URL remota opcional (Vercel Blob, CDN, etc.).
   * Se ausente ou inacessível, usa fallbackSrc e depois Google Drive.
   */
  remoteSrc: process.env.NEXT_PUBLIC_EVI_LAGO_VIDEO_URL,
} as const;

export function getGoogleDriveVideoStreamUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export function getGoogleDriveVideoEmbedUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export const emotionDiveConfig = {
  bookingUrl: "https://emotiondive.com.br/experiencia-de-mergulho",
  instructorWhatsAppUrl: buildWhatsAppUrl(
    "Olá, tenho dúvidas sobre o Emotion Dive",
  ),
  storeWhatsAppUrl: buildWhatsAppUrl("Olá, quero saber mais sobre a loja!"),
} as const;

export const openWaterCourseConfig = {
  infoWhatsAppUrl: buildWhatsAppUrl(
    "Olá! Quero saber mais sobre o Curso Básico de Mergulho com Cilindro (Open Water) na Evidive — preços, datas e matrícula.",
  ),
  enrollWhatsAppUrl: buildWhatsAppUrl(
    "Olá! Não quero esperar mais — quero mergulhar! Vim pela página do Curso Básico Open Water da Evidive.",
  ),
} as const;

export const scubaDiverCourseConfig = {
  infoWhatsAppUrl: buildWhatsAppUrl(
    "Olá! Quero saber mais sobre o curso PADI Scuba Diver na Evidive — preços, datas e matrícula.",
  ),
  contactWhatsAppUrl: buildWhatsAppUrl(
    "Olá! Quero falar com o time da Evidive sobre preços e datas do curso PADI Scuba Diver.",
  ),
} as const;

export const emergencyFirstResponseCourseConfig = {
  infoWhatsAppUrl: buildWhatsAppUrl(
    "Olá! Quero saber mais sobre o curso PADI Emergency First Response (Primeiros Socorros) na Evidive — preços, datas e matrícula.",
  ),
} as const;

export const rescueDiverCourseConfig = {
  infoWhatsAppUrl: buildWhatsAppUrl(
    "Olá! Quero saber mais sobre o curso PADI Rescue Diver (Resgate) na Evidive — preços, datas e matrícula.",
  ),
  contactWhatsAppUrl: buildWhatsAppUrl(
    "Olá! Quero falar com o time da Evidive sobre preços e datas do curso PADI Rescue Diver.",
  ),
} as const;

export const peakPerformanceBuoyancyCourseConfig = {
  infoWhatsAppUrl: buildWhatsAppUrl(
    "Olá! Quero saber mais sobre o curso PADI Peak Performance Buoyancy (Flutuabilidade) na Evidive — preços, datas e matrícula.",
  ),
  contactWhatsAppUrl: buildWhatsAppUrl(
    "Olá! Quero falar com o time da Evidive sobre preços e datas do curso PADI PPB (Flutuabilidade).",
  ),
} as const;

export const nitroxCourseConfig = {
  infoWhatsAppUrl: buildWhatsAppUrl(
    "Olá! Quero saber mais sobre o curso PADI Enriched Air Diver (NITROX) na Evidive — preços, datas e matrícula.",
  ),
  contactWhatsAppUrl: buildWhatsAppUrl(
    "Olá! Quero falar com o time da Evidive sobre preços e datas do curso NITROX na Evidive.",
  ),
} as const;

export const actionCameraCourseConfig = {
  infoWhatsAppUrl: buildWhatsAppUrl(
    "Olá! Quero saber mais sobre o curso Eviaction Câmera de Ação (GoPro) na Evidive — preços, datas e matrícula.",
  ),
  contactWhatsAppUrl: buildWhatsAppUrl(
    "Olá! Quero falar com o time da Evidive sobre preços e datas do curso Câmera de Ação / GoPro.",
  ),
} as const;

export const divemasterCourseConfig = {
  infoWhatsAppUrl: buildWhatsAppUrl(
    "Olá! Quero saber mais sobre o curso PADI Divemaster na Evidive — preços, datas e matrícula.",
  ),
  contactWhatsAppUrl: buildWhatsAppUrl(
    "Olá! Quero falar com o time da Evidive sobre preços e datas do programa Divemaster na Evidive.",
  ),
} as const;

export const basicFreediverCourseConfig = {
  infoWhatsAppUrl: buildWhatsAppUrl(
    "Olá! Quero saber mais sobre o curso PADI Basic Freediver (Mergulho Livre Básico) na Evidive — preços, datas e matrícula.",
  ),
  contactWhatsAppUrl: buildWhatsAppUrl(
    "Olá! Quero falar com o time da Evidive sobre preços e datas do curso Basic Freediver na Evidive.",
  ),
} as const;

export const finalCtaConfig = {
  headline: "Pronto para dar o primeiro passo?",
  description:
    "Fale com a Evidive e descubra como começar sua jornada no mergulho com segurança e acolhimento.",
  cta: {
    text: "Falar com Evidive",
    href: buildWhatsAppUrl("Olá, quero falar com a Evidive!"),
  },
} as const;

export const whatsappFloatConfig = {
  href: buildWhatsAppUrl("Olá, quero saber mais sobre os mergulhos!"),
  label: "Falar no WhatsApp sobre mergulhos",
} as const;

export const footerConfig = {
  cta: {
    text: "Quero mergulhar com a Evidive",
    href: finalCtaConfig.cta.href,
  },
  contactLink: finalCtaConfig.cta,
  copyright: `© ${new Date().getFullYear()} Evidive. Todos os direitos reservados.`,
} as const;

/**
 * Feature Flags
 *
 * Toggle features on/off for easy customization.
 */
export const features = {
  smoothScroll: true,
  darkMode: false,
  ditherCursor: true,
  statsSection: false,
  splash: true,
} as const;

/**
 * Splash screen (canvas diver animation + optional dive sound).
 */
export const splashConfig = {
  /**
   * Após a primeira splash na aba, não repetir em navegação interna.
   * Reload (F5) sempre exibe de novo.
   */
  showOncePerSession: true,
  /** Play dive sound (MP3 if present, else Web Audio synthesis) */
  sound: true,
  soundVolume: 0.55,
  /** Optional MP3 in public/sounds/ — falls back to procedural audio if missing */
  soundSrc: "/sounds/mergulho.mp3",
} as const;
