import { render, screen } from "@testing-library/react";
import EquityCurveChart from "@/components/charts/EquityCurveChart";
import type { EquityPoint } from "@/lib/navStats";

describe("EquityCurveChart", () => {
  it("renders an SVG when data is provided", () => {
    const data: EquityPoint[] = [
      { date: new Date("2024-01-01"), equity: 100, drawdown: 0 },
      { date: new Date("2024-01-02"), equity: 101, drawdown: -1 },
    ];

    render(<EquityCurveChart data={data} />);

    const svg = screen.getByLabelText(/equity curve chart/i);
    expect(svg.tagName.toLowerCase()).toBe("svg");
  });
});
