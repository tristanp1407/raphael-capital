"use client";

import Image from "next/image";
import Link from "next/link";
import { playfair } from "@/app/fonts";
import { Property, getPropertyPlaceholderByIndex } from "@/lib/data";

const gradients = [
  "from-rc-indigo/35 to-rc-navy/55",
  "from-rc-periwinkle/40 to-rc-indigo/45",
  "from-rc-graphite/35 to-rc-navy/55",
];

type PropertyCardProps = {
  property: Property;
  index?: number;
};

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const overlay = gradients[index % gradients.length];
  const media = getPropertyPlaceholderByIndex(index);
  const statusLabel = property.status === "current" ? "Current" : "Previous";
  const statusStyles =
    property.status === "current"
      ? "bg-white/90 text-rc-navy"
      : "bg-white/70 text-ink/70";

  return (
    <Link
      href={`/track-record/${property.id}`}
      className="group block h-full"
      aria-label={`View ${property.name} in ${property.location}`}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border-subtle/60 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-card">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={media.src}
            alt={media.alt}
            fill
            priority={index < 3}
            sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            placeholder="blur"
            blurDataURL={media.blurDataURL}
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
              {property.sector}
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3
              className={`${playfair.className} text-xl font-black text-inkStrong`}
            >
              {property.name}
            </h3>
            <span className="text-sm font-medium text-ink/65">
              {property.year}
            </span>
          </div>
          <p className="text-sm text-ink/75">{property.summary}</p>
          <p className="mt-auto text-xs font-medium uppercase tracking-[0.18em] text-ink/55">
            {property.location}
          </p>
        </div>
      </article>
    </Link>
  );
}
