import type { Metadata } from "next";

import SeriesGrid from "@/components/series/SeriesGrid";
import { getAllSeries } from "@/lib/series";

export const metadata: Metadata = {
  title: "Séries | World Memories FR",
  description:
    "Parcourez toutes les séries disponibles et suivez votre progression carte après carte.",
};

export default function SeriesPage() {
  const total = getAllSeries().length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-black tracking-tight text-balance md:text-4xl">
          Toutes les séries
        </h1>
        <p className="text-sm text-muted-foreground">
          {total} séries disponibles — trouvez votre prochaine passion.
        </p>
      </header>

      <SeriesGrid />
    </div>
  );
}
