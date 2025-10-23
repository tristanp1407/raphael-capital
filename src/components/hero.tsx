import { buttonClasses } from "@/components/button";
import { FadeIn } from "@/components/fade-in";
import { playfair } from "@/app/fonts";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden py-32 sm:py-40">
      <div className="absolute inset-0 -z-10 gradient-veil" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[rgba(9,31,91,0.25)] via-transparent to-[rgba(53,68,121,0.15)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 sm:px-8 lg:px-10">
        <FadeIn className="max-w-4xl">
          <h1
            className={`${playfair.className} mt-4 text-4xl font-black leading-tight text-inkStrong sm:text-5xl lg:text-6xl`}
          >
            Twenty-five years of investment with certainty and discretion.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/80">
            A private investment house specialising in prime UK real estate. We
            structure, acquire and steward assets with quiet conviction for
            family offices and institutional partners.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              href="/track-record"
              className={`${buttonClasses()} relative isolate overflow-hidden shadow-md hover:-translate-y-0.5 before:absolute before:inset-0 before:-z-10 before:translate-x-[-30%] before:bg-gradient-to-r before:from-white/20 before:via-white/5 before:to-transparent before:opacity-0 before:transition before:duration-500 before:content-[''] hover:before:opacity-100`}
            >
              <span className="text-white">View Track Record</span>
            </Link>
            <Link
              href="/contact"
              className={`${buttonClasses({
                variant: "secondary",
              })} group hover:-translate-y-0.5`}
            >
              <span className="text-rc-navy group-hover:text-white group-focus-visible:text-white">
                Contact the team
              </span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
