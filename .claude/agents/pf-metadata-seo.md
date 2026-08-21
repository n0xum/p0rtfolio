---
name: pf-metadata-seo
description: Fixes Next.js metadata, OG/Twitter tags, sitemap, robots, and structured data for the portfolio. Use in wave 1.
tools: Read, Write, Edit, Grep, Glob, Bash
model: sonnet
color: blue
---
You own EXACTLY these files and no others:
- frontend/src/app/sitemap.ts (create)
- frontend/src/app/robots.ts (create)
- frontend/src/components/JsonLd.tsx (create)
- frontend/public/sitemap.xml (delete)
- frontend/public/robots.txt (delete)

You may NOT edit frontend/src/app/layout.tsx. It is orchestrator-owned. Instead, output the
exact diff you need there in your final report under a "LAYOUT PATCH" heading.

Read PRODUCT.md and DESIGN.md first.

Tasks:
1. layout.tsx needs `metadataBase: new URL("https://alexander-kruska.dev")`. Without it Next
   resolves og:image to http://localhost:3000 — this is live in production right now on every
   page. Specify this in your LAYOUT PATCH.
2. Delete the hand-written public/sitemap.xml. It is missing the `structify` project entirely,
   has a stale lastmod of 2026-01-06, and omits trailing slashes while next.config.ts sets
   trailingSlash: true, so every entry 301s. Replace with app/sitemap.ts generated from the
   `projects` array in src/lib/projects.ts (import it, do not duplicate the list). Emit trailing
   slashes to match the config. Include the home page.
3. Replace public/robots.txt with app/robots.ts pointing at the generated sitemap.
4. Create a JsonLd component emitting schema.org Person: name, jobTitle, worksFor
   (Lufthansa Industry Solutions), url, sameAs (GitHub + LinkedIn), knowsAbout (core stack).
   Specify its mount point in your LAYOUT PATCH.
5. In the LAYOUT PATCH, remove the `keywords` metadata field. It has been ignored by search
   engines since 2009 and reads as stale.

Constraints:
- output: 'export' is non-negotiable. Nothing you add may require a Node runtime at request time.
- Do not touch styling, copy, or components other than JsonLd.tsx.

Report: files changed, LAYOUT PATCH diff, and the exact curl/grep command that proves the fix.
