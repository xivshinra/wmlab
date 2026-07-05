"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fakeSeriesData } from "@/data/fakeSeriesData";
import { cn } from "@/lib/utils";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  MoreVertical,
  PlusIcon,
  Star,
  BookOpen,
  Layers,
  FileText,
  History,
  BarChart3,
  Sparkles,
  Link2,
  Flag,
  ArrowRight,
  Telescope,
} from "lucide-react";

// --- Sub-components ---

function SeriesStats({ item }: { item: (typeof fakeSeriesData)[0] }) {
  const stats = [
    {
      icon: BookOpen,
      count: item.modulesCompletedCount,
      total: item.modulesTotalCount,
      label: "Modules",
    },
    {
      icon: Layers,
      count: item.cardsObtainedCount,
      total: item.cardsTotalCount,
      label: "Cartes",
    },
    {
      icon: FileText,
      count: item.ressourcesObtainedCount,
      total: item.ressourcesTotalCount,
      label: "Ressources",
    },
  ];

  return (
    <div className="flex gap-4 items-center">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="flex items-center gap-1.5 opacity-80 group/stat"
        >
          <stat.icon className="size-3 text-primary/70 transition-transform group-hover/stat:scale-110" />
          <span className="text-[10px] font-bold tracking-tight">
            {stat.count}/{stat.total}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SeriesGrid() {
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(
    () =>
      new Set(
        fakeSeriesData.filter((item) => item.isFavorite).map((item) => item.id),
      ),
  );

  const toggleFavorite = (id: number) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const [openContributorTooltipId, setOpenContributorTooltipId] = useState<
    number | null
  >(null);

  return (
    <div className="space-y-12 py-8">
      {/* Filtering Tabs */}
      <div className="flex justify-center">
        <ToggleGroup
          type="single"
          size="sm"
          variant="outline"
          defaultValue="all"
          className="bg-muted/30 p-1.5 rounded-full border shadow-xs overflow-x-auto max-w-full no-scrollbar"
        >
          {["all", "new", "popular", "recommandation"].map((val) => (
            <ToggleGroupItem
              key={val}
              value={val}
              className="rounded-full px-5 transition-all data-[state=on]:bg-background data-[state=on]:text-primary data-[state=on]:shadow-md font-medium capitalize"
            >
              {val === "all"
                ? "Tous"
                : val === "new"
                  ? "Nouveaux"
                  : val === "popular"
                    ? "Populaires"
                    : "Pour vous"}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto px-4">
        {fakeSeriesData.map((item) => {
          const isFavorite = favoriteIds.has(item.id);

          return (
            <Card
              className="group relative pt-0 transition-all duration-700 border-none ring-1 ring-border shadow-sm hover:shadow-2xl hover:ring-primary/40 overflow-hidden bg-card/60 backdrop-blur-md"
              key={item.id}
            >
              {/* Favorite Toggle Button */}
              <Button
                type="button"
                variant="outline"
                size="icon-xs"
                className={cn(
                  "z-20 absolute top-4 right-4 rounded-full transition-all active:scale-90 shadow-lg",
                  isFavorite
                    ? "bg-amber-500 border-amber-600 text-white ring-4 ring-white/10"
                    : "bg-black/20 backdrop-blur-md border border-white/10 text-white/50 hover:bg-black/40 hover:text-white",
                )}
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(item.id);
                }}
              >
                <Star
                  className={cn(
                    "size-3 transition-all",
                    isFavorite ? "fill-current scale-110" : "",
                  )}
                />
              </Button>

              {/* Visual Header & Primary Interaction Area */}
              <Link
                href={"/serie/" + item.slug}
                className="w-full aspect-21/9 sm:aspect-video overflow-hidden block relative"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={450}
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category Overlay */}
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <Badge className="bg-primary text-primary-foreground font-black uppercase tracking-widest text-[9px] shadow-xl border-none">
                    SÉRIE
                  </Badge>
                  {item.tags.slice(0, 1).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-background/80 backdrop-blur-md border-none font-bold capitalize text-[9px]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* In-Media Progress Dashboard */}
                <div className="absolute bottom-0 left-0 w-full p-6 space-y-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-end text-white">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">
                        Progression
                      </span>
                      <p className="text-2xl font-black leading-none">
                        {item.progress}%
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xl p-2 rounded-full border border-white/10 group-hover:bg-primary group-hover:border-primary transition-colors">
                      <ArrowRight className="size-5" />
                    </div>
                  </div>
                  <Progress
                    value={item.progress}
                    className="h-1.5 bg-white/10"
                  />
                </div>
              </Link>

              <CardHeader className="p-8 pb-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-3 flex-1">
                    <Link
                      href={"/serie/" + item.slug}
                      className="group/title block"
                    >
                      <CardTitle className="text-lg md:text-xl lg:text-2xl font-black tracking-tighter leading-[0.9]">
                        {item.title}
                      </CardTitle>
                    </Link>
                    <SeriesStats item={item} />
                  </div>

                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="rounded-full hover:bg-muted active:scale-95 transition-all"
                        >
                          <MoreVertical className="size-6" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="w-64 p-2.5 rounded-2xl shadow-2xl border-primary/5 backdrop-blur-xl bg-background/90"
                      >
                        <DropdownMenuLabel className="px-2.5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
                          <Telescope className="size-3" />
                          Explorer
                        </DropdownMenuLabel>

                        <div className="space-y-0.5 px-1">
                          <DropdownMenuItem
                            asChild
                            className="rounded-xl py-2.5 px-2.5 cursor-pointer transition-all hover:bg-primary/5 active:scale-[0.98]"
                          >
                            <Link
                              href={"/serie/" + item.slug}
                              className="flex justify-between items-center w-full"
                            >
                              <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                  <BookOpen className="size-4 text-primary" />
                                </div>
                                <span className="text-sm font-bold tracking-tight">
                                  Modules
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className="font-mono text-[10px] bg-muted/40 border-none px-2 h-5 min-w-6 flex items-center justify-center rounded-full opacity-80"
                              >
                                {item.modulesCompletedCount}/
                                {item.modulesTotalCount}
                              </Badge>
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            asChild
                            className="rounded-xl py-2.5 px-2.5 cursor-pointer transition-all hover:bg-primary/5 active:scale-[0.98]"
                          >
                            <Link
                              href="/inventory/cards"
                              className="flex justify-between items-center w-full"
                            >
                              <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                  <Layers className="size-4 text-primary" />
                                </div>
                                <span className="text-sm font-bold tracking-tight">
                                  Cartes
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className="font-mono text-[10px] bg-muted/40 border-none px-2 h-5 min-w-6 flex items-center justify-center rounded-full opacity-80"
                              >
                                {item.cardsObtainedCount}/{item.cardsTotalCount}
                              </Badge>
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            asChild
                            className="rounded-xl py-2.5 px-2.5 cursor-pointer transition-all hover:bg-primary/5 active:scale-[0.98]"
                          >
                            <Link
                              href="/inventory"
                              className="flex justify-between items-center w-full"
                            >
                              <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                  <FileText className="size-4 text-primary" />
                                </div>
                                <span className="text-sm font-bold tracking-tight">
                                  Ressources
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className="font-mono text-[10px] bg-muted/40 border-none px-2 h-5 min-w-6 flex items-center justify-center rounded-full opacity-80"
                              >
                                {item.ressourcesObtainedCount}/
                                {item.ressourcesTotalCount}
                              </Badge>
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            asChild
                            className="rounded-xl py-2.5 px-2.5 cursor-pointer transition-all hover:bg-primary/5 active:scale-[0.98]"
                          >
                            <Link
                              href="/demo/timeline"
                              className="flex justify-between items-center w-full"
                            >
                              <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                  <History className="size-4 text-primary" />
                                </div>
                                <span className="text-sm font-bold tracking-tight">
                                  Timeline
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className="font-mono text-[10px] bg-muted/40 border-none px-2 h-5 min-w-6 flex items-center justify-center rounded-full opacity-80"
                              >
                                {item.timelineObtainedCount}/
                                {item.timelineTotalCount}
                              </Badge>
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem className="flex items-center gap-3 rounded-xl py-2.5 px-2.5 cursor-pointer transition-all hover:bg-primary/5 active:scale-[0.98]">
                            <div className="size-8 rounded-lg bg-primary/5 flex items-center justify-center">
                              <BarChart3 className="size-4 text-primary" />
                            </div>
                            <span className="text-sm font-bold tracking-tight">
                              Statistiques
                            </span>
                          </DropdownMenuItem>
                        </div>

                        <DropdownMenuSeparator className="my-2.5 mx-2.5 bg-border/40" />

                        <div className="px-1">
                          <DropdownMenuItem
                            asChild
                            className="rounded-xl py-2.5 px-2.5 cursor-pointer transition-all hover:bg-primary hover:text-primary-foreground group/booster active:scale-[0.98]"
                          >
                            <Link
                              href="/boosters"
                              className="flex items-center gap-3 font-black text-xs uppercase tracking-wider"
                            >
                              <Sparkles className="size-4 transition-transform group-hover/booster:scale-125" />
                              Acheter un Booster
                            </Link>
                          </DropdownMenuItem>
                        </div>

                        <DropdownMenuSeparator className="my-2.5 mx-2.5 bg-border/40" />

                        <div className="px-1 space-y-0.5">
                          <DropdownMenuItem className="text-sm rounded-xl py-2 px-2.5 cursor-pointer flex items-center gap-3 transition-all hover:bg-muted active:scale-[0.98]">
                            <Link2 className="size-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Copier le lien
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            className="rounded-xl py-2 px-2.5 cursor-pointer flex items-center gap-3 font-bold text-sm opacity-60 hover:opacity-100 transition-all active:scale-[0.98]"
                          >
                            <Flag className="size-4" />
                            Signaler
                          </DropdownMenuItem>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-8 pb-8 pt-0 grow">
                <CardDescription className="text-lg text-muted-foreground leading-relaxed line-clamp-3">
                  {item.description}
                </CardDescription>
              </CardContent>

              <CardFooter className="px-8 py-6 flex items-center justify-between border-t bg-muted/20 border-primary/5 transition-colors group-hover:bg-primary/5">
                <Tooltip
                  open={openContributorTooltipId === item.id}
                  onOpenChange={(isOpen) => {
                    if (!isOpen) setOpenContributorTooltipId(null);
                  }}
                >
                  <TooltipTrigger asChild>
                    <div
                      className="block group/authors cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenContributorTooltipId((prev) =>
                          prev === item.id ? null : item.id,
                        );
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setOpenContributorTooltipId((prev) =>
                            prev === item.id ? null : item.id,
                          );
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <AvatarGroup>
                          {item.contributors?.slice(0, 2).map((c) => (
                            <Avatar
                              key={c.name}
                              size="sm"
                              className="ring-4 ring-background shadow-sm transition-transform group-hover/authors:-translate-x-1"
                            >
                              <AvatarImage
                                src={
                                  (c as any).image ?? "/images/placeholder.jpg"
                                }
                                alt={c.name}
                              />
                              <AvatarFallback>{c.initials}</AvatarFallback>
                            </Avatar>
                          ))}

                          {item.contributors &&
                            item.contributors.length > 2 && (
                              <AvatarGroupCount className=" border-none shadow-sm text-[9px] font-black">
                                +{item.contributors.length - 2}
                              </AvatarGroupCount>
                            )}
                        </AvatarGroup>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            Contributeurs
                          </span>
                          <span className="text-[9px] font-mono opacity-50">
                            MàJ {item.lastUpdate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="p-3 md:p-4 rounded-xl max-w-55 shadow-2xl"
                  >
                    <div className="flex flex-col gap-3">
                      <p className="text-xs font-medium mb-2">
                        Découvrez les passionnés derrière ces contenus.
                      </p>

                      <div className="flex flex-col gap-2 mb-4">
                        {item.contributors?.map((c) => (
                          <div
                            key={c.name}
                            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                          >
                            <Avatar
                              size="sm"
                              className="ring-2 ring-gray-400/30 shadow-sm"
                            >
                              <AvatarImage
                                src={
                                  (c as any).image ??
                                  "/assets/images/placeholder.jpg"
                                }
                                alt={c.name}
                              />
                              <AvatarFallback>{c.initials}</AvatarFallback>
                            </Avatar>
                            <Link
                              href={`/contributors/${(c as any).slug}`}
                              className="font-medium hover:underline"
                            >
                              {c.name}
                            </Link>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end">
                        <Button
                          asChild
                          size="sm"
                          variant="default"
                          className="px-2"
                        >
                          <a
                            href={`/serie/${item.slug}/infos`}
                            aria-label="En savoir plus"
                          >
                            En savoir plus
                          </a>
                        </Button>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>

                <div className="flex gap-2">
                  {item.tags.slice(1, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="rounded-full px-3 py-0 h-6 text-[10px] font-bold uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
