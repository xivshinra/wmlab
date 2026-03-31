"use client";

import Link from "next/link";
import Image from "next/image";
import { fakeSeriesData } from "@/data/fakeData";
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EllipsisVertical, Play, PlusIcon, Star } from "lucide-react";

export default function CardsGrid() {
  return (
    <div className="space-y-12">
      <ToggleGroup
        type="single"
        size="sm"
        defaultValue="all"
        variant="outline"
        spacing={2}
        className="w-full overflow-x-auto"
      >
        <ToggleGroupItem
          value="all"
          aria-label="Toggle all"
        >
          Tous
        </ToggleGroupItem>

        <ToggleGroupItem
          value="new"
          aria-label="Toggle new"
        >
          Nouveaux
        </ToggleGroupItem>

        <ToggleGroupItem
          value="popular"
          aria-label="Toggle popular"
        >
          Populaires
        </ToggleGroupItem>
        <ToggleGroupItem
          value="recommandation"
          aria-label="Toggle recommandation"
        >
          Pour vous
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
        {fakeSeriesData.map((item) => (
          <Card
            className="pt-0"
            key={item.id}
          >
            <Link
              href={item.url}
              title={item.title}
              className="w-full"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={400}
                loading="eager"
                className="w-full aspect-video object-cover object-center hover:scale-103 transition-transform duration-200"
              />
            </Link>

            <CardHeader>
              <CardTitle className="leading-none tracking-tight font-bold flex justify-between gap-2 items-center">
                <Link href={item.url}>
                  <h3>{item.title}</h3>
                </Link>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-xs"
                  >
                    <Star
                      className={
                        item.isFavorite ? "text-amber-500 fill-amber-500" : ""
                      }
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon-xs"
                  >
                    <EllipsisVertical />
                  </Button>
                </div>
              </CardTitle>

              <Tooltip>
                <TooltipTrigger>
                  <Progress
                    value={item.progress}
                    id="series-progress"
                    className="mt-2"
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <>
                    {item.progress > 0 ? (
                      <div className="space-y-2">
                        <p>
                          Progression:{" "}
                          <span className="font-bold">{item.progress} %</span>
                        </p>
                        <p>
                          Cartes:{" "}
                          <span className="font-bold">
                            {item.cardsObtainedCount}
                          </span>{" "}
                          / <span>{item.cardsTotalCount}</span>.
                        </p>
                        <p>
                          Modules:{" "}
                          <span className="font-bold">
                            {item.modulesCompletedCount}
                          </span>{" "}
                          / <span>{item.modulesTotalCount}</span>.
                        </p>
                        <p>
                          Ressources:{" "}
                          <span className="font-bold">
                            {item.ressourcesObtainedCount}
                          </span>{" "}
                          / <span>{item.ressourcesTotalCount}</span>.
                        </p>
                      </div>
                    ) : (
                      <p>Vous n'avez pas encore commencé cette série.</p>
                    )}
                  </>
                </TooltipContent>
              </Tooltip>
            </CardHeader>

            <CardContent className="grow space-y-2">
              <p className="text-xs text-muted-foreground tracking-tight">
                MàJ, {item.lastUpdate}
              </p>
              <CardDescription>
                <p>{item.description}</p>
              </CardDescription>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
              <div className="flex justify-between items-center gap-4 w-full">
                <div className="flex gap-2">
                  {item.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={
                        item.tags.indexOf(tag) === 0 ? "default" : "outline"
                      }
                    >
                      <Link href="/">{tag}</Link>
                    </Badge>
                  ))}
                </div>
                <CardAction>
                  <Button
                    size="icon"
                    asChild
                  >
                    <Link href={`/serie/${item.slug}`}>
                      <Play />
                    </Link>
                  </Button>
                </CardAction>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Link href={`/serie/${item.slug}/contributeurs`}>
                    <AvatarGroup className="">
                      <Avatar size="sm">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Avatar size="sm">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>LR</AvatarFallback>
                      </Avatar>
                      <AvatarGroupCount>
                        <PlusIcon />
                      </AvatarGroupCount>
                    </AvatarGroup>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Voir les contributeurs
                </TooltipContent>
              </Tooltip>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
