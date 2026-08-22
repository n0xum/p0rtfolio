'use client';

import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Start' },
  { id: 'about', label: 'Über mich' },
  { id: 'work', label: 'Projekte' },
  { id: 'experience', label: 'Werdegang' },
  { id: 'contact', label: 'Kontakt' },
];

// Shared renderer for both the desktop bar and the mobile drawer - each
// variant keeps its own markup (underline vs. left-border active state,
// no onClick vs. onClick-to-close) since they're different responsive
// presentations of the same five items, not accidental copies.
function NavLinks({
  variant,
  activeSection,
  onNavigate,
}: {
  variant: 'desktop' | 'mobile';
  activeSection: string;
  onNavigate?: () => void;
}) {
  if (variant === 'desktop') {
    return (
      <ul className="flex space-x-8">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? 'page' : undefined}
              className={`text-sm transition-colors duration-150 ease-out-quart relative ${
                activeSection === item.id
                  ? 'text-primary font-medium'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="nav-underline absolute -bottom-[21px] left-0 w-full h-[1px] origin-left bg-primary" />
              )}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex flex-col p-6 space-y-4">
      {navItems.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={onNavigate}
            aria-current={activeSection === item.id ? 'page' : undefined}
            className={`block py-3 px-4 text-base transition-colors border-l-2 ${
              activeSection === item.id
                ? 'border-accent text-primary font-medium bg-surface'
                : 'border-transparent text-secondary hover:text-accent hover:border-accent/30'
            }`}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const previousOverflowRef = useRef('');

  // Active-section tracking.
  //
  // This was a scroll listener that, inside a rAF, called
  // `getBoundingClientRect()` on all five sections - five forced layout
  // flushes on the main thread for every scrolled frame, whether or not
  // the active section had actually changed. That is one of the two
  // measured causes of the trackpad-scroll jank this pass fixes.
  //
  // IntersectionObserver computes the same answer in the browser's own
  // intersection pass and only calls back when a boundary is actually
  // crossed - so scrolling *within* a section costs nothing at all.
  //
  // The rootMargin collapses the viewport to a thin band ~10% down from
  // the top, which is the observer equivalent of the old
  // `rect.top <= 100 && rect.bottom >= 100` probe line. The five sections
  // are contiguous and each is at least `min-h-screen`, so exactly one of
  // them occupies that band at any scroll position.
  useEffect(() => {
    const sections = ['home', 'about', 'work', 'experience', 'contact']
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-10% 0px -89% 0px', threshold: 0 }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Body scroll lock (save/restore instead of clobbering with 'unset'),
  // focus trap, Escape-to-close, and focus restoration to the trigger.
  useEffect(() => {
    if (!isMenuOpen) return;

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into the drawer when it opens.
    const focusables = menuRef.current
      ? Array.from(menuRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      : [];
    focusables[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key !== 'Tab' || !menuRef.current) return;

      const items = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const activeElement = document.activeElement;

      if (e.shiftKey && activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflowRef.current;
    };
  }, [isMenuOpen]);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    // The inline `backdropFilter: blur(12px)` that used to sit here was an
    // exact duplicate of the `backdrop-blur-md` class beside it (Tailwind
    // emits the -webkit- prefix itself), so it bought nothing and forced a
    // style attribute onto a fixed element.
    //
    // The radius is also down from 12px to 8px, with the ground raised
    // from /80 to /90. A backdrop-filter on a fixed bar has to re-blur its
    // region on every frame the content beneath it moves - i.e. the entire
    // time you are scrolling - and that cost scales with the radius. A
    // more opaque ground carries the same legibility for less work, and
    // reads flatter, which is the language DESIGN.md commits to anyway.
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      {/* Reading progress through the page. Pure CSS: a scaleX driven by a
          `scroll(root block)` timeline, so it costs the main thread
          nothing. See `.scroll-progress` in globals.css. */}
      <div className="scroll-progress" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-16">
          <a
            href="#home"
            className="text-lg font-medium tracking-tight hover:text-accent transition-colors duration-150 ease-out-quart"
            onClick={handleNavClick}
            aria-label="Portfolio, zurück zur Startseite"
          >
            Portfolio
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLinks variant="desktop" activeSection={activeSection} />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button + Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              className="relative w-11 h-11 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={`w-6 h-0.5 bg-primary transition-[transform,opacity] duration-200 ease-out-quart ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-primary transition-[transform,opacity] duration-200 ease-out-quart ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-primary transition-[transform,opacity] duration-200 ease-out-quart ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - decorative click-to-close layer, not a
          keyboard target: Escape and the focus trap already provide
          keyboard-accessible ways to close the drawer. */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50"
          onClick={() => setIsMenuOpen(false)}
          style={{
            top: '64px',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden fixed top-16 right-0 h-[calc(100vh-64px)] w-64 bg-background border-l border-border shadow-lg transition-transform duration-300 ease-out-expo ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="navigation"
        aria-label="Mobile Navigation"
        inert={!isMenuOpen}
      >
        <NavLinks variant="mobile" activeSection={activeSection} onNavigate={handleNavClick} />
      </div>
    </nav>
  );
}
