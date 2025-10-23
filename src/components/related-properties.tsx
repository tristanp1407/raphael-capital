"use client";

import { Property } from "@/lib/data";
import { PropertyCard } from "@/components/property-card";
import { PropertyCarousel } from "@/components/property-carousel";

type RelatedPropertiesProps = {
  properties: Property[];
};

export function RelatedProperties({ properties }: RelatedPropertiesProps) {
  if (!properties.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <PropertyCarousel properties={properties} />
      <div className="hidden gap-8 lg:grid lg:grid-cols-3">
        {properties.map((property, index) => (
          <PropertyCard key={property.id} property={property} index={index} />
        ))}
      </div>
    </div>
  );
}
