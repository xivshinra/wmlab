import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Series } from "@/types/series";

import { SeriesCardContributors } from "./SeriesCardContributors";
import { SeriesCardMedia } from "./SeriesCardMedia";
import { SeriesCardMenu } from "./SeriesCardMenu";
import { SeriesCardStats } from "./SeriesCardStats";

type SeriesCardProps = {
  series: Series;
  /** Eagerly load the cover image (use for above-the-fold cards). */
  priority?: boolean;
};

export function SeriesCard({ series, priority = false }: SeriesCardProps) {
  return (
    <Card className="group relative flex flex-col overflow-hidden border-none pt-0 shadow-sm ring-1 ring-border transition-all duration-500 hover:shadow-2xl hover:ring-primary/40">
      <SeriesCardMedia series={series} priority={priority} />

      <CardHeader className="p-6 pb-4 md:p-8 md:pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <Link href={`/serie/${series.slug}`} className="block">
              <CardTitle className="text-lg font-black leading-tight tracking-tighter text-balance md:text-xl lg:text-2xl">
                {series.title}
              </CardTitle>
            </Link>
            <SeriesCardStats series={series} />
          </div>
          <SeriesCardMenu series={series} />
        </div>
      </CardHeader>

      <CardContent className="grow px-6 pt-0 pb-6 md:px-8">
        <CardDescription className="line-clamp-3 leading-relaxed text-pretty">
          {series.description}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-4 border-t border-primary/5 bg-muted/20 px-6 py-6 transition-colors group-hover:bg-primary/5 md:px-8">
        <SeriesCardContributors series={series} />
        <div className="hidden gap-2 sm:flex">
          {series.tags.slice(1, 3).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="h-6 rounded-full px-3 text-[10px] font-bold tracking-wider uppercase opacity-60 transition-opacity hover:opacity-100"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
