import type { Metadata } from "next";
import { Section } from "@/components/section";
import { BrandsGrid } from "@/components/brands-grid";
import { Timeline } from "@/components/timeline";
import { brands, historyMilestones } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover Raphael Capital's heritage, partnerships and investment philosophy.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <Section
        id="about-intro"
        headline="Heritage stewardship, institutional discipline"
        containerClassName="gap-10"
      >
        <div className="space-y-6 text-base text-ink/75">
          <p>
            For twenty-five years, Raphael Capital has stewarded private family
            wealth into enduring real estate assets. Built on discretion and
            conviction, our partnerships span household retail brands,
            blue-chip offices and bespoke residential developments.
          </p>
          <p>
            We deploy capital methodically, uncovering value through planning
            expertise, design sensitivity and operational focus. Every asset is
            curated to balance income security today with capital growth for the
            next generation.
          </p>
        </div>
      </Section>
      <Section
        id="about-timeline"
        headline="Milestones"
        containerClassName="gap-12"
      >
        <Timeline items={historyMilestones} />
      </Section>
      <Section
        id="about-brands"
        headline="Trusted by leading brands"
        containerClassName="gap-12"
      >
        <BrandsGrid brands={brands} />
      </Section>
      <Section id="about-philosophy" className="bg-bg-faint">
        <blockquote className="rounded-[var(--radius-card)] border border-border-subtle/70 bg-white/95 p-10 text-lg italic leading-relaxed text-ink/80 shadow-sm">
          "We take responsibility for every detail -- from first conversation to
          final handover. Our reputation is built on quiet delivery, not noise."
        </blockquote>
      </Section>
    </div>
  );
}
