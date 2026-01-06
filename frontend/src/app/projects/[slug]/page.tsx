import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/projects';
import { fetchGitHubReadme, fetchGitHubRepoInfo } from '@/lib/github';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import CodeSnippet from '@/components/CodeSnippet';
import Link from 'next/link';
import Image from 'next/image';

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Projekt nicht gefunden',
    };
  }

  return {
    title: `${project.title} - Portfolio`,
    description: project.description,
    openGraph: {
      title: `${project.title} - Alexander Kruska`,
      description: project.description,
      type: 'article',
      url: `https://alexander-kruska.dev/projects/${slug}`,
      images: project.image ? [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ] : [
        {
          url: '/images/portfolio.png',
          width: 1200,
          height: 630,
          alt: 'Alexander Kruska Portfolio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - Alexander Kruska`,
      description: project.description,
      images: [project.image || '/images/portfolio.png'],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const [readme, repoInfo] = await Promise.all([
    fetchGitHubReadme(project.githubRepo),
    fetchGitHubRepoInfo(project.githubRepo),
  ]);

  return (
    <main className="min-h-screen bg-background dark:bg-zinc-950 pt-24 pb-32">
      {/* Back Navigation */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mb-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-secondary dark:text-zinc-400 hover:text-accent dark:hover:text-accent-muted transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Zurück zu Projekten
        </Link>
      </div>

      {/* Project Header */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mb-12">
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-secondary dark:text-zinc-400 mb-2 block">
              {project.type}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-secondary dark:text-zinc-400 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm border border-border dark:border-zinc-700 text-secondary dark:text-zinc-400 bg-surface dark:bg-zinc-900"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links & Stats */}
          <div className="flex flex-wrap gap-6 items-center pt-4 border-t border-border dark:border-zinc-800">
            <a
              href={repoInfo?.url || `https://github.com/${project.githubRepo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-accent dark:hover:text-accent-muted transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:text-accent dark:hover:text-accent-muted transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}

            {repoInfo && (
              <div className="flex gap-4 text-sm text-secondary dark:text-zinc-400">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {repoInfo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  {repoInfo.forks}
                </span>
              </div>
            )}
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="pt-6 border-t border-border dark:border-zinc-800">
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-secondary dark:text-zinc-400">
                    <svg className="w-5 h-5 text-accent dark:text-accent-muted flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Project Image */}
      {project.image && (
        <div className="max-w-4xl mx-auto px-6 md:px-12 mb-12">
          <div className="relative w-full aspect-video rounded-lg border border-border dark:border-zinc-800 shadow-lg overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.title} Screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* About Section */}
      {project.about && (
        <div className="max-w-4xl mx-auto px-6 md:px-12 mb-12">
          <div className="bg-surface dark:bg-zinc-900/50 border border-border dark:border-zinc-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-accent dark:text-accent-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Über dieses Projekt
            </h2>
            <div className="prose prose-lg max-w-none">
              {project.about.split('\n').map((paragraph, i) => (
                paragraph.trim() && (
                  <p key={i} className="text-base text-secondary dark:text-zinc-400 leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Code Snippet */}
      {project.codeSnippet && (
        <div className="max-w-4xl mx-auto px-6 md:px-12 mb-12">
          <CodeSnippet
            language={project.codeSnippet.language}
            code={project.codeSnippet.code}
            description={project.codeSnippet.description}
          />
        </div>
      )}

      {/* README Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="prose-wrapper">
          <MarkdownRenderer content={readme} />
        </div>
      </div>
    </main>
  );
}
