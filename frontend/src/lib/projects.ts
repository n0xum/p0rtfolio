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
    slug: 'structify',
    title: 'structify',
    description: 'Go-Structs zu PostgreSQL-Schemas konvertieren – mit Web-Editor, Inline-Tags für Constraints, Indexes und Foreign Keys.',
    githubRepo: 'n0xum/structify',
    tech: ['Go', 'PostgreSQL', 'Next.js', 'TypeScript', 'Docker'],
    type: 'Full-Stack',
    liveUrl: 'https://structify.alexander-kruska.dev',
    features: [
      'Go-Structs mit db:-Tags zu SQL-DDL konvertieren',
      'Constraints: CHECK, DEFAULT, ENUM',
      'Indexes und Composite Indexes',
      'Foreign Keys mit ON DELETE / ON UPDATE',
      'Composite Primary Keys und Foreign Keys',
      'Interaktiver Web-Editor mit Live-Generierung',
      'Dokumentationsseite mit Try-it-Buttons',
      'CI/CD mit GitHub Actions, SonarQube, Docker'
    ],
    codeSnippet: {
      language: 'go',
      description: 'Go-Struct mit db:-Tags wird automatisch zu PostgreSQL-DDL konvertiert',
      code: `type User struct {
\tID       int64  \`db:"pk"\`
\tUsername string \`db:"unique"\`
\tEmail    string \`db:"check:length(email) > 0"\`
\tStatus   string \`db:"enum:active,inactive,banned"\`
\tActive   bool   \`db:"default:true"\`
}`
    }
  },
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