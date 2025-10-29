import { FadeIn } from "./fade-in";
import { playfair } from "@/app/fonts";
import { ReactNode } from "react";

type SectionProps = {
  id?: string;
  headline?: string;
  className?: string;
  children: ReactNode;
  containerClassName?: string;
  bleed?: boolean;
  delay?: number;
  padding?: string;
  animated?: boolean;
};

export function Section({
  id,
  headline,
  className,
  containerClassName,
  bleed = false,
  delay,
  padding,
  animated = true,
  children,
}: SectionProps) {
  const slugFromHeadline = (label: string) =>
    label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const baseId = id ?? (headline ? slugFromHeadline(headline) : undefined);
  const headingId = headline ? `${baseId ?? "section"}-heading` : undefined;
  const paddingClasses = padding ?? "py-20 sm:py-24";
  const containerClasses = `mx-auto flex w-full ${
    bleed ? "max-w-none" : "max-w-[1280px]"
  } flex-col gap-10 px-6 sm:px-8 lg:px-10 ${containerClassName ?? ""}`;

  const headingNode = headline
    ? animated
      ? (
          <FadeIn as="header" delay={delay} className="max-w-3xl">
            <h2
              className={`${playfair.className} text-3xl font-black tracking-tight text-inkStrong sm:text-4xl`}
              id={headingId}
            >
              {headline}
            </h2>
          </FadeIn>
        )
      : (
          <header className="max-w-3xl">
            <h2
              className={`${playfair.className} text-3xl font-black tracking-tight text-inkStrong sm:text-4xl`}
              id={headingId}
            >
              {headline}
            </h2>
          </header>
        )
    : null;

  const contentNode = animated ? (
    <FadeIn delay={delay} className="flex flex-col gap-10">
      {children}
    </FadeIn>
  ) : (
    <div className="flex flex-col gap-10">{children}</div>
  );

  return (
    <section
      id={baseId}
      className={`relative w-full ${paddingClasses} ${className ?? ""}`}
      aria-labelledby={headingId}
    >
      <div className={containerClasses}>
        {headingNode}
        {contentNode}
      </div>
    </section>
  );
}
