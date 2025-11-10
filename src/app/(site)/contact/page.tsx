import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Section } from "@/components/section";
import { playfair } from "@/app/fonts";
import { OfficeLocationMap } from "@/components/office-location-map";
import { client } from "@/lib/sanity/client";
import { contactPageQuery, footerTeamMembersQuery, contactInfoQuery } from "@/lib/sanity/queries";
import type { ContactPage as ContactPageContent, TeamMember, ContactInfo } from "@/types/sanity";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageContent = await client.fetch(contactPageQuery);
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
    title: "Contact Raphael Capital",
    description:
      "Connect with Raphael Capital to discuss property investment and development opportunities across the UK.",
  };
}

export default async function ContactPage() {
  let pageContent: ContactPageContent | null = null;
  let teamMembers: TeamMember[] = [];
  let officeInfo: ContactInfo | null = null;

  try {
    // Fetch all data in parallel
    const [pageData, teamData, officeData] = await Promise.all([
      client.fetch(contactPageQuery),
      client.fetch(footerTeamMembersQuery),
      client.fetch(contactInfoQuery),
    ]);

    pageContent = pageData;
    teamMembers = teamData;
    officeInfo = officeData;
  } catch (error) {
    console.error("Failed to fetch data from Sanity:", error);
  }

  if (!pageContent) {
    return <div className="p-10 text-center text-red-600">Contact page content not found in CMS</div>;
  }

  if (!officeInfo) {
    return <div className="p-10 text-center text-red-600">Contact info not found in CMS</div>;
  }

  return (
    <div className="flex flex-col">
      <Section
        id="contact"
        headline={pageContent.mainHeadline}
        containerClassName="gap-16"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,_1.3fr)_minmax(0,_1fr)]">
          <ContactForm />
          <div className="flex flex-col gap-10 text-sm text-ink/75">
            <div className="space-y-4">
              <h3
                className={`${playfair.className} text-lg font-black text-inkStrong`}
              >
                {pageContent.leadershipSectionHeading}
              </h3>
              <ul className="space-y-4">
                {teamMembers.map((contact) => (
                  <li key={contact._id} className="border-b border-border-subtle/60 pb-4">
                    <p className="text-base font-medium text-inkStrong">
                      {contact.name}
                    </p>
                    <p className="text-sm uppercase tracking-[0.18em] text-ink/55">
                      {contact.role}
                    </p>
                    <a
                      className="mt-1 inline-flex pb-1 text-sm text-inkStrong underline decoration-[3px] decoration-accent/40 underline-offset-6 transition hover:decoration-accent"
                      href={`mailto:${contact.email}`}
                    >
                      {contact.email}
                    </a>
                    {contact.phone ? (
                      <a
                        className="mt-1 flex pb-1 text-sm text-inkStrong underline decoration-[3px] decoration-accent/40 underline-offset-6 transition hover:decoration-accent"
                        href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                      >
                        {contact.phone}
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2 text-sm text-ink/70">
              <h3
                className={`${playfair.className} text-lg font-black text-inkStrong`}
              >
                {pageContent.officeSectionHeading}
              </h3>
              <p>{officeInfo.companyLegalName}</p>
              <p>{officeInfo.addressLine1}</p>
              {officeInfo.addressLine2 && <p>{officeInfo.addressLine2}</p>}
              <p>{officeInfo.city} {officeInfo.postcode}</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <OfficeLocationMap />
        </div>
      </Section>
    </div>
  );
}
