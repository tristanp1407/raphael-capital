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

type TrackRecordViewProps = {
  properties: (Property | Project)[];
  sectors?: Sector[];
  filterLabels?: {
    all?: string;
    current?: string;
    previous?: string;
  };
  showMoreButtonText?: string;
};

export function TrackRecordView({
  properties,
  sectors = [],
  filterLabels = {},
  showMoreButtonText = "Show more properties",
}: TrackRecordViewProps) {
  const statusToggleOptions: { label: string; value: PropertyStatus | typeof ALL_VALUE }[] =
    [
      { label: filterLabels.all || "All", value: ALL_VALUE },
      { label: filterLabels.current || "Current", value: "current" },
      { label: filterLabels.previous || "Previous", value: "previous" },
    ];
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
      // Handle new Project type with sectors array
      if ('sectors' in property && Array.isArray(property.sectors)) {
        property.sectors.forEach(sector => {
          if (sector?.name) {
            usedSectors.add(sector.name);
          }
        });
      }
      // Handle legacy Property type with single sector string
      else if ('sector' in property && typeof property.sector === 'string') {
        usedSectors.add(property.sector);
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
      // Get all sector names for this property
      let propertySectors: string[] = [];

      // Handle new Project type with sectors array
      if ('sectors' in property && Array.isArray(property.sectors)) {
        propertySectors = property.sectors.map(s => s.name);
      }
      // Handle legacy Property type with single sector string
      else if ('sector' in property && typeof property.sector === 'string') {
        propertySectors = [property.sector];
      }

      // Match if ANY sector matches the selected filter (OR logic)
      const sectorMatch =
        selectedSector === ALL_VALUE ||
        propertySectors.includes(selectedSector);

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
            {showMoreButtonText}
          </button>
        ) : null}
      </div>
    </div>
  );
}
