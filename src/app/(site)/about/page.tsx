import type { Metadata } from "next";
import { Section } from "@/components/section";
import { BrandsGrid } from "@/components/brands-grid";
import { playfair } from "@/app/fonts";
import { AnimatedGridPattern } from "@/components/animated-grid-pattern";
import { client } from "@/lib/sanity/client";
import { aboutPageQuery, aboutTeamMembersQuery, allBrandLogosQuery } from "@/lib/sanity/queries";
import type { AboutPage as AboutPageContent, TeamMember, BrandLogo } from "@/types/sanity";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageContent = await client.fetch(aboutPageQuery);
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
    title: "About Raphael Capital | UK Property Investment & Development",
    description:
      "Learn how Raphael Capital acquires and develops UK real estate with private capital, delivering discreet transactions across retail, office, mixed-use and residential sectors.",
  };
}

export default async function AboutPage() {
  let pageContent: AboutPageContent | null = null;
  let teamMembers: TeamMember[] = [];
  let brandLogos: BrandLogo[] = [];

  try {
    // Fetch all data in parallel
    const [pageData, teamData, brandsData] = await Promise.all([
      client.fetch(aboutPageQuery),
      client.fetch(aboutTeamMembersQuery),
      client.fetch(allBrandLogosQuery),
    ]);

    pageContent = pageData;
    teamMembers = teamData;
    brandLogos = brandsData;
  } catch (error) {
    console.error("Failed to fetch data from Sanity:", error);
  }

  if (!pageContent) {
    return <div className="p-10 text-center text-red-600">About page content not found in CMS</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden">
        <AnimatedGridPattern
          className="absolute top-[-30] sm:top-[-100] inset-y-0 right-0 h-full w-[65%] skew-y-8 text-rc-navy/18 [mask-image:radial-gradient(520px_circle_at_right,white,transparent)]"
          numSquares={160}
          width={28}
          height={28}
          maxOpacity={0.06}
        />
        <Section
          id="about-intro"
          headline={pageContent.introHeadline}
          containerClassName="gap-10"
          className="relative z-10"
        >
          <div className="space-y-6 text-base text-ink/75">
            {pageContent.introParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </Section>
      </div>
      <Section
        id="about-team"
        headline={pageContent.teamHeadline}
        className="bg-bg-faint"
        containerClassName="gap-12"
      >
        <div className="grid gap-10 lg:grid-cols-2">
          {teamMembers.map((member) => (
            <article
              key={member._id}
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
              {member.bio && member.bio.length > 0 && (
                <div className="space-y-4 text-base leading-relaxed text-ink/75">
                  {member.bio.map((paragraph, index) => (
                    <p key={`${member._id}-${index}`}>{paragraph}</p>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </Section>
      <Section
        id="about-brands"
        headline={pageContent.brandsHeadline}
        containerClassName="gap-12"
      >
        <BrandsGrid brands={brandLogos} />
      </Section>
    </div>
  );
}
