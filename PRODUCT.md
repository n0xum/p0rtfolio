# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience is professional peers, LinkedIn/GitHub contacts, and Alexander himself — the site functions as a durable professional record and networking presence, not an active sales funnel for jobs or clients. Secondary readers (recruiters, hiring managers, potential collaborators) may still land here and should be able to quickly understand his role, stack, and how to reach him.

## Product Purpose

Personal portfolio for Alexander Kruska, IT-Berater / Softwareentwickler at Lufthansa Industry Solutions (LHIS). It presents who he is, his professional path, his technical stack, and a small set of real projects, and gives visitors a way to get in touch. Success is an accurate, current, well-crafted professional presence — not conversion metrics.

## Positioning

A backend-leaning engineer (Go, C#, Java) who also ships the frontend himself (React/Next.js/TypeScript) and treats the portfolio site itself as one of his shipped projects (it is literally listed as one of the three showcased projects, with its own code snippet). The site's credibility comes from real, verifiable project links (live GitHub repos, real code) rather than marketing claims.

## Operating Context

- Built with Next.js 16 (App Router, static export), TypeScript, Tailwind CSS 3, react-markdown + rehype-highlight.
- Deployed as a static export behind nginx in Docker; images/CI pipeline in `.github`.
- Project detail pages pull README content live from GitHub (`src/lib/github.ts`, `src/lib/projects.ts`) for the three showcased repos: `n0xum/structify`, `n0xum/cli-tool`, `n0xum/p0rtfolio`.
- Legal: Impressum and Datenschutz/Rechtliches are shown via in-page dialogs (`ImpressumContent.tsx`, `RechtlichesContent.tsx`) — required under German law (Impressumspflicht) and must remain present and reachable from every page.
- Site is entirely in German, targeting the German/DACH context. Content sections: Hero, About (Über mich), Work (projects), Experience (Werdegang), Contact (Kontakt).
- Dark mode is a supported, persisted feature (`ThemeToggle`, `theme.tsx`), synced to `localStorage` and system preference.

## Capabilities and Constraints

- Content is German-only today; an English version is an explicitly open decision — not committed to yet, but future work should keep an i18n pass scoping in mind rather than baking German strings in ways that make later translation harder.
- Project data (title, description, tech, features, code snippets) lives in `src/lib/projects.ts`; README content is fetched live from GitHub at build/runtime via `src/lib/github.ts`.
- Contact channels are a personal email (obfuscated as hex in `Contact.tsx`), GitHub (`github.com/n0xum`), and LinkedIn (`linkedin.com/in/alexanderkruska`).
- No CMS — all copy is hardcoded in components; edits happen directly in source.

## Brand Commitments

- Name: Alexander Kruska. Employer: Lufthansa Industry Solutions (LHIS) — currently IT-Berater / Softwareentwickler (since 06.2026), previously Fachinformatiker-Ausbildung there (08.2023–06.2026, Abschluss 2,0).
- Domain: alexander-kruska.dev.
- Profile photo (`/images/Profilbild.webp`) is a real, binding asset — do not replace with placeholder/stock imagery.
- Minimalist, restrained visual language is an existing choice (documented separately in DESIGN.md if/when generated) — not re-litigated here.

## Evidence on Hand

- Real, verifiable work history in `Experience.tsx`: Aviation project (C#, gRPC, Protobuf), two Go projects (ADRs, compliance focus), Sustainability project (Java/Spring Boot + React), earlier Automotive project (Go, MongoDB, Redis, AWS, New Relic).
- Three real GitHub projects with live links/READMEs: `structify` (has a live demo at structify.alexander-kruska.dev), `cli-tool`, and this portfolio site itself.
- No testimonials, case studies, press, or third-party endorsements exist and none should be fabricated.

## Product Principles

1. Truth over polish-through-fabrication: every claim (stack, employer, project) must trace to something real and verifiable (a repo, a real role) — never invented metrics, testimonials, or clients.
2. Professional-record posture, not a sales funnel: pacing, copy, and CTAs should read as confident and current, not pitchy or conversion-optimized.
3. The site is itself a portfolio piece — its own code quality, performance, and craft are part of what it's demonstrating.
4. German-first content now, but decisions (copy structure, string handling) shouldn't foreclose an eventual English version.
5. Legal compliance (Impressum/Datenschutz) is non-negotiable and must stay present through any redesign.

## Accessibility & Inclusion

Project content notes "Accessibility (WCAG 2.1)" as an existing feature claim for the portfolio-website project itself — treat WCAG 2.1 as the standing bar for this codebase's own UI, not just an aspirational label.
