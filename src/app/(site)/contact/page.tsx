import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Section } from "@/components/section";
import { contacts } from "@/lib/data";
import { playfair } from "@/app/fonts";
import { OfficeLocationMap } from "@/components/office-location-map";

export const metadata: Metadata = {
  title: "Contact Raphael Capital",
  description:
    "Connect with Raphael Capital to discuss property investment and development opportunities across the UK.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <Section
        id="contact"
        headline="Speak with the partnership"
        containerClassName="gap-16"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,_1.3fr)_minmax(0,_1fr)]">
          <ContactForm />
          <div className="flex flex-col gap-10 text-sm text-ink/75">
            <div className="space-y-4">
              <h3
                className={`${playfair.className} text-lg font-black text-inkStrong`}
              >
                Leadership team
              </h3>
              <ul className="space-y-4">
                {contacts.map((contact) => (
                  <li key={contact.name} className="border-b border-border-subtle/60 pb-4">
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
                Office
              </h3>
              <p>Raphael Property Investment Co. Ltd.</p>
              <p>18 Jacob’s Well Mews</p>
              <p>London W1U 3DR</p>
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
