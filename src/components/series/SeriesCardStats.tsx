import { getSeriesStats } from "@/lib/series";
import type { Series } from "@/types/series";

export function SeriesCardStats({ series }: { series: Series }) {
  const stats = getSeriesStats(series);

  return (
    <ul className="flex items-center gap-4">
      {stats.map((stat) => (
        <li
          key={stat.key}
          className="group/stat flex items-center gap-1.5 opacity-80"
        >
          <stat.icon
            aria-hidden
            className="size-3 text-primary/70 transition-transform group-hover/stat:scale-110"
          />
          <span className="text-[10px] font-bold tracking-tight tabular-nums">
            {stat.current}/{stat.total}
          </span>
          <span className="sr-only">{stat.label}</span>
        </li>
      ))}
    </ul>
  );
}
