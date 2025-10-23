import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";
import { assetRequirements } from "@/lib/data";

export const metadata: Metadata = {
  title: "Acquisition Requirements | Raphael Capital",
  description:
    "Discover the property sectors Raphael Capital is actively seeking, including mixed-use, retail, offices, industrial warehouses, shopping centres and development land across the UK.",
};

export default function RequirementsPage() {
  return (
    <div className="flex flex-col">
      <Section
        id="requirements-intro"
        headline="Acquisition criteria"
        containerClassName="gap-8"
      >
        <p className="max-w-3xl text-base text-ink/75">
          We acquire assets directly, partner with family offices, and co-invest
          alongside institutions. Our focus remains on UK opportunities where we
          can deploy insight, repositioning expertise and disciplined capital.
        </p>
      </Section>
      <Section id="requirements-list" className="bg-bg-faint">
        <div className="grid gap-10 md:grid-cols-2">
          {assetRequirements.map((item) => (
            <div
              key={item}
              className="rounded-[var(--radius-card)] border border-border-subtle/70 bg-white/95 p-6 text-sm text-ink/80 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </Section>
      <Section id="requirements-cta" className="pt-0">
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 rounded-full border border-transparent bg-rc-navy px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-rc-indigo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rc-indigo"
        >
          <span className="text-white">Discuss an opportunity</span>
        </Link>
      </Section>
    </div>
  );
}
