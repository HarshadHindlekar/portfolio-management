import { render, screen } from "@testing-library/react";
import { BlogCard } from "@/components/cards/BlogCard";
import type { BlogPost } from "@/data/blogs";

const POST: BlogPost = {
  id: "test-id",
  publishedAt: "Jan 1, 2024",
  title: "Test Title",
  excerpt: "Test excerpt",
  href: "/test",
};

describe("BlogCard", () => {
  it("renders blog post information and link", () => {
    render(<BlogCard post={POST} />);

    expect(screen.getByText("Jan 1, 2024")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test excerpt")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /read full post/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });
});
