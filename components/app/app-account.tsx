import { connection } from "next/server";

import { AppAccountClient } from "@/components/app/app-account-client";
import { Skeleton } from "@/components/ui/skeleton";
import { getOptionalCurrentUser } from "@/modules/auth/server";

export async function AppAccount() {
  await connection();
  const user = await getOptionalCurrentUser();

  return (
    <AppAccountClient
      user={user ? { name: user.name, email: user.email } : null}
    />
  );
}

export function AppAccountSkeleton() {
  return (
    <div className="flex items-center gap-2.5 px-1.5 py-1.5" aria-hidden="true">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <Skeleton className="hidden h-3.5 w-16 sm:block" />
    </div>
  );
}
