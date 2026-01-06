'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Project page error:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background dark:bg-zinc-950 pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-20">
          {/* Error Icon */}
          <div className="relative">
            <svg
              className="w-20 h-20 text-secondary dark:text-zinc-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              Etwas ist schiefgelaufen
            </h1>
            <p className="text-lg text-secondary dark:text-zinc-400 max-w-md">
              Beim Laden des Projekts ist ein Fehler aufgetreten. Dies kann an temporären Problemen mit der GitHub API liegen.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={reset}
              className="px-6 py-3 border-2 border-primary dark:border-zinc-50 text-primary dark:text-zinc-50 hover:bg-primary dark:hover:bg-zinc-50 hover:text-background dark:hover:text-zinc-950 transition-all duration-300 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Erneut versuchen
            </button>
            <Link
              href="/#work"
              className="px-6 py-3 text-sm text-secondary dark:text-zinc-400 hover:text-accent dark:hover:text-accent-muted transition-colors underline underline-offset-4 decoration-2"
            >
              Zurück zu Projekten
            </Link>
          </div>

          {/* Technical Details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="pt-8 text-left w-full max-w-2xl">
              <summary className="cursor-pointer text-sm text-secondary dark:text-zinc-400 hover:text-accent dark:hover:text-accent-muted transition-colors">
                Technische Details
              </summary>
              <pre className="mt-4 p-4 bg-zinc-900 text-zinc-300 rounded-lg overflow-x-auto text-xs">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
              </pre>
            </details>
          )}
        </div>
      </div>
    </main>
  );
}