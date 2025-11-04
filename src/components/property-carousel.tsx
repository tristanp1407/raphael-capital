"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

import { Property } from "@/lib/data";
import type { Project } from "@/types/sanity";
import { PropertyCard } from "@/components/property-card";

type PropertyCarouselProps = {
  properties: (Property | Project)[];
};

export function PropertyCarousel({ properties }: PropertyCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps",
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [emblaApi]);

  if (!properties.length) {
    return null;
  }

  return (
    <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 lg:hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 px-6 pb-6 sm:px-8">
          {properties.map((property, index) => {
            const key = '_id' in property ? property._id : property.id;
            return (
              <div
                key={key}
                className="min-w-0 shrink-0 basis-[85%] sm:basis-[55%] last:mr-6 sm:last:mr-8"
              >
                <PropertyCard property={property} index={index} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
