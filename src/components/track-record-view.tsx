"use client";

import { useEffect, useMemo, useState } from "react";
import { buttonClasses } from "@/components/button";
import { Property, PropertyStatus } from "@/lib/data";
import type { Project, ProjectStatus, Sector } from "@/types/sanity";
import { Filters } from "@/components/filters";
import { PropertyGrid } from "@/components/property-grid";

const ALL_VALUE = "all";
const DEFAULT_VISIBLE_ROWS = 2;
const GRID_COLUMNS = 3;
const INITIAL_LIMIT = DEFAULT_VISIBLE_ROWS * GRID_COLUMNS;

const statusToggleOptions: { label: string; value: PropertyStatus | typeof ALL_VALUE }[] =
  [
    { label: "All", value: ALL_VALUE },
    { label: "Current", value: "current" },
    { label: "Previous", value: "previous" },
  ];

type TrackRecordViewProps = {
  properties: (Property | Project)[];
  sectors?: Sector[];
};

export function TrackRecordView({ properties, sectors = [] }: TrackRecordViewProps) {
  const [selectedSector, setSelectedSector] = useState<string>(ALL_VALUE);
  const [selectedStatus, setSelectedStatus] =
    useState<PropertyStatus | typeof ALL_VALUE>(ALL_VALUE);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_LIMIT);

  // Build filter options from sectors that have projects
  const filterOptions = useMemo(() => {
    const options = [{ label: "All", value: ALL_VALUE }];

    // Get unique sectors that are actually used in projects
    const usedSectors = new Set<string>();
    properties.forEach((property) => {
      const sectorName = typeof property.sector === 'string'
        ? property.sector
        : property.sector?.name;
      if (sectorName) {
        usedSectors.add(sectorName);
      }
    });

    if (sectors.length > 0) {
      // Use Sanity sectors, but only include those with projects
      sectors
        .filter((sector) => usedSectors.has(sector.name))
        .forEach((sector) => {
          options.push({
            label: sector.name,
            value: sector.name
          });
        });
    } else {
      // Fallback: only show sectors that exist in the projects
      const fallbackSectors = [
        "Retail",
        "Office",
        "Industrial",
        "Mixed Use",
        "Residential",
        "Development",
      ];
      fallbackSectors
        .filter((sector) => usedSectors.has(sector))
        .forEach((sector) => {
          options.push({
            label: sector,
            value: sector
          });
        });
    }

    return options;
  }, [sectors, properties]);

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      // Handle both Property (with string sector) and Project (with Sector object)
      const propertySector = typeof property.sector === 'string'
        ? property.sector
        : (property.sector?.name || '');

      const sectorMatch =
        selectedSector === ALL_VALUE || propertySector === selectedSector;
      const statusMatch =
        selectedStatus === ALL_VALUE || property.status === selectedStatus;
      return sectorMatch && statusMatch;
    });
  }, [properties, selectedSector, selectedStatus]);

  useEffect(() => {
    setVisibleCount(INITIAL_LIMIT);
  }, [selectedSector, selectedStatus]);

  const visibleProperties = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const showMore = () => {
    setVisibleCount((count) =>
      Math.min(filtered.length, count + INITIAL_LIMIT),
    );
  };

  const primaryButtonClasses = buttonClasses({
    variant: "primary",
    className: "px-6",
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Filters
          options={filterOptions}
          value={selectedSector}
          onChange={setSelectedSector}
        />
        <div className="flex flex-wrap items-center gap-4 lg:justify-end">
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-border-subtle/60 bg-white/80 px-1 py-1 text-sm font-semibold text-ink/70 shadow-sm backdrop-blur lg:gap-0">
            {statusToggleOptions.map((option) => {
              const isActive = selectedStatus === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedStatus(option.value)}
                  aria-pressed={isActive}
                  className={`rounded-full px-4 py-1 transition ${
                    isActive
                      ? "bg-rc-navy text-white shadow-sm"
                      : "text-ink/60 hover:text-inkStrong"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <PropertyGrid properties={visibleProperties} animateOnScroll />
      <div className="flex flex-wrap items-center justify-center gap-3">
        {hasMore ? (
          <button
            type="button"
            className={primaryButtonClasses}
            onClick={showMore}
          >
            Show more properties
          </button>
        ) : null}
      </div>
    </div>
  );
}
