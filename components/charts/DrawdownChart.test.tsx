import { render, screen } from "@testing-library/react";
import DrawdownChart from "@/components/charts/DrawdownChart";
import type { EquityPoint } from "@/lib/navStats";

describe("DrawdownChart", () => {
  it("renders an SVG when data is provided", () => {
    const data: EquityPoint[] = [
      { date: new Date("2024-01-01"), equity: 100, drawdown: 0 },
      { date: new Date("2024-01-02"), equity: 99, drawdown: -1 },
    ];

    render(<DrawdownChart data={data} />);

    const svg = screen.getByLabelText(/drawdown chart/i);
    expect(svg.tagName.toLowerCase()).toBe("svg");
  });
});
