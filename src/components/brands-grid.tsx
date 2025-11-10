import Image from "next/image";
import { FadeIn } from "@/components/fade-in";
import type { BrandLogo as LegacyBrandLogo } from "@/lib/data";
import type { BrandLogo as SanityBrandLogo } from "@/types/sanity";
import { urlFor } from "@/lib/sanity/image";

type LogoItem = LegacyBrandLogo | SanityBrandLogo;

type BrandsGridProps = {
  brands: readonly LogoItem[];
  className?: string;
};

function cn(...classes: Array<string | null | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function isSanityBrandLogo(logo: LogoItem): logo is SanityBrandLogo {
  return 'logo' in logo && typeof logo.logo === 'object';
}

export function BrandsGrid({ brands, className }: BrandsGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-10 lg:grid-cols-6 lg:gap-12",
        className,
      )}
    >
      {brands.map((brand, index) => {
        const isSanity = isSanityBrandLogo(brand);
        const imageSrc = isSanity
          ? urlFor(brand.logo).width(300).url()
          : `/logos/${brand.image}`;
        const imageAlt = isSanity
          ? brand.logo.alt || `${brand.name} logo`
          : `${brand.name} logo`;
        const key = isSanity ? brand._id : brand.name;

        return (
          <FadeIn
            key={key}
            delay={0.035 * index}
            className="flex h-24 items-center justify-center sm:h-28 lg:h-32"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={240}
              height={96}
              className="h-full w-auto max-w-full object-contain"
              sizes="(min-width: 1280px) 220px, (min-width: 1024px) 200px, (min-width: 640px) 28vw, 40vw"
              priority={index < 6}
            />
          </FadeIn>
        );
      })}
    </div>
  );
}
