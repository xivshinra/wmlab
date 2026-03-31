"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { timelineDatas } from "@/data/fakeTimelineData";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ArrowRight, MoreVertical } from "lucide-react";
import Image from "next/image";

const filters = [
  { label: "Tous", value: "all" },
  { label: "Personnages", value: "personnage" },
  { label: "Batailles", value: "bataille" },
  { label: "Politique", value: "politique" },
  { label: "Culture", value: "culture" },
];

// 🔑 parsing robuste des dates
function parseDate(date: string): number {
  const match = date.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

export default function DemoTimeline() {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const scrollTo = (id: string) => {
    refs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  // 🔥 tri AVANT filtre
  const sortedData = [...timelineDatas].sort(
    (a, b) => parseDate(a.date) - parseDate(b.date),
  );

  const filteredData =
    activeFilter === "all"
      ? sortedData
      : sortedData.filter((item) => item.category === activeFilter);

  return (
    <div className="w-full space-y-12">
      {/* FILTRES */}
      <ToggleGroup
        type="single"
        size="sm"
        variant="outline"
        value={activeFilter}
        defaultValue="all"
        onValueChange={(value) => value && setActiveFilter(value)}
        className="mx-auto"
      >
        {filters.map((f) => (
          <ToggleGroupItem
            key={f.value}
            value={f.value}
          >
            {f.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {/* TIMELINE */}
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 h-full w-px bg-border" />

        <div className="space-y-20">
          {filteredData.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={item.id}
                className="relative flex items-center"
              >
                {/* point centré */}
                <button
                  onClick={() => scrollTo(item.id)}
                  className="z-10 absolute top-1/2 left-4 md:left-1/2 -translate-x-1/2 -translate-y-1/2 size-3 rounded-full bg-primary ring-4 ring-background"
                />

                {/* bloc */}
                <div
                  ref={(el) => {
                    refs.current[item.id] = el;
                  }}
                  className={cn(
                    "ml-12 md:ml-0 md:w-1/2",
                    isLeft ? "md:pr-14" : "md:pl-14 md:ml-auto",
                  )}
                >
                  <Card className="overflow-hidden bg-card/80 backdrop-blur shadow-sm hover:shadow-lg transition pt-0">
                    {/* image */}
                    <Image
                      src={item.image}
                      alt=""
                      width={400}
                      height={350}
                      loading="eager"
                      className="aspect-video object-cover w-full"
                    />

                    <CardHeader className="space-y-4">
                      <div className="flex justify-between items-center my-2">
                        <h3 className="text-lg font-semibold leading-none">
                          <span className="mr-2 text-sm tracking-tight aspect-square rounded-full border p-2 text-muted-foreground">
                            {item.date}
                          </span>
                          {item.title}
                        </h3>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                            >
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Partager</DropdownMenuItem>
                            <DropdownMenuItem>Copier le lien</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex gap-2 flex-wrap">
                        <Badge
                          variant="secondary"
                          className="capitalize cursor-default leading-none"
                        >
                          {item.category}
                        </Badge>
                        {item.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="capitalize cursor-default leading-none"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>

                    <CardFooter className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        Ouvrir un booster
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        Continuer
                        <ArrowRight />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
