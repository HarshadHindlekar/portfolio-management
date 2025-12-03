import { render, screen } from "@testing-library/react";
import { QuickLinkCard } from "@/components/cards/QuickLinkCard";

describe("QuickLinkCard", () => {
  it("renders title and description", () => {
    render(
      <QuickLinkCard
        title="Get started"
        description="Read our getting started guide."
      />,
    );

    expect(screen.getByText("Get started")).toBeInTheDocument();
    expect(
      screen.getByText("Read our getting started guide."),
    ).toBeInTheDocument();
  });

  it("renders internal link when href is provided", () => {
    render(
      <QuickLinkCard
        title="Community"
        description="Join the conversation."
        href="/community"
      />,
    );

    const link = screen.getByRole("link", { name: /community/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/community");
  });

  it("renders external link when external is true", () => {
    render(
      <QuickLinkCard
        title="Visit website"
        description="Keep up with our latest content."
        href="https://example.com"
        external
      />,
    );

    const link = screen.getByRole("link", { name: /visit website/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
