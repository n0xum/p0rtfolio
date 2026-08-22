import Link from 'next/link';
import { projects } from '@/lib/projects';

export default function Work() {
  return (
    <section
      id="work"
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-32 lg:py-40"
    >
      <div className="max-w-3xl w-full">
        <div>
          {/* Projects Section */}
          <div>
            <div className="reveal-on-scroll">
              <h2 className="text-sm uppercase tracking-wider text-secondary mb-4">
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
                  className="border-b border-border pb-8 last:border-b-0 group transition-colors duration-200 ease-out-quart hover:border-accent has-[a:focus-visible]:border-accent"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                    <div>
                      <h4 className="text-xl font-bold group-hover:text-accent transition-colors duration-150 ease-out-quart">
                        {project.title}
                      </h4>
                      <span className="text-xs uppercase tracking-wider text-secondary">
                        {project.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 border border-border-raised text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-secondary leading-relaxed mb-3">
                    {project.description}
                  </p>
                  {project.slug && (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-accent hover:underline transition-colors duration-150 ease-out-quart"
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
