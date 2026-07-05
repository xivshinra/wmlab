import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FavoritesProvider } from "@/components/series/FavoritesProvider";
import AppNavbar from "@/components/AppNavbar";
import { AppFooter } from "@/components/AppFooter";

const nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title:
    "World Memories FR | Collectionnez les souvenirs du monde et apprenez de nouvelles choses chaque jour",
  description:
    "World Memories FR est une collection de souvenirs du monde, où vous pouvez découvrir et apprendre de nouvelles choses chaque jour. Explorez des sujets variés, des sciences à l'histoire, et enrichissez votre culture générale avec des cartes informatives et visuellement attrayantes.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d14" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn(
        "h-full bg-background",
        "antialiased",
        "font-sans",
        nunitoSans.variable,
      )}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <FavoritesProvider>
              <AppNavbar />
              <main className="flex-1">{children}</main>
              <AppFooter />
            </FavoritesProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
