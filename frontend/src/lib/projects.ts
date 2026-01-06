export interface Project {
  slug: string;
  title: string;
  description: string;
  githubRepo: string; // Format: "owner/repo"
  tech: string[];
  type: string;
  liveUrl?: string;
  features?: string[];
  image?: string;
  about?: string;
  codeSnippet?: {
    language: string;
    code: string;
    description: string;
  };
}

export const projects: Project[] = [
  {
    slug: 'cli-tool',
    title: 'CLI Tool',
    description: 'Kommandozeilen-Tool in Go zur Automatisierung wiederkehrender Entwicklungs- und Deployment-Aufgaben.',
    githubRepo: 'n0xum/cli-tool',
    tech: ['Go', 'CLI', 'Linux'],
    type: 'Backend',
    features: [
      'Automatisierung von Entwicklungsaufgaben',
      'Effiziente Kommandozeilen-Interface',
      'Cross-Platform Unterstützung',
      'Erweiterbare Architektur'
    ]
  },
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'Persönliche Portfolio-Website mit minimalistischem Design, entwickelt mit Next.js und optimiert für Performance.',
    githubRepo: 'n0xum/p0rtfolio',
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    type: 'Frontend',
    liveUrl: 'https://alexander-kruska.dev',
    image: '/images/portfolio.png',
    about: `Dieses Portfolio ist mehr als nur eine digitale Visitenkarte – es ist ein Spiegelbild meiner Entwicklung als Software-Entwickler und meiner Philosophie im Code-Design.

Als angehender Fachinformatiker für Anwendungsentwicklung im dritten Lehrjahr bei Lufthansa Industry Solutions habe ich gelernt, dass guter Code nicht nur funktioniert, sondern auch wartbar, zugänglich und performant sein muss.

Mit diesem Portfolio möchte ich zeigen, dass ich:
• **Clean Code** schreibe – lesbar, strukturiert, dokumentiert
• **Performance** ernst nehme – jede Millisekunde zählt
• **Accessibility** priorisiere – Technologie für alle
• **Moderne Standards** umsetze – TypeScript, React, Next.js

Dieses Portfolio wurde von Grund auf selbst entwickelt, ohne Templates oder Frameworks außer Next.js und Tailwind CSS. Jede Zeile Code wurde mit Sorgfalt geschrieben, um Best Practices zu demonstrieren und meine Fähigkeiten zu zeigen.`,
    features: [
      'Minimalistisches, responsives Design',
      'Dark Mode Support',
      'Performance-optimiert',
      'SEO-freundlich',
      'Accessibility (WCAG 2.1)',
      'Smooth Scroll Animationen'
    ],
    codeSnippet: {
      language: 'typescript',
      description: 'Theme-Provider mit localStorage-Persistenz und System-Preference-Detection',
      code: `export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Sync with localStorage and system preference
    const stored = localStorage.getItem('theme') as Theme;
    const initial = stored ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`
    }
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map(project => project.slug);
}