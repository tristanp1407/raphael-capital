"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import type { SanityImage } from "@/types/sanity";

type ProjectImageCarouselProps = {
  images: SanityImage[];
};

export function ProjectImageCarousel({ images }: ProjectImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Debug: Log the images received
  useEffect(() => {
    console.log('ProjectImageCarousel received images:', images?.length || 0, images);
  }, [images]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (images.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-rc-navy/10">
        <p className="text-sm text-ink/50">No images available</p>
      </div>
    );
  }

  // Single image - no carousel needed
  if (images.length === 1) {
    const image = images[0];
    return (
      <div className="relative aspect-[16/9] sm:aspect-[2/1]">
        <Image
          src={image.asset.url}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={image.asset.metadata.lqip}
        />
      </div>
    );
  }

  // Multiple images - show carousel
  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative aspect-[16/9] sm:aspect-[2/1]">
                <Image
                  src={image.asset.url}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={image.asset.metadata.lqip}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-rc-navy focus:ring-offset-2"
        aria-label="Previous image"
      >
        <svg
          className="h-6 w-6 text-rc-navy"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-rc-navy focus:ring-offset-2"
        aria-label="Next image"
      >
        <svg
          className="h-6 w-6 text-rc-navy"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all ${
              index === selectedIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
