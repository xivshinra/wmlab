"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { timelineDatas } from "@/data/fakeTimelineData";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardAction,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Check,
  Lock,
  MoreVertical,
  Sparkles,
  BookOpen,
  Layers,
  FileText,
  ArrowRight,
} from "lucide-react";

// --- Types & Constants ---
type TimelineStatus = "locked" | "unlocked" | "completed";
type TimelineItem = (typeof timelineDatas)[number];
type TimelineCategoryFilter = "all" | TimelineItem["category"];
type TimelineStatusFilter = "all" | "locked" | "available";

const STATUS_CONFIGS = {
  locked: {
    icon: Lock,
    text: "Verrouillé",
    badgeClass: "text-muted-foreground/50 border-muted-foreground/10",
    dotClass: "bg-muted-foreground/20 ring-background/50 scale-75 opacity-50",
    cardClass:
      "grayscale-0 bg-destructive/10 text-destructive-foreground border-dashed border-2 border-destructive/30 shadow-none scale-[0.98] pb-0",
  },
  completed: {
    icon: Check,
    text: "Terminé",
    badgeClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    dotClass:
      "bg-emerald-500 shadow-[0_0_30px_rgba(var(--emerald-500),0.8)] ring-emerald-500/20 animate-pulse scale-110",
    cardClass:
      "ring-2 ring-emerald-500/20 ring-offset-4 ring-offset-background shadow-xl shadow-emerald-500/5 bg-card/95",
  },
  unlocked: {
    icon: Check,
    text: "Disponible",
    badgeClass: "bg-primary/10 text-primary border-primary/20",
    dotClass:
      "bg-primary shadow-[0_0_15px_rgba(var(--primary),0.6)] ring-background hover:scale-150 transition-all duration-700",
    cardClass:
      "ring-1 ring-border shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:ring-primary/40 transition-all duration-700 bg-card/80 backdrop-blur-xl",
  },
};

// --- Sub-components ---

function StatusBadge({ status }: { status: TimelineStatus }) {
  const config = STATUS_CONFIGS[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-700",
        config.badgeClass,
      )}
    >
      <Icon className="size-3" />
      <span>{config.text}</span>
    </div>
  );
}

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const config = STATUS_CONFIGS[item.status];
  const isLocked = item.status === "locked";
  const isCompleted = item.status === "completed";
  const resourceLink = "#";

  return (
    <Card
      className={cn(
        "group relative transition-all duration-700 border-none pt-0 flex flex-col overflow-hidden",
        config.cardClass,
      )}
    >
      {/* Media Section */}
      <div
        className={cn(
          "relative aspect-video overflow-hidden",
          isLocked ? "rounded-2xl" : "rounded-t-2xl",
        )}
      >
        {!isLocked ? (
          <Link
            href={resourceLink}
            className="block w-full h-full cursor-pointer relative overflow-hidden"
          >
            <Image
              src={item.image}
              alt=""
              width={800}
              height={450}
              sizes="(max-width: 768px) 100vw, 70vw"
              className="object-cover w-full h-full transition-transform duration-2500 ease-out group-hover:scale-115"
              priority={index < 2}
            />
            {/* Standard Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-1000" />

            {/* LARGE DATE OVERLAY - Reduced size to handle 4 digits without overflow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-1000 group-hover:opacity-0 group-hover:scale-110">
              <div className="relative flex flex-col items-center">
                <span className="text-[7rem] md:text-[10rem] font-black tracking-tighter text-white/90 drop-shadow-[0_15px_50px_rgba(0,0,0,0.6)] select-none leading-none">
                  {item.date}
                </span>
                <div className="h-1.5 w-16 bg-primary rounded-full shadow-[0_0_25px_rgba(var(--primary),1)] mt-2" />
              </div>
            </div>
          </Link>
        ) : (
          <div className="relative w-full h-full grayscale-0">
            <Image
              src={item.image}
              alt=""
              width={800}
              height={450}
              sizes="(max-width: 768px) 100vw, 70vw"
              className="object-cover w-full h-full"
              priority={index < 2}
            />
            <div className="absolute inset-0 bg-destructive/20 backdrop-blur-[1px]" />
            {/* Date display hidden for locked cards */}
          </div>
        )}

        {/* Floating Category Badge */}
        <div className="absolute top-6 left-6 z-10">
          <Badge className="bg-primary/90 text-primary-foreground font-black uppercase tracking-[0.3em] text-[8px] py-1.5 px-4 shadow-2xl border-none backdrop-blur-md">
            {item.category}
          </Badge>
        </div>

        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 group/lock transition-all duration-700">
              <div className="p-6 rounded-full bg-destructive/80 text-destructive-foreground ring-1 ring-destructive/20 backdrop-blur-xl group-hover/lock:scale-105 transition-all duration-700 shadow">
                <Lock className="size-10 text-destructive-foreground transition-colors" />
              </div>
              <span className="text-destructive-foreground bg-destructive/80 p-2 font-black uppercase tracking-[0.3em] text-[10px]">
                Vérrouillé (250 pièces)
              </span>
              <span className="text-destructive font-black">Ou 1375 XP</span>
            </div>
          </div>
        )}
      </div>

      {!isLocked && (
        <CardHeader className="p-8 md:p-10">
          <div className="flex justify-between items-start gap-6">
            <div className="space-y-4 flex-1">
              <Link
                href={resourceLink}
                className="block group/title"
              >
                <CardTitle className="text-2xl md:text-3xl font-black tracking-tighter leading-[0.9] group-hover/title:text-primary transition-colors duration-700">
                  {item.title}
                </CardTitle>
              </Link>

              <div className="h-px w-12 bg-primary/20" />
            </div>

            <CardAction>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-primary/5 active:scale-90 transition-all size-12"
                  >
                    <MoreVertical className="size-6 text-muted-foreground/40" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-72 p-4 rounded-[2rem] shadow-3xl border-primary/5 backdrop-blur-3xl bg-background/90"
                >
                  <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-primary/50 dark:text-primary/70 flex items-center gap-3">
                    <Sparkles className="size-3" />
                    EXPLORER
                  </DropdownMenuLabel>

                  <div className="space-y-2 mt-4">
                    {[
                      { icon: BookOpen, label: "Modules", count: "27" },
                      { icon: Layers, label: "Cartes", count: "09" },
                      { icon: FileText, label: "Ressources", count: "03" },
                    ].map((m) => (
                      <DropdownMenuItem
                        key={m.label}
                        asChild
                        className="rounded-2xl py-3.5 px-4 cursor-pointer transition-all hover:bg-primary/10 active:scale-[0.96]"
                      >
                        <Link
                          href="#"
                          className="flex justify-between items-center w-full"
                        >
                          <div className="flex items-center gap-4">
                            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                              <m.icon className="size-5 text-primary" />
                            </div>
                            <span className="text-sm font-black tracking-tight">
                              {m.label}
                            </span>
                          </div>
                          <Badge
                            variant="outline"
                            className="font-mono text-[11px] bg-muted/60 border-none px-3 h-8 min-w-10 flex items-center justify-center rounded-2xl shadow-inner"
                          >
                            {m.count}
                          </Badge>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>

                  <DropdownMenuSeparator className="my-5 mx-2 bg-primary/5" />

                  <DropdownMenuItem
                    asChild
                    className="rounded-[1.5rem] py-4 px-5 cursor-pointer transition-all bg-primary text-primary-foreground shadow-2xl shadow-primary/20 group/booster active:scale-[0.96] hover:bg-primary/90"
                  >
                    <Link
                      href="/boosters"
                      className="flex items-center justify-center gap-3 w-full font-black text-[11px] uppercase tracking-[0.15em]"
                    >
                      <Sparkles className="size-5 transition-transform group-hover/booster:scale-125" />
                      BOOSTER
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardAction>
          </div>
        </CardHeader>
      )}

      {/* Card Content - Hidden for Locked Cards */}
      {!isLocked && (
        <CardContent className="px-8 md:px-10 pb-8 md:pb-10 pt-0 grow">
          <CardDescription className="text-lg md:text-xl text-muted-foreground/70 leading-relaxed line-clamp-3 font-medium tracking-tight">
            {item.description}
          </CardDescription>

          <div className="mt-8 flex flex-wrap gap-3">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-black text-muted-foreground/40 border border-border/40 px-4 py-1.5 rounded-full uppercase tracking-[0.25em] hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all duration-700 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>
      )}

      {!isLocked && (
        <CardFooter
          className={cn(
            "p-8 md:p-10 flex flex-col sm:flex-row justify-between items-center gap-8 bg-muted/5 border-t border-border/10 transition-all duration-1000",
            item.status === "completed" && "bg-primary/1 border-primary/10",
          )}
        >
          <div className="flex gap-4 w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="group/btn flex-1 sm:flex-none font-black uppercase tracking-[0.3em] text-[10px] rounded-full px-10 py-7 shadow-xl hover:shadow-2xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-700 active:scale-95 border-primary/20"
              asChild
            >
              <Link
                href="/demo/boosters"
                className="flex items-center gap-5"
              >
                {isCompleted ? "REVOIR" : "DÉCOUVRIR"}
                <ArrowRight className="size-5 group-hover/btn:translate-x-2 transition-transform duration-500" />
              </Link>
            </Button>
          </div>

          <StatusBadge status={item.status} />
        </CardFooter>
      )}
    </Card>
  );
}

// --- Main Page Component ---

const categoryFilters: ReadonlyArray<{
  label: string;
  value: TimelineCategoryFilter;
}> = [
  { label: "Tous", value: "all" },
  { label: "Personnages", value: "personnage" },
  { label: "Batailles", value: "bataille" },
  { label: "Politique", value: "politique" },
  { label: "Culture", value: "culture" },
];

const statusFilters: ReadonlyArray<{
  label: string;
  value: TimelineStatusFilter;
}> = [
  { label: "Tous", value: "all" },
  { label: "Bloquées", value: "locked" },
  { label: "Disponibles", value: "available" },
];

const categoryCounts: Record<TimelineCategoryFilter, number> = {
  all: timelineDatas.length,
  personnage: timelineDatas.filter((item) => item.category === "personnage")
    .length,
  bataille: timelineDatas.filter((item) => item.category === "bataille").length,
  politique: timelineDatas.filter((item) => item.category === "politique")
    .length,
  culture: timelineDatas.filter((item) => item.category === "culture").length,
};

const toggleClassName =
  "rounded-full px-6 py-4 transition-all duration-700 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-3xl data-[state=on]:scale-110 font-black uppercase tracking-[0.2em] text-[10px] shrink-0";

function parseDate(date: string): number {
  const match = date.match(/-?\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

export default function DemoTimeline() {
  const [activeCategoryFilter, setActiveCategoryFilter] =
    useState<TimelineCategoryFilter>("all");
  const [activeStatusFilter, setActiveStatusFilter] =
    useState<TimelineStatusFilter>("all");

  const sortedData = useMemo(
    () =>
      [...timelineDatas].sort((a, b) => parseDate(a.date) - parseDate(b.date)),
    [],
  );

  const categoryFilteredData = useMemo(
    () =>
      sortedData.filter(
        (item) =>
          activeCategoryFilter === "all" ||
          item.category === activeCategoryFilter,
      ),
    [sortedData, activeCategoryFilter],
  );

  const statusCounts = useMemo(
    () => ({
      all: categoryFilteredData.length,
      locked: categoryFilteredData.filter((item) => item.status === "locked")
        .length,
      available: categoryFilteredData.filter((item) => item.status !== "locked")
        .length,
    }),
    [categoryFilteredData],
  );

  const filteredData = useMemo(
    () =>
      categoryFilteredData.filter((item) => {
        if (activeStatusFilter === "all") {
          return true;
        }

        if (activeStatusFilter === "locked") {
          return item.status === "locked";
        }

        return item.status !== "locked";
      }),
    [categoryFilteredData, activeStatusFilter],
  );

  return (
    <div className="container mx-auto py-12 space-y-24 bg-linear-to-b from-transparent via-primary/1 to-transparent min-h-screen">
      <div className="flex flex-col items-center gap-6 px-4 w-full overflow-hidden">
        <div className="flex flex-col items-center gap-3 w-full">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground/50">
            Catégories
          </p>
          <div className="max-w-full overflow-x-auto scrollbar-hide py-2 px-2">
            <ToggleGroup
              type="single"
              size="sm"
              variant="outline"
              value={activeCategoryFilter}
              onValueChange={(value) =>
                value &&
                setActiveCategoryFilter(value as TimelineCategoryFilter)
              }
              className="bg-background/40 backdrop-blur-3xl p-3 rounded-full border border-primary/10 shadow-2xl ring-1 ring-white/10 flex-nowrap min-w-max"
            >
              {categoryFilters.map((filter) => (
                <ToggleGroupItem
                  key={filter.value}
                  value={filter.value}
                  className={toggleClassName}
                >
                  <span className="flex items-center gap-3">
                    {filter.label}
                    <Badge
                      variant="outline"
                      className="min-w-7 rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-[0.25em]"
                    >
                      {categoryCounts[filter.value]}
                    </Badge>
                  </span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 w-full">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground/50">
            Statut
          </p>
          <div className="max-w-full overflow-x-auto scrollbar-hide py-2 px-2">
            <ToggleGroup
              type="single"
              size="sm"
              variant="outline"
              value={activeStatusFilter}
              onValueChange={(value) =>
                value && setActiveStatusFilter(value as TimelineStatusFilter)
              }
              className="bg-background/40 backdrop-blur-3xl p-3 rounded-full border border-primary/10 shadow-2xl ring-1 ring-white/10 flex-nowrap min-w-max"
            >
              {statusFilters.map((filter) => (
                <ToggleGroupItem
                  key={filter.value}
                  value={filter.value}
                  className={toggleClassName}
                >
                  <span className="flex items-center gap-3">
                    {filter.label}
                    <Badge
                      variant="outline"
                      className="min-w-7 rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-[0.25em]"
                    >
                      {statusCounts[filter.value]}
                    </Badge>
                  </span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </div>

      {/* TIMELINE ARCHITECTURE - No line, no dots */}
      <div className="container mx-auto relative space-y-16 md:space-y-32">
        {filteredData.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={item.id}
              className={cn(
                "flex flex-col md:flex-row items-center w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isLeft ? "md:flex-row" : "md:flex-row-reverse",
              )}
            >
              {/* Card Container - Alternating on MD+, Full width on Mobile */}
              <div
                className={cn(
                  "w-full md:w-[70%] lg:w-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-0",
                  isLeft ? "md:pr-8 lg:pr-16" : "md:pl-8 lg:pl-16",
                )}
              >
                <TimelineCard
                  item={item}
                  index={index}
                />
              </div>

              {/* Visual balance spacer - Creates the alternating effect */}
              <div className="hidden md:block w-[30%] lg:w-1/2" />
            </div>
          );
        })}
      </div>

      {/* Deep Atmosphere Glow Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-[60vh] bg-linear-to-t from-primary/4 to-transparent pointer-events-none -z-10" />
    </div>
  );
}
