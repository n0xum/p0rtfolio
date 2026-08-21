import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-20"
    >
      <div className="max-w-3xl w-full">
        <div className="reveal-on-scroll">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-border dark:border-zinc-700 overflow-hidden bg-gray-50 dark:bg-zinc-900">
                <Image
                  src="/images/Profilbild.webp"
                  alt="Alexander Kruska - Software Developer"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Ich bin
                <br />
                <span className="text-secondary dark:text-zinc-400">Alexander</span>
              </h1>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-secondary dark:text-zinc-400 max-w-2xl mb-8 leading-relaxed">
            IT-Berater und Softwareentwickler bei{' '}
            <span className="text-primary dark:text-zinc-50 font-medium">Lufthansa Industry Solutions</span>.
            Spezialisiert auf robuste Backend-Services mit Go, C# und Java.
          </p>

          <div className="flex gap-6 items-center flex-wrap">
            <a
              href="#work"
              className="inline-block px-6 py-3 border-2 border-primary dark:border-zinc-50 text-primary dark:text-zinc-50 hover:bg-primary dark:hover:bg-zinc-50 hover:text-background dark:hover:text-zinc-950 transition-all duration-300 text-sm font-medium"
            >
              Meine Projekte
            </a>
            <a
              href="#contact"
              className="text-sm text-secondary dark:text-zinc-400 hover:text-accent dark:hover:text-accent-muted transition-colors underline underline-offset-4 decoration-2"
            >
              Kontakt aufnehmen →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
