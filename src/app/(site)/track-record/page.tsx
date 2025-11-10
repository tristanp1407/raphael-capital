import type { Metadata } from "next";
import { Section } from "@/components/section";
import { TrackRecordView } from "@/components/track-record-view";
import { client } from "@/lib/sanity/client";
import { allProjectsQuery, allSectorsQuery, trackRecordPageQuery } from "@/lib/sanity/queries";
import type { Project, Sector, TrackRecordPage as TrackRecordPageContent } from "@/types/sanity";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageContent = await client.fetch(trackRecordPageQuery);
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
    title: "Projects | Raphael Capital",
    description:
      "Review Raphael Capital's current and previous UK property projects across retail, office, industrial, residential, mixed-use and development sectors.",
  };
}

export default async function ProjectsPage() {
  let projects: Project[] = [];
  let sectors: Sector[] = [];
  let pageContent: TrackRecordPageContent | null = null;

  try {
    // Fetch all data in parallel
    const [projectsData, sectorsData, pageData] = await Promise.all([
      client.fetch(allProjectsQuery),
      client.fetch(allSectorsQuery),
      client.fetch(trackRecordPageQuery),
    ]);
    projects = projectsData;
    sectors = sectorsData;
    pageContent = pageData;
  } catch (error) {
    console.error("Failed to fetch data from Sanity:", error);
  }

  if (!pageContent) {
    return <div className="p-10 text-center text-red-600">Track Record page content not found in CMS</div>;
  }

  return (
    <div className="flex flex-col">
      <Section
        id="projects-intro"
        headline={pageContent.headline}
        className="bg-bg-faint"
        containerClassName="gap-6"
        padding="py-12 sm:py-16"
      >
        <p className="max-w-3xl text-base text-ink/75">
          {pageContent.introText}
        </p>
      </Section>
      <Section
        id="projects-grid"
        className="bg-bg-faint"
        padding="py-12 sm:py-16"
        animated={false}
      >
        <TrackRecordView
          properties={projects}
          sectors={sectors}
          filterLabels={{
            all: pageContent.filterAllLabel,
            current: pageContent.filterCurrentLabel,
            previous: pageContent.filterPreviousLabel,
          }}
          showMoreButtonText={pageContent.showMoreButtonText}
        />
      </Section>
    </div>
  );
}
