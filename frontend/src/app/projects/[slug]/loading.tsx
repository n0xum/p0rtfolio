export default function Loading() {
  return (
    <main className="min-h-screen bg-background dark:bg-zinc-950 pt-24 pb-32">
      {/* Back Navigation Skeleton */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mb-8">
        <div className="h-5 w-32 bg-surface dark:bg-zinc-900 animate-pulse rounded" />
      </div>

      {/* Project Header Skeleton */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mb-12">
        <div className="space-y-6">
          <div>
            <div className="h-4 w-24 bg-surface dark:bg-zinc-900 animate-pulse rounded mb-2" />
            <div className="h-12 w-3/4 bg-surface dark:bg-zinc-900 animate-pulse rounded mb-4" />
            <div className="h-6 w-full bg-surface dark:bg-zinc-900 animate-pulse rounded" />
          </div>

          {/* Tech Stack Skeleton */}
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-7 w-20 bg-surface dark:bg-zinc-900 animate-pulse rounded"
              />
            ))}
          </div>

          {/* Links & Stats Skeleton */}
          <div className="flex flex-wrap gap-6 items-center pt-4 border-t border-border dark:border-zinc-800">
            <div className="h-5 w-32 bg-surface dark:bg-zinc-900 animate-pulse rounded" />
            <div className="h-5 w-24 bg-surface dark:bg-zinc-900 animate-pulse rounded" />
            <div className="flex gap-4">
              <div className="h-5 w-12 bg-surface dark:bg-zinc-900 animate-pulse rounded" />
              <div className="h-5 w-12 bg-surface dark:bg-zinc-900 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Project Image Skeleton */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mb-12">
        <div className="relative w-full aspect-video rounded-lg border border-border dark:border-zinc-800 bg-surface dark:bg-zinc-900 animate-pulse" />
      </div>

      {/* Content Skeleton */}
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-4 w-full bg-surface dark:bg-zinc-900 animate-pulse rounded"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
