"use client";

import { useMemo, useState } from "react";

import {
  getAllSeries,
  getNewSeries,
  getPopularSeries,
  type SeriesFilterValue,
} from "@/lib/series";

import { useFavorites } from "./FavoritesProvider";
import { SeriesCardGrid } from "./SeriesCardGrid";
import { SeriesFilterTabs } from "./SeriesFilterTabs";

export default function SeriesGrid() {
  const [filter, setFilter] = useState<SeriesFilterValue>("all");
  const { isFavorite } = useFavorites();

  const series = useMemo(() => {
    switch (filter) {
      case "new":
        return getNewSeries(getAllSeries().length);
      case "popular":
        return getPopularSeries(getAllSeries().length);
      case "recommandation":
        return getAllSeries().filter((item) => isFavorite(item.id));
      default:
        return getAllSeries();
    }
  }, [filter, isFavorite]);

  return (
    <div className="space-y-10 py-8">
      <SeriesFilterTabs value={filter} onValueChange={setFilter} />
      <SeriesCardGrid series={series} priorityCount={2} />
    </div>
  );
}
