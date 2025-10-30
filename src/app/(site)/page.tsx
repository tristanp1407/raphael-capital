import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { PropertyGrid } from "@/components/property-grid";
import { LogosCarousel } from "@/components/logos-carousel";
import { featuredProperties, brands as brandLogos } from "@/lib/data";
import { CallToActionBanner } from "@/components/call-to-action-banner";

export const metadata: Metadata = {
  title: "Raphael Capital | Private Property Investment & Development",
  description:
    "Raphael Capital is a privately owned UK property investment company acquiring and repositioning assets across retail, mixed-use, residential, office and industrial sectors.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Section
        id="featured-properties"
        headline="Selected mandates"
        containerClassName="gap-14"
      >
        <p className="max-w-3xl text-base text-ink/75">
          We structure and steward complex, off-market transactions on behalf of
          family offices and institutional co-investors. Each mandate is
          underpinned by forensic due diligence, discreet execution and
          long-term value creation.
        </p>
        <PropertyGrid properties={featuredProperties} />
      </Section>
      <Section
        id="about-overview"
        headline="A discreet partner for generational capital"
        className="bg-bg-faint"
        containerClassName="gap-16"
      >
        <div className="flex flex-col gap-12">
          <div className="space-y-6 text-base text-ink/75">
            <p>
              Raphael Capital is a privately held investment partnership led by
              the Levy family. From our headquarters in London, we originate and
              manage a diversified portfolio spanning retail, office,
              residential and mixed-use assets.
            </p>
            <p>
              Our team pairs institutional discipline with a heritage mindset:
              protecting capital, preserving the character of landmark
              buildings and delivering resilient income for generations.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-inkStrong underline decoration-[4px] decoration-accent/40 underline-offset-8 transition hover:decoration-accent"
            >
              Discover our story →
            </Link>
          </div>
          <LogosCarousel logos={brandLogos} />
        </div>
      </Section>
      <CallToActionBanner
        className="mt-0"
        href="/track-record"
        headline="Explore our previous and current projects"
        subheadline="View Projects →"
      />
    </div>
  );
}
