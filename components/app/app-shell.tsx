import Link from "next/link";
import { type ReactNode } from "react";

import { APP_TOPBAR_PORTAL_ID } from "@/components/app/app-topbar";
import { BrandMark } from "@/components/ui/brand-mark";

export function AppShell({
  account,
  children,
}: {
  account: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background print:block print:h-auto print:overflow-visible">
      <header className="relative z-30 flex h-16 min-w-0 shrink-0 items-center gap-2 border-b border-border bg-background/95 px-3 backdrop-blur-xl sm:gap-3 sm:px-4 print:hidden">
        <Link
          href="/resumes"
          aria-label="SAYLESS 首页"
          className="flex shrink-0 items-center gap-2 rounded-lg py-1.5 pr-1"
        >
          <BrandMark size="sm" className="rounded-md" />
          <span className="hidden text-sm font-semibold tracking-[-0.02em] sm:block">
            SAYLESS
          </span>
        </Link>
        <span
          aria-hidden="true"
          className="hidden h-6 w-px shrink-0 bg-border sm:block"
        />
        <div
          id={APP_TOPBAR_PORTAL_ID}
          className="h-full min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        />
        <div className="flex shrink-0 items-center">{account}</div>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto overscroll-y-none print:overflow-visible">
        {children}
      </main>
    </div>
  );
}
