export default function Contact() {
  const contactLinks = [
    {
      label: 'Email',
      value: '6e3078756d@pm.me',
      href: 'mailto:6e3078756d@pm.me'
    },
    {
      label: 'GitHub',
      value: 'github.com/n0xum',
      href: 'https://github.com/n0xum'
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/alexanderkruska',
      href: 'https://www.linkedin.com/in/alexanderkruska/'
    }
  ];

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-32 lg:py-40"
    >
      <div className="max-w-3xl w-full">
        <div className="reveal-on-scroll">
          <h2 className="text-sm uppercase tracking-wider text-secondary dark:text-zinc-400 mb-4">
            Kontakt
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-8">
            Lass uns zusammenarbeiten
          </h3>

          <p className="text-lg text-secondary dark:text-zinc-400 mb-12 leading-relaxed">
            Ich freue mich über den Austausch zu Technologien, Open-Source-Projekten
            oder neuen Ideen – schreiben Sie mir gerne.
          </p>

          <div className="space-y-4">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col md:flex-row md:items-center md:justify-between py-4 border-b border-border dark:border-zinc-800 group hover:border-accent dark:hover:border-accent-muted transition-colors gap-2"
              >
                <span className="text-sm uppercase tracking-wider text-secondary dark:text-zinc-400">
                  {link.label}
                </span>
                <span className="text-primary dark:text-zinc-50 group-hover:text-accent dark:group-hover:text-accent-muted transition-colors font-mono text-sm break-all md:break-normal">
                  {link.value} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
