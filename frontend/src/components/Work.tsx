import Link from 'next/link';

export default function Work() {
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
      title: 'structify',
      description: 'Go-Structs zu PostgreSQL-Schemas konvertieren, mit Web-Editor und Inline-Tags für Constraints, Indexes und Foreign Keys.',
      tech: ['Go', 'PostgreSQL', 'Next.js', 'Docker'],
      type: 'Full-Stack',
      slug: 'structify'
    },
    {
      title: 'zigbee-controller',
      description: 'Zigbee-Geräte über Zigbee2MQTT und MQTT mit Apple HomeKit verbinden. Läuft vollständig im eigenen Netzwerk, ohne Cloud-Zugriff.',
      tech: ['Go', 'MQTT', 'HomeKit (HAP)', 'Docker'],
      type: 'Backend',
      slug: 'zigbee-controller'
    }
  ];

  return (
    <section
      id="work"
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-32 lg:py-40"
    >
      <div className="max-w-3xl w-full">
        {/* This section used to reveal as one plane, which wasted the fact
            that it is actually two lists. The headings reveal, then the
            three skill columns and the project rows each stagger. The
            columns sit side by side and so cross the viewport edge at the
            same instant - that is the case `.reveal-stagger`'s offset
            ranges exist for. */}
        <div>
          {/* Skills Section */}
          <div className="mb-20">
            <div className="reveal-on-scroll">
              <h2 className="text-sm uppercase tracking-wider text-secondary dark:text-zinc-400 mb-4">
                Technologien
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-8">
                Meine Expertise
              </h3>
            </div>

            <div className="reveal-stagger grid md:grid-cols-3 gap-8">
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
            <div className="reveal-on-scroll">
              <h2 className="text-sm uppercase tracking-wider text-secondary dark:text-zinc-400 mb-4">
                Projekte
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-8">
                Ausgewählte Arbeiten
              </h3>
            </div>

            <div className="reveal-stagger space-y-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="border-b border-border dark:border-zinc-800 pb-8 last:border-b-0 group transition-colors duration-200 ease-out-quart hover:border-accent dark:hover:border-accent-muted has-[a:focus-visible]:border-accent dark:has-[a:focus-visible]:border-accent-muted"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                    <div>
                      <h4 className="text-xl font-bold group-hover:text-accent dark:group-hover:text-accent-muted transition-colors duration-150 ease-out-quart">
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
                      className="inline-flex items-center gap-2 text-sm text-accent dark:text-accent-muted hover:underline transition-colors duration-150 ease-out-quart"
                    >
                      Details ansehen
                      <svg className="link-arrow w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
