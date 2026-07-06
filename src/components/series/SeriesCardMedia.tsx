import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getSeriesPath } from "@/lib/navigation";
import type { Series } from "@/types/series";

import { SeriesFavoriteButton } from "./SeriesFavoriteButton";

type SeriesCardMediaProps = {
  series: Series;
  priority?: boolean;
};

export function SeriesCardMedia({
  series,
  priority = false,
}: SeriesCardMediaProps) {
  return (
    <div className="relative">
      <SeriesFavoriteButton
        seriesId={series.id}
        title={series.title}
        className="absolute top-4 right-4 z-20"
      />

      <Link
        href={getSeriesPath(series.slug)}
        className="relative block aspect-video w-full overflow-hidden"
      >
        <Image
          src={series.image}
          alt={`Illustration de la série ${series.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Category badges */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <Badge className="border-none bg-primary text-[9px] font-black tracking-widest text-primary-foreground uppercase shadow-xl">
            Série
          </Badge>
          {series.tags.slice(0, 1).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="border-none bg-background/80 text-[9px] font-bold capitalize backdrop-blur-md"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* In-media progress dashboard */}
        <div className="absolute bottom-0 left-0 w-full translate-y-2 space-y-3 p-6 transition-transform duration-500 group-hover:translate-y-0">
          <div className="flex items-end justify-between text-white">
            <div className="space-y-1">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-80">
                Progression
              </span>
              <p className="text-2xl font-black leading-none tabular-nums">
                {series.progress}%
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/10 p-2 backdrop-blur-xl transition-colors group-hover:border-primary group-hover:bg-primary">
              <ArrowRight
                aria-hidden
                className="size-5 text-white"
              />
            </div>
          </div>
          <Progress
            value={series.progress}
            className="h-1.5 bg-white/10"
          />
        </div>
      </Link>
    </div>
  );
}
