import { NewsCard } from "@/components/news-card";
import type { CompanyNewsPost } from "@/types/sanity";

type NewsGridProps = {
  posts: CompanyNewsPost[];
};

export function NewsGrid({ posts }: NewsGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <p className="text-base text-ink/70">
        No news posts have been published yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <NewsCard key={post._id} post={post} index={index} />
      ))}
    </div>
  );
}
