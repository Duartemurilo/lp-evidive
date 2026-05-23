/**
 * Site Configuration
 *
 * Central configuration file for easy customization.
 * Update these values to personalize your template.
 */

export const siteConfig = {
  name: "Evidive",
  tagline: "Concept Dive Center",
  description:
    "A Evidive é um concept dive center urbano que transforma o mergulho em uma experiência completa, acessível, segura e memorável.",
  url: "https://www.evidive.com.br",
  social: {
    twitter: "@evidive",
    github: "https://www.evidive.com.br",
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

/** Vídeo drone EviLago — pasta: drive.google.com/drive/folders/193tRl0zZ4nBVlhJt9YvcC4L7ToaQfEmP */
export const eviLagoVideoConfig = {
  /** Menor clip da pasta (270 MB) — trocar pelo ID do vídeo final quando definir */
  driveFileId: "1A7JAdAMtVKIxnNFaKeiiMPJIJhFoDZZK",
  driveFolderId: "193tRl0zZ4nBVlhJt9YvcC4L7ToaQfEmP",
  fallbackSrc: "/assets/hero/GH010278.MP4",
} as const;

export function getGoogleDriveVideoStreamUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export function getGoogleDriveVideoEmbedUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export const emotionDiveConfig = {
  bookingUrl: "https://emotiondive.com.br/experiencia-de-mergulho",
  instructorWhatsAppUrl:
    "https://api.whatsapp.com/send/?phone=5500000000000&text=Ol%C3%A1%2C+tenho+d%C3%BAvidas+sobre+o+Emotion+Dive&type=phone_number&app_absent=0",
} as const;

export const finalCtaConfig = {
  headline: "Pronto para dar o primeiro passo?",
  description:
    "Fale com a Evidive e descubra como começar sua jornada no mergulho com segurança e acolhimento.",
  cta: {
    text: "Falar com Evidive",
    href: "https://api.whatsapp.com/send/?phone=5500000000000&text=Ol%C3%A1%2C+quero+falar+com+a+Evidive%21&type=phone_number&app_absent=0",
  },
} as const;

export const footerConfig = {
  description:
    "A Evidive transforma o mergulho em uma experiência completa, acessível, segura e memorável dentro da cidade.",
  cta: {
    text: "Get Started Free",
    href: "#",
  },
  links: {
    product: [
      { label: "Chrome Extension", href: "#" },
      { label: "Safari Extension", href: "#" },
      { label: "API Access", href: "#" },
      { label: "Enterprise", href: "#" },
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  contact: {
    location: "San Francisco",
    address: "548 Market St, Suite 95000\nSan Francisco, CA 94104",
    hours: "Mon-Fri 9:00 am - 6:00 pm (PST)",
    email: "hello@tldr.app",
  },
  copyright: `© ${new Date().getFullYear()} Evidive`,
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
  /** Show splash only once per browser tab session */
  showOncePerSession: false,
  /** Play dive sound (MP3 if present, else Web Audio synthesis) */
  sound: true,
  soundVolume: 0.55,
  /** Optional MP3 in public/sounds/ — falls back to procedural audio if missing */
  soundSrc: "/sounds/mergulho.mp3",
} as const;
