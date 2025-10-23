import { FadeIn } from "@/components/fade-in";
import { playfair } from "@/app/fonts";

type TimelineItem = {
  year: number;
  title: string;
  detail: string;
};

type TimelineProps = {
  items: TimelineItem[] | readonly TimelineItem[];
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="rc-timeline relative mx-auto w-full max-w-4xl">
      <div
        className="absolute top-0 bottom-0 w-px bg-border-subtle"
        style={{ left: "calc(var(--timeline-column) / 2)" }}
        aria-hidden
      />
      <div className="space-y-12">
        {items.map((item, index) => (
          <FadeIn
            key={item.year}
            delay={0.08 * index}
            className="grid gap-6 sm:gap-8"
            style={{ gridTemplateColumns: "var(--timeline-column) 1fr" }}
          >
            <div className="relative flex justify-center">
              <span
                className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full border border-inkStrong bg-bg-surface"
                aria-hidden
              />
            </div>
            <div className="space-y-2 text-ink/75">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/50">
                {item.year}
              </p>
              <h3
                className={`${playfair.className} text-lg font-black text-inkStrong`}
              >
                {item.title}
              </h3>
              <p className="text-sm text-ink/75">{item.detail}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
