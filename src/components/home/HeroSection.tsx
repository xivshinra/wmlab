import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const HERO_STATS = [
  { value: "12+", label: "Séries" },
  { value: "900+", label: "Cartes à collectionner" },
  { value: "15k", label: "Apprenants actifs" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:py-24 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <Badge
            variant="secondary"
            className="rounded-full px-3 py-1 text-xs font-bold"
          >
            <Sparkles className="size-3.5" />
            Apprendre en collectionnant
          </Badge>

          <h1 className="font-heading text-4xl font-black tracking-tight text-balance md:text-5xl lg:text-6xl">
            Collectionnez les souvenirs du monde
          </h1>

          <p className="max-w-lg text-lg text-muted-foreground leading-relaxed text-pretty">
            Découvrez une nouvelle façon d&apos;apprendre : ouvrez des boosters,
            collectionnez des cartes de savoir et progressez chaque jour à
            travers les sciences, l&apos;histoire et bien plus encore.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full font-bold">
              <Link href="/series">
                Explorer les séries
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full font-bold"
            >
              <Link href="/shop">
                <Sparkles className="size-4" />
                Ouvrir un booster
              </Link>
            </Button>
          </div>

          <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-4">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </dt>
                <dd className="order-1 font-heading text-2xl font-black tabular-nums md:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-primary/5 ring-1 ring-border">
          <Image
            src="/assets/images/hero.png"
            alt="Une collection de cartes de savoir illustrant divers sujets"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
