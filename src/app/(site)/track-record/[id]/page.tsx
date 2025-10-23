import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { playfair } from "@/app/fonts";
import { buttonClasses } from "@/components/button";
import { Section } from "@/components/section";
import { RelatedProperties } from "@/components/related-properties";
import { CallToActionBanner } from "@/components/call-to-action-banner";
import {
  allProperties,
  getPropertyById,
  getPropertyPlaceholderById,
} from "@/lib/data";

type TrackRecordPropertyPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: TrackRecordPropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    return {
      title: "Property not found | Raphael Capital",
      description: "The requested property could not be located.",
    };
  }

  const media = getPropertyPlaceholderById(property.id);
  const description = `${property.summary} Located in ${property.location}, completed in ${property.year}.`;
  const title = `${property.name} | Track Record | Raphael Capital`;
  const url = `/track-record/${property.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Raphael Capital",
      type: "article",
      images: [
        {
          url: media.src,
          width: 1600,
          height: 900,
          alt: `${property.name} in ${property.location}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [media.src],
    },
  };
}

export default async function TrackRecordPropertyPage({
  params,
}: TrackRecordPropertyPageProps) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  const media = getPropertyPlaceholderById(property.id);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.name,
    description: property.summary,
    url: `https://raphaelcapital.co.uk/track-record/${property.id}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressCountry: "GB",
    },
    datePosted: `${property.year}-01-01`,
    category: property.sector,
    image: media.src,
    seller: {
      "@type": "Organization",
      name: "Raphael Capital",
    },
  };

  const related = allProperties
    .filter((item) => item.id !== property.id)
    .slice(0, 3);

  return (
    <div className="flex flex-col">
      <div className="bg-bg-surface">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto w-full max-w-6xl px-6 py-6 text-xs uppercase tracking-[0.24em] text-ink/55 sm:px-8 lg:px-10"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href="/"
                className="font-medium text-ink/70 hover:text-rc-navy"
              >
                Home
              </Link>
            </li>
            <li className="text-ink/35">/</li>
            <li>
              <Link
                href="/track-record"
                className="font-medium text-ink/70 hover:text-rc-navy"
              >
                Track Record
              </Link>
            </li>
            <li className="text-ink/35">/</li>
            <li className="text-inkStrong">{property.name}</li>
          </ol>
        </nav>
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-10">
        <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[var(--radius-card)] bg-rc-navy/10 shadow-md">
          <div className="relative aspect-[16/9] sm:aspect-[2/1]">
            <Image
              src={media.src}
              alt={media.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={media.blurDataURL}
            />
          </div>
        </div>
      </div>

      <Section
        className="pb-12 pt-12 sm:pb-16 sm:pt-16"
        containerClassName="gap-12"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,_1.8fr)_minmax(0,_1fr)]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em]">
              <span className="font-semibold text-ink/55">
                {property.sector}
              </span>
              <span
                className={`rounded-full px-3 py-1 font-semibold ${
                  property.status === "current"
                    ? "bg-rc-indigo/10 text-rc-navy"
                    : "bg-ink/5 text-ink/60"
                }`}
              >
                {property.status === "current" ? "Current" : "Previous"}
              </span>
            </div>
            <h1
              className={`${playfair.className} text-4xl font-black leading-tight text-inkStrong sm:text-5xl lg:text-6xl`}
            >
              {property.name}
            </h1>
            <p className="max-w-3xl text-lg text-ink/80">{property.summary}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.24em] text-ink/60">
              <span>Location: {property.location}</span>
              <span>Completed: {property.year}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className={buttonClasses({ className: "group" })}
              >
                <span className="text-white group-hover:text-white group-focus-visible:text-white">
                  Discuss an opportunity
                </span>
              </Link>
              <Link
                href="/track-record"
                className={buttonClasses({
                  variant: "secondary",
                  className: "group",
                })}
              >
                <span className="text-rc-navy group-hover:text-white group-focus-visible:text-white">
                  Back to portfolio
                </span>
              </Link>
            </div>
          </div>
          <div className="grid gap-4 text-sm text-inkStrong">
            <div className="rounded-[var(--radius-card)] border border-border-subtle/70 bg-white/95 p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-ink/55">
                Location
              </p>
              <p className="mt-2 text-base font-semibold text-inkStrong">
                {property.location}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-border-subtle/70 bg-white/95 p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-ink/55">
                Sector focus
              </p>
              <p className="mt-2 text-base font-semibold text-inkStrong">
                {property.sector}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-border-subtle/70 bg-white/95 p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-ink/55">
                Completion
              </p>
              <p className="mt-2 text-base font-semibold text-inkStrong">
                {property.year}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section headline="Investment highlights" containerClassName="gap-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 text-base text-ink/80">
            <p>
              Raphael Capital originated, structured and stewarded{" "}
              <strong>{property.name}</strong> on behalf of trusted capital
              partners. The project underscores our discipline in identifying
              enduring value within {property.location}, pairing thoughtful
              design with long-term tenancy strategies.
            </p>
            <p>
              Our stewardship encompassed acquisition, repositioning and
              stabilisation, aligning the asset with institutional-grade ESG and
              operational benchmarks. The investment now provides resilient
              income and capital appreciation for our partners.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[var(--radius-card)] border border-border-subtle/60 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-inkStrong">
                Disciplined acquisition
              </p>
              <p className="mt-2 text-sm text-ink/75">
                Off-market sourcing ensured favourable entry pricing and aligned
                incentives with co-investors.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-border-subtle/60 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-inkStrong">
                Design-led repositioning
              </p>
              <p className="mt-2 text-sm text-ink/75">
                Architectural upgrades delivered best-in-class space while
                preserving the character of the surrounding neighbourhood.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-border-subtle/60 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-inkStrong">
                Stewardship &amp; ESG
              </p>
              <p className="mt-2 text-sm text-ink/75">
                Operational enhancements improved energy performance, tenant
                experience and long-term resilience.
              </p>
            </div>
          </div>
        </div>
      </Section>
      {related.length ? (
        <Section
          headline="More from our portfolio"
          className="bg-bg-faint"
          containerClassName="gap-12"
        >
          <RelatedProperties properties={related} />
        </Section>
      ) : null}

      <CallToActionBanner
        href="/contact"
        headline="Explore future mandates"
        subheadline="Start a conversation →"
        className="border-t border-border-strong/30"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
