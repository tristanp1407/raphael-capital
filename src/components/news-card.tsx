import Image from "next/image";
import Link from "next/link";
import { playfair } from "@/app/fonts";
import { urlFor } from "@/lib/sanity/image";
import type { CompanyNewsPost } from "@/types/sanity";

type NewsCardProps = {
  post: CompanyNewsPost;
  index?: number;
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export function NewsCard({ post, index = 0 }: NewsCardProps) {
  const imageUrl = post.coverImage
    ? urlFor(post.coverImage.asset).width(720).height(480).url()
    : "";
  const imageAlt = post.coverImage?.alt ?? post.title;
  const imageLqip = post.coverImage?.asset.metadata.lqip;
  const dateLabel = formatDate(post.publishedAt);

  return (
    <Link
      href={`/news/${post.slug}`}
      className="group block h-full"
      aria-label={`Read article: ${post.title}`}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border-subtle/60 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-card">
        {imageUrl ? (
          <div className="relative h-56 overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority={index < 2}
              sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
              placeholder={imageLqip ? "blur" : undefined}
              blurDataURL={imageLqip}
            />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col gap-3 p-6">
          {dateLabel ? (
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-ink/55">
              {dateLabel}
            </p>
          ) : null}
          <h3
            className={`${playfair.className} text-xl font-black leading-snug text-inkStrong`}
          >
            {post.title}
          </h3>
          {post.subtitle ? (
            <p className="text-sm text-ink/75">{post.subtitle}</p>
          ) : null}
          <span className="mt-auto pt-2 text-sm font-medium text-rc-navy underline decoration-accent/40 underline-offset-4 transition group-hover:decoration-accent">
            Read more →
          </span>
        </div>
      </article>
    </Link>
  );
}
