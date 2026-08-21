export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-32 lg:py-40"
    >
      <div className="max-w-3xl w-full">
        <div className="reveal-on-scroll">
          <h2 className="text-sm uppercase tracking-wider text-secondary dark:text-zinc-400 mb-4">
            Über mich
          </h2>
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold leading-tight">
              IT-Berater mit Schwerpunkt Softwareentwicklung
            </h3>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-secondary dark:text-zinc-400 leading-relaxed">
                Ich arbeite als IT-Berater und Softwareentwickler bei <span className="text-primary dark:text-zinc-50 font-medium">Lufthansa Industry Solutions</span>.
                Mein Schwerpunkt liegt auf der Entwicklung robuster Backend-Systeme mit Go, C#, Java und modernen Schnittstellen.
              </p>

              <p className="text-lg text-secondary dark:text-zinc-400 leading-relaxed">
                Dabei verbinde ich Backend-Entwicklung mit <span className="text-primary dark:text-zinc-50 font-medium">Go (Golang)</span>,
                C# und Java (Spring Boot) mit Frontend-Entwicklung in <span className="text-primary dark:text-zinc-50 font-medium">React</span> und Next.js.
                Zu meinem Alltag gehören außerdem Datenbanken, Cloud-Infrastruktur, CI/CD und Observability.
              </p>

              <p className="text-lg text-secondary dark:text-zinc-400 leading-relaxed">
                Ich arbeite in agilen Teams an produktionsrelevanten Projekten und unterstütze die Entwicklung
                und Umsetzung wartbarer Softwarelösungen.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border dark:border-zinc-800">
              <div>
                <div className="text-3xl font-bold mb-1">seit 2023</div>
                <div className="text-sm text-secondary dark:text-zinc-400">Praxis & Projekte</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">Go</div>
                <div className="text-sm text-secondary dark:text-zinc-400">Backend-Fokus</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">C#</div>
                <div className="text-sm text-secondary dark:text-zinc-400">gRPC & Protobuf</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">∞</div>
                <div className="text-sm text-secondary dark:text-zinc-400">Lernbereitschaft</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
