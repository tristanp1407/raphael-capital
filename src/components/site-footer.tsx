import Image from "next/image";
import Link from "next/link";
import type { FooterContent, ContactInfo, TeamMember } from "@/types/sanity";

interface SiteFooterProps {
  footerContent: FooterContent | null;
  contactInfo: ContactInfo | null;
  teamMembers: TeamMember[];
}

export function SiteFooter({ footerContent, contactInfo, teamMembers }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle/70 bg-bg-surface">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-10 border-b border-border-subtle/60 pb-12 md:grid-cols-2 lg:grid-cols-[minmax(0,_1.6fr)_repeat(3,minmax(0,_1fr))]">
          <div className="space-y-5">
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="Raphael Capital home"
            >
              <Image
                src="/raphael-capital-logo.svg"
                alt="Raphael Capital"
                width={360}
                height={152}
                sizes="(min-width: 640px) 320px, 220px"
                className="h-16 w-auto sm:h-[70px]"
              />
            </Link>
            <p className="max-w-xl text-sm text-ink/75">
              {footerContent?.tagline || "Quietly originating, developing and managing institutional-grade projects across the United Kingdom since 1999."}
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <Link
                href="/requirements"
                className="inline-flex items-center gap-1 text-inkStrong transition hover:text-rc-navy"
              >
                Requirements →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-inkStrong transition hover:text-rc-navy"
              >
                Contact →
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-ink/55">
              {footerContent?.quickLinksText || "Navigation"}
            </p>
            <ul className="grid gap-2 text-sm text-ink/75">
              {footerContent?.quickLinks?.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-inkStrong hover:underline hover:underline-offset-4"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-ink/55">
              Contact
            </p>
            <ul className="space-y-4 text-sm text-ink/75">
              {teamMembers.map((member) => (
                <li key={member._id} className="space-y-1">
                  <p className="text-sm font-semibold text-inkStrong">
                    {member.name}
                  </p>
                  <a
                    href={`mailto:${member.email}`}
                    className="block text-inkStrong underline decoration-[3px] decoration-accent/40 underline-offset-6 transition hover:decoration-accent"
                  >
                    {member.email}
                  </a>
                  {member.phone ? (
                    <a
                      href={`tel:${member.phone.replace(/\s+/g, "")}`}
                      className="block text-inkStrong underline decoration-[3px] decoration-accent/40 underline-offset-6 transition hover:decoration-accent"
                    >
                      {member.phone}
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-ink/55">
              Office
            </p>
            <address className="not-italic space-y-1 text-sm text-ink/75">
              {contactInfo?.companyLegalName && <p>{contactInfo.companyLegalName}</p>}
              {contactInfo?.addressLine1 && <p>{contactInfo.addressLine1}</p>}
              {contactInfo?.addressLine2 && <p>{contactInfo.addressLine2}</p>}
              {contactInfo?.city && contactInfo?.postcode && (
                <p>{contactInfo.city} {contactInfo.postcode}</p>
              )}
            </address>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.24em] text-ink/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{footerContent?.copyrightText || `© ${year} Raphael Capital. All rights reserved.`}</p>
          <p className="text-ink/40">
            {footerContent?.copyrightTagline || "Stewarding discreet UK real estate projects for partners."}
          </p>
        </div>
      </div>
    </footer>
  );
}
