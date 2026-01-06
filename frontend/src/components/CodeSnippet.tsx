'use client';

import { useState } from 'react';

interface CodeSnippetProps {
  language: string;
  code: string;
  description: string;
}

export default function CodeSnippet({ language, code, description }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <svg className="w-6 h-6 text-accent dark:text-accent-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        <h2 className="text-2xl font-bold">Code-Beispiel</h2>
      </div>
      <p className="text-secondary dark:text-zinc-400">{description}</p>
      <div className="relative group">
        <pre className="overflow-x-auto p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-mono">
          <code className={`language-${language} text-zinc-900 dark:text-zinc-100`}>
            {code}
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 px-3 py-1.5 text-xs bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? 'Kopiert!' : 'Kopieren'}
        </button>
      </div>
    </div>
  );
}
