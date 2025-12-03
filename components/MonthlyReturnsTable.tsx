"use client";

import type { YearlyMonthlyReturns } from "@/lib/navStats";

type MonthlyReturnsTableProps = {
  data: YearlyMonthlyReturns[];
};

export function MonthlyReturnsTable({ data }: MonthlyReturnsTableProps) {
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
          {data.map((row) => {
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
  );
}
