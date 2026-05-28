import { ViagemDetailShell } from "@/components/viagens/detail/viagem-detail-shell";
import { createMetadata } from "@/lib/metadata";
import {
  getPublishedTripBySlug,
  listPublishedTrips,
  toPublicTrip,
} from "@/lib/trips/trip-service";
import { tripRecordToViagem } from "@/lib/trips/trip-to-viagem";
import { resolveViagemHeroImageUrl, viagensConfig } from "@/lib/viagens-config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

type ViagemDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const trips = await listPublishedTrips();
  return trips.map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({
  params,
}: ViagemDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const record = await getPublishedTripBySlug(slug);
    const trip = toPublicTrip(record);
    const heroImage = resolveViagemHeroImageUrl(trip.heroImageUrl);

    return createMetadata({
      title: trip.title,
      description: trip.shortDescription,
      path: `/viagens/${slug}`,
      ...(heroImage ? { image: heroImage } : { image: viagensConfig.hero.backgroundImage }),
    });
  } catch {
    return createMetadata({ title: "Viagem", path: `/viagens/${slug}`, noIndex: true });
  }
}

export default async function ViagemDetailPage({
  params,
}: ViagemDetailPageProps): Promise<ReactNode> {
  const { slug } = await params;

  let trip;
  try {
    const record = await getPublishedTripBySlug(slug);
    trip = toPublicTrip(record);
  } catch {
    notFound();
  }

  const published = await listPublishedTrips();
  const relatedTrips = published
    .filter((record) => record.slug !== slug)
    .slice(0, 3)
    .map((record) => tripRecordToViagem(record, { dateSlotIds: [record.slug] }));

  return (
    <main id="main-content" className="flex-1">
      <ViagemDetailShell trip={trip} relatedTrips={relatedTrips} />
    </main>
  );
}
