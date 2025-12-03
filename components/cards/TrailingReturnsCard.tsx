"use client";

import type { TrailingReturns } from "@/lib/navStats";
import { DataTable } from "@/components/common/DataTable";

type TrailingReturnsCardProps = {
  trailing: TrailingReturns;
  currentDrawdown?: number;
};

function formatPct(value: number | undefined, decimals = 1): string {
  if (value === undefined || Number.isNaN(value)) return "-";
  const fixed = value.toFixed(decimals);
  return `${fixed}%`;
}

type MetricColumn = {
  key: string;
  label: string;
};

const METRIC_COLUMNS: MetricColumn[] = [
  { key: "ytd", label: "YTD" },
  { key: "oneD", label: "1D" },
  { key: "oneW", label: "1W" },
  { key: "oneM", label: "1M" },
  { key: "threeM", label: "3M" },
  { key: "sixM", label: "6M" },
  { key: "oneY", label: "1Y" },
  { key: "threeY", label: "3Y" },
  { key: "si", label: "SI" },
  { key: "dd", label: "DD" },
  { key: "maxDd", label: "Max DD" },
];

export function TrailingReturnsCard({
  trailing,
  currentDrawdown,
}: TrailingReturnsCardProps) {
  const rows = [
    {
      id: "focused",
      name: "Focused",
      ytd: formatPct(trailing.ytd),
      oneD: formatPct(trailing.oneD),
      oneW: formatPct(trailing.oneW),
      oneM: formatPct(trailing.oneM),
      threeM: formatPct(trailing.threeM),
      sixM: formatPct(trailing.sixM),
      oneY: formatPct(trailing.oneY),
      threeY: formatPct(trailing.threeY),
      si: formatPct(trailing.sinceInception),
      dd: formatPct(currentDrawdown),
      maxDd: formatPct(trailing.maxDrawdown),
    },
    {
      id: "nifty50",
      name: "NIFTY50",
      ytd: "3.1%",
      oneD: "0.1%",
      oneW: "1.1%",
      oneM: "1.4%",
      threeM: "4.4%",
      sixM: "16.2%",
      oneY: "26.2%",
      threeY: "16.0%",
      si: "14.5%",
      dd: "-1.5%",
      maxDd: "-38.4%",
    },
  ];

  const handleDownloadTrailing = () => {
    const headerRow = ["Name", ...METRIC_COLUMNS.map((col) => col.label)];
    const dataRows = rows.map((row) => [
      row.name,
      ...METRIC_COLUMNS.map((col) => row[col.key as keyof typeof row] as string),
    ]);

    const csvRows = [headerRow, ...dataRows];
    const csv = csvRows.map((r) => r.join(",")).join("\n");
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

  const columns = [
    {
      key: "name",
      header: "Name",
      headerClassName: "py-2 pr-4 text-left",
      cellClassName: (row: any) =>
        row.id === "nifty50"
          ? "py-2 pr-4 font-medium text-zinc-600"
          : "py-2 pr-4 font-medium",
      renderCell: (row: any) => row.name,
    },
    ...METRIC_COLUMNS.map((col) => ({
      key: col.key,
      header: col.label,
      headerClassName: "px-2 py-2",
      cellClassName: "px-2 py-2",
      renderCell: (row: any) => row[col.key as keyof typeof row],
    })),
  ];

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
      <DataTable
        columns={columns}
        rows={rows}
        getRowKey={(row: any) => row.id}
        rowClassName={(_, index) =>
          `${index === 0 ? "border-b " : ""}text-sm text-zinc-800`
        }
        pageSize={10}
      />
      <p className="mt-2 text-[11px] text-zinc-500">
        Note: Returns above 1 year are annualised for this demo.
      </p>
    </section>
  );
}
