'use client';

import { useEffect, useRef, useState } from 'react';

export default function Experience() {
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

  const experiences = [
    {
      period: 'seit 06.2026',
      position: 'IT-Berater / Softwareentwickler',
      company: 'Lufthansa Industry Solutions',
      category: 'Berufserfahrung',
      description: 'Backend-Entwicklung in Projekten der Lufthansa Group mit Fokus auf robuste Services, klare Architektur und moderne Schnittstellen.',
      highlights: [
        'Backend-Services in C# mit gRPC und Protocol Buffers in einem Aviation-Großprojekt',
        'Mitarbeit an zwei Go-Projekten mit Fokus auf technische Umsetzung, ADRs und Compliance, eines davon ab dem Kickoff',
        'REST-Backend mit Java und Spring Boot sowie Frontend mit React in einem Sustainability-Projekt'
      ]
    },
    {
      period: '08.2023 – 06.2026',
      position: 'Ausbildung zum Fachinformatiker für Anwendungsentwicklung',
      company: 'Lufthansa Industry Solutions · Abschluss: 2,0',
      category: 'Berufserfahrung',
      description: 'Praxisnahe Ausbildung mit Schwerpunkt auf Backend-Entwicklung, Web-Technologien und dem Betrieb produktiver Anwendungen.',
      highlights: [
        'Backend-Services in Golang, MongoDB und Redis in einem einjährigen Automotive-Projekt',
        'Monitoring mit New Relic und Betrieb auf AWS',
        'Entwurf und Umsetzung von REST-APIs mit Golang und Java (Spring Boot)',
        'Frontend-Entwicklung mit TypeScript, React und Next.js',
        'PostgreSQL, Docker, CI/CD-Pipelines und Scrum mit Jira und Confluence'
      ]
    },
    {
      period: '08.2021 – 07.2023',
      position: 'Fachhochschulreife: Informationstechnik',
      company: 'Fachoberschule',
      category: 'Ausbildung',
      description: 'Fachhochschulreife mit Schwerpunkt Informationstechnik.',
      highlights: []
    },
    {
      period: '08.2016 – 06.2021',
      position: 'Erweiterter Realschulabschluss',
      company: 'Realschule',
      category: 'Ausbildung',
      description: 'Erweiterter Realschulabschluss.',
      highlights: []
    }
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-32 lg:py-40"
    >
      <div className="max-w-3xl w-full">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-sm uppercase tracking-wider text-secondary dark:text-zinc-400 mb-4">
            Erfahrung
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-12">
            Werdegang
          </h3>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-border dark:border-zinc-800">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary dark:bg-zinc-50 border-4 border-white dark:border-zinc-950" />

                <div className="space-y-4">
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                      <h4 className="text-xl font-bold">{exp.position}</h4>
                      <span className="text-sm text-secondary dark:text-zinc-400 font-mono">{exp.period}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-primary dark:text-zinc-50">
                      <span className="font-medium">{exp.company}</span>
                    </div>
                    <div className="text-xs uppercase tracking-wider text-secondary dark:text-zinc-500 mt-2">
                      {exp.category}
                    </div>
                  </div>

                  <p className="text-secondary dark:text-zinc-400 leading-relaxed">{exp.description}</p>

                  {exp.highlights.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h5 className="text-sm font-medium uppercase tracking-wider text-secondary dark:text-zinc-400">
                        Highlights
                      </h5>
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-primary dark:text-zinc-50 mt-1">→</span>
                            <span className="text-secondary dark:text-zinc-400">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 border border-border dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/20">
            <h4 className="font-bold mb-6">Technologien & Methoden</h4>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <h5 className="text-sm font-medium uppercase tracking-wider text-secondary dark:text-zinc-400 mb-2">
                  Sprachen
                </h5>
                <p className="text-sm text-secondary dark:text-zinc-400 leading-relaxed">
                  Golang, C#, Java, TypeScript
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium uppercase tracking-wider text-secondary dark:text-zinc-400 mb-2">
                  Frameworks & Protokolle
                </h5>
                <p className="text-sm text-secondary dark:text-zinc-400 leading-relaxed">
                  gRPC, Protocol Buffers, REST, Spring Boot, React, Next.js
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium uppercase tracking-wider text-secondary dark:text-zinc-400 mb-2">
                  Datenbanken
                </h5>
                <p className="text-sm text-secondary dark:text-zinc-400 leading-relaxed">
                  MongoDB, PostgreSQL, Redis
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium uppercase tracking-wider text-secondary dark:text-zinc-400 mb-2">
                  Cloud & Infrastruktur
                </h5>
                <p className="text-sm text-secondary dark:text-zinc-400 leading-relaxed">
                  AWS, Docker, Linux, CI/CD, Git
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium uppercase tracking-wider text-secondary dark:text-zinc-400 mb-2">
                  Observability
                </h5>
                <p className="text-sm text-secondary dark:text-zinc-400 leading-relaxed">
                  New Relic
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium uppercase tracking-wider text-secondary dark:text-zinc-400 mb-2">
                  Methoden & Tools
                </h5>
                <p className="text-sm text-secondary dark:text-zinc-400 leading-relaxed">
                  Scrum, Jira, Confluence, ADRs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
