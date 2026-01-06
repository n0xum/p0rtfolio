'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Throttled scroll handler for better performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['home', 'about', 'work', 'experience', 'contact'];
          const current = sections.find(section => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 100 && rect.bottom >= 100;
            }
            return false;
          });
          if (current) setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-zinc-950/90 backdrop-blur-md border-b border-border dark:border-zinc-800"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)', // iOS Safari support
      }}
    >

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-16">
          <a
            href="#home"
            className="text-lg font-medium tracking-tight hover:text-accent dark:hover:text-accent-muted transition-colors"
            onClick={handleNavClick}
            aria-label="Zurück zur Startseite"
          >
            Portfolio
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`text-sm transition-colors relative ${
                      activeSection === item.id
                        ? 'text-primary dark:text-zinc-50 font-medium'
                        : 'text-secondary dark:text-zinc-400 hover:text-primary dark:hover:text-zinc-50'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute -bottom-[21px] left-0 w-full h-[1px] bg-primary dark:bg-zinc-50" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button + Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isMenuOpen}
            >
              <span
                className={`w-6 h-0.5 bg-primary dark:bg-zinc-50 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-primary dark:bg-zinc-50 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-primary dark:bg-zinc-50 transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50"
          onClick={() => setIsMenuOpen(false)}
          style={{
            top: '64px',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
          role="button"
          tabIndex={0}
          aria-label="Overlay schließen"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsMenuOpen(false);
            }
          }}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 right-0 h-[calc(100vh-64px)] w-64 bg-background dark:bg-zinc-950 border-l border-border dark:border-zinc-800 shadow-lg transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="navigation"
        aria-label="Mobile Navigation"
      >
        <ul className="flex flex-col p-6 space-y-4" role="menu">
          {navItems.map((item) => (
            <li key={item.id} role="none">
              <a
                href={`#${item.id}`}
                onClick={handleNavClick}
                role="menuitem"
                className={`block py-3 px-4 text-base transition-colors border-l-2 ${
                  activeSection === item.id
                    ? 'border-accent dark:border-accent-muted text-primary dark:text-zinc-50 font-medium bg-surface dark:bg-zinc-900'
                    : 'border-transparent text-secondary dark:text-zinc-400 hover:text-accent dark:hover:text-accent-muted hover:border-accent/30 dark:hover:border-accent-muted/30'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
