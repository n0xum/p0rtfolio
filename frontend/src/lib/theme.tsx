'use client';

import { createContext, useCallback, useContext, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: 'light', toggleTheme: () => {} });

// The inline pre-hydration <script> in layout.tsx already reads
// localStorage/prefers-color-scheme and applies the `dark` class to
// <html> before first paint. Re-deriving that same decision here (in a
// `useEffect` that calls `setState`) is exactly the double-source-of-truth
// pattern that trips `react-hooks/set-state-in-effect` - the DOM already
// has the answer, so read it directly via useSyncExternalStore instead of
// re-computing and re-setting it. getServerSnapshot returns the
// deterministic 'light' default so the very first (server) render always
// matches; React reconciles against the real DOM snapshot right after
// hydration without a manual effect or a `mounted` flag.
function getSnapshot(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function getServerSnapshot(): Theme {
  return 'light';
}

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return () => observer.disconnect();
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const newTheme: Theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
