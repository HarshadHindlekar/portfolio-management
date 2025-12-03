import {
  getDailyNav,
  getEquityCurve,
  getTrailingReturns,
  getMonthlyReturnsByYear,
} from "@/lib/navStats";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

describe("navStats utilities", () => {
  it("getDailyNav returns parsed and sorted NAV data", () => {
    const nav = getDailyNav();

    expect(nav.length).toBeGreaterThan(0);

    for (let i = 0; i < nav.length; i += 1) {
      const row = nav[i];
      expect(row.date).toBeInstanceOf(Date);
      expect(typeof row.nav).toBe("number");
      expect(Number.isFinite(row.nav)).toBe(true);

      if (i > 0) {
        expect(row.date.getTime()).toBeGreaterThanOrEqual(
          nav[i - 1].date.getTime(),
        );
      }
    }
  });

  it("getEquityCurve produces equity and non-positive drawdowns", () => {
    const nav = getDailyNav();
    const eq = getEquityCurve();

    if (nav.length === 0) {
      expect(eq).toEqual([]);
      return;
    }

    expect(eq.length).toBe(nav.length);

    eq.forEach((point, index) => {
      expect(point.date.getTime()).toBe(nav[index].date.getTime());
      expect(typeof point.equity).toBe("number");
      expect(typeof point.drawdown).toBe("number");
      expect(point.drawdown).toBeLessThanOrEqual(0);
    });
  });

  it("getTrailingReturns computes since inception and max drawdown consistently", () => {
    const nav = getDailyNav();
    const eq = getEquityCurve();
    const trailing = getTrailingReturns();

    if (nav.length < 2 || eq.length === 0) {
      expect(trailing).toEqual({});
      return;
    }

    const first = nav[0].nav;
    const last = nav[nav.length - 1].nav;
    const expectedSinceInception = ((last - first) / first) * 100;

    expect(trailing.sinceInception).toBeCloseTo(expectedSinceInception, 5);

    const minDrawdown = eq.reduce(
      (min, p) => (p.drawdown < min ? p.drawdown : min),
      0,
    );

    expect(trailing.maxDrawdown).toBeCloseTo(minDrawdown, 5);
  });

  it("getMonthlyReturnsByYear groups NAV by year and month with correct returns", () => {
    const nav = getDailyNav();
    const byYear = getMonthlyReturnsByYear();

    if (nav.length === 0) {
      expect(byYear).toEqual([]);
      return;
    }

    const years = byYear.map((y) => y.year);
    const sortedYears = [...years].sort((a, b) => a - b);
    expect(years).toEqual(sortedYears);

    byYear.forEach(({ year, months }) => {
      months.forEach(({ month, returnPct }) => {
        const monthIndex = MONTH_NAMES.indexOf(month);
        expect(monthIndex).toBeGreaterThanOrEqual(0);
        expect(typeof returnPct).toBe("number");

        const rowsForMonth = nav.filter(
          (row) =>
            row.date.getFullYear() === year &&
            row.date.getMonth() === monthIndex,
        );

        if (rowsForMonth.length === 0) {
          return;
        }

        const firstNav = rowsForMonth[0].nav;
        const lastNav = rowsForMonth[rowsForMonth.length - 1].nav;
        const expected = ((lastNav - firstNav) / firstNav) * 100;

        expect(returnPct).toBeCloseTo(expected, 5);
      });
    });
  });
});
