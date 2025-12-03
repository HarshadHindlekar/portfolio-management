import { render, screen } from "@testing-library/react";
import { MonthlyReturnsTable } from "@/components/tables/MonthlyReturnsTable";
import type { YearlyMonthlyReturns } from "@/lib/navStats";

describe("MonthlyReturnsTable", () => {
  it("renders year and monthly return values", () => {
    const data: YearlyMonthlyReturns[] = [
      {
        year: 2024,
        months: [
          { month: "Jan", returnPct: 1.234 },
          { month: "Feb", returnPct: -2.5 },
        ],
      },
    ];

    render(<MonthlyReturnsTable data={data} />);

    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Jan")).toBeInTheDocument();
    expect(screen.getByText("Feb")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();

    expect(screen.getByText("1.2%"));
    expect(screen.getByText("-2.5%"));

    expect(screen.getAllByText("-").length).toBeGreaterThan(0);
  });
});
