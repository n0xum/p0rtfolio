'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const MarkdownRenderer = dynamic(() => import('./MarkdownRenderer'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6" />
    </div>
  ),
});

interface ReadmeDropdownProps {
  content: string;
}

export default function ReadmeDropdown({ content }: ReadmeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border dark:border-zinc-800 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full flex items-center justify-between px-6 py-4 bg-surface dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors overflow-hidden before:absolute before:inset-0 before:animate-shimmer before:bg-[length:200%_100%] before:bg-[linear-gradient(90deg,transparent_0%,rgba(37,99,235,0.08)_50%,transparent_100%)] dark:before:bg-[linear-gradient(90deg,transparent_0%,rgba(96,165,250,0.1)_50%,transparent_100%)]"
      >
        <span className="font-mono text-sm font-medium">README.md</span>
        <svg
          className={`w-5 h-5 text-secondary dark:text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-6 border-t border-border dark:border-zinc-800">
          <div className="prose-wrapper">
            <MarkdownRenderer content={content} />
          </div>
        </div>
      )}
    </div>
  );
}
