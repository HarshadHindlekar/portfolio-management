"use client";

import type { TrailingReturns } from "@/lib/navStats";

type TrailingReturnsCardProps = {
  trailing: TrailingReturns;
  currentDrawdown?: number;
};

function formatPct(value: number | undefined, decimals = 1): string {
  if (value === undefined || Number.isNaN(value)) return "-";
  const fixed = value.toFixed(decimals);
  return `${fixed}%`;
}

export function TrailingReturnsCard({
  trailing,
  currentDrawdown,
}: TrailingReturnsCardProps) {
  const handleDownloadTrailing = () => {
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
  };

  return (
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
  );
}
