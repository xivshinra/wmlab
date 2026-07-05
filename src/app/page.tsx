import { BoosterSection } from "@/components/home/BoosterSection";
import { HeroSection } from "@/components/home/HeroSection";
import { NewSeriesSection } from "@/components/home/NewSeriesSection";
import { PartnersSection } from "@/components/home/PartnersSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <NewSeriesSection />
      <BoosterSection />
      <PartnersSection />
    </>
  );
}
