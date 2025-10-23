"use client";

import { Property } from "@/lib/data";
import { PropertyCard } from "@/components/property-card";
import { FadeIn } from "@/components/fade-in";

type PropertyGridProps = {
  properties: Property[];
  animateOnScroll?: boolean;
};

export function PropertyGrid({
  properties,
  animateOnScroll = false,
}: PropertyGridProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {properties.map((property, index) => {
        if (animateOnScroll) {
          const delay = Math.min(index, 5) * 0.05;

          return (
            <FadeIn key={property.id} delay={delay}>
              <PropertyCard property={property} index={index} />
            </FadeIn>
          );
        }

        return (
          <PropertyCard key={property.id} property={property} index={index} />
        );
      })}
    </div>
  );
}
