"use client";

import Image from "next/image";
import Link from "next/link";
import { playfair } from "@/app/fonts";
import { Property, getPropertyPlaceholderByIndex } from "@/lib/data";
import type { Project } from "@/types/sanity";
import { urlFor } from "@/lib/sanity/image";

const gradients = [
  "from-rc-indigo/35 to-rc-navy/55",
  "from-rc-periwinkle/40 to-rc-indigo/45",
  "from-rc-graphite/35 to-rc-navy/55",
];

// Truncate text to a maximum length, breaking at word boundaries
function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  if (lastSpaceIndex > 0) {
    return truncated.slice(0, lastSpaceIndex) + '...';
  }

  return truncated + '...';
}

type PropertyCardProps = {
  property: Property | Project;
  index?: number;
};

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const overlay = gradients[index % gradients.length];

  // Check if it's a Sanity project (has _id) or legacy property (has id)
  const isProject = '_id' in property;
  const slug = isProject ? property.slug : property.id;

  // Get image from Sanity or use placeholder
  const hasHeroImage = isProject && property.heroImage;
  const imageUrl = hasHeroImage
    ? urlFor(property.heroImage!.asset).width(720).height(480).url()
    : getPropertyPlaceholderByIndex(index).src;
  const imageAlt = hasHeroImage
    ? property.heroImage!.alt
    : getPropertyPlaceholderByIndex(index).alt;
  const imageLqip = hasHeroImage
    ? property.heroImage!.asset.metadata.lqip
    : getPropertyPlaceholderByIndex(index).blurDataURL;

  const statusLabel = property.status === "current" ? "Current" : "Previous";
  const statusStyles =
    property.status === "current"
      ? "bg-white/90 text-rc-navy"
      : "bg-white/70 text-ink/70";

  return (
    <Link
      href={`/track-record/${slug}`}
      className="group block h-full"
      aria-label={`View ${property.name} in ${property.location}`}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border-subtle/60 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-card">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority={index < 3}
            sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            placeholder="blur"
            blurDataURL={imageLqip}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${overlay} mix-blend-multiply`}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.65),_transparent)]"
            aria-hidden
          />
          <div className="absolute left-4 top-4">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${statusStyles}`}
            >
              {statusLabel}
            </span>
          </div>
          <div className="absolute inset-0 flex items-end p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-white/90">
              {'sectors' in property && Array.isArray(property.sectors) && property.sectors.length > 0
                ? property.sectors.map(s => s.name).join(' • ')
                : 'sector' in property && typeof property.sector === 'string'
                ? property.sector
                : 'Unknown'}
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6">
          <h3
            className={`${playfair.className} text-xl font-black text-inkStrong`}
          >
            {property.name}
          </h3>
          <p className="text-sm text-ink/75">{truncateText(property.summary)}</p>
          <p className="mt-auto text-xs font-medium uppercase tracking-[0.18em] text-ink/55">
            {property.location}
          </p>
        </div>
      </article>
    </Link>
  );
}
