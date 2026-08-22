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
// - shields.io / build-status badges, usually an img element (sometimes
//   wrapped in an a or picture element, sometimes align-ed) - the img and a
//   tag names are already covered by the default schema, align is added for
//   centered badge rows.
// - fenced code blocks, which get a language-xxx class from remark/mdast
//   before this plugin ever runs (already allowed by the default schema),
//   and are later re-highlighted by rehype-highlight *after* this sanitize
//   pass, adding hljs/hljs-* classes to the code/span tags. Since sanitize
//   runs before highlighting, those generated classes never need
//   whitelisting for the normal pipeline - but the classes are allowed here
//   too in case a README author writes pre-highlighted HTML for a code tag
//   (class="hljs language-x") or span tag (class="hljs-*") directly, so
//   that content isn't silently stripped either.
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
          <h1 className="text-3xl md:text-4xl font-bold mb-6 mt-12 first:mt-0 border-b border-border pb-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-10 border-b border-border pb-3" {...props} />
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
          <p className="text-base text-secondary leading-relaxed mb-4" {...props} />
        ),

        // Links
        a: ({ node, ...props }) => (
          <a
            className="text-accent hover:underline transition-colors"
            target={props.href?.startsWith('http') ? '_blank' : undefined}
            rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            {...props}
          />
        ),

        // Lists
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-inside mb-4 space-y-2 text-secondary" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal list-inside mb-4 space-y-2 text-secondary" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="leading-relaxed" {...props} />
        ),

        // Code blocks with syntax highlighting
        pre: ({ node, ...props }) => (
          <div className="relative group my-6">
            <pre
              tabIndex={0}
              role="region"
              aria-label="Codeblock"
              className="overflow-x-auto p-4 rounded-lg bg-code-surface border border-code-border text-sm font-mono text-code-text"
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
              className="absolute top-2 right-2 px-3 py-1 text-xs bg-control hover:bg-control-hover text-control-text rounded opacity-0 group-hover:opacity-100 transition-opacity"
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
            // highlight.js's github.css theme matches `pre code.hljs` and sets
            // its own `overflow-x: auto`, independently of the `overflow-x-auto`
            // already on the surrounding <pre> above. Left alone, that's a
            // second, nested scrollable region with no accessible name of its
            // own (axe: scrollable-region-focusable) - `!overflow-x-visible`
            // cancels it so the <pre> stays the single scroll container.
            <code className={`${className ?? ''} !overflow-x-visible`} {...props}>
              {children}
            </code>
          ) : (
            <code
              className="px-1.5 py-0.5 rounded bg-code-surface-inline text-accent font-mono text-sm border border-code-border"
              {...props}
            >
              {children}
            </code>
          );
        },

        // Blockquote
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-accent pl-4 py-2 my-4 italic text-secondary bg-surface dark:bg-surface/50"
            {...props}
          />
        ),

        // Table
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-border" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-surface" {...props} />
        ),
        tbody: ({ node, ...props }) => (
          <tbody {...props} />
        ),
        tr: ({ node, ...props }) => (
          <tr className="border-b border-border" {...props} />
        ),
        th: ({ node, ...props }) => (
          <th className="px-4 py-2 text-left font-semibold text-primary" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="px-4 py-2 text-secondary" {...props} />
        ),

        // Horizontal rule
        hr: ({ node, ...props }) => (
          <hr className="my-8 border-border" {...props} />
        ),

        // Images
        img: ({ node, alt, ...props }) => (
          <img
            alt={alt ?? ''}
            className="rounded-lg my-6 border border-border max-w-full h-auto"
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
