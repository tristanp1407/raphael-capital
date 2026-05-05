import type { Metadata } from "next";
import { Section } from "@/components/section";
import { NewsGrid } from "@/components/news-grid";
import { client } from "@/lib/sanity/client";
import { allNewsQuery } from "@/lib/sanity/queries";
import type { CompanyNewsPost } from "@/types/sanity";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "News | Raphael Capital",
    description:
      "Recent news and announcements from Raphael Capital, including transactions, mandates, market commentary and team updates.",
  };
}

export default async function NewsIndexPage() {
  let posts: CompanyNewsPost[] = [];

  try {
    posts = await client.fetch(allNewsQuery);
  } catch (error) {
    console.error("Failed to fetch news posts:", error);
  }

  return (
    <div className="flex flex-col">
      <Section
        id="news-intro"
        headline="Recent Company News"
        className="bg-bg-faint"
        containerClassName="gap-6"
        padding="py-12 sm:py-16"
      >
        <p className="max-w-3xl text-base text-ink/75">
          Updates, transactions and announcements from across the Raphael Capital portfolio.
        </p>
      </Section>
      <Section
        id="news-grid"
        className="bg-bg-faint"
        padding="py-12 sm:py-16"
      >
        <NewsGrid posts={posts} />
      </Section>
    </div>
  );
}
