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
    <Link
      href={href}
      className={`group relative isolate flex w-full flex-col items-start gap-4 overflow-hidden rounded-none border border-border-strong/40 bg-rc-navy px-6 py-8 text-base text-white/85 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rc-indigo sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:rounded-[var(--radius-card)] sm:px-10 sm:py-10 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-white/15 before:via-transparent before:to-white/10 before:opacity-0 before:transition before:duration-500 before:content-[''] group-hover:before:opacity-100 ${className ?? ""}`}
    >
      <span className="text-lg font-semibold text-white">{headline}</span>
      {subheadline ? (
        <span className="text-sm uppercase tracking-[0.3em] text-white/70 transition duration-300 group-hover:text-white">
          {subheadline}
        </span>
      ) : null}
    </Link>
  );
}
