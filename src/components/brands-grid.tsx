import Image from "next/image";
import { FadeIn } from "@/components/fade-in";
import type { BrandLogo } from "@/lib/data";

type BrandsGridProps = {
  brands: readonly BrandLogo[];
  className?: string;
};

function cn(...classes: Array<string | null | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function BrandsGrid({ brands, className }: BrandsGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-10 lg:grid-cols-6 lg:gap-12",
        className,
      )}
    >
      {brands.map((brand, index) => (
        <FadeIn
          key={brand.name}
          delay={0.035 * index}
          className="flex h-24 items-center justify-center sm:h-28 lg:h-32"
        >
          <Image
            src={`/logos/${brand.image}`}
            alt={`${brand.name} logo`}
            width={240}
            height={96}
            className="h-full w-auto max-w-full object-contain"
            sizes="(min-width: 1280px) 220px, (min-width: 1024px) 200px, (min-width: 640px) 28vw, 40vw"
            priority={index < 6}
          />
        </FadeIn>
      ))}
    </div>
  );
}
