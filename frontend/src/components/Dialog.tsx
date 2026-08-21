'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Dialog({ isOpen, onClose, title, children }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousOverflowRef = useRef('');
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  // A dedicated portal target appended directly to <body>. Rendering the
  // dialog here (rather than in place, wherever it happens to be nested)
  // is what makes an honest "inert background" possible below: every
  // *other* direct child of <body> can be marked genuinely `inert`,
  // instead of only being blocked by the JS focus trap. Created via a
  // lazy useState initializer (not a ref read during render) so it's
  // created exactly once without tripping react-hooks/refs.
  const [portalNode] = useState<HTMLDivElement | null>(() =>
    typeof document !== 'undefined' ? document.createElement('div') : null
  );

  useEffect(() => {
    if (!isOpen || !portalNode) return;

    document.body.appendChild(portalNode);

    // Remember what had focus so it can be restored on close.
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Inert every other direct child of <body> - real DOM-level
    // inertness, not just a JS focus trap, so assistive tech and the
    // browser itself treat the rest of the page as unreachable while the
    // dialog is open.
    const inertedSiblings: HTMLElement[] = [];
    Array.from(document.body.children).forEach((child) => {
      if (child === portalNode) return;
      if (!(child instanceof HTMLElement)) return;
      if (child.hasAttribute('inert')) return;
      child.setAttribute('inert', '');
      inertedSiblings.push(child);
    });

    // Focus the first focusable element inside the dialog.
    const focusables = dialogRef.current
      ? Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      : [];
    focusables[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Real focus trap: Tab/Shift+Tab wrap within the dialog, and any
      // focus that somehow escapes (e.g. via a browser find-in-page jump)
      // is pulled back in.
      if (!dialogRef.current) return;

      const items = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      if (!dialogRef.current) return;
      if (dialogRef.current.contains(e.target as Node)) return;
      // Focus left the dialog entirely (e.g. programmatic focus) - pull it
      // back to the first focusable element.
      const focusable = dialogRef.current.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      focusable?.focus();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocusIn);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusIn);
      document.body.style.overflow = previousOverflowRef.current;
      inertedSiblings.forEach((el) => el.removeAttribute('inert'));
      portalNode.remove();
      previouslyFocusedRef.current?.focus();
    };
  }, [isOpen, onClose, portalNode]);

  if (!isOpen || !portalNode) return null;

  return createPortal(
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
      >
        <div className="sticky top-0 bg-background dark:bg-zinc-900 border-b border-border dark:border-zinc-800 p-6 flex justify-between items-center">
          <h2 id="dialog-title" className="text-2xl font-bold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="relative hover:text-accent dark:hover:text-accent-muted transition-colors w-8 h-8 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded after:absolute after:-inset-2 after:content-['']"
            aria-label="Dialog schließen"
            title="Schließen"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>,
    portalNode
  );
}
