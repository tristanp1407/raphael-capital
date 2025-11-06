import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { playfair } from "@/app/fonts";
import { buttonClasses } from "@/components/button";
import { Section } from "@/components/section";
import { RelatedProperties } from "@/components/related-properties";
import { CallToActionBanner } from "@/components/call-to-action-banner";
import { ProjectImageCarousel } from "@/components/project-image-carousel";
import { client } from "@/lib/sanity/client";
import { projectBySlugQuery, projectSlugsQuery, allProjectsQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { Project } from "@/types/sanity";
import {
  allProperties,
  getPropertyById,
  getPropertyPlaceholderById,
} from "@/lib/data";

type ProjectsPropertyPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(projectSlugsQuery);
    return slugs.map((item) => ({
      id: item.slug,
    }));
  } catch (error) {
    console.error("Failed to fetch project slugs:", error);
    return allProperties.map((prop) => ({
      id: prop.id,
    }));
  }
}

export async function generateMetadata({
  params,
}: ProjectsPropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  let project: Project | null = null;

  try {
    project = await client.fetch(projectBySlugQuery, { slug: id });
  } catch (error) {
    console.error("Failed to fetch project metadata:", error);
  }

  // Fallback to static data
  if (!project) {
    const property = getPropertyById(id);
    if (!property) {
      return {
        title: "Project not found | Raphael Capital",
        description: "The requested project could not be located.",
      };
    }

    const media = getPropertyPlaceholderById(property.id);
    const description = `${property.summary} Located in ${property.location}.`;
    const title = `${property.name} | Projects | Raphael Capital`;
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

  const description = `${project.summary} Located in ${project.location}.`;
  const title = `${project.name} | Projects | Raphael Capital`;
  const url = `/track-record/${project.slug}`;
  const imageUrl = project.heroImage
    ? urlFor(project.heroImage.asset).width(1600).height(900).url()
    : "";

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
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1600,
              height: 900,
              alt: project.heroImage?.alt || `${project.name} in ${project.location}`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ProjectsPropertyPage({
  params,
}: ProjectsPropertyPageProps) {
  const { id } = await params;
  let project: Project | null = null;

  try {
    project = await client.fetch(projectBySlugQuery, { slug: id });
  } catch (error) {
    console.error("Failed to fetch project:", error);
  }

  // Fallback to static data
  if (!project) {
    const property = getPropertyById(id);
    if (!property) {
      notFound();
    }

    const media = getPropertyPlaceholderById(property.id);
    project = {
      _id: property.id,
      name: property.name,
      slug: property.id,
      location: property.location,
      sectors: [],
      summary: property.summary,
      status: property.status,
      featured: property.featured || false,
      heroImage: {
        asset: {
          _id: "placeholder",
          url: media.src,
          metadata: {
            lqip: media.blurDataURL,
            dimensions: { width: 1600, height: 900, aspectRatio: 16 / 9 },
          },
        },
        alt: media.alt,
      },
    };
  }

  const imageUrl = project.heroImage?.asset.url || "";
  const imageLqip = project.heroImage?.asset.metadata.lqip || "";
  const imageAlt = project.heroImage?.alt || `${project.name} in ${project.location}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: project.name,
    description: project.summary,
    url: `https://raphaelcapital.co.uk/track-record/${project.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: project.location,
      addressCountry: "GB",
    },
    category: project.sectors?.map(s => s.name) || [],
    image: imageUrl,
    seller: {
      "@type": "Organization",
      name: "Raphael Capital",
    },
  };

  // Smart project suggestions algorithm
  const getSuggestedProjects = () => {
    try {
      // Fetch all projects from Sanity
      const allProjects = client.fetch<Project[]>(allProjectsQuery).catch(() => []);
      return allProjects;
    } catch {
      return [];
    }
  };

  const allProjects = await getSuggestedProjects();

  // Get the current project's sector names
  const currentSectorNames = project.sectors?.map(s => s.name) || [];

  // Smart suggestion algorithm with prioritization:
  // 1. Projects with overlapping sectors (more overlap = higher score)
  // 2. Same status (current/previous)
  // 3. Featured projects
  const related = allProjects
    .filter((item) => item.slug !== project.slug) // Exclude current project
    .map((item) => {
      const itemSectorNames = item.sectors?.map(s => s.name) || [];

      let score = 0;

      // Check if ANY sectors overlap
      const overlappingSectors = itemSectorNames.filter(name =>
        currentSectorNames.includes(name)
      );

      if (overlappingSectors.length > 0) {
        // Base score for having common sectors
        score += 100;
        // Bonus for each additional overlapping sector
        score += (overlappingSectors.length - 1) * 20;
      }

      // Same status gets medium priority
      if (item.status === project.status) {
        score += 50;
      }

      // Featured projects get slight boost
      if (item.featured) {
        score += 10;
      }

      return { project: item, score };
    })
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .slice(0, 3) // Take top 3
    .map((item) => item.project);

  return (
    <div className="flex flex-col">
      <div className="bg-bg-surface">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto w-full max-w-[1280px] px-6 py-6 text-xs uppercase tracking-[0.24em] text-ink/55 sm:px-8 lg:px-10"
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
                Projects
              </Link>
            </li>
            <li className="text-ink/35">/</li>
            <li className="text-inkStrong">{project.name}</li>
          </ol>
        </nav>
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-10">
        <div className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-[var(--radius-card)] bg-rc-navy/10 shadow-md">
          <ProjectImageCarousel
            images={[
              ...(project.heroImage ? [project.heroImage] : []),
              ...(project.gallery || [])
            ]}
          />
        </div>
      </div>

      <Section
        className="pb-12 pt-12 sm:pb-16 sm:pt-16"
        containerClassName="gap-12"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em]">
            {project.sectors && project.sectors.length > 0 ? (
              project.sectors.map((sector) => (
                <span key={sector._id} className="font-semibold text-ink/55">
                  {sector.name}
                </span>
              ))
            ) : null}
            <span
              className={`rounded-full px-3 py-1 font-semibold ${
                project.status === "current"
                  ? "bg-rc-indigo/10 text-rc-navy"
                  : "bg-ink/5 text-ink/60"
              }`}
            >
              {project.status === "current" ? "Current" : "Previous"}
            </span>
          </div>
          <h1
            className={`${playfair.className} text-4xl font-black leading-tight text-inkStrong sm:text-5xl lg:text-6xl`}
          >
            {project.name}
          </h1>
          <p className="max-w-3xl text-lg text-ink/80">{project.summary}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.24em] text-ink/60">
            <span>Location: {project.location}</span>
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
                Back to projects
              </span>
            </Link>
          </div>
        </div>
      </Section>

      <Section headline="Investment highlights" containerClassName="gap-8">
        <div className="flex flex-col gap-4">
          <div className="space-y-3 text-sm text-ink/80">
            <p>
              Raphael Capital originated, structured and stewarded{" "}
              <strong>{project.name}</strong> on behalf of trusted capital
              partners. The project underscores our discipline in identifying
              enduring value within {project.location}, pairing thoughtful
              design with long-term tenancy strategies.
            </p>
            <p>
              Our stewardship encompassed acquisition, repositioning and
              stabilisation, aligning the asset with institutional-grade ESG and
              operational benchmarks.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="rounded-[var(--radius-card)] border border-border-subtle/60 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-inkStrong">
                Disciplined acquisition
              </p>
              <p className="mt-1 text-sm text-ink/75">
                Off-market sourcing ensured favourable entry pricing and aligned
                incentives with co-investors.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-border-subtle/60 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-inkStrong">
                Design-led repositioning
              </p>
              <p className="mt-1 text-sm text-ink/75">
                Architectural upgrades delivered best-in-class space while
                preserving the character of the surrounding neighbourhood.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-border-subtle/60 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-inkStrong">
                Stewardship &amp; ESG
              </p>
              <p className="mt-1 text-sm text-ink/75">
                Operational enhancements improved energy performance, tenant
                experience and long-term resilience.
              </p>
            </div>
          </div>
        </div>
      </Section>
      {related.length ? (
        <Section
          headline="More from our projects"
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
