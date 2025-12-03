import { BlogCard } from "@/components/cards/BlogCard";
import { QuickLinkCard } from "@/components/cards/QuickLinkCard";
import { PageHeader } from "@/components/common/PageHeader";
import { blogPosts } from "@/data/blogs";

const quickLinks = [
  {
    title: "Get started",
    description:
      "Read our getting started guide to get the most out of your subscription.",
  },
  {
    title: "Community",
    description:
      "Join the conversation on our exclusive investor community.",
  },
  {
    title: "Visit website",
    description: "Keep up with our latest content and portfolio updates.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-8 py-8 bg-gray-50">
      <PageHeader title="Home">
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {quickLinks.map((item) => (
            <QuickLinkCard
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </section>
      </PageHeader>

      <section className="mt-8">
        <h2 className="text-sm font-semibold text-zinc-800">Latest Posts</h2>
        <div className="mt-4 grid gap-8 md:grid-cols-2">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
