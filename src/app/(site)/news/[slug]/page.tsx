import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { playfair } from "@/app/fonts";
import { Section } from "@/components/section";
import { PortableTextRenderer } from "@/components/portable-text";
import { client } from "@/lib/sanity/client";
import { newsBySlugQuery, newsSlugsQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { portableTextToPlainText } from "@/lib/portable-text";
import type { CompanyNewsPost } from "@/types/sanity";

type NewsPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(newsSlugsQuery);
    return slugs.map((item) => ({ slug: item.slug }));
  } catch (error) {
    console.error("Failed to fetch news slugs:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: NewsPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  let post: CompanyNewsPost | null = null;

  try {
    post = await client.fetch(newsBySlugQuery, { slug });
  } catch (error) {
    console.error("Failed to fetch news post metadata:", error);
  }

  if (!post) {
    return {
      title: "Article not found | Raphael Capital",
      description: "The requested article could not be located.",
    };
  }

  const description =
    post.seoDescription ||
    portableTextToPlainText(post.body).slice(0, 158) ||
    post.subtitle ||
    "";
  const title = post.seoTitle || `${post.title} | News | Raphael Capital`;
  const url = `/news/${post.slug}`;
  const imageUrl = post.coverImage
    ? urlFor(post.coverImage.asset).width(1600).height(900).url()
    : "";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Raphael Capital",
      type: "article",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1600,
              height: 900,
              alt: post.coverImage?.alt || post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

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

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { slug } = await params;
  let post: CompanyNewsPost | null = null;

  try {
    post = await client.fetch(newsBySlugQuery, { slug });
  } catch (error) {
    console.error("Failed to fetch news post:", error);
  }

  if (!post) {
    notFound();
  }

  const heroUrl = post.coverImage
    ? urlFor(post.coverImage.asset).width(1600).height(900).url()
    : "";
  const heroLqip = post.coverImage?.asset.metadata.lqip;
  const heroAlt = post.coverImage?.alt || post.title;
  const dateLabel = formatDate(post.publishedAt);

  return (
    <article className="flex flex-col">
      <div className="bg-bg-surface">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto w-full max-w-[1280px] px-6 py-6 text-xs uppercase tracking-[0.24em] text-ink/55 sm:px-8 lg:px-10"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href="/"
                className="font-medium text-ink/70 hover:text-rc-navy"
              >
                Home
              </Link>
            </li>
            <li className="text-ink/35">/</li>
            <li>
              <Link
                href="/news"
                className="font-medium text-ink/70 hover:text-rc-navy"
              >
                News
              </Link>
            </li>
            <li className="text-ink/35">/</li>
            <li className="text-inkStrong">{post.title}</li>
          </ol>
        </nav>
      </div>

      {heroUrl ? (
        <div className="relative w-full px-4 sm:px-6 lg:px-10">
          <div className="relative mx-auto aspect-[16/9] w-full max-w-[1280px] overflow-hidden rounded-[var(--radius-card)] bg-rc-navy/10 shadow-md">
            <Image
              src={heroUrl}
              alt={heroAlt}
              fill
              priority
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover"
              placeholder={heroLqip ? "blur" : undefined}
              blurDataURL={heroLqip}
            />
          </div>
        </div>
      ) : null}

      <Section
        className="pb-12 pt-12 sm:pb-16 sm:pt-16"
        containerClassName="gap-8"
      >
        <div className="flex flex-col gap-6">
          {dateLabel ? (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/55">
              {dateLabel}
            </p>
          ) : null}
          <h1
            className={`${playfair.className} text-4xl font-black leading-tight text-inkStrong sm:text-5xl lg:text-6xl`}
          >
            {post.title}
          </h1>
          {post.subtitle ? (
            <p className="max-w-3xl text-lg text-ink/80">{post.subtitle}</p>
          ) : null}
          <PortableTextRenderer
            value={post.body}
            className="max-w-3xl text-base text-ink/85"
          />
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/news"
              className="text-sm font-medium text-rc-navy underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
            >
              ← Back to news
            </Link>
          </div>
        </div>
      </Section>
    </article>
  );
}
