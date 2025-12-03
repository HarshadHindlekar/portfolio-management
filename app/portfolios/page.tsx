"use client";

import { useCallback, useMemo, useState } from "react";
import EquityCurveChart from "@/components/EquityCurveChart";
import DrawdownChart from "@/components/DrawdownChart";
import {
  getEquityCurve,
  getMonthlyReturnsByYear,
  getTrailingReturns,
} from "@/lib/navStats";

function formatPct(value: number | undefined, decimals = 1): string {
  if (value === undefined || Number.isNaN(value)) return "-";
  const fixed = value.toFixed(decimals);
  return `${fixed}%`;
}

function parseInputDate(value: string): Date | null {
  if (!value) return null;
  const [yearStr, monthStr, dayStr] = value.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

export default function PortfoliosPage() {
  const equityCurve = useMemo(() => getEquityCurve(), []);
  const trailing = useMemo(() => getTrailingReturns(), []);
  const monthlyByYear = useMemo(() => getMonthlyReturnsByYear(), []);

  const [fromDate, setFromDate] = useState(() =>
    equityCurve.length > 0
      ? equityCurve[0].date.toISOString().slice(0, 10)
      : "",
  );

  const [toDate, setToDate] = useState(() =>
    equityCurve.length > 0
      ? equityCurve[equityCurve.length - 1].date.toISOString().slice(0, 10)
      : "",
  );

  const filteredEquityCurve = useMemo(() => {
    if (equityCurve.length === 0) return equityCurve;
    if (!fromDate || !toDate) return equityCurve;

    const from = parseInputDate(fromDate);
    const to = parseInputDate(toDate);

    if (!from || !to || from > to) return equityCurve;

    return equityCurve.filter((p) => p.date >= from && p.date <= to);
  }, [equityCurve, fromDate, toDate]);

  const liveSince = fromDate || "-";
  const asOfDate = toDate || "-";

  const currentDrawdown =
    filteredEquityCurve.length > 0
      ? filteredEquityCurve[filteredEquityCurve.length - 1].drawdown
      : undefined;

  const handleResetRange = useCallback(() => {
    if (equityCurve.length === 0) return;
    const first = equityCurve[0].date.toISOString().slice(0, 10);
    const last =
      equityCurve[equityCurve.length - 1].date.toISOString().slice(0, 10);
    setFromDate(first);
    setToDate(last);
  }, [equityCurve]);

  const handleDownloadTrailing = useCallback(() => {
    const rows = [
      [
        "Name",
        "YTD",
        "1D",
        "1W",
        "1M",
        "3M",
        "6M",
        "1Y",
        "3Y",
        "SI",
        "DD",
        "Max DD",
      ],
      [
        "Focused",
        formatPct(trailing.ytd),
        formatPct(trailing.oneD),
        formatPct(trailing.oneW),
        formatPct(trailing.oneM),
        formatPct(trailing.threeM),
        formatPct(trailing.sixM),
        formatPct(trailing.oneY),
        formatPct(trailing.threeY),
        formatPct(trailing.sinceInception),
        formatPct(currentDrawdown),
        formatPct(trailing.maxDrawdown),
      ],
      [
        "NIFTY50",
        "3.1%",
        "0.1%",
        "1.1%",
        "1.4%",
        "4.4%",
        "16.2%",
        "26.2%",
        "16.0%",
        "14.5%",
        "-1.5%",
        "-38.4%",
      ],
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "trailing-returns.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [trailing, currentDrawdown]);

  const recentMonthly = monthlyByYear.filter((y) => y.year >= 2020);
  const monthOrder = [
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

  return (
    <div className="mx-auto max-w-6xl px-8 py-8">
      <h1 className="text-2xl font-semibold text-zinc-900">Trailing Returns</h1>

      <section className="mt-4 rounded-xl border border-zinc-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-zinc-700">Trailing Returns</p>
          <button
            type="button"
            aria-label="Download trailing returns"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600"
            onClick={handleDownloadTrailing}
          >
            ↓
          </button>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-xs text-zinc-600">
            <thead className="border-b border-zinc-200 text-[11px] uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="py-2 pr-4">Name</th>
                <th className="px-2 py-2">YTD</th>
                <th className="px-2 py-2">1D</th>
                <th className="px-2 py-2">1W</th>
                <th className="px-2 py-2">1M</th>
                <th className="px-2 py-2">3M</th>
                <th className="px-2 py-2">6M</th>
                <th className="px-2 py-2">1Y</th>
                <th className="px-2 py-2">3Y</th>
                <th className="px-2 py-2">SI</th>
                <th className="px-2 py-2">DD</th>
                <th className="px-2 py-2">Max DD</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b text-sm text-zinc-800">
                <td className="py-2 pr-4 font-medium">Focused</td>
                <td className="px-2 py-2">{formatPct(trailing.ytd)}</td>
                <td className="px-2 py-2">{formatPct(trailing.oneD)}</td>
                <td className="px-2 py-2">{formatPct(trailing.oneW)}</td>
                <td className="px-2 py-2">{formatPct(trailing.oneM)}</td>
                <td className="px-2 py-2">{formatPct(trailing.threeM)}</td>
                <td className="px-2 py-2">{formatPct(trailing.sixM)}</td>
                <td className="px-2 py-2">{formatPct(trailing.oneY)}</td>
                <td className="px-2 py-2">{formatPct(trailing.threeY)}</td>
                <td className="px-2 py-2">{formatPct(trailing.sinceInception)}</td>
                <td className="px-2 py-2">{formatPct(currentDrawdown)}</td>
                <td className="px-2 py-2">{formatPct(trailing.maxDrawdown)}</td>
              </tr>
              <tr className="text-sm text-zinc-800">
                <td className="py-2 pr-4 font-medium text-zinc-600">NIFTY50</td>
                <td className="px-2 py-2">3.1%</td>
                <td className="px-2 py-2">0.1%</td>
                <td className="px-2 py-2">1.1%</td>
                <td className="px-2 py-2">1.4%</td>
                <td className="px-2 py-2">4.4%</td>
                <td className="px-2 py-2">16.2%</td>
                <td className="px-2 py-2">26.2%</td>
                <td className="px-2 py-2">16.0%</td>
                <td className="px-2 py-2">14.5%</td>
                <td className="px-2 py-2">-1.5%</td>
                <td className="px-2 py-2">-38.4%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-zinc-500">
          Note: Returns above 1 year are annualised for this demo.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-zinc-200 bg-white px-6 py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-700">Equity curve</h2>
            <div className="mt-1 flex items-center gap-2 text-xs">
              <span className="text-zinc-500">Live since {liveSince}</span>
              <button
                type="button"
                className="text-emerald-600 hover:text-emerald-700"
                onClick={handleResetRange}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <label className="block text-xs text-zinc-500">From date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="mt-1 h-9 rounded-md border border-zinc-200 bg-white px-3 text-xs text-zinc-700 shadow-sm"
              />
            </div>
            <div className="text-right">
              <label className="block text-xs text-zinc-500">To date</label>
              <input
                type="date"
                value={asOfDate}
                onChange={(e) => setToDate(e.target.value)}
                className="mt-1 h-9 rounded-md border border-zinc-200 bg-white px-3 text-xs text-zinc-700 shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <EquityCurveChart data={filteredEquityCurve} />
        </div>

        <div className="mt-8">
          <DrawdownChart data={filteredEquityCurve} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold text-zinc-700">Monthly returns by year</h2>
        <div className="mt-3 overflow-x-auto rounded-lg border border-zinc-200 bg-white">
          <table className="min-w-full text-left text-xs text-zinc-600">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-[11px] uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-3 py-2">Year</th>
                {monthOrder.map((m) => (
                  <th key={m} className="px-2 py-2 text-right">
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentMonthly.map((row) => {
                const monthMap = new Map(row.months.map((m) => [m.month, m.returnPct]));
                return (
                  <tr key={row.year} className="border-b last:border-b-0">
                    <td className="px-3 py-2 text-sm font-medium text-zinc-800">
                      {row.year}
                    </td>
                    {monthOrder.map((m) => {
                      const value = monthMap.get(m);
                      const base = "px-2 py-1 text-right text-xs";
                      let tone = " text-zinc-400";
                      if (value !== undefined) {
                        tone =
                          value >= 0
                            ? " bg-emerald-50 text-emerald-700"
                            : " bg-rose-50 text-rose-700";
                      }
                      return (
                        <td key={m} className={base + tone}>
                          {value === undefined ? "-" : `${value.toFixed(1)}%`}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
