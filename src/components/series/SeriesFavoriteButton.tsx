"use client";

import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useFavorites } from "./FavoritesProvider";

type SeriesFavoriteButtonProps = {
  seriesId: number;
  title: string;
  className?: string;
};

export function SeriesFavoriteButton({
  seriesId,
  title,
  className,
}: SeriesFavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(seriesId);

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-xs"
      aria-pressed={active}
      aria-label={
        active
          ? `Retirer ${title} des favoris`
          : `Ajouter ${title} aux favoris`
      }
      className={cn(
        "rounded-full shadow-lg transition-all active:scale-90",
        active
          ? "border-amber-600 bg-amber-500 text-white ring-4 ring-white/10"
          : "border border-white/10 bg-black/20 text-white/60 backdrop-blur-md hover:bg-black/40 hover:text-white",
        className,
      )}
      onClick={(e) => {
        e.preventDefault();
        toggleFavorite(seriesId);
      }}
    >
      <Star className={cn("size-3 transition-all", active && "scale-110 fill-current")} />
    </Button>
  );
}
