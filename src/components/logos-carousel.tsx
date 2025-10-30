"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import type { BrandLogo } from "@/lib/data";

type LogosCarouselProps = {
  logos: readonly BrandLogo[];
  className?: string;
  autoAdvanceInterval?: number;
};

function cn(...classes: Array<string | null | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function splitLogosIntoRows(logos: readonly BrandLogo[]) {
  const firstRow: BrandLogo[] = [];
  const secondRow: BrandLogo[] = [];

  logos.forEach((logo, index) => {
    if (index % 2 === 0) {
      firstRow.push(logo);
    } else {
      secondRow.push(logo);
    }
  });

  if (secondRow.length === 0) {
    secondRow.push(...firstRow);
  }

  return [firstRow, secondRow] as const;
}

export function LogosCarousel({
  logos,
  className,
  autoAdvanceInterval = 3500,
}: LogosCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const [firstRow, secondRow] = useMemo(
    () => splitLogosIntoRows(logos),
    [logos]
  );

  const [firstRowRef, firstRowApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true,
  });
  const [secondRowRef, secondRowApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true,
  });

  useEffect(() => {
    firstRowApi?.reInit();
  }, [firstRowApi, firstRow.length]);

  useEffect(() => {
    secondRowApi?.reInit();
  }, [secondRowApi, secondRow.length]);

  useEffect(() => {
    if (!firstRowApi || !secondRowApi || prefersReducedMotion) return;

    const staggerDelay = 50;
    let intervalId: number | null = null;
    let timeoutId: number | null = null;

    const clearTimers = () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const scheduleAdvance = () => {
      clearTimers();

      intervalId = window.setInterval(() => {
        firstRowApi.scrollNext();
        timeoutId = window.setTimeout(() => {
          secondRowApi.scrollNext();
        }, staggerDelay);
      }, autoAdvanceInterval);
    };

    const stopAutoplay = () => {
      clearTimers();
    };

    const resumeAutoplay = () => {
      scheduleAdvance();
    };

    scheduleAdvance();

    const firstRootNode = firstRowApi.rootNode();
    const secondRootNode = secondRowApi.rootNode();

    firstRowApi.on("pointerDown", stopAutoplay);
    secondRowApi.on("pointerDown", stopAutoplay);
    firstRowApi.on("pointerUp", resumeAutoplay);
    secondRowApi.on("pointerUp", resumeAutoplay);

    firstRootNode.addEventListener("pointerenter", stopAutoplay);
    secondRootNode.addEventListener("pointerenter", stopAutoplay);
    firstRootNode.addEventListener("pointerleave", resumeAutoplay);
    secondRootNode.addEventListener("pointerleave", resumeAutoplay);

    return () => {
      clearTimers();
      firstRowApi.off("pointerDown", stopAutoplay);
      secondRowApi.off("pointerDown", stopAutoplay);
      firstRowApi.off("pointerUp", resumeAutoplay);
      secondRowApi.off("pointerUp", resumeAutoplay);

      firstRootNode.removeEventListener("pointerenter", stopAutoplay);
      secondRootNode.removeEventListener("pointerenter", stopAutoplay);
      firstRootNode.removeEventListener("pointerleave", resumeAutoplay);
      secondRootNode.removeEventListener("pointerleave", resumeAutoplay);
    };
  }, [firstRowApi, secondRowApi, autoAdvanceInterval, prefersReducedMotion]);

  const renderRow = (
    rowLogos: readonly BrandLogo[],
    emblaRef: ReturnType<typeof useEmblaCarousel>[0]
  ) => (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex items-center gap-10 sm:gap-12 lg:gap-16 py-1">
        {rowLogos.map((logo, index) => (
          <div
            key={`${logo.image}-${index}`}
            className="relative flex h-24 w-[160px] flex-none items-center justify-center sm:h-28 sm:w-[200px] lg:h-32 lg:w-[240px]"
          >
            <Image
              src={`/logos/${logo.image}`}
              alt={`${logo.name} logo`}
              fill
              sizes="(min-width: 1280px) 240px, (min-width: 1024px) 200px, (min-width: 640px) 180px, 40vw"
              className="object-contain"
              priority={index < 3}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (!logos.length) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-6 sm:gap-8", className)}>
      {renderRow(firstRow, firstRowRef)}
      {renderRow(secondRow, secondRowRef)}
    </div>
  );
}
