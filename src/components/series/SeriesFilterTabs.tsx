"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SERIES_FILTERS, type SeriesFilterValue } from "@/lib/series";

type SeriesFilterTabsProps = {
  value: SeriesFilterValue;
  onValueChange: (value: SeriesFilterValue) => void;
};

export function SeriesFilterTabs({ value, onValueChange }: SeriesFilterTabsProps) {
  return (
    <div className="flex justify-center">
      <ToggleGroup
        type="single"
        size="sm"
        variant="outline"
        value={value}
        onValueChange={(next) => {
          if (next) onValueChange(next as SeriesFilterValue);
        }}
        className="no-scrollbar max-w-full overflow-x-auto rounded-full border bg-muted/30 p-1.5 shadow-xs"
      >
        {SERIES_FILTERS.map((filter) => (
          <ToggleGroupItem
            key={filter.value}
            value={filter.value}
            className="rounded-full px-5 font-medium transition-all data-[state=on]:bg-background data-[state=on]:text-primary data-[state=on]:shadow-md"
          >
            {filter.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
