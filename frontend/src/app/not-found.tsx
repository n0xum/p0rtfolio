import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background dark:bg-zinc-950 pt-24 pb-32 flex items-center">
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-20">
          {/* Icon */}
          <svg
            className="w-20 h-20 text-secondary dark:text-zinc-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          {/* Message */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              404 &ndash; Seite nicht gefunden
            </h1>
            <p className="text-lg text-secondary dark:text-zinc-400 max-w-md">
              Die von dir gesuchte Seite existiert nicht oder wurde verschoben.
            </p>
          </div>

          {/* Action */}
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex px-6 py-3 border-2 border-primary dark:border-zinc-50 text-primary dark:text-zinc-50 hover:bg-primary dark:hover:bg-zinc-50 hover:text-background dark:hover:text-zinc-950 transition-all duration-300 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
