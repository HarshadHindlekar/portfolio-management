import { render, screen, fireEvent } from "@testing-library/react";
import PortfoliosPage from "@/app/portfolios/page";
import * as navStats from "@/lib/navStats";

jest.mock("@/lib/navStats");

const mockEquityCurve = [
  { date: new Date("2024-01-01"), equity: 100, drawdown: 0 },
  { date: new Date("2024-01-02"), equity: 101, drawdown: -1 },
];

const mockTrailing = {
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

const mockMonthlyByYear = [
  {
    year: 2024,
    months: [{ month: "Jan", returnPct: 1.2 }],
  },
];

(navStats.getEquityCurve as jest.Mock).mockReturnValue(mockEquityCurve);
(navStats.getTrailingReturns as jest.Mock).mockReturnValue(mockTrailing);
(navStats.getMonthlyReturnsByYear as jest.Mock).mockReturnValue(mockMonthlyByYear);

describe("Portfolios page", () => {
  it("renders trailing returns and monthly returns table", () => {
    render(<PortfoliosPage />);

    expect(
      screen.getByRole("heading", { name: "Trailing Returns" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Monthly returns by year")).toBeInTheDocument();
  });

  it("allows resetting date range", () => {
    render(<PortfoliosPage />);

    const resetButton = screen.getByRole("button", { name: /reset/i });
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
  });
});
