"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/track-record", label: "Projects" },
  { href: "/requirements", label: "Requirements" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const current = useMemo(() => {
    if (!pathname) return "/";
    return pathname === "/" ? pathname : `/${pathname.split("/")[1] ?? ""}`;
  }, [pathname]);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileNavOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileNavOpen]);

  return (
    <header className="sticky inset-x-0 top-0 z-50  bg-bg-surface/90 backdrop-blur-sm transition">
      <div className="w-full border-b border-border-subtle/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-8 sm:py-5 lg:gap-8 lg:px-10">
          <Link
            href="/"
            className="flex items-center"
            aria-label="Raphael Capital home"
          >
            <Image
              src="/raphael-capital-logo.svg"
              alt="Raphael Capital"
              width={360}
              height={152}
              priority
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 260px, 220px"
              className="h-[60px] w-auto sm:h-16 lg:h-20"
            />
          </Link>
          <nav className="hidden items-center gap-8 text-base font-medium text-ink/80 lg:flex">
            {navLinks.map((link) => {
              const isActive = current === link.href || pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group/nav relative pb-1.5 text-inkStrong/80 transition hover:text-inkStrong"
                >
                  {link.label}
                  <span
                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-inkStrong/60 transition-transform duration-150 ease-out ${isActive ? "scale-x-100 bg-rc-indigo" : prefersReducedMotion ? "scale-x-0" : "scale-x-0 group-hover/nav:scale-x-100"}`}
                  />
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => setMobileNavOpen((value) => !value)}
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-subtle/70 text-inkStrong transition hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
            >
              {mobileNavOpen ? (
                <>
                  <motion.line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                  />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="10" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {mobileNavOpen ? (
          <motion.div
            key="mobile-navigation"
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="w-full border-b border-border-subtle/60 bg-bg-surface/95 shadow-md lg:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 sm:px-6">
              {navLinks.map((link) => {
                const isActive =
                  current === link.href || pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={`flex items-center justify-between rounded-md px-2 py-2 text-base font-medium transition ${
                      isActive ? "text-inkStrong" : "text-ink/80 hover:bg-ink/5"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive ? (
                      <span aria-hidden className="text-sm text-accent">
                        ●
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
