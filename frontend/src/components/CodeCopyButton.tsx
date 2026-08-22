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
        className="absolute top-4 right-4 px-3 py-1.5 text-xs bg-control hover:bg-control-hover text-control-text rounded opacity-0 group-hover:opacity-100 transition-opacity"
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
