"use client";

import { useCallback, useMemo, useState } from "react";
import EquityCurveChart from "@/components/charts/EquityCurveChart";
import DrawdownChart from "@/components/charts/DrawdownChart";
import { PageHeader } from "@/components/common/PageHeader";
import { TrailingReturnsCard } from "@/components/cards/TrailingReturnsCard";
import { MonthlyReturnsTable } from "@/components/tables/MonthlyReturnsTable";
import {
  getEquityCurve,
  getMonthlyReturnsByYear,
  getTrailingReturns,
} from "@/lib/navStats";

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

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10 bg-gray-50">
      <PageHeader title="Portfolios" />
      <TrailingReturnsCard
        trailing={trailing}
        currentDrawdown={currentDrawdown}
      />

      <section className="mt-8 rounded-xl border border-zinc-200 bg-white px-6 py-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-800">Equity curve</h2>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
              <span>Live since {liveSince}</span>
              <span className="hidden text-zinc-400 md:inline">•</span>
              <span>As of {asOfDate}</span>
              <button
                type="button"
                className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-medium text-zinc-700 hover:bg-zinc-200"
                onClick={handleResetRange}
              >
                Reset range
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="text-left text-xs">
              <label className="block text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                From date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="mt-1 h-9 rounded-md border border-zinc-200 bg-white px-3 text-xs text-zinc-700 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>
            <div className="text-left text-xs">
              <label className="block text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                To date
              </label>
              <input
                type="date"
                value={asOfDate}
                onChange={(e) => setToDate(e.target.value)}
                className="mt-1 h-9 rounded-md border border-zinc-200 bg-white px-3 text-xs text-zinc-700 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
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

      <section className="mt-8 rounded-xl border border-zinc-200 bg-white px-6 py-5 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-zinc-800">
              Monthly returns by year
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              Calendar month performance heatmap for the Focused portfolio.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <MonthlyReturnsTable data={monthlyByYear} />
        </div>
      </section>
    </div>
  );
}
