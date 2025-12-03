"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type DataTableColumn = {
  key: string;
  header: ReactNode;
  headerClassName?: string;
  cellClassName?: string | ((row: any, rowIndex: number) => string);
  renderCell?: (row: any, rowIndex: number) => ReactNode;
};

type ConfiguredModeProps = {
  columns: DataTableColumn[];
  rows: any[];
  getRowKey?: (row: any, rowIndex: number) => React.Key;
  rowClassName?: string | ((row: any, rowIndex: number) => string);
  pageSize?: number;
  children?: never;
};

type ChildrenModeProps = {
  children: ReactNode;
  columns?: never;
  rows?: never;
  getRowKey?: never;
  rowClassName?: never;
};

type SharedProps = {
  className?: string;
  containerClassName?: string;
};

type DataTableProps = SharedProps & (ChildrenModeProps | ConfiguredModeProps);

export function DataTable(props: DataTableProps) {
  const { className, containerClassName } = props;

  const baseTable = "min-w-full text-left text-xs text-zinc-600";
  const tableClassName = className ? `${baseTable} ${className}` : baseTable;

  const baseContainer = "mt-3 overflow-x-auto";
  const wrapperClassName = containerClassName
    ? `${baseContainer} ${containerClassName}`
    : baseContainer;

  if ("columns" in props && props.columns) {
    const { columns, rows, getRowKey, rowClassName, pageSize } = props;

    const [page, setPage] = useState(1);

    const hasRows = rows.length > 0;
    const effectivePageSize =
      hasRows && typeof pageSize === "number" && pageSize > 0
        ? pageSize
        : rows.length || 1;
    const pageCount = hasRows
      ? Math.max(1, Math.ceil(rows.length / effectivePageSize))
      : 1;

    useEffect(() => {
      if (page > pageCount) {
        setPage(pageCount);
      }
    }, [page, pageCount]);

    const currentPage = Math.min(page, pageCount);
    const startIndex = (currentPage - 1) * effectivePageSize;
    const endIndex = startIndex + effectivePageSize;
    const pagedRows = hasRows ? rows.slice(startIndex, endIndex) : [];

    const showPaginationControls =
      hasRows &&
      typeof pageSize === "number" &&
      pageSize > 0 &&
      rows.length > effectivePageSize;

    return (
      <div className={wrapperClassName}>
        <table className={tableClassName}>
          <thead className="border-b border-zinc-200 bg-zinc-50 text-[11px] uppercase tracking-wide text-zinc-500">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={
                    col.headerClassName ?? "px-2 py-2 text-right"
                  }
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedRows.map((row, rowIndex) => {
              const absoluteIndex = startIndex + rowIndex;
              const rowClass =
                typeof rowClassName === "function"
                  ? rowClassName(row, absoluteIndex)
                  : rowClassName ?? "";

              return (
                <tr
                  key={
                    getRowKey
                      ? getRowKey(row, absoluteIndex)
                      : absoluteIndex
                  }
                  className={rowClass}
                >
                  {columns.map((col) => {
                    const content = col.renderCell
                      ? col.renderCell(row, absoluteIndex)
                      : (row as any)[col.key];

                    const cellClass =
                      typeof col.cellClassName === "function"
                        ? col.cellClassName(row, absoluteIndex)
                        : col.cellClassName ?? "";

                    return (
                      <td key={col.key} className={cellClass}>
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {showPaginationControls && (
          <div className="flex items-center justify-between border-t border-zinc-200 bg-white px-3 py-2 text-[11px] text-zinc-500">
            <span>
              {startIndex + 1}–{startIndex + pagedRows.length} of {rows.length}
            </span>
            <div className="inline-flex gap-1">
              <button
                type="button"
                className="rounded border border-zinc-200 px-2 py-1 disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </button>
              <button
                type="button"
                className="rounded border border-zinc-200 px-2 py-1 disabled:opacity-50"
                disabled={currentPage === pageCount}
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const { children } = props as ChildrenModeProps;

  return (
    <div className={wrapperClassName}>
      <table className={tableClassName}>{children}</table>
    </div>
  );
}
