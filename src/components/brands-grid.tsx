import { FadeIn } from "@/components/fade-in";

type BrandsGridProps = {
  brands: readonly string[];
};

export function BrandsGrid({ brands }: BrandsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {brands.map((brand, index) => (
        <FadeIn
          key={brand}
          delay={0.05 * index}
          className="flex h-24 items-center justify-center rounded-[var(--radius-card)] border border-dashed border-border-subtle/80 bg-bg-faint text-sm font-medium uppercase tracking-[0.18em] text-ink/60"
        >
          {brand}
        </FadeIn>
      ))}
    </div>
  );
}
