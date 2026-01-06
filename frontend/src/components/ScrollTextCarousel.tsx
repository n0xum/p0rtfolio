'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollTextCarousel() {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [targetOffset, setTargetOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>();

  const words = [
    'TypeScript',
    'Golang',
    'CI/CD',
    'Clean Architecture',
    'Enthusiastic',
    'Next.js',
    'Spring Boot',
    'Clean Code',
    'Flutter',
    'REST APIs',
    'Docker',
    'PostgreSQL',
    'Agile',
    'DDD'
  ];

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Intersection Observer - nur animieren wenn sichtbar
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll Handler mit Throttling
  useEffect(() => {
    if (!isVisible || prefersReducedMotion) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = currentScrollY - lastScrollY;

          setTargetOffset(prev => prev + scrollDelta * 0.35);
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, prefersReducedMotion]);

  // Smooth animation with lerp - nur wenn sichtbar
  useEffect(() => {
    if (!isVisible || prefersReducedMotion) return;

    const animate = () => {
      setScrollOffset(prev => {
        const diff = targetOffset - prev;
        const smoothFactor = 0.1;

        if (Math.abs(diff) < 0.01) return targetOffset;
        return prev + diff * smoothFactor;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetOffset, isVisible, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden border-y border-border dark:border-zinc-800 bg-gray-50/30 dark:bg-zinc-900/20 py-4"
      aria-hidden="true"
    >
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{
          transform: prefersReducedMotion
            ? 'translateX(0)'
            : `translateX(-${scrollOffset % (words.length * 150)}px)`,
          willChange: isVisible && !prefersReducedMotion ? 'transform' : 'auto',
          transition: prefersReducedMotion ? 'none' : undefined,
        }}
      >
        {/* Render words three times for seamless loop */}
        {[...words, ...words, ...words].map((word, index) => (
          <span
            key={index}
            className="text-sm font-medium text-secondary/40 dark:text-zinc-500/50 uppercase tracking-wider select-none"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
