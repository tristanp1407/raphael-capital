import type { Metadata } from "next";
import { Section } from "@/components/section";
import { BrandsGrid } from "@/components/brands-grid";
import { playfair } from "@/app/fonts";
import { brands } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Raphael Capital | UK Property Investment & Development",
  description:
    "Learn how Raphael Capital acquires and develops UK real estate with private capital, delivering discreet transactions across retail, office, mixed-use and residential sectors.",
};

const teamMembers = [
  {
    name: "Victor Levy",
    role: "Managing Partner",
    bios: [
      "Victor Levy is a qualified accountant with over 50 years of experience in the property sector.",
      "He founded Raphael Property Investment Company in 1989 after a successful career at Arthur Andersen, where he led the International Banking and Financial Markets division.",
      "More recently, Victor played a pivotal role in establishing Raphael Capital LLP, where he now oversees the partnership's investment strategy.",
    ],
  },
  {
    name: "Samuel Levy",
    role: "Partner",
    bios: [
      "Samuel Levy is a Chartered Surveyor with over 8 years of experience in the real estate sector.",
      "He began his career at a PLC housebuilder before joining CBRE's London Development team.",
      "Across both roles, he has been involved in transactions exceeding GBP 600 million within the living development sector. Samuel now works closely alongside Victor to run the day-to-day operations of the partnership, focusing on deal origination and management to drive long-term growth.",
    ],
  },
] as const;

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
        id="about-team"
        headline="The Team"
        containerClassName="gap-12"
      >
        <div className="grid gap-10 lg:grid-cols-2">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-border-subtle/70 bg-white/95 p-6 shadow-sm"
            >
              <div>
                <h3
                  className={`${playfair.className} text-2xl font-black text-inkStrong sm:text-[28px]`}
                >
                  {member.name}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.28em] text-ink/55">
                  {member.role}
                </p>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-ink/75">
                {member.bios.map((paragraph, index) => (
                  <p key={`${member.name}-${index}`}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
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
