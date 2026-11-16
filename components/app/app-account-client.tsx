"use client";

import { LogIn } from "lucide-react";
import Link from "next/link";

export function AppAccountClient({
  user,
}: {
  user: { name: string; email: string } | null;
}) {
  const initials = user?.name.trim().slice(0, 1).toUpperCase() || "S";

  return (
    <Link
      href={user ? "/settings" : "/login"}
      aria-label={user ? `打开 ${user.name} 的个人设置` : "登录后开始记录"}
      title={user ? "个人设置" : "登录后开始记录"}
      className="flex min-w-0 items-center gap-2.5 rounded-md px-1.5 py-1.5 text-left transition-colors hover:bg-muted"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-muted text-xs font-medium text-foreground">
        {user ? initials : <LogIn size={15} aria-hidden="true" />}
      </span>
      <span className="hidden max-w-32 truncate text-sm font-medium text-foreground sm:block">
        {user?.name ?? "访客模式"}
      </span>
    </Link>
  );
}
