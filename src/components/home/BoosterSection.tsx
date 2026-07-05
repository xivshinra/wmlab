import Image from "next/image";
import Link from "next/link";
import { Check, Gift, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PAID_PERKS = [
  "Cartes rares et exclusives garanties",
  "Boostez votre progression instantanément",
  "Débloquez des ressources premium",
];

export function BoosterSection() {
  return (
    <section className="border-y border-border/60 bg-primary/5">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="rounded-full px-3 py-1 text-xs font-bold"
          >
            <Sparkles className="size-3.5" />
            Boosters
          </Badge>
          <h2 className="mt-4 font-heading text-3xl font-black tracking-tight text-balance md:text-4xl">
            Ouvrez un booster, révélez de nouvelles cartes
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed text-pretty">
            Recevez un booster gratuit chaque jour, ou accélérez votre
            collection avec des boosters premium.
          </p>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          {/* Free daily booster */}
          <Card className="relative overflow-hidden border-none ring-1 ring-border">
            <CardContent className="flex h-full flex-col gap-5 p-8">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Gift className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading text-xl font-black">
                    Booster quotidien
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Offert, chaque jour
                  </p>
                </div>
                <Badge className="ml-auto rounded-full font-bold">Gratuit</Badge>
              </div>

              <p className="text-muted-foreground leading-relaxed text-pretty">
                Revenez chaque jour pour ouvrir votre booster offert et enrichir
                votre collection sans dépenser un centime.
              </p>

              <div className="mt-auto">
                <Button asChild size="lg" className="w-full rounded-full font-bold">
                  <Link href="/shop">
                    <Gift className="size-4" />
                    Récupérer mon booster gratuit
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Premium booster */}
          <Card className="relative overflow-hidden border-none bg-primary text-primary-foreground ring-1 ring-primary">
            <div className="pointer-events-none absolute -top-8 -right-8 size-40 opacity-90">
              <Image
                src="/assets/images/booster.png"
                alt=""
                fill
                sizes="160px"
                className="object-contain"
              />
            </div>
            <CardContent className="flex h-full flex-col gap-5 p-8">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary-foreground/15">
                  <Sparkles className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading text-xl font-black">
                    Booster premium
                  </h3>
                  <p className="text-sm text-primary-foreground/80">
                    À partir de 2,99&nbsp;€
                  </p>
                </div>
              </div>

              <ul className="flex flex-col gap-2.5">
                {PAID_PERKS.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0" />
                    <span className="text-pretty">{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="w-full rounded-full font-bold"
                >
                  <Link href="/shop">
                    <Sparkles className="size-4" />
                    Acheter un booster
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
