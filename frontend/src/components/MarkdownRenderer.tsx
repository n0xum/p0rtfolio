'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema, type Options as SanitizeSchema } from 'rehype-sanitize';

interface MarkdownRendererProps {
  content: string;
}

// GitHub READMEs are untrusted HTML piped through rehype-raw. Sanitize the
// resulting tree before it reaches the DOM, extending GitHub's default
// schema (which already covers plain markdown/HTML READMEs) for two cases
// real-world READMEs rely on:
// - shields.io / build-status badges, usually an `<img>` (sometimes wrapped
//   in `<a>`/`<picture>`, sometimes `align`-ed) — `img`/`a` are already
//   covered by the default schema, `align` is added for centered badge rows.
// - fenced code blocks, which get a `language-xxx` class from remark/mdast
//   before this plugin ever runs (already allowed by the default schema),
//   and are later re-highlighted by rehype-highlight *after* this sanitize
//   pass, adding `hljs`/`hljs-*` classes to `code`/`span`. Since sanitize
//   runs before highlighting, those generated classes never need
//   whitelisting for the normal pipeline — but the classes are allowed here
//   too in case a README author writes pre-highlighted `<code class="hljs
//   language-x">`/`<span class="hljs-*">` HTML directly, so that content
//   isn't silently stripped either.
const readmeSanitizeSchema: SanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [
      ...(defaultSchema.attributes?.code ?? []),
      ['className', /^hljs$/],
      ['className', /^hljs-/],
    ],
    span: [
      ...(defaultSchema.attributes?.span ?? []),
      ['className', /^hljs-/],
    ],
    img: [
      ...(defaultSchema.attributes?.img ?? []),
      'align',
    ],
  },
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, [rehypeSanitize, readmeSanitizeSchema], rehypeHighlight]}
      components={{
        // Custom heading styles
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl md:text-4xl font-bold mb-6 mt-12 first:mt-0 border-b border-border dark:border-zinc-800 pb-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-10 border-b border-border dark:border-zinc-800 pb-3" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-xl md:text-2xl font-semibold mb-3 mt-8" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-lg md:text-xl font-semibold mb-2 mt-6" {...props} />
        ),
        h5: ({ node, ...props }) => (
          <h5 className="text-base md:text-lg font-semibold mb-2 mt-4" {...props} />
        ),
        h6: ({ node, ...props }) => (
          <h6 className="text-sm md:text-base font-semibold mb-2 mt-4" {...props} />
        ),

        // Paragraph
        p: ({ node, ...props }) => (
          <p className="text-base text-secondary dark:text-zinc-400 leading-relaxed mb-4" {...props} />
        ),

        // Links
        a: ({ node, ...props }) => (
          <a
            className="text-accent dark:text-accent-muted hover:underline transition-colors"
            target={props.href?.startsWith('http') ? '_blank' : undefined}
            rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            {...props}
          />
        ),

        // Lists
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-inside mb-4 space-y-2 text-secondary dark:text-zinc-400" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal list-inside mb-4 space-y-2 text-secondary dark:text-zinc-400" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="leading-relaxed" {...props} />
        ),

        // Code blocks with syntax highlighting
        pre: ({ node, ...props }) => (
          <div className="relative group my-6">
            <pre
              className="overflow-x-auto p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-mono text-zinc-900 dark:text-zinc-100"
              {...props}
            />
            <button
              onClick={(e) => {
                const code = (e.currentTarget.previousSibling as HTMLElement)?.textContent || '';
                navigator.clipboard.writeText(code);
                e.currentTarget.textContent = 'Kopiert!';
                setTimeout(() => {
                  e.currentTarget.textContent = 'Kopieren';
                }, 2000);
              }}
              className="absolute top-2 right-2 px-3 py-1 text-xs bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Kopieren
            </button>
          </div>
        ),
        code: ({ node, className, children, ...props }) => {
          // react-markdown v9+ no longer passes an `inline` prop; the
          // reliable way to tell a fenced (block) code element apart from
          // an inline `code` span is the `language-*` class that
          // remark-gfm/rehype-highlight puts only on fenced code blocks.
          const isFenced = /language-(\w+)/.test(className || '');

          return isFenced ? (
            <code className={className} {...props}>
              {children}
            </code>
          ) : (
            <code
              className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-accent dark:text-accent-muted font-mono text-sm border border-zinc-200 dark:border-zinc-800"
              {...props}
            >
              {children}
            </code>
          );
        },

        // Blockquote
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-accent dark:border-accent-muted pl-4 py-2 my-4 italic text-secondary dark:text-zinc-400 bg-surface dark:bg-zinc-900/50"
            {...props}
          />
        ),

        // Table
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-border dark:border-zinc-800" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-surface dark:bg-zinc-900" {...props} />
        ),
        tbody: ({ node, ...props }) => (
          <tbody {...props} />
        ),
        tr: ({ node, ...props }) => (
          <tr className="border-b border-border dark:border-zinc-800" {...props} />
        ),
        th: ({ node, ...props }) => (
          <th className="px-4 py-2 text-left font-semibold text-primary dark:text-zinc-50" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="px-4 py-2 text-secondary dark:text-zinc-400" {...props} />
        ),

        // Horizontal rule
        hr: ({ node, ...props }) => (
          <hr className="my-8 border-border dark:border-zinc-800" {...props} />
        ),

        // Images
        img: ({ node, ...props }) => (
          <img
            className="rounded-lg my-6 border border-border dark:border-zinc-800 max-w-full h-auto"
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
