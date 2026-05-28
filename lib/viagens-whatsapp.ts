import { siteConfig } from "@/lib/metadata";
import { formatTripFormDatePreview } from "@/lib/trips/format";
import type { Viagem } from "@/lib/types/viagens";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export type ViagemWhatsAppTrip = {
  title: string;
  slug: string;
  scopeLabel?: string;
  startDate?: string | null;
  endDate?: string | null;
};

export function buildViagemWhatsAppMessage(trip: ViagemWhatsAppTrip): string {
  const dateLine = formatTripFormDatePreview({
    startDate: trip.startDate ?? null,
    endDate: trip.endDate ?? null,
  });
  const pageUrl = `${siteConfig.url}/viagens/${trip.slug}`;

  const lines = [
    `Olá! Vi o destino ${trip.title} no site da Evidive e gostaria de saber mais sobre a viagem de mergulho.`,
    "",
    `Destino: ${trip.title}`,
    `Página: ${pageUrl}`,
  ];

  if (trip.scopeLabel?.trim()) {
    lines.push(`Tipo: ${trip.scopeLabel.trim()}`);
  }

  if (dateLine) {
    lines.push(`Datas: ${dateLine}`);
  }

  lines.push(
    "",
    "Podem me enviar valores, o que está incluso e as próximas datas disponíveis?",
  );

  return lines.join("\n");
}

export function buildViagemWhatsAppUrl(trip: ViagemWhatsAppTrip): string {
  return buildWhatsAppUrl(buildViagemWhatsAppMessage(trip));
}

/** Mensagem WhatsApp para viagens do catálogo legado (`Viagem`). */
export function buildViagemCatalogWhatsAppMessage(trip: Viagem): string {
  return buildViagemWhatsAppMessage({
    title: trip.title,
    slug: trip.slug,
    scopeLabel: trip.scopeLabel,
    startDate: trip.startDate,
    endDate: null,
  });
}

export function buildViagemCatalogWhatsAppUrl(trip: Viagem): string {
  return buildWhatsAppUrl(buildViagemCatalogWhatsAppMessage(trip));
}
