import { FadeIn } from "@/components/fade-in";
import { HeroColumns } from "@/components/hero-columns";
import { playfair } from "@/app/fonts";
import Link from "next/link";
import { buttonClasses } from "@/components/button";

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
          <div className="mt-8 flex flex-wrap items-center gap-6 max-[630px]:flex-col max-[630px]:items-stretch max-[630px]:gap-4 [&>a]:max-w-[220px] [&>a]:flex-1 [&>a]:sm:flex-initial">
            <Link
              href="/track-record"
              className={`${buttonClasses()} relative isolate overflow-hidden shadow-md hover:-translate-y-0.5 before:absolute before:inset-0 before:-z-10 before:translate-x-[-30%] before:bg-gradient-to-r before:from-white/20 before:via-white/5 before:to-transparent before:opacity-0 before:transition before:duration-500 before:content-[''] hover:before:opacity-100`}
            >
              <span className="text-white">View Projects</span>
            </Link>
            <Link
              href="/requirements"
              className={`${buttonClasses({
                variant: "secondary",
              })} group hover:-translate-y-0.5`}
            >
              <span className="text-rc-navy group-hover:text-white group-focus-visible:text-white">
                Requirements
              </span>
            </Link>
          </div>
        </FadeIn>
      </div>
      <HeroColumns className="pointer-events-none absolute bottom-0 right-[3%] flex items-end gap-0 sm:right-[5%] sm:gap-5 sm:translate-y-[calc(50%+10px)] md:translate-y-[calc(55%+10px)] md:gap-6 lg:right-[5%] lg:gap-7 lg:translate-y-0 xl:right-[10%]" />
    </section>
  );
}
