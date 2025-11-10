import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { client } from "@/lib/sanity/client";
import { footerContentQuery, contactInfoQuery, footerTeamMembersQuery } from "@/lib/sanity/queries";
import type { FooterContent, ContactInfo, TeamMember } from "@/types/sanity";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  let footerContent: FooterContent | null = null;
  let contactInfo: ContactInfo | null = null;
  let teamMembers: TeamMember[] = [];

  try {
    const [footerData, contactData, teamData] = await Promise.all([
      client.fetch(footerContentQuery),
      client.fetch(contactInfoQuery),
      client.fetch(footerTeamMembersQuery),
    ]);

    footerContent = footerData;
    contactInfo = contactData;
    teamMembers = teamData;
  } catch (error) {
    console.error("Failed to fetch footer data from Sanity:", error);
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg-surface text-ink overflow-x-hidden">
      <SiteHeader />
      <main className="flex-1 pt-[92px] sm:pt-[108px] lg:pt-[120px]">{children}</main>
      <SiteFooter
        footerContent={footerContent}
        contactInfo={contactInfo}
        teamMembers={teamMembers}
      />
    </div>
  );
}
