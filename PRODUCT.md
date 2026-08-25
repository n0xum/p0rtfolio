# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience is professional peers, LinkedIn/GitHub contacts, and Alexander himself — the site functions as a durable professional record and networking presence, not an active sales funnel for jobs or clients. Secondary readers (recruiters, hiring managers, potential collaborators) may still land here and should be able to quickly understand his role, stack, and how to reach him.

## Product Purpose

Personal portfolio for Alexander Kruska, IT-Berater / Softwareentwickler at Lufthansa Industry Solutions (LHIS). It presents who he is, his professional path, his technical stack, and a small set of real projects, and gives visitors a way to get in touch. Success is an accurate, current, well-crafted professional presence — not conversion metrics.

## Positioning

A backend-leaning engineer (Go, C#, Java) who also ships the frontend himself (React/Next.js/TypeScript). The site is still built and operated by him end to end — and its own craft, performance and accessibility are part of what it demonstrates — but it is no longer listed as one of the showcased projects: a portfolio listing itself as a portfolio entry is filler, and it was cut. The site's credibility comes from real, verifiable project links (live GitHub repos, real code) rather than marketing claims.

## Operating Context

- Built with Next.js 16 (App Router, static export), TypeScript, Tailwind CSS 4 (CSS-first `@theme`), react-markdown + rehype-sanitize + rehype-highlight. Typeface is IBM Plex Sans, self-hosted via `next/font`.
- Deployed as a static export behind nginx in Docker on a **Hetzner** VPS; images/CI pipeline in `.github`. The Datenschutzerklärung must name Hetzner as the hosting provider — it previously and incorrectly claimed GitHub Pages.
- Project detail pages pull README content live from GitHub (`src/lib/github.ts`, `src/lib/projects.ts`) for the three showcased repos: `n0xum/cvgen`, `n0xum/structify` and `n0xum/zigbee-controller`. `cli-tool` and `portfolio-website` were deliberately cut because presenting thin projects as peers of stronger work invited an unhelpful comparison. nginx 301s both retired URLs, which are still indexed.
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
- Three real GitHub projects with live links/READMEs: `cvgen` (a local Go and Typst CV generator with ATS checks), `structify` (live demo at structify.alexander-kruska.dev) and `zigbee-controller` (a local Zigbee-to-HomeKit bridge in Go, no cloud). They are deliberately different in kind, so the set reads as range rather than one trick repeated.
- Work that exists but is **not** in a public repo: self-operated Hetzner servers plus a homelab running services he uses daily (this site included), and a documented multi-agent working method (roles with fixed responsibilities, a review that never comes from the instance that wrote the code, a single ledger document as the source of project state, deliberately terse English instruction files because they are re-sent every request). These are real and verifiable in his private repos — do not treat them as fabricated claims or remove them for lacking a public link.
- **CONFIDENTIAL — do not describe on the site.** The `testat` repository is an unreleased commercial product he intends to bring to market, not a portfolio piece. Its repo stays private and its *product concept* — what it does, how it is positioned, its evidence/attestation mechanism, its target market — must never appear in site copy, metadata, commit messages on this repo, or anywhere else public. A generic, detail-free nod ("ein eigenes Produkt", "noch nicht öffentlich") is the maximum. An earlier pass wrote its positioning into the About section; that was wrong and has been removed.
- No testimonials, case studies, press, or third-party endorsements exist and none should be fabricated.

## Product Principles

1. Truth over polish-through-fabrication: every claim (stack, employer, project) must trace to something real and verifiable (a repo, a real role) — never invented metrics, testimonials, or clients.
2. Professional-record posture, not a sales funnel: pacing, copy, and CTAs should read as confident and current, not pitchy or conversion-optimized.
3. The site is itself a portfolio piece — its own code quality, performance, and craft are part of what it's demonstrating.
4. German-first content now, but decisions (copy structure, string handling) shouldn't foreclose an eventual English version.
5. Legal compliance (Impressum/Datenschutz) is non-negotiable and must stay present through any redesign.

## Accessibility & Inclusion

WCAG 2.1 AA is the standing bar for this codebase's own UI. As of the 2026-08 remediation this is met and verified, not aspirational: Lighthouse accessibility 100 on every route, axe 0 violations across all routes in both themes, a skip link, real focus traps with `inert` siblings, a token-driven focus ring, and keyboard-reachable scrollable code blocks. Do not regress it, and do not re-add a feature bullet claiming it — the site should meet the bar rather than advertise it.
