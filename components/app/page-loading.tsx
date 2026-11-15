import { Skeleton } from "@/components/ui/skeleton";

function LoadingStatus({ label = "页面加载中" }: { label?: string }) {
  return (
    <p role="status" className="sr-only">
      {label}
    </p>
  );
}

export function DetailPageLoading() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <LoadingStatus />
      <Skeleton className="h-4 w-24" aria-hidden="true" />
      <div className="mt-7 space-y-3" aria-hidden="true">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-9 w-80 max-w-full" />
        <Skeleton className="h-4 w-56 max-w-full" />
      </div>
      <div
        className="mt-8 grid gap-4 rounded-lg border border-border p-5 sm:grid-cols-3"
        aria-hidden="true"
      >
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
      <div
        className="mt-5 space-y-4 rounded-lg border border-border p-5"
        aria-hidden="true"
      >
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="ml-auto h-10 w-28" />
      </div>
    </div>
  );
}

export function ResumeEditorPageLoading() {
  return (
    <div className="min-h-screen bg-[#f4f6f1]">
      <LoadingStatus label="简历编辑器加载中" />
      <div
        className="flex h-14 items-center justify-between border-b border-border bg-background px-5"
        aria-hidden="true"
      >
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-8 w-24" />
      </div>
      <div
        className="grid min-h-[calc(100vh-3.5rem)] gap-px lg:grid-cols-[280px_minmax(0,1fr)_320px]"
        aria-hidden="true"
      >
        <div className="space-y-4 bg-background p-5">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
        <div className="grid place-items-start p-8">
          <Skeleton className="mx-auto aspect-[210/297] w-full max-w-[760px] shadow-sm" />
        </div>
        <div className="space-y-4 bg-background p-5">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
}
