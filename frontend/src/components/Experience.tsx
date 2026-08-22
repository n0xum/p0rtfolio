export default function Experience() {
  const experiences = [
    {
      period: 'seit 06.2026',
      position: 'IT-Berater / Softwareentwickler',
      company: 'Lufthansa Industry Solutions',
      description: 'Backend-Entwicklung in Projekten der Lufthansa Group mit Fokus auf robuste Services, klare Architektur und moderne Schnittstellen.',
      highlights: [
        'Mitarbeit in einem Aviation-Großprojekt mit einem bestehenden Backend-Stack aus C#, gRPC und Protocol Buffers. Die Einarbeitung in Sprache und Technologien läuft.',
        'REST-API in Go mit sqlc und PostgreSQL für einen datenschutzkritischen Abgleich personenbezogener Daten. DSGVO-Anforderungen an Datensparsamkeit wurden von der Datenmodellierung an berücksichtigt.',
        'Migrations-CLI in Go ab dem Projekt-Kickoff: liest CSV-Exporte von einem SFTP-Server ein, transformiert sie und überträgt sie kommandozeilengesteuert als JSON in ein neues zentrales Zielsystem',
        'CO2-Bilanz-Dashboard, das Mitarbeitenden den eigenen Fußabdruck aus Pendelverkehr, Dienstreisen und IT-Emissionen (z. B. Cloud-Nutzung) sichtbar macht. Das REST-Backend entstand mit Java und Spring Boot, das Frontend mit React.'
      ]
    },
    {
      period: '08.2023 – 06.2026',
      position: 'Ausbildung zum Fachinformatiker für Anwendungsentwicklung',
      company: 'Lufthansa Industry Solutions · Abschluss: 2,0',
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
      description: '',
      highlights: []
    }
  ];

  return (
    <section
      id="experience"
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-32 lg:py-40"
    >
      <div className="max-w-3xl w-full">
        <div className="reveal-on-scroll">
          <h2 className="text-sm uppercase tracking-wider text-secondary mb-4">
            Erfahrung
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-12">
            Werdegang
          </h3>
        </div>

        {/* The focal moment.
            Each entry used to carry its own `border-l-2`, so the timeline
            was not actually a line - it was four disconnected segments with
            48px gaps between them wherever `space-y-12` fell. It is now one
            continuous rail owned by this container, with an accent-coloured
            fill scaled from the top by scroll progress, so the record
            writes itself as you read down it. Each marker snaps in as it
            arrives. Both are CSS scroll timelines - see `.timeline-rail`,
            `.timeline-fill` and `.timeline-marker` in globals.css. */}
        <div className="relative">
          <span className="timeline-rail" aria-hidden="true" />
          <span className="timeline-fill" aria-hidden="true" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="reveal-on-scroll relative pl-8">
                {/* -7px centres a 16px marker on the 2px rail at x=0. The
                    ring was `border-white`, which is not a token this build
                    declares and sat 1.5% off the actual `#fafafa` page
                    ground it was meant to punch through. */}
                <span
                  className="timeline-marker absolute -left-[7px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background"
                  aria-hidden="true"
                />

                <div className="space-y-4">
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                      <h4 className="text-xl font-bold">{exp.position}</h4>
                      <span className="text-sm text-secondary font-mono">{exp.period}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-primary">
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>

                  {exp.description && (
                    <p className="text-secondary leading-relaxed">{exp.description}</p>
                  )}

                  {exp.highlights.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h5 className="text-sm font-medium uppercase tracking-wider text-secondary">
                        Highlights
                      </h5>
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-primary mt-1">→</span>
                            <span className="text-secondary">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal-on-scroll mt-16 p-8 border border-border bg-panel dark:bg-panel/20">
          <h4 className="font-bold mb-6">Technologien & Methoden</h4>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <h5 className="text-sm font-medium uppercase tracking-wider text-secondary mb-2">
                  Sprachen
                </h5>
                <p className="text-sm text-secondary leading-relaxed">
                  Golang, C#, Java, TypeScript
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium uppercase tracking-wider text-secondary mb-2">
                  Frameworks & Protokolle
                </h5>
                <p className="text-sm text-secondary leading-relaxed">
                  gRPC, Protocol Buffers, REST, Spring Boot, React, Next.js
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium uppercase tracking-wider text-secondary mb-2">
                  Datenbanken
                </h5>
                <p className="text-sm text-secondary leading-relaxed">
                  MongoDB, PostgreSQL, Redis
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium uppercase tracking-wider text-secondary mb-2">
                  Cloud & Infrastruktur
                </h5>
                <p className="text-sm text-secondary leading-relaxed">
                  AWS, Docker, Linux, CI/CD, Git
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium uppercase tracking-wider text-secondary mb-2">
                  Observability
                </h5>
                <p className="text-sm text-secondary leading-relaxed">
                  New Relic
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium uppercase tracking-wider text-secondary mb-2">
                  Methoden & Tools
                </h5>
                <p className="text-sm text-secondary leading-relaxed">
                  Scrum, Jira, Confluence, ADRs
                </p>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
