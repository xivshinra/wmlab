import { cn } from "@/lib/utils";
import type { Series } from "@/types/series";

import { SeriesCard } from "./SeriesCard";

type SeriesCardGridProps = {
  series: Series[];
  /** Number of cards (from the start) that load their image eagerly. */
  priorityCount?: number;
  className?: string;
};

/** Presentational responsive grid — no state, safe to reuse anywhere. */
export function SeriesCardGrid({
  series,
  priorityCount = 0,
  className,
}: SeriesCardGridProps) {
  if (series.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground">
        Aucune série ne correspond à ce filtre pour le moment.
      </p>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8",
        className,
      )}
    >
      {series.map((item, index) => (
        <SeriesCard
          key={item.id}
          series={item}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
