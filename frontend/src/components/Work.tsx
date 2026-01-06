'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Work() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    {
      category: 'Backend',
      items: ['Go (Golang)', 'Spring Boot (Java)', 'REST APIs', 'PostgreSQL', 'Redis', 'Docker']
    },
    {
      category: 'Frontend & Mobile',
      items: ['Next.js', 'React', 'TypeScript', 'Flutter', 'Tailwind CSS', 'Responsive Design']
    },
    {
      category: 'Architecture & Methoden',
      items: ['Clean Architecture', 'Domain-Driven Design', 'Git', 'Linux', 'Agile/Scrum', 'CI/CD']
    }
  ];

  const projects = [
    {
      title: 'Microservice API',
      description: 'Entwicklung eines skalierbaren Microservice-Backends mit Go und PostgreSQL für die interne Verwaltung von Geschäftsprozessen.',
      tech: ['Go', 'PostgreSQL', 'Docker'],
      type: 'Backend',
      slug: null
    },
    {
      title: 'Dashboard Anwendung',
      description: 'Moderne Dashboard-Anwendung mit Next.js und TypeScript zur Visualisierung von Echtzeit-Daten und Metriken.',
      tech: ['Next.js', 'TypeScript', 'REST API', 'Tailwind'],
      type: 'Full-Stack',
      slug: null
    },
    {
      title: 'CLI Tool',
      description: 'Kommandozeilen-Tool in Go zur Automatisierung wiederkehrender Entwicklungs- und Deployment-Aufgaben.',
      tech: ['Go', 'CLI', 'Linux'],
      type: 'Backend',
      slug: 'cli-tool'
    },
    {
      title: 'Portfolio Website',
      description: 'Persönliche Portfolio-Website mit minimalistischem Design, entwickelt mit Next.js und optimiert für Performance.',
      tech: ['Next.js', 'Tailwind CSS', 'TypeScript'],
      type: 'Frontend',
      slug: 'portfolio-website'
    }
  ];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-32 lg:py-40"
    >
      <div className="max-w-3xl w-full">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Skills Section */}
          <div className="mb-20">
            <h2 className="text-sm uppercase tracking-wider text-secondary dark:text-zinc-400 mb-4">
              Technologien
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-8">
              Meine Expertise
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {skills.map((skillGroup, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="font-medium text-lg border-b border-border dark:border-zinc-800 pb-2">
                    {skillGroup.category}
                  </h4>
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill, i) => (
                      <li key={i} className="text-secondary dark:text-zinc-400 text-sm">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <h2 className="text-sm uppercase tracking-wider text-secondary dark:text-zinc-400 mb-4">
              Projekte
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-8">
              Ausgewählte Arbeiten
            </h3>

            <div className="space-y-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="border-b border-border dark:border-zinc-800 pb-8 last:border-b-0 group"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                    <div>
                      <h4 className="text-xl font-bold group-hover:text-accent dark:group-hover:text-accent-muted transition-colors">
                        {project.title}
                      </h4>
                      <span className="text-xs uppercase tracking-wider text-secondary dark:text-zinc-400">
                        {project.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 border border-border dark:border-zinc-700 text-secondary dark:text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-secondary dark:text-zinc-400 leading-relaxed mb-3">
                    {project.description}
                  </p>
                  {project.slug && (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-accent dark:text-accent-muted hover:underline transition-colors"
                    >
                      Details ansehen
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
