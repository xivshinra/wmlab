"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MAIN_NAV_LINKS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export default function AppNavbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <span className="font-heading text-base font-black tracking-tight uppercase">
            World Memories
          </span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          {MAIN_NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden rounded-full font-bold sm:inline-flex"
          >
            <Link href="/shop">
              <Sparkles className="size-4" />
              Booster
            </Link>
          </Button>
          <ThemeToggle />

          <Avatar className="hidden sm:block">
            <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
              WM
            </AvatarFallback>
          </Avatar>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-full md:hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Ouvrir le menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Sparkles className="size-4" />
                  </span>
                  World Memories
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {MAIN_NAV_LINKS.map((link) => (
                  <SheetClose
                    asChild
                    key={link.href}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-muted",
                        isActive(link.href)
                          ? "bg-primary/10 text-primary"
                          : "text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full rounded-full font-bold"
                  >
                    <Link href="/shop">
                      <Sparkles className="size-4" />
                      Acheter un booster
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
