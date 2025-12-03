"use client";

import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  children?: ReactNode;
};

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-zinc-50 pb-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
      </header>
      {children}
    </div>
  );
}
