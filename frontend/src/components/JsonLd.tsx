const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alexander Kruska",
  jobTitle: "IT-Berater / Softwareentwickler",
  worksFor: {
    "@type": "Organization",
    name: "Lufthansa Industry Solutions",
  },
  url: "https://alexander-kruska.dev",
  sameAs: [
    "https://github.com/n0xum",
    "https://www.linkedin.com/in/alexanderkruska",
  ],
  knowsAbout: [
    "Go",
    "C#",
    "Java",
    "TypeScript",
    "React",
    "Next.js",
    "Docker",
    "PostgreSQL",
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
    />
  );
}
