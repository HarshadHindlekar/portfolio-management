import { BlogCard } from "@/components/BlogCard";
import { blogPosts } from "@/data/blogs";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-8">
      <div className="sticky top-0 z-10 bg-zinc-50 pb-4">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-900">Home</h1>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-zinc-800">Get started</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Read our getting started guide to get the most out of your subscription.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-zinc-800">Community</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Join the conversation on our exclusive investor community.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-zinc-800">Visit website</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Keep up with our latest content and portfolio updates.
            </p>
          </div>
        </section>
      </div>

      <section className="mt-4">
        <h2 className="text-sm font-semibold text-zinc-800">Latest Posts</h2>
        <div className="mt-3 max-h-[60vh] overflow-y-auto rounded-lg border border-zinc-200 bg-white px-6 py-4">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
