import type { Metadata } from "next";
import { Section } from "@/components/section";
import { TrackRecordView } from "@/components/track-record-view";
import { allProperties } from "@/lib/data";

export const metadata: Metadata = {
  title: "Track Record",
  description:
    "Explore Raphael Capital's investment track record across UK sectors.",
};

export default function TrackRecordPage() {
  return (
    <div className="flex flex-col">
      <Section
        id="track-record-intro"
        headline="Twenty-five years of performance across sectors"
        className="bg-bg-faint"
        containerClassName="gap-6"
        padding="py-12 sm:py-16"
      >
        <p className="max-w-3xl text-base text-ink/75">
          Our portfolio spans prime retail frontages, headquarters offices,
          urban logistics and mixed-use regeneration. Each transaction is
          structured to protect capital, unlock hidden value and deliver
          dependable income.
        </p>
      </Section>
      <Section
        id="track-record-grid"
        className="bg-bg-faint"
        padding="py-12 sm:py-16"
        animated={false}
      >
        <TrackRecordView properties={allProperties} />
      </Section>
    </div>
  );
}
