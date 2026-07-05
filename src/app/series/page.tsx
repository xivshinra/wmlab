// IMPORTS

import SeriesGrid from "@/components/series/SeriesGrid";

// COMPONENT
export default function Seriespage() {
  return (
    <>
      {/* Page heading */}
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm italic">
          20 séries disponibles
        </p>
      </div>

      <SeriesGrid />
    </>
  );
}
