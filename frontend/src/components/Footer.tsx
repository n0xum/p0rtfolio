'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Dialog from './Dialog';

const ImpressumContent = dynamic(() => import('./ImpressumContent'), { ssr: false });
const RechtlichesContent = dynamic(() => import('./RechtlichesContent'), { ssr: false });

// Shared site-wide footer. Rendered once via layout.tsx so it appears on
// the home page AND every /projects/<slug>/ page - German Impressumspflicht
// requires the Impressum/Datenschutz links to be reachable from every
// page, and previously they only lived inside Contact.tsx, which is home-
// page-only. A real <footer> element, not nested inside <main>/<section>/
// <article>/<aside>/<nav>, also gives the page an implicit `contentinfo`
// landmark that didn't exist before.
export default function Footer() {
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [rechtlichesOpen, setRechtlichesOpen] = useState(false);

  return (
    <footer className="border-t border-border dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary dark:text-zinc-400">
            © {new Date().getFullYear()} Alexander Kruska. Entwickelt mit Next.js
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => setImpressumOpen(true)}
              className="relative text-sm text-secondary dark:text-zinc-400 hover:text-primary dark:hover:text-zinc-50 transition-colors cursor-pointer after:absolute after:-inset-x-3 after:-inset-y-2 after:content-['']"
            >
              Impressum
            </button>
            <button
              onClick={() => setRechtlichesOpen(true)}
              className="relative text-sm text-secondary dark:text-zinc-400 hover:text-primary dark:hover:text-zinc-50 transition-colors cursor-pointer after:absolute after:-inset-x-3 after:-inset-y-2 after:content-['']"
            >
              Rechtliches
            </button>
          </div>
        </div>
      </div>

      <Dialog
        isOpen={impressumOpen}
        onClose={() => setImpressumOpen(false)}
        title="Impressum"
      >
        <ImpressumContent />
      </Dialog>

      <Dialog
        isOpen={rechtlichesOpen}
        onClose={() => setRechtlichesOpen(false)}
        title="Datenschutz & Rechtliches"
      >
        <RechtlichesContent />
      </Dialog>
    </footer>
  );
}
