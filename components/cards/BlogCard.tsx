import Link from "next/link";
import type { BlogPost } from "@/data/blogs";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="border-b border-zinc-200 py-4 last:border-b-0">
      <div className="text-xs text-zinc-500">{post.publishedAt}</div>
      <h2 className="mt-1 text-sm font-semibold text-zinc-900">
        {post.title}
      </h2>
      <p className="mt-1 max-w-2xl text-sm text-zinc-600">{post.excerpt}</p>
      <div className="mt-2">
        <Link
          href={post.href}
          className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          Read full post
        </Link>
      </div>
    </article>
  );
}
