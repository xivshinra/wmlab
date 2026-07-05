import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUniqueContributors } from "@/lib/series";

export function PartnersSection() {
  const partners = getUniqueContributors();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-sm font-bold tracking-wide text-primary uppercase">
          Ils nous font confiance
        </p>
        <h2 className="mt-3 font-heading text-3xl font-black tracking-tight text-balance md:text-4xl">
          Partenaires &amp; collaborateurs
        </h2>
        <p className="mt-3 text-muted-foreground leading-relaxed text-pretty">
          Nos contenus sont conçus main dans la main avec des institutions et
          des créateurs reconnus, pour un savoir fiable et vérifié.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {partners.map((partner) => (
          <li key={partner.slug}>
            <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-border/60 bg-card p-6 text-center transition-colors hover:border-primary/40">
              <Avatar size="lg">
                <AvatarFallback className="bg-primary/10 font-black text-primary">
                  {partner.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-bold tracking-tight text-balance">
                {partner.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
