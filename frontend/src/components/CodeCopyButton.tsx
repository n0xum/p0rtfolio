'use client';

import { useState } from 'react';

interface CodeCopyButtonProps {
  code: string;
}

export default function CodeCopyButton({ code }: CodeCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 px-3 py-1.5 text-xs bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? 'Kopiert!' : 'Kopieren'}
      </button>
      {/* Announce the copy result to screen readers; the button text alone
          is visual-only feedback since it stays hidden until hover/focus. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? 'Code in die Zwischenablage kopiert' : ''}
      </span>
    </>
  );
}
