"use client";

import { Property } from "@/lib/data";
import type { Project } from "@/types/sanity";
import { PropertyCard } from "@/components/property-card";
import { FadeIn } from "@/components/fade-in";

type PropertyGridProps = {
  properties: (Property | Project)[];
  animateOnScroll?: boolean;
};

export function PropertyGrid({
  properties,
  animateOnScroll = false,
}: PropertyGridProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {properties.map((property, index) => {
        // Get the unique key - use _id for Sanity projects or id for legacy properties
        const key = '_id' in property ? property._id : property.id;

        if (animateOnScroll) {
          const delay = Math.min(index, 5) * 0.05;

          return (
            <FadeIn key={key} delay={delay}>
              <PropertyCard property={property} index={index} />
            </FadeIn>
          );
        }

        return (
          <PropertyCard key={key} property={property} index={index} />
        );
      })}
    </div>
  );
}
