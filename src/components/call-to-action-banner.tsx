import Link from "next/link";

type CallToActionBannerProps = {
  href: string;
  headline: string;
  subheadline?: string;
  className?: string;
};

export function CallToActionBanner({
  href,
  headline,
  subheadline,
  className,
}: CallToActionBannerProps) {
  return (
    <div
      className={`group relative isolate w-full overflow-hidden border border-border-strong/40 bg-rc-navy text-base text-white/85 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-card before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-white/15 before:via-transparent before:to-white/10 before:opacity-0 before:transition before:duration-500 before:content-[''] group-hover:before:opacity-100 ${
        className ?? ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <span className="text-lg font-semibold text-white">{headline}</span>
        {subheadline ? (
          <span className="text-sm uppercase tracking-[0.3em] text-white/70 transition duration-300 group-hover:text-white">
            {subheadline}
          </span>
        ) : null}
      </div>
      <Link
        href={href}
        className="absolute inset-0 block"
        aria-label={subheadline ? `${headline} — ${subheadline}` : headline}
      />
    </div>
  );
}
