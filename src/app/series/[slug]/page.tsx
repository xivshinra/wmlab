import type { Metadata } from "next";

import { SeriesDetailCarousel } from "@/components/series/SeriesDetailCarousel";
import { getAllSeries, getSeriesBySlug } from "@/lib/series";

type SeriesPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSeries().map((series) => ({ slug: series.slug }));
}

export async function generateMetadata({
  params,
}: SeriesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  return {
    title: series ? `${series.title} | World Memories FR` : "Série introuvable",
    description: series?.description ?? "Détails de la série sélectionnée.",
  };
}

export default async function SeriesDetailPage({ params }: SeriesPageProps) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  if (!series) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
          Série non trouvée
        </h1>
        <p className="mt-4 text-muted-foreground">
          Nous n’avons pas pu trouver la série demandée. Vérifiez l’URL et
          réessayez.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-background px-0 py-0">
      <SeriesDetailCarousel series={series} />
    </div>
  );
}
