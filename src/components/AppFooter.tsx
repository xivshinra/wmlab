import Link from "next/link";
import { Sparkles } from "lucide-react";

import { MAIN_NAV_LINKS } from "@/lib/navigation";

export function AppFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            <span className="font-heading text-base font-black tracking-tight uppercase">
              World Memories
            </span>
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground text-pretty">
            Collectionnez les souvenirs du monde et apprenez de nouvelles choses
            chaque jour.
          </p>
        </div>

        <nav aria-label="Liens de pied de page">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {MAIN_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border/60 py-4">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} World Memories FR. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
