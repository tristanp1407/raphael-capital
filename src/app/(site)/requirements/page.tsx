import type { Metadata } from "next";
import { Section } from "@/components/section";
import { CallToActionBanner } from "@/components/call-to-action-banner";
import { playfair } from "@/app/fonts";
import { AnimatedGridPattern } from "@/components/animated-grid-pattern";
import { client } from "@/lib/sanity/client";
import { requirementsPageQuery } from "@/lib/sanity/queries";
import type { RequirementsPage as RequirementsPageContent } from "@/types/sanity";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageContent = await client.fetch(requirementsPageQuery);
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
    title: "Acquisition Requirements | Raphael Capital",
    description:
      "Discover the property sectors Raphael Capital is actively seeking, including mixed-use, retail, offices, industrial warehouses, shopping centres and development land across the UK.",
  };
}

export default async function RequirementsPage() {
  let pageContent: RequirementsPageContent | null = null;

  try {
    pageContent = await client.fetch(requirementsPageQuery);
  } catch (error) {
    console.error("Failed to fetch data from Sanity:", error);
  }

  if (!pageContent) {
    return <div className="p-10 text-center text-red-600">Requirements page content not found in CMS</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden">
        <AnimatedGridPattern
          className="absolute top-[-30] sm:top-[-80] inset-y-0 right-0 h-full w-[62%] skew-y-8 text-rc-navy/18 [mask-image:radial-gradient(480px_circle_at_right,white,transparent)]"
          numSquares={240}
          width={26}
          height={26}
          maxOpacity={0.05}
        />
        <Section
          id="requirements-intro"
          headline={pageContent.introHeadline}
          containerClassName="gap-8"
          className="relative z-10"
        >
          <p className="max-w-3xl text-base text-ink/75">
            {pageContent.introBodyText}
          </p>
        </Section>
      </div>
      <Section
        id="requirements-list"
        className="bg-bg-faint"
        containerClassName="gap-8"
        animated={false}
      >
        <div className="flex flex-col gap-6">
          <h2 className={`${playfair.className} text-3xl font-black text-inkStrong sm:text-4xl`}>
            {pageContent.assetProfilesSubheadline}
          </h2>
          <p className="max-w-3xl text-base text-ink/70 sm:text-lg">
            {pageContent.assetProfilesIntro}
          </p>
        </div>
        <ul className="grid gap-6 text-lg leading-relaxed text-ink/85 sm:gap-8 md:grid-cols-2">
          {pageContent.requirements.map((item) => (
            <li
              key={item.label}
              className="relative flex items-center gap-6 pl-12 sm:pl-14 sm:gap-7"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 inline-flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-rc-navy/80 bg-transparent sm:left-4 sm:h-7 sm:w-7"
              />
              <span className="block">{item.value}</span>
            </li>
          ))}
        </ul>
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
