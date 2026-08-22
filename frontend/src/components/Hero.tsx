import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-20"
    >
      {/* Hero is fully in view at scroll 0, so a scroll-triggered reveal
          (what this used to carry) could never actually fire for it - its
          range was already past before the page finished painting. It gets
          the build's one authored load sequence instead: four steps, 90ms
          apart, in reading order. See `.hero-step` in globals.css. */}
      <div className="max-w-3xl w-full">
        <div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            {/* Profile Image */}
            <div className="hero-step flex-shrink-0">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-border-raised overflow-hidden bg-panel">
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
            <div className="hero-step hero-step-2 flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Ich bin
                <br />
                <span className="text-secondary">Alexander</span>
              </h1>
            </div>
          </div>

          <p className="hero-step hero-step-3 text-xl md:text-2xl text-secondary max-w-2xl mb-8 leading-relaxed">
            IT-Berater und Softwareentwickler bei der{' '}
            <span className="text-primary font-medium">Lufthansa Industry Solutions</span>.
            Spezialisiert auf robuste Backend-Services mit Go, C# und Java.
          </p>

          <div className="hero-step hero-step-4 flex gap-6 items-center flex-wrap">
            <a
              href="#work"
              className="inline-block px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-background transition-colors duration-150 ease-out-quart text-sm font-medium"
            >
              Meine Projekte
            </a>
            <a
              href="#contact"
              className="text-sm text-secondary hover:text-accent transition-colors duration-150 ease-out-quart underline underline-offset-4 decoration-2"
            >
              Kontakt aufnehmen <span className="link-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
