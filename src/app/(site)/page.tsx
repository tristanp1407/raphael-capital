import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { PropertyGrid } from "@/components/property-grid";
import { LogosCarousel } from "@/components/logos-carousel";
import { client } from "@/lib/sanity/client";
import { featuredProjectsQuery, homePageQuery, allBrandLogosQuery } from "@/lib/sanity/queries";
import type { Project, HomePage as HomePageContent, BrandLogo } from "@/types/sanity";
import { CallToActionBanner } from "@/components/call-to-action-banner";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageContent = await client.fetch(homePageQuery);
    if (pageContent) {
      return {
        title: pageContent.seoTitle,
        description: pageContent.seoDescription,
      };
    }
  } catch (error) {
    console.error("Failed to fetch page metadata:", error);
  }

  // Fallback metadata
  return {
    title: "Raphael Capital | Private Property Investment & Development",
    description:
      "Raphael Capital is a privately owned UK property investment company acquiring and repositioning assets across retail, mixed-use, residential, office and industrial sectors.",
  };
}

export default async function HomePage() {
  let projects: Project[] = [];
  let pageContent: HomePageContent | null = null;
  let brands: BrandLogo[] = [];

  try {
    // Fetch all data in parallel
    const [projectsData, pageData, brandsData] = await Promise.all([
      client.fetch(featuredProjectsQuery),
      client.fetch(homePageQuery),
      client.fetch(allBrandLogosQuery),
    ]);

    projects = projectsData;
    pageContent = pageData;
    brands = brandsData;
  } catch (error) {
    console.error("Failed to fetch data from Sanity:", error);
  }

  if (!pageContent) {
    return <div className="p-10 text-center text-red-600">Home page content not found in CMS</div>;
  }
  return (
    <div className="flex flex-col">
      <Hero
        heading={pageContent.heroHeading}
        subheading={pageContent.heroSubheading}
        cta1Text={pageContent.heroCta1Text}
        cta1Href={pageContent.heroCta1Href}
        cta2Text={pageContent.heroCta2Text}
        cta2Href={pageContent.heroCta2Href}
      />
      <Section
        id="featured-properties"
        headline={pageContent.featuredHeadline}
        containerClassName="gap-14"
      >
        <p className="max-w-3xl text-base text-ink/75">
          {pageContent.featuredBodyText}
        </p>
        <PropertyGrid properties={projects} />
      </Section>
      <Section
        id="about-overview"
        headline={pageContent.aboutHeadline}
        className="bg-bg-faint"
        containerClassName="gap-16"
      >
        <div className="flex flex-col gap-12">
          <div className="space-y-6 text-base text-ink/75">
            {pageContent.aboutParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-inkStrong underline decoration-[4px] decoration-accent/40 underline-offset-8 transition hover:decoration-accent"
            >
              {pageContent.aboutLinkText}
            </Link>
          </div>
          <LogosCarousel logos={brands} />
        </div>
      </Section>
      <CallToActionBanner
        className="mt-0"
        href={pageContent.ctaBannerHref}
        headline={pageContent.ctaBannerHeadline}
        subheadline={pageContent.ctaBannerSubheadline}
      />
    </div>
  );
}
