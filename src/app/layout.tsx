import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppNavbar from "@/components/AppNavbar";

const nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title:
    "World Memories FR | Collectionnez les souvenirs du monde et apprenez de nouvelles choses chaque jour",
  description:
    "World Memories FR est une collection de souvenirs du monde, où vous pouvez découvrir et apprendre de nouvelles choses chaque jour. Explorez des sujets variés, des sciences à l'histoire, et enrichissez votre culture générale avec des cartes informatives et visuellement attrayantes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", nunitoSans.variable)}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <TooltipProvider>
            <AppNavbar />
            <main className="p-4 space-y-4 lg:space-y-8 max-w-6xl mx-auto">
              {children}
            </main>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
