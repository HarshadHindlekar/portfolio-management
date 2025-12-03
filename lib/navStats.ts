import rawData from "@/data/navData.json";

type RawRow = {
  "Historical Mutual Fund NAV of Quant Active Fund Gr": string;
  "": string;
};

export type DailyNav = {
  date: Date;
  nav: number;
};

export type EquityPoint = {
  date: Date;
  equity: number;
  drawdown: number;
};

export type YearlyMonthlyReturns = {
  year: number;
  months: { month: string; returnPct: number }[];
};

export type TrailingReturns = {
  ytd?: number;
  oneD?: number;
  oneW?: number;
  oneM?: number;
  threeM?: number;
  sixM?: number;
  oneY?: number;
  threeY?: number;
  fiveY?: number;
  sinceInception?: number;
  maxDrawdown?: number;
};

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

export function getDailyNav(): DailyNav[] {
  const rows = rawData as RawRow[];
  const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
  const parsed: DailyNav[] = [];

  for (const row of rows) {
    const dateStr = row["Historical Mutual Fund NAV of Quant Active Fund Gr"];
    const navStr = row[""];

    if (!dateRegex.test(dateStr) || !navStr) continue;

    const [dd, mm, yyyy] = dateStr.split("-");
    const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    const nav = Number.parseFloat(navStr);

    if (!Number.isFinite(nav)) continue;

    parsed.push({ date, nav });
  }

  parsed.sort((a, b) => a.date.getTime() - b.date.getTime());
  return parsed;
}

export function getEquityCurve(): EquityPoint[] {
  const daily = getDailyNav();
  if (daily.length === 0) return [];

  const base = daily[0].nav;
  let peak = 100;

  return daily.map((row) => {
    const equity = (row.nav / base) * 100;
    if (equity > peak) {
      peak = equity;
    }
    const drawdown = ((equity - peak) / peak) * 100;
    return { date: row.date, equity, drawdown };
  });
}

function findNavOnOrBefore(target: Date, nav: DailyNav[]): DailyNav | undefined {
  for (let i = nav.length - 1; i >= 0; i -= 1) {
    if (nav[i].date <= target) return nav[i];
  }
  return undefined;
}

function percentChange(from: number, to: number): number {
  return ((to - from) / from) * 100;
}

export function getTrailingReturns(): TrailingReturns {
  const nav = getDailyNav();
  if (nav.length < 2) return {};

  const last = nav[nav.length - 1];
  const prev = nav[nav.length - 2];
  const eq = getEquityCurve();

  const calcSince = (startDate: Date): number | undefined => {
    const start = findNavOnOrBefore(startDate, nav);
    if (!start) return undefined;
    return percentChange(start.nav, last.nav);
  };

  const asOf = last.date;
  const startOfYear = new Date(asOf.getFullYear(), 0, 1);
  const oneMonthAgo = new Date(asOf);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const threeMonthsAgo = new Date(asOf);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const sixMonthsAgo = new Date(asOf);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const oneYearAgo = new Date(asOf);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const threeYearsAgo = new Date(asOf);
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
  const fiveYearsAgo = new Date(asOf);
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

  const maxDrawdown = eq.reduce(
    (min, p) => (p.drawdown < min ? p.drawdown : min),
    0,
  );

  return {
    ytd: calcSince(startOfYear),
    oneD: percentChange(prev.nav, last.nav),
    oneW: calcSince(new Date(asOf.getTime() - 7 * 24 * 60 * 60 * 1000)),
    oneM: calcSince(oneMonthAgo),
    threeM: calcSince(threeMonthsAgo),
    sixM: calcSince(sixMonthsAgo),
    oneY: calcSince(oneYearAgo),
    threeY: calcSince(threeYearsAgo),
    fiveY: calcSince(fiveYearsAgo),
    sinceInception: percentChange(nav[0].nav, last.nav),
    maxDrawdown,
  };
}

export function getMonthlyReturnsByYear(): YearlyMonthlyReturns[] {
  const nav = getDailyNav();
  if (nav.length === 0) return [];

  type MonthStats = {
    year: number;
    month: number;
    firstNav: number;
    lastNav: number;
    firstDate: Date;
    lastDate: Date;
  };

  const byKey = new Map<string, MonthStats>();

  for (const row of nav) {
    const year = row.date.getFullYear();
    const month = row.date.getMonth();
    const key = `${year}-${month}`;

    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, {
        year,
        month,
        firstNav: row.nav,
        lastNav: row.nav,
        firstDate: row.date,
        lastDate: row.date,
      });
      continue;
    }

    if (row.date < existing.firstDate) {
      existing.firstDate = row.date;
      existing.firstNav = row.nav;
    }
    if (row.date > existing.lastDate) {
      existing.lastDate = row.date;
      existing.lastNav = row.nav;
    }
  }

  const allMonths = Array.from(byKey.values()).sort(
    (a, b) => a.year - b.year || a.month - b.month,
  );

  const grouped = new Map<number, { month: string; returnPct: number }[]>();

  for (const m of allMonths) {
    const ret = percentChange(m.firstNav, m.lastNav);
    const list = grouped.get(m.year) ?? [];
    list.push({
      month: MONTH_NAMES[m.month],
      returnPct: ret,
    });
    grouped.set(m.year, list);
  }

  return Array.from(grouped.entries())
    .sort(([a], [b]) => a - b)
    .map(([year, months]) => ({ year, months }));
}
