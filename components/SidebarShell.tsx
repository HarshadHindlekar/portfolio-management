"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/portfolios", label: "Portfolios" },
  { href: "#", label: "Experimentals" },
  { href: "#", label: "Slack Archives" },
  { href: "#", label: "Refer a friend" },
  { href: "#", label: "Gift a subscription" },
  { href: "#", label: "Account" },
];

export function SidebarShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside className="flex h-full w-64 flex-col border-r border-zinc-200 bg-white">
        <div className="flex items-center gap-2 border-b border-zinc-200 px-6 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
            C
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">capitalmind</span>
            <span className="text-xs text-emerald-600">premium</span>
          </div>
        </div>
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = item.href !== "#" && pathname === item.href;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-6 py-2 text-sm font-medium ${
                      active
                        ? "bg-zinc-100 text-zinc-900"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-zinc-200 px-6 py-4 text-xs text-zinc-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-semibold text-white">
                RN
              </div>
              <div className="flex flex-col">
                <span>RN</span>
                <span className="text-[10px] uppercase tracking-wide">CMP1Y</span>
              </div>
            </div>
            <span className="text-[10px]">valid till Apr 19, 2025</span>
          </div>
        </div>
      </aside>
      <main className="flex-1 h-full overflow-y-auto bg-zinc-50">{children}</main>
    </div>
  );
}
