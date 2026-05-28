import { whatsappFloatConfig } from "@/lib/config";

export const evidiveSocialConfig = {
  facebook: "https://www.facebook.com/evidive",
  instagram: "https://www.instagram.com/evidivecenter/",
  youtube: "https://www.youtube.com/@EvidiveEscoladeMergulho",
  tiktok: "https://www.tiktok.com/@evidivecenter",
  linkedin: "https://br.linkedin.com/company/evidive-escola-de-mergulho",
} as const;

export type EvidiveSocialLinkId =
  | "linkedin"
  | "whatsapp"
  | "facebook"
  | "instagram"
  | "youtube"
  | "tiktok";

export type EvidiveSocialLink = {
  id: EvidiveSocialLinkId;
  label: string;
  href: string;
};

export const evidiveSocialLinks: readonly EvidiveSocialLink[] = [
  { id: "linkedin", label: "LinkedIn", href: evidiveSocialConfig.linkedin },
  { id: "whatsapp", label: "WhatsApp", href: whatsappFloatConfig.href },
  { id: "facebook", label: "Facebook", href: evidiveSocialConfig.facebook },
  { id: "instagram", label: "Instagram", href: evidiveSocialConfig.instagram },
  { id: "youtube", label: "YouTube", href: evidiveSocialConfig.youtube },
  { id: "tiktok", label: "TikTok", href: evidiveSocialConfig.tiktok },
] as const;
