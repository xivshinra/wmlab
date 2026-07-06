"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCreative,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";

import type { Series } from "@/types/series";

type SeriesDetailCarouselProps = {
  series: Series;
};

export function SeriesDetailCarousel({ series }: SeriesDetailCarouselProps) {
  const [isPixelizing, setIsPixelizing] = useState(false);

  const slides = [
    {
      key: `${series.slug}-0`,
      image: series.image,
      topText: series.title,
      middleText: "Lorem ipsum serium",
      description: series.description,
    },
    {
      key: `${series.slug}-1`,
      image: "/assets/images/placeholder.jpg",
      topText: series.title,
      middleText: "Boosters et ressources",
      description:
        "Découvrez les boosters et les contenus exclusifs de cette série.",
    },
  ];

  const initialSlide = 0;

  return (
    <section className="relative h-[85vh] min-w-0 overflow-hidden bg-slate-950 text-white rounded-none">
      <Swiper
        modules={[Navigation, Pagination, Keyboard, Autoplay, EffectCreative]}
        initialSlide={initialSlide}
        slidesPerView={1}
        spaceBetween={0}
        grabCursor
        keyboard={{ enabled: true }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5200, disableOnInteraction: false }}
        loop
        effect="creative"
        onSlideChangeTransitionStart={() => setIsPixelizing(true)}
        onSlideChangeTransitionEnd={() => setIsPixelizing(false)}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-35%", 0, -80],
            rotate: [0, 100, 0],
            origin: "left center",
          },
          next: {
            shadow: true,
            translate: ["35%", 0, -80],
            rotate: [0, -100, 0],
            origin: "right center",
          },
        }}
        className="swiper h-[85vh] w-full rounded-none"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.key}
            className="relative h-full w-full overflow-hidden rounded-none"
          >
            <div className="relative h-full min-w-0 overflow-hidden rounded-none">
              <Image
                src={slide.image}
                alt={slide.topText}
                fill
                sizes="100vw"
                className="object-cover rounded-none"
              />
              <div className="absolute inset-0 bg-black/35" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_28%)] pointer-events-none" />

              <div className="absolute inset-x-0 bottom-0 z-20 rounded-t-[2rem] bg-linear-to-t from-slate-950/95 to-transparent p-8 text-white">
                <span className="block text-sm uppercase tracking-[0.35em] text-slate-300">
                  {slide.topText}
                </span>
                <p className="mt-3 text-4xl font-black leading-tight md:text-5xl">
                  {slide.middleText}
                </p>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-100 md:text-base">
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {isPixelizing ? (
        <div className="pointer-events-none absolute inset-0 z-30 bg-black/10 backdrop-blur-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_25%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] bg-size:10px_10px opacity-80" />
        </div>
      ) : null}
    </section>
  );
}
