import type { Metadata } from "next";
import { Section } from "@/components/section";
import { TrackRecordView } from "@/components/track-record-view";
import { allProperties } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects | Raphael Capital",
  description:
    "Review Raphael Capital’s current and previous UK property projects across retail, office, industrial, residential, mixed-use and development sectors.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      <Section
        id="projects-intro"
        headline="Current and previous projects across sectors"
        className="bg-bg-faint"
        containerClassName="gap-6"
        padding="py-12 sm:py-16"
      >
        <p className="max-w-3xl text-base text-ink/75">
          Our portfolio spans prime retail frontages, headquarters offices,
          urban logistics and mixed-use regeneration. Each project is structured
          to protect capital, unlock hidden value and deliver dependable income.
        </p>
      </Section>
      <Section
        id="projects-grid"
        className="bg-bg-faint"
        padding="py-12 sm:py-16"
        animated={false}
      >
        <TrackRecordView properties={allProperties} />
      </Section>
    </div>
  );
}
