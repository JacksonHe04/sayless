import { Suspense } from "react";

import { AppAccount, AppAccountSkeleton } from "@/components/app/app-account";
import { AppShell } from "@/components/app/app-shell";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      account={
        <Suspense fallback={<AppAccountSkeleton />}>
          <AppAccount />
        </Suspense>
      }
    >
      {children}
    </AppShell>
  );
}
