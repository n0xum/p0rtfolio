'use client';

import { useEffect, useRef } from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Dialog({ isOpen, onClose, title, children }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      // Focus trap: focus first focusable element
      const focusableElements = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      style={{
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="bg-background dark:bg-zinc-900 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border dark:border-zinc-800 shadow-lg"
        role="document"
      >
        <div className="sticky top-0 bg-background dark:bg-zinc-900 border-b border-border dark:border-zinc-800 p-6 flex justify-between items-center">
          <h2 id="dialog-title" className="text-2xl font-bold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-2xl hover:text-accent dark:hover:text-accent-muted transition-colors w-8 h-8 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            aria-label="Dialog schließen"
            title="Schließen"
          >
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
