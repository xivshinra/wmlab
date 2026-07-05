"use client";

import * as React from "react";

import { fakeSeriesData } from "@/data/fakeSeriesData";

type FavoritesContextValue = {
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
};

const FavoritesContext = React.createContext<FavoritesContextValue | null>(null);

/**
 * Holds the set of favorited series ids in memory and shares it across every
 * consumer (grid, homepage sections, …) so the UI stays in sync.
 */
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = React.useState<Set<number>>(
    () =>
      new Set(
        fakeSeriesData.filter((item) => item.isFavorite).map((item) => item.id),
      ),
  );

  const isFavorite = React.useCallback(
    (id: number) => favoriteIds.has(id),
    [favoriteIds],
  );

  const toggleFavorite = React.useCallback((id: number) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const value = React.useMemo(
    () => ({ isFavorite, toggleFavorite }),
    [isFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = React.useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a <FavoritesProvider>");
  }
  return context;
}
