---
name: pf-distill-project-pages
description: Removes the description/features/README triple-telling on project detail pages. Use in the redundancy wave.
tools: Read, Write, Edit, Grep, Glob, Bash
model: sonnet
color: green
---
You own EXACTLY:
- frontend/src/app/projects/[slug]/page.tsx
- frontend/src/lib/projects.ts
- frontend/src/components/ReadmeDropdown.tsx

Run `/impeccable distill` on this route.

THE PROBLEM: each project detail page states the same information three times. structify's
description is "Go-Structs zu PostgreSQL-Schemas konvertieren"; the first bullet in the features
list is "Go-Structs mit db:-Tags zu SQL-DDL konvertieren"; the embedded README then restates the
description, the features, and the tech stack a third time. The reader scrolls through three
paraphrases of one idea before reaching anything new.

1. Read each linked repo's actual README (via the GitHub API) and diff it against the hardcoded
   `features` arrays in lib/projects.ts. Delete every feature bullet that the README already
   covers. If the README covers ALL of them, delete the features array and let the README carry
   it — the README is maintained; the hardcoded array will rot.
2. Decide and enforce one split: the page above the README owns "why this exists and what is
   interesting about it"; the README owns "what it does and how to run it". Anything appearing on
   both sides gets cut from the page, not the README.
3. The description string is currently used verbatim as the page `<p>`, the `og:description`, and
   the `twitter:description`. Meta reuse is fine — but the on-page paragraph should be longer and
   more specific than the 155-character meta blurb. Split them.
4. cli-tool's four features ("Automatisierung von Entwicklungsaufgaben", "Effiziente
   Kommandozeilen-Interface", "Cross-Platform Unterstützung", "Erweiterbare Architektur") say
   nothing that isn't true of every CLI ever written, and the second is also grammatically wrong.
   They are not redundant with each other — they are redundant with the *concept* of a CLI tool.
   Recommend cutting the project; do not delete it without human approval.
5. The per-project tech chips duplicate the landing page's Work card chips. Keep them on the
   detail page (they are load-bearing there) and flag the card chips to pf-distill-content if the
   overlap is total.

CONSTRAINTS: static export; no client-side GitHub calls; never invent project facts.

REPORT: per project, what each of the three surfaces now uniquely contributes. If you cannot
state a unique contribution for a surface, that surface should not exist.
