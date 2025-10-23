import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle/70 bg-bg-surface py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
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
              Quietly originating, developing and managing institutional-grade
              real estate across the United Kingdom since 1999.
            </p>
          </div>
          <nav className="flex gap-6 text-sm font-medium text-ink/75">
            <Link
              href="/requirements"
              className="transition hover:text-inkStrong hover:underline hover:underline-offset-4"
            >
              Acquisition Criteria
            </Link>
            <Link
              href="/contact"
              className="transition hover:text-inkStrong hover:underline hover:underline-offset-4"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
        <p className="text-xs uppercase tracking-[0.24em] text-ink/60">
          © {new Date().getFullYear()} Raphael Capital. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
