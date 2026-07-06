import {
  BarChart3,
  BookOpen,
  FileText,
  History,
  Layers,
  type LucideIcon,
} from "lucide-react";

import { fakeSeriesData } from "@/data/fakeSeriesData";
import type { Series } from "@/types/series";

/* -------------------------------------------------------------------------- */
/*  Filter tabs                                                               */
/* -------------------------------------------------------------------------- */

export type SeriesFilterValue = "all" | "new" | "popular" | "recommandation";

export const SERIES_FILTERS: { value: SeriesFilterValue; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "new", label: "Nouveaux" },
  { value: "popular", label: "Populaires" },
  { value: "recommandation", label: "Pour vous" },
];

/* -------------------------------------------------------------------------- */
/*  Card "explore" menu — config-driven so it stays easy to extend            */
/* -------------------------------------------------------------------------- */

export type SeriesMenuEntry = {
  key: string;
  label: string;
  icon: LucideIcon;
  /** Build the destination href from the series. */
  href: (series: Series) => string;
  /** Optional badge counter (obtained / total). */
  counter?: (series: Series) => { current: number; total: number };
};

export const SERIES_MENU_ENTRIES: SeriesMenuEntry[] = [
  {
    key: "modules",
    label: "Modules",
    icon: BookOpen,
    href: (s) => `/series/${s.slug}`,
    counter: (s) => ({
      current: s.modulesCompletedCount,
      total: s.modulesTotalCount,
    }),
  },
  {
    key: "cards",
    label: "Cartes",
    icon: Layers,
    href: () => "/inventory/cards",
    counter: (s) => ({
      current: s.cardsObtainedCount,
      total: s.cardsTotalCount,
    }),
  },
  {
    key: "ressources",
    label: "Ressources",
    icon: FileText,
    href: () => "/inventory",
    counter: (s) => ({
      current: s.ressourcesObtainedCount,
      total: s.ressourcesTotalCount,
    }),
  },
  {
    key: "timeline",
    label: "Timeline",
    icon: History,
    href: () => "/demo/timeline",
    counter: (s) => ({
      current: s.timelineObtainedCount,
      total: s.timelineTotalCount,
    }),
  },
  {
    key: "stats",
    label: "Statistiques",
    icon: BarChart3,
    href: (s) => `/series/${s.slug}/stats`,
  },
];

/* -------------------------------------------------------------------------- */
/*  Compact stats shown on the card                                           */
/* -------------------------------------------------------------------------- */

export type SeriesStat = {
  key: string;
  icon: LucideIcon;
  label: string;
  current: number;
  total: number;
};

export function getSeriesStats(series: Series): SeriesStat[] {
  return [
    {
      key: "modules",
      icon: BookOpen,
      label: "Modules",
      current: series.modulesCompletedCount,
      total: series.modulesTotalCount,
    },
    {
      key: "cards",
      icon: Layers,
      label: "Cartes",
      current: series.cardsObtainedCount,
      total: series.cardsTotalCount,
    },
    {
      key: "ressources",
      icon: FileText,
      label: "Ressources",
      current: series.ressourcesObtainedCount,
      total: series.ressourcesTotalCount,
    },
  ];
}

/* -------------------------------------------------------------------------- */
/*  Selectors — a single place to query the (fake) data source               */
/* -------------------------------------------------------------------------- */

export function getAllSeries(): Series[] {
  return fakeSeriesData;
}

/** Most recently updated series first. */
export function getNewSeries(limit = 3): Series[] {
  return [...fakeSeriesData]
    .sort(
      (a, b) =>
        new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime(),
    )
    .slice(0, limit);
}

/** Most started series first (proxy for popularity). */
export function getPopularSeries(limit = 3): Series[] {
  return [...fakeSeriesData]
    .sort((a, b) => b.startedTotalUsersCount - a.startedTotalUsersCount)
    .slice(0, limit);
}

export function getSeriesBySlug(slug: string): Series | undefined {
  return getAllSeries().find((series) => series.slug === slug);
}

/** Unique contributors across every series (for partners / social proof). */
export function getUniqueContributors() {
  const map = new Map<string, Series["contributors"][number]>();
  for (const series of fakeSeriesData) {
    for (const contributor of series.contributors) {
      if (!map.has(contributor.slug)) map.set(contributor.slug, contributor);
    }
  }
  return [...map.values()];
}
