"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getSeriesPath } from "@/lib/navigation";
import type { Series } from "@/types/series";

const FALLBACK_IMAGE = "/assets/images/placeholder.jpg";

export function SeriesCardContributors({ series }: { series: Series }) {
  const [open, setOpen] = useState(false);
  const contributors = series.contributors ?? [];

  return (
    <Tooltip
      open={open}
      onOpenChange={setOpen}
    >
      <TooltipTrigger asChild>
        <button
          type="button"
          className="group/authors block cursor-pointer text-left"
          aria-label={`Voir les ${contributors.length} contributeurs`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="flex items-center gap-3">
            <AvatarGroup>
              {contributors.slice(0, 2).map((c) => (
                <Avatar
                  key={c.slug}
                  size="sm"
                  className="shadow-sm ring-4 ring-background transition-transform group-hover/authors:-translate-x-1"
                >
                  <AvatarImage
                    src={c.image ?? FALLBACK_IMAGE}
                    alt={c.name}
                  />
                  <AvatarFallback>{c.initials}</AvatarFallback>
                </Avatar>
              ))}
              {contributors.length > 2 && (
                <AvatarGroupCount className="border-none text-[9px] font-black shadow-sm">
                  +{contributors.length - 2}
                </AvatarGroupCount>
              )}
            </AvatarGroup>
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                Contributeurs
              </span>
              <span className="font-mono text-[9px] opacity-50">
                MàJ {series.lastUpdate}
              </span>
            </div>
          </div>
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-55 rounded-xl p-3 shadow-2xl md:p-4"
      >
        <div className="flex flex-col gap-3">
          <p className="mb-2 text-xs font-medium">
            Découvrez les passionnés derrière ces contenus.
          </p>
          <ul className="mb-4 flex flex-col gap-2">
            {contributors.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/contributors/${c.slug}`}
                  className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  <Avatar
                    size="sm"
                    className="shadow-sm ring-2 ring-border"
                  >
                    <AvatarImage
                      src={c.image ?? FALLBACK_IMAGE}
                      alt={c.name}
                    />
                    <AvatarFallback>{c.initials}</AvatarFallback>
                  </Avatar>
                  <span className="hover:underline">{c.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <Button
              asChild
              size="sm"
              className="px-2"
            >
              <Link href={getSeriesPath(series.slug)}>En savoir plus</Link>
            </Button>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
