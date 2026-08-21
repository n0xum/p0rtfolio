---
name: pf-project-pages
description: Fixes the project detail route, GitHub API integration, README rendering, and the broken stat block. Use in wave 1.
tools: Read, Write, Edit, Grep, Glob, Bash
model: sonnet
color: green
---
You own EXACTLY these files:
- frontend/src/app/projects/[slug]/page.tsx
- frontend/src/app/projects/[slug]/error.tsx
- frontend/src/app/projects/[slug]/loading.tsx
- frontend/src/app/not-found.tsx (create)
- frontend/src/lib/github.ts
- frontend/src/components/MarkdownRenderer.tsx
- frontend/src/components/ReadmeDropdown.tsx

Do NOT edit src/lib/projects.ts (content lane, later wave) or layout.tsx.

Tasks:
1. The stars/forks block renders bare unlabeled integers. On /projects/cli-tool/ it currently
   prints "00" in production. Hide the entire block when stars + forks === 0, add visible labels
   plus aria-labels, and format with Intl.NumberFormat.
2. fetchGitHubRepoInfo runs unauthenticated at build time. GitHub Actions runner IPs are
   rate-limited, so repoInfo is null non-deterministically and the block flickers between
   deploys. Read GITHUB_TOKEN, and fail the build loudly if the API returns 403 rather than
   silently degrading — a portfolio that ships a half-rendered page is worse than a failed build.
   Coordinate: the build-deploy agent is adding the secret; assume process.env.GITHUB_TOKEN exists.
3. MarkdownRenderer pipes remote GitHub README HTML through rehype-raw with no sanitizer. Add
   rehype-sanitize with a schema that still permits the badge images and code blocks real READMEs
   use. Add the dependency to your report, not to package.json (deps agent owns that file).
4. notFound() in this route is unreachable: generateStaticParams + output: 'export' means no
   unknown slug ever renders, and there is no app/not-found.tsx for nginx's
   `error_page 404 /404.html` to serve. Create a real not-found.tsx so the 404 is on-brand
   instead of Next's default.
5. Fix the German in the fallback strings in lib/github.ts if any are wrong.

Constraints: static export only. No client-side fetching of the GitHub API — the tokenless
browser request would be rate-limited instantly.

Report: what changed, plus a before/after of the rendered stat block.
