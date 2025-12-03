import { render, screen } from "@testing-library/react";
import { TrailingReturnsCard } from "@/components/cards/TrailingReturnsCard";
import type { TrailingReturns } from "@/lib/navStats";

const SAMPLE_TRAILING: TrailingReturns = {
  ytd: 10,
  oneD: 1,
  oneW: 2,
  oneM: 3,
  threeM: 4,
  sixM: 5,
  oneY: 6,
  threeY: 7,
  fiveY: 8,
  sinceInception: 9,
  maxDrawdown: -20,
};

describe("TrailingReturnsCard", () => {
  it("renders focused and benchmark rows with formatted percentages", () => {
    render(<TrailingReturnsCard trailing={SAMPLE_TRAILING} currentDrawdown={-5} />);

    expect(screen.getByText("Trailing Returns")).toBeInTheDocument();
    expect(screen.getByText("Focused")).toBeInTheDocument();
    expect(screen.getByText("NIFTY50")).toBeInTheDocument();

    expect(screen.getByText("10.0%"));
    expect(screen.getByText("-5.0%"));
    expect(screen.getByText("-20.0%"));
  });

  it("renders download button", () => {
    render(<TrailingReturnsCard trailing={SAMPLE_TRAILING} currentDrawdown={-5} />);

    const button = screen.getByRole("button", {
      name: /download trailing returns/i,
    });

    expect(button).toBeInTheDocument();
  });
});
