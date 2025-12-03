"use client";

import type { YearlyMonthlyReturns } from "@/lib/navStats";
import { DataTable } from "@/components/common/DataTable";

type MonthlyReturnsTableProps = {
  data: YearlyMonthlyReturns[];
};

const MONTH_COLUMNS = [
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
].map((label) => ({
  key: label,
  label,
}));

export function MonthlyReturnsTable({ data }: MonthlyReturnsTableProps) {
  const rows = data.map((row) => ({
    ...row,
    monthMap: new Map(row.months.map((m) => [m.month, m.returnPct])),
  }));

  const columns = [
    {
      key: "year",
      header: "Year",
      headerClassName: "px-3 py-2 text-left",
      cellClassName: "px-3 py-2 text-sm font-medium text-zinc-800",
      renderCell: (row: any) => row.year,
    },
    ...MONTH_COLUMNS.map((col) => ({
      key: col.key,
      header: col.label,
      headerClassName: "px-2 py-2 text-right",
      cellClassName: (row: any) => {
        const value = row.monthMap.get(col.key);
        const base = "px-2 py-1 text-right text-xs";
        let tone = " text-zinc-400";
        if (value !== undefined) {
          tone =
            value >= 0
              ? " bg-emerald-50 text-emerald-700"
              : " bg-rose-50 text-rose-700";
        }
        return base + tone;
      },
      renderCell: (row: any) => {
        const value = row.monthMap.get(col.key);
        return value === undefined ? "-" : `${value.toFixed(1)}%`;
      },
    })),
  ];

  return (
    <DataTable
      containerClassName="rounded-lg border border-zinc-200 bg-white"
      columns={columns}
      rows={rows}
      getRowKey={(row: any) => row.year}
      rowClassName="border-b last:border-b-0"
      pageSize={10}
    />
  );
}
