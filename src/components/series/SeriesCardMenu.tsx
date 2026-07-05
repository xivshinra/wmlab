"use client";

import Link from "next/link";
import { Flag, Link2, MoreVertical, Sparkles, Telescope } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SERIES_MENU_ENTRIES } from "@/lib/series";
import type { Series } from "@/types/series";

export function SeriesCardMenu({ series }: { series: Series }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Options pour ${series.title}`}
          className="rounded-full transition-all hover:bg-muted active:scale-95"
        >
          <MoreVertical className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-2xl border-primary/5 bg-background/90 p-2.5 shadow-2xl backdrop-blur-xl"
      >
        <DropdownMenuLabel className="flex items-center gap-2 px-2.5 py-2 text-[10px] font-black tracking-[0.2em] text-muted-foreground/60 uppercase">
          <Telescope className="size-3" />
          Explorer
        </DropdownMenuLabel>

        <div className="space-y-0.5 px-1">
          {SERIES_MENU_ENTRIES.map((entry) => {
            const counter = entry.counter?.(series);
            return (
              <DropdownMenuItem
                key={entry.key}
                asChild
                className="cursor-pointer rounded-xl px-2.5 py-2.5 transition-all hover:bg-primary/5 active:scale-[0.98]"
              >
                <Link
                  href={entry.href(series)}
                  className="flex w-full items-center justify-between"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-primary/5">
                      <entry.icon className="size-4 text-primary" />
                    </span>
                    <span className="text-sm font-bold tracking-tight">
                      {entry.label}
                    </span>
                  </span>
                  {counter && (
                    <Badge
                      variant="outline"
                      className="flex h-5 min-w-6 items-center justify-center rounded-full border-none bg-muted/40 px-2 font-mono text-[10px] tabular-nums opacity-80"
                    >
                      {counter.current}/{counter.total}
                    </Badge>
                  )}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </div>

        <DropdownMenuSeparator className="mx-2.5 my-2.5 bg-border/40" />

        <div className="px-1">
          <DropdownMenuItem
            asChild
            className="group/booster cursor-pointer rounded-xl px-2.5 py-2.5 transition-all hover:bg-primary hover:text-primary-foreground active:scale-[0.98]"
          >
            <Link
              href="/shop"
              className="flex items-center gap-3 text-xs font-black tracking-wider uppercase"
            >
              <Sparkles className="size-4 transition-transform group-hover/booster:scale-125" />
              Acheter un booster
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="mx-2.5 my-2.5 bg-border/40" />

        <div className="space-y-0.5 px-1">
          <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 transition-all hover:bg-muted active:scale-[0.98]">
            <Link2 className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium">Copier le lien</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            className="flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-bold opacity-60 transition-all hover:opacity-100 active:scale-[0.98]"
          >
            <Flag className="size-4" />
            Signaler
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
