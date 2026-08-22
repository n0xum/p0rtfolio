import hljs from 'highlight.js';
import CodeCopyButton from './CodeCopyButton';

interface CodeSnippetProps {
  language: string;
  code: string;
  description: string;
}

/**
 * Highlights `code` at build/render time (this component has no 'use client'
 * directive, so it runs on the server / during `next build` for the static
 * export) instead of shipping a second client-side highlighter bundle next
 * to the one MarkdownRenderer already lazy-loads for the README dropdown.
 */
function highlightCode(code: string, language: string): { html: string; language: string } {
  if (language && hljs.getLanguage(language)) {
    const { value } = hljs.highlight(code, { language, ignoreIllegals: true });
    return { html: value, language };
  }

  const { value, language: detected } = hljs.highlightAuto(code);
  return { html: value, language: detected ?? 'plaintext' };
}

export default function CodeSnippet({ language, code, description }: CodeSnippetProps) {
  const { html, language: highlightedLanguage } = highlightCode(code, language);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        <h2 className="text-2xl font-bold">Code-Beispiel</h2>
      </div>
      <p className="text-secondary">{description}</p>
      <div className="relative group">
        <pre
          tabIndex={0}
          role="region"
          aria-label={`Code-Beispiel: ${description}`}
          className="overflow-x-auto p-6 rounded-lg bg-code-surface border border-code-border text-sm font-mono"
        >
          <code
            // highlight.js's github.css theme matches `pre code.hljs` and sets
            // its own `overflow-x: auto`, independently of the `overflow-x-auto`
            // already on the surrounding <pre>. Left alone, that creates a
            // second, nested scrollable region with no accessible name of its
            // own (axe: scrollable-region-focusable) - `!overflow-x-visible`
            // cancels it so the <pre> above stays the single scroll container.
            className={`hljs language-${highlightedLanguage} !overflow-x-visible`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </pre>
        <CodeCopyButton code={code} />
      </div>
    </div>
  );
}
