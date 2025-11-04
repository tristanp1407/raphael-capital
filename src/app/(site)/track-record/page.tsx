import type { Metadata } from "next";
import { Section } from "@/components/section";
import { TrackRecordView } from "@/components/track-record-view";
import { client } from "@/lib/sanity/client";
import { allProjectsQuery, allSectorsQuery } from "@/lib/sanity/queries";
import type { Project, Sector } from "@/types/sanity";
import { allProperties } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects | Raphael Capital",
  description:
    "Review Raphael Capital's current and previous UK property projects across retail, office, industrial, residential, mixed-use and development sectors.",
};

export default async function ProjectsPage() {
  let projects: Project[] = [];
  let sectors: Sector[] = [];

  try {
    // Fetch projects and sectors from Sanity
    const [projectsData, sectorsData] = await Promise.all([
      client.fetch(allProjectsQuery),
      client.fetch(allSectorsQuery),
    ]);
    projects = projectsData;
    sectors = sectorsData;
  } catch (error) {
    console.error("Failed to fetch data from Sanity:", error);
    // Fallback to static data if Sanity fetch fails
    projects = allProperties.map((prop) => ({
      _id: prop.id,
      name: prop.name,
      slug: prop.id,
      location: prop.location,
      sector: {
        _id: prop.sector,
        name: prop.sector,
        slug: prop.sector.toLowerCase().replace(/\s+/g, '-'),
        order: 0,
      },
      summary: prop.summary,
      status: prop.status,
      featured: prop.featured || false,
    }));
  }

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
        <TrackRecordView properties={projects} sectors={sectors} />
      </Section>
    </div>
  );
}
