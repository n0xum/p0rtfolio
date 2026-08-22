export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-32 lg:py-40"
    >
      <div className="max-w-3xl w-full">
        <div className="reveal-on-scroll">
          <h2 className="text-sm uppercase tracking-wider text-secondary mb-4">
            Über mich
          </h2>
        </div>
        {/* The section body walks in a block at a time instead of the whole
            section fading as one plane: headline, then the argument, then
            the evidence row. Deliberately NOT nested inside another reveal
            container - two stacked reveals would compound their translate
            and double the travel. */}
        <div className="reveal-stagger space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold leading-tight">
              Schwerpunkte und Arbeitsweise
            </h3>

            {/* Role, employer and primary stack are stated once, in the
                Hero. This section deliberately does not repeat that claim -
                it carries what the Hero doesn't: what the skills are
                actually applied to, and how the work is done. Bullet
                vocabulary and the labelled-column pattern are reused
                verbatim from Werdegang and Work rather than invented here. */}
            <p className="text-lg text-secondary leading-relaxed">
              Mein Fokus liegt auf Schnittstellen, wartbaren Architekturen und Software, die auch im
              produktiven Betrieb zuverlässig funktioniert.
            </p>

            <p className="text-lg text-secondary leading-relaxed">
              Neben meiner Arbeit im Unternehmensumfeld entwickle ich eigene Projekte, betreibe eigene
              Infrastruktur und beschäftige mich mit modernen Ansätzen rund um Softwareentwicklung und KI.
              Wenn es ein Projekt erfordert, bekommt die API auch das passende Frontend.
            </p>

            <div className="grid md:grid-cols-2 gap-8 pt-2">
              <div className="space-y-4">
                <h4 className="font-medium text-lg border-b border-border pb-2">
                  Schwerpunkte
                </h4>
                <ul className="space-y-2">
                  {[
                    'Backend-Services und REST-APIs in Go, C# und Java (Spring Boot)',
                    'Datenmodellierung mit PostgreSQL, inklusive DSGVO-Anforderungen von der Modellierung an',
                    'Betrieb mit Docker, CI/CD und Linux auf eigenen Servern bei Hetzner und im Homelab',
                    'Monitoring und Observability produktiver Services',
                    'Frontend bei Bedarf mit React, Next.js und TypeScript',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-primary mt-1" aria-hidden="true">→</span>
                      <span className="text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-lg border-b border-border pb-2">
                  Arbeitsweise
                </h4>
                <ul className="space-y-2">
                  {[
                    'Agile Teams (Scrum), Abstimmung mit Fachbereich und Betrieb',
                    'Einarbeitung in gewachsene Stacks, aktuell C# mit gRPC und Protocol Buffers',
                    'Architekturentscheidungen als ADR dokumentiert, nicht vorausgesetzt',
                    'Verantwortung ab Projekt-Kickoff, nicht erst ab dem Ticket',
                    'KI-gestützte Multi-Agenten-Workflows mit klarer Rollen- und Review-Trennung',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-primary mt-1" aria-hidden="true">→</span>
                      <span className="text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
