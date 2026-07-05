import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SeriesCardGrid } from "@/components/series/SeriesCardGrid";
import { Button } from "@/components/ui/button";
import { getNewSeries } from "@/lib/series";

export function NewSeriesSection() {
  const series = getNewSeries(4);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-bold tracking-wide text-primary uppercase">
            Fraîchement ajoutées
          </p>
          <h2 className="font-heading text-3xl font-black tracking-tight text-balance md:text-4xl">
            Les nouvelles séries
          </h2>
        </div>
        <Button asChild variant="ghost" className="rounded-full font-semibold">
          <Link href="/series">
            Voir tout
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <SeriesCardGrid series={series} priorityCount={2} />
    </section>
  );
}
