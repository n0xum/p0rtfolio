---
name: Alexander Kruska Portfolio
description: Minimalist German-language professional portfolio for a backend-leaning software engineer.
colors:
  primary: "#1a1a1a"
  secondary: "#666666"
  accent: "#0c6e66"
  accent-muted: "#59a69a"
  background: "#fafafa"
  surface: "#f5f5f5"
  border: "#e5e7eb"
  focus-ring: "#0c6e66"
  dark-background: "zinc-950 (#09090b)"
  dark-surface: "zinc-900 (#18181b)"
  dark-border: "zinc-800 (#27272a)"
  dark-text: "zinc-50 (#fafafa)"
  dark-text-muted: "zinc-400 (#a1a1aa)"
  dark-text-muted-alt: "zinc-500 (#8a8a8a)"
  dark-focus-ring: "#59a69a"
typography:
  display:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "3.052rem (text-5xl), 4.768rem at md (text-7xl)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "tight (tracking-tight)"
  headline:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "1.953rem (text-3xl), 2.441rem at md (text-4xl)"
    fontWeight: 700
    lineHeight: "2.35rem / 2.75rem"
  title:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "1.25rem (text-xl), 1.563rem (text-2xl)"
    fontWeight: 700
  eyebrow-label:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "0.875rem (text-sm)"
    fontWeight: 400
    letterSpacing: "wide (tracking-wider)"
    fontFeature: "uppercase"
  body:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "1rem (text-base), 1.125rem (text-lg) for lead paragraphs"
    fontWeight: 400
    lineHeight: "1.6 (body default) / relaxed (leading-relaxed, 1.625) on prose paragraphs"
  label:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "0.75rem (text-xs) to 0.875rem (text-sm)"
    fontWeight: 500
  code:
    fontFamily: "Monaco, Courier New, monospace"
    fontSize: "0.875rem (text-sm)"
    fontFeature: "tabular-nums on the Werdegang date column only"
rounded:
  none: "0px (default on section text and most links/buttons)"
  sm: "4px (rounded, used on the mobile menu close icon, code copy button)"
  md: "8px (rounded-lg, used on code blocks, theme toggle, dialog panel corners are actually square)"
  full: "9999px (rounded-full, profile photo, mobile menu bars)"
spacing:
  section-y-mobile: "128px (py-32)"
  section-y-desktop: "160px (lg:py-40)"
  section-x: "24px (px-6), 48px at md (md:px-12)"
  stack-sm: "8px (space-y-2)"
  stack-md: "16px (space-y-4)"
  stack-lg: "32px (space-y-8)"
  measure: "70ch cap on paragraph-length text blocks without their own max-w-* utility"
components:
  button-outline-primary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-outline-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
  nav-link-active:
    textColor: "{colors.primary}"
  nav-link-default:
    textColor: "{colors.secondary}"
---

# Design System: Alexander Kruska Portfolio

## Overview

This is a single-page, section-scrolling personal portfolio (Hero, About, Work, Experience, Contact) plus three GitHub-README-backed project detail pages. The visual system is **unstyled-by-intent minimalism**: a near-black-on-off-white palette, one deep-teal accent used sparingly for links and hover states, no imagery beyond a single profile photo, no illustration, no gradients, and almost no shadows. The layout leans entirely on typographic scale, generous vertical whitespace, and thin hairline borders to create hierarchy — there is no card-with-shadow or colored-surface vocabulary anywhere in the build. This wave closed the two gaps that made the site read as an untouched framework starter (an unstyled system font and Tailwind's default blue-600 accent) without touching the layout, spacing rhythm, or component behavior that were already working.

Dark mode is a first-class, persisted feature (class-based `dark:` Tailwind variants via `@custom-variant dark`, toggled via `ThemeToggle.tsx` and an inline pre-hydration `<script>` in `layout.tsx` that reads `localStorage` / `prefers-color-scheme` before paint to avoid a flash). Dark mode still expresses itself through the Tailwind `zinc-*` scale at every component call site rather than the light-mode custom token names — that didn't change this wave, because doing so would mean editing every component's `dark:` class list, which was out of scope. What changed is that the zinc-* scale itself is no longer an *implicit* inherited Tailwind default: every stop the app actually uses (50 through 950) is now pinned explicitly in `@theme`, in the same block as the light-mode tokens, as a single declared source of truth — and the one real drift bug (a hardcoded `.dark body { background-color: #0a0a0a }` that had quietly diverged from the `zinc-950` value, `#09090b`, every component actually renders via `dark:bg-zinc-950`) has been removed. `zinc-500` was also retuned (`#71717a` → `#8a8a8a`) because it was failing WCAG AA as real content (the Werdegang category label).

The font stack is now **IBM Plex Sans**, self-hosted via `next/font/google` and loaded through a CSS variable next/font injects on `<html>` (`--font-ibm-plex-sans`), replacing the bare `system-ui` stack. It carries exactly two static weights (400, 700); Tailwind's `font-medium` (500) and `font-semibold` (600) utilities used throughout the app resolve to the nearest loaded weight via standard CSS font-weight matching (500→400, 600→700) rather than triggering a third file download. A real modular scale (1.25 ratio, "major third") now drives every `text-lg` through `text-7xl` utility via `@theme` overrides, replacing the arbitrary stock Tailwind steps the previous DESIGN.md documented as an unexamined default.

**Key Characteristics:**
- Two-tone-plus-one-accent palette: near-black text, off-white background, single deep-teal accent used only on links/hover/active states and the focus ring.
- One self-hosted typeface (IBM Plex Sans, two weights) carrying a deliberate 1.25-ratio modular scale, replacing the unstyled `system-ui` default.
- No card surfaces, no drop shadows on content (only `shadow-lg` on the two overlay/dialog surfaces — mobile menu drawer and modal dialog).
- Hairline borders (`1px`, `border-border` / `dark:border-zinc-800`) remain the primary structural device — unchanged this wave; see Do's and Don'ts for the honest contrast caveat on this token.
- Large, generous section rhythm: ~128–160px of vertical padding per full-height section, with a `max-w-3xl` (48rem) content column — untouched, confirmed still the strongest layout invariant in the build.
- A token-driven `:focus-visible` outline now reaches every interactive element that previously had none, and a CSS-only `.reveal-on-scroll` utility exists for the next wave to adopt in place of the five per-section `IntersectionObserver` hooks.

## Colors

The palette is a restrained two-tone system (near-black text / off-white surface) with a single deep-teal accent, defined as CSS custom properties in a Tailwind v4 `@theme` block in `globals.css` (this wave migrated off `tailwind.config.ts`, which no longer exists).

### Primary
- **Near-Black** (`#1a1a1a`, token `primary`): default body/heading text color in light mode; also the fill color of the outlined primary CTA on hover. Unchanged this wave (16.67:1 on background, 15.96:1 on surface — far above AA).

### Secondary
- **Neutral Gray** (`#666666`, token `secondary`): all muted/supporting text — subtitles, descriptions, eyebrow labels, timestamps, nav links in their inactive state, and the tech-tag chips. **Retuned this wave** from `#737373` (Tailwind `neutral-500` verbatim), which measured 4.35:1 on `surface` and 4.54:1 on `background` — the tech-chip failure the accessibility audit flagged (axe reported it as a serious violation, 7 nodes on the home page, at 4.3:1). The new value clears both pairs with margin: 5.50:1 on background, 5.27:1 on surface.

### Tertiary
- **Deep Teal** (`#0c6e66`, token `accent`) — replaces Tailwind's stock `blue-600` (`#2563eb`), which the previous DESIGN.md correctly identified as unmodified. Used for hover states on nav links, the "Details ansehen" project links, the code-icon accent in `CodeSnippet`, the focus-ring token, and text selection background. Chosen deliberately away from the generic blue-link convention while staying calm and legible rather than decorative — a fit for the backend-engineer-at-an-enterprise-IT-consultancy positioning in PRODUCT.md rather than a marketing accent. 5.85:1 on background, 5.60:1 on surface.
- **Muted Teal** (`#59a69a`, token `accent-muted`) — dark-mode counterpart, replacing stock `blue-400`. Same hue family as `accent`, lightened for dark surfaces. 6.96:1 on zinc-950, 6.20:1 on zinc-900.

### Neutral
- **Off-White** (`#fafafa`, token `background`): page background in light mode. Unchanged.
- **Light Surface** (`#f5f5f5`, token `surface`): reserved for card/dropdown surfaces. Unchanged.
- **Border Gray** (`#e5e7eb`, token `border`): all hairline dividers and outline strokes in light mode. Unchanged; see the Named Rule below for its honest contrast status.
- **Dark Background** (`zinc-950`, `#09090b`): page background in dark mode, applied via `dark:bg-zinc-950` directly on `<body>` in `layout.tsx`. This wave removed a hardcoded `.dark body { background-color: #0a0a0a }` in `globals.css` that had drifted from this exact value — one token, one place, now.
- **Dark Text** (`zinc-50` `#fafafa` / `zinc-400` `#a1a1aa`): dark-mode primary/secondary text. Unchanged and already passing AA (19.06:1 / 7.76:1 against zinc-950).
- **Dark Text, Retuned** (`zinc-500`, `#8a8a8a`): the Werdegang category eyebrow's dark-mode color. **Retuned this wave** from stock `zinc-500` (`#71717a`), which measured 4.12:1 on zinc-950 and 3.67:1 on zinc-900 — a real AA failure as body-size text. New value: 5.7:1 / 5.1:1.
- **Focus Ring** (`#0c6e66` light / `#59a69a` dark, token `focus-ring`): see Components → Focus Ring below.

### Named Rules
**The One-Accent Rule.** The accent (`accent` / `accent-muted`) appears only on interactive elements — links, hover states, active nav indicators, focus rings, code accents. It never appears as a background fill, a section header color, or a decorative element. Unchanged this wave; only the hue moved.

**The Explicit Dark-Scale Rule (reconciled this wave).** Dark mode still expresses itself through Tailwind's `zinc-*` utility classes at every component call site — that could not change without editing every component. What changed: every zinc stop the app depends on (`50` through `950`) is now pinned explicitly inside the same `@theme` block as the light-mode tokens, rather than being an implicit inherited default, and the one place light and dark values had actually drifted apart (the hardcoded dark body background) has been closed. Two vocabularies (custom hex tokens vs. `zinc-*` utility names) still exist in component markup; one declared, contrast-verified value set now backs both.

**The Border-Contrast Caveat (documented, not fixed).** `border` (`#e5e7eb`) measures 1.19:1 against `background`, and `zinc-800`/`zinc-700` measure 1.34:1/1.91:1 against the dark backgrounds — all well under the 3:1 UI-component floor. These are treated as decorative content separators (WCAG 1.4.11 exempts graphical objects not required to identify a component or understand content), consistent with this build's established "Border-Not-Shadow Rule" below, and darkening them to 3:1 would be a visible redesign of the entire hairline-divider language, not a contrast fix — out of scope for a wave told to preserve layout. One real exception was identified and **has since been resolved**: the `ReadmeDropdown` disclosure toggle's outer border is an interactive-component boundary, not a decorative separator, and now uses `border-secondary dark:border-zinc-500` (5.27:1 light / ~5.1:1 dark) instead of the hairline token — comfortably clear of the 3:1 floor.

## Typography

**Display/Body Font:** IBM Plex Sans (with `system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif` as fallback) — self-hosted via `next/font/google`, two static weights (400, 700). **This is a deliberate typographic decision, not an inherited default.**
**Label/Mono Font:** Monaco (with `Courier New, monospace`) — unchanged; the code snippet block and contact email/handle values.

**Character:** A single, purpose-built engineering/enterprise sans (IBM's own corporate typeface family) carries every text role. It was chosen specifically *against* an editorial or agency-style display face: PRODUCT.md positions this site as a backend-leaning engineer's professional record for German/DACH peers at an enterprise IT consultancy (Lufthansa Industry Solutions), not a design studio's showcase — IBM Plex Sans reads as calm, technical, and legible rather than expressive, needs only two weights to cover every role the components already use, is self-hostable under `output: 'export'` (verified: font files land in `out/_next/static/media/`, referenced via relative-path `@font-face` rules in the built CSS, no runtime request to Google), and its digits are tabular by construction (every glyph 0–9 measured at an identical 600-unit advance width via `fontTools` — there's no separate proportional/tabular toggle to get wrong).

### Hierarchy
- **Display** (bold/700, `text-5xl` 3.052rem → `md:text-7xl` 4.768rem, `leading-tight`, tight line-height 1): Hero name/greeting only — the single largest text on the site.
- **Headline** (bold/700, `text-3xl` 1.953rem → `md:text-4xl` 2.441rem, line-height 2.35rem/2.75rem): Section titles ("Meine Expertise", "Ausgewählte Arbeiten", "Lass uns zusammenarbeiten", About's lead line).
- **Title** (bold/700, `text-xl` 1.25rem / `text-2xl` 1.563rem): Project card titles, dialog titles, code-snippet heading.
- **Body** (regular/400, `text-base` 1rem–`text-lg` 1.125rem, `leading-relaxed` 1.625): Paragraph copy in About, Contact intro, markdown-rendered README body text. Capped to a **70ch measure** this wave (see Layout) — the audit's detector had measured 85–96 characters per line.
- **Label** (`text-xs` 0.75rem–`text-sm` 0.875rem, `tracking-wider`, uppercase): Section eyebrows ("Über mich", "Kontakt", "Technologien"), nav links, contact-link labels, tech-tag chips. Kept at their existing sizes — a ratio scale has diminishing value below body size, and these were never the ad-hoc part of the ladder.

### Named Rules
**The Uppercase-Eyebrow Rule.** Every section is introduced by a `text-sm uppercase tracking-wider` label in the secondary/muted color before its bold headline — this pairing repeats identically across About, Work, and Contact. Unchanged.

**The Modular-Scale Rule (new this wave).** Every `text-lg` through `text-7xl` step is `1rem × 1.25^n` for a fixed integer `n` (`lg`≈`n=0.5`, `xl`=`n=1`, …, `7xl`=`n=7`), declared once in `@theme` and inherited by every component that already used these utility names — replacing the arbitrary, undocumented jumps the previous DESIGN.md flagged (`text-5xl`→`text-7xl`, `text-3xl`→`text-4xl` with no stated ratio). `xs`/`sm` (label-role sizes) are deliberately left at their original values.

**The Tabular Werdegang Rule.** `#experience .font-mono` (the Werdegang period column, e.g. "seit 06.2026", "08.2023 – 06.2026") carries `font-variant-numeric: tabular-nums` explicitly, scoped to that column only — defensive, since IBM Plex Sans's digits are already uniform-width by construction, but it keeps the guarantee explicit rather than incidental if the font ever changes.

## Layout

Single-column, section-scrolling layout. Each major section (`Hero`, `About`, `Work`, `Experience`, `Contact`) is `min-h-screen` with a centered `max-w-3xl` (48rem) content column — this remains the dominant content-width discipline across the whole site, untouched this wave. The project detail route (`/projects/[slug]`) instead uses `max-w-4xl`.

Section vertical padding follows the same two-step rhythm as before: `py-32` (128px) base, `lg:py-40` (160px) at large breakpoints, `px-6`/`md:px-12` horizontal. Internal spacing (`space-y-2/4/8`) is unchanged. **Confirmed, not redesigned** — this wave's brief was explicit that the rhythm is fine.

**New this wave — measure.** Any `<p>` or `<li>` carrying Tailwind's `leading-relaxed` utility and *not already* constrained by its own `max-w-*` class is capped to `max-width: 70ch` (About's and the project detail page's lead paragraphs, every Markdown-rendered README paragraph). Hero's intro paragraph already carries an explicit `max-w-2xl` narrower than 70ch at its larger type size and was left alone.

**New this wave — anchor scroll offset.** `html { scroll-padding-top: 5rem; }` — the fixed nav is `h-16` (64px); in-page anchors (`#about`, `#work`, …) previously landed their target heading underneath it.

## Elevation & Depth

Unchanged this wave. The system is flat by default; `shadow-lg` appears only on the mobile navigation drawer and the modal `Dialog` panel.

### Shadow Vocabulary
- **Overlay shadow** (`box-shadow` via Tailwind `shadow-lg`): used only on the mobile nav drawer and the Impressum/Rechtliches `Dialog` panel.

### Named Rules
**The Border-Not-Shadow Rule.** Depth and separation within the page flow is conveyed by a single hairline border, never a shadow or a tonal surface change. Unchanged.

## Shapes

Unchanged this wave. Square by default; `rounded-full` on the profile photo and mobile hamburger bars; `rounded`/`rounded-lg` on small isolated UI chrome.

### Syntax Highlighting (documented sub-system, not palette drift)

Code blocks are rendered by highlight.js. Its token colours are a deliberate,
self-contained sub-palette that intentionally sits OUTSIDE the site's
two-tone-plus-teal system: syntax highlighting is only legible when each
token class carries a distinguishable hue, so constraining these to the
brand palette would defeat their purpose. Two tokens (dark-mode
comment/quote, light-mode built-in/symbol) were retuned this pass after an
axe `color-contrast` finding; every other value below is inherited unchanged
from the original build and recorded here so the set reads as a decision,
not drift.

**Dark mode** (`.dark .hljs-*` overrides in `globals.css`), all ratios computed against the `.dark .hljs` background `#18181b`:

| Token class | Value | Role | Contrast on `#18181b` |
|---|---|---|---|
| `.hljs` surface / text | `#18181b` / `#e4e4e7` | code block ground | 13.96:1 |
| `.hljs-comment`, `-quote` | `#888891` (was `#71717a`) | de-emphasised | 5.04:1 (was 3.67:1 — **failed AA, fixed**) |
| `.hljs-keyword`, `-selector-tag`, `-addition` | `#fb7185` | keywords | 6.58:1 |
| `.hljs-string`, `-number`, `-literal`, `-regexp`, `-doctag` | `#86efac` | literals | 12.62:1 |
| `.hljs-title`, `-section`, `-name`, `-selector-id`, `-selector-class` | `#60a5fa` | identifiers | 6.97:1 |
| `.hljs-attribute`, `-attr`, `-variable`, `-type` | `#fbbf24` | attributes / types | 10.61:1 |
| `.hljs-symbol`, `-bullet`, `-meta`, `-link` | `#c084fc` | symbols / meta | 6.70:1 |
| `.hljs-built_in`, `-deletion` | `#f87171` | built-ins | 6.40:1 |

Only comment/quote failed AA (3.67:1, the axe finding — code comments are prose meant to be read, so the 4.5:1 body-text floor applies). `#888891` keeps the same hue and saturation as the old `#71717a`, just lightened, so it stays the most desaturated, quietest colour in the block — clearly still the lowest-contrast token (5.04:1, versus the next-lowest real token at 6.40:1) rather than reading as "fixed by washing it out toward white."

**Light mode** uses highlight.js's stock `github.css` theme, audited against its own `#ffffff` background and now overridden in one place:

| Token class | Value | Role | Contrast on `#ffffff` |
|---|---|---|---|
| `.hljs` surface / text | `#ffffff` / `#24292e` | code block ground | 14.67:1 |
| `.hljs-comment`, `-code`, `-formula` | `#6a737d` | de-emphasised | 4.82:1 |
| `.hljs-keyword`, `-meta .hljs-keyword`, `-template-tag`, `-template-variable`, `-type`, `-variable.language_` | `#d73a49` | keywords | 4.57:1 |
| `.hljs-title`, `-title.class_`, `-title.function_` | `#6f42c1` | entities | 6.51:1 |
| `.hljs-attr`, `-attribute`, `-literal`, `-meta`, `-number`, `-operator`, `-variable`, `-selector-attr`, `-selector-class`, `-selector-id` | `#005cc5` | constants | 6.29:1 |
| `.hljs-regexp`, `-string`, `-meta .hljs-string` | `#032f62` | strings | 13.23:1 |
| `.hljs-built_in`, `-symbol` | `#ba5007` (was `#e36209`) | built-ins | 4.95:1 (was 3.49:1 — **failed AA, fixed**) |
| `.hljs-name`, `-quote`, `-selector-tag`, `-selector-pseudo`, `-addition` | `#22863a` | entity tags | 4.63:1 |
| `.hljs-bullet` | `#735c0f` | lists | 6.43:1 |
| `.hljs-deletion` | `#b31d28` | deletions | 6.72:1 |

The stock light theme had the identical class of defect on a different token: `.hljs-built_in`/`.hljs-symbol` (`#e36209`, GitHub's own value) measured 3.49:1, well under AA, and had never been checked before this pass since the light theme ships unmodified from the package. Overridden to `#ba5007` (4.95:1) — same hue family, darkened, the same "keep the ratio comfortably clear of the floor, don't wash it out" treatment as the dark-mode fix. Every other light-theme token was checked and already clears 4.5:1 (lowest margin: keyword at 4.57:1, entity-tag/addition at 4.63:1).

Note: `#60a5fa` (dark-mode identifiers) is coincidentally the old Tailwind `blue-400` that used to be the site accent. It survives only as a syntax-identifier colour and carries no brand meaning — do not treat its presence as the accent leaking back in.

## Performance Ceiling (measured, not assumed)

Lighthouse mobile performance is **83** on `/` and **84** on `/projects/structify/`.
Accessibility, Best Practices and SEO are 100 on every route. The performance
number is a known, quantified architectural floor, not an unfixed defect:

| Build | Perf | LCP | JS shipped on `/` |
|---|---|---|---|
| As shipped | 83 | 4.7 s | 188,805 B gz |
| Identical HTML + CSS, framework `<script>` tags stripped | **100** | **1.6 s** | 0 B |
| Every `'use client'` component stubbed out | 84 | 4.6 s | 182,044 B gz |

Two things follow, both measured twice:

1. **It is not a delivery problem.** Every network request on `/` completes in
   under 64 ms. The gap is simulated-CPU cost from hydration.
2. **It is not attributable to the components.** Removing *every* client
   component in the app saves 7.5 KB gz and moves Lighthouse by one point.
   Next 16's App Router emits its `react-dom` / `hydrateRoot` bootstrap
   (71,415 B gz, chunk `1p7zfs2votmpl.js`) unconditionally, even under
   `output: 'export'` with zero client components in the reachable tree.

So rewriting the interactive components as platform primitives (`<dialog>`,
`<details>`, CSS scroll-timelines, a vanilla theme toggle) would not move this
number. The only lever that reaches ~100 is not shipping Next's client
bootstrap at all, which means not being a Next App Router app. That is a
framework migration, not a refinement, and it was explicitly declined in
favour of keeping the verified accessibility, security and SEO behaviour
intact.

If this number is ever challenged in review, the answer is the table above.

## Components

### Buttons
Unchanged this wave — outlined-to-filled primary CTA, text-link as the default interactive pattern everywhere else.

### Focus Ring (new this wave)
- **Token:** `--color-focus-ring` (`#0c6e66` light / `#59a69a` dark, swapped via a `.dark` override), declared in `@theme` so it also emits ordinary Tailwind utilities (`outline-focus-ring`, `ring-focus-ring`, `border-focus-ring`, …).
- **Baseline rule:** `:focus-visible:not([class*='focus-visible:ring']) { outline: 2px solid var(--color-focus-ring); outline-offset: 2px; border-radius: 2px; }` in `globals.css`, applying to every focusable element that previously had no focus style (nav links, the Hero CTA, "Details ansehen" links, Contact links/footer, mobile menu — roughly fifteen elements).
- **Existing ad-hoc rings left alone:** `ThemeToggle`, the `Dialog` close button, and the error-page retry button already carry their own `focus-visible:ring-2 focus-visible:ring-accent`, which now automatically resolves to the new teal accent; the baseline rule explicitly excludes elements with that class so they don't double up.
- **Verified:** ≥5.6:1 against every one of the four page backgrounds (background/surface light, zinc-950/zinc-900 dark) — far above the 3:1 non-text floor.

### Reveal-on-Scroll Utility (adopted by all five homepage sections)
- **Class:** `.reveal-on-scroll` in `globals.css`.
- **Usage note:** Apply directly to the element each homepage section currently toggles between `opacity-0 translate-y-4` and `opacity-100 translate-y-0` via its own `IntersectionObserver` + `useState` (Hero, About, Work, Experience, Contact). Once applied, delete the observer, the `isVisible` state, and the conditional className — the utility owns the full lifecycle in CSS. It is visible (`opacity: 1`) by default in every case: no JS, no `animation-timeline: view()` browser support, and `prefers-reduced-motion: reduce` all resolve to that plain rule. Only when both the browser supports scroll-driven animations *and* the user has not requested reduced motion does it additionally animate in via `animation-timeline: view()` (opacity + a 1rem `translate`, gated behind `@supports` and `@media (prefers-reduced-motion: no-preference)`).

### Chips (tech tags)
Unchanged in style (`text-xs`, `px-2 py-1`, `border border-border`, no fill); the contrast defect they were carrying (`secondary` on `surface`/`background`) is fixed via the `secondary` token retune above, not a chip-specific change.

### Cards / Containers
Unchanged this wave.

### Navigation
Unchanged this wave, now benefiting from the baseline focus ring on the nav links that previously had none.

### Modal (Dialog)
Unchanged this wave; its own focus-visible ring on the close button already used `accent`, which now resolves to the new teal.

## Do's and Don'ts

### Do:
- **Do** keep the accent teal (`#0c6e66` / `#59a69a`) confined to interactive states (links, hover, focus, active nav indicator) — it does not appear as a fill or section color anywhere in the build.
- **Do** keep homepage sections on the shared `max-w-3xl` column with `py-32`/`lg:py-40` vertical rhythm and `px-6`/`md:px-12` horizontal rhythm — untouched and confirmed the strongest layout invariant in the build.
- **Do** treat text-links as the default CTA pattern; the bordered outline-to-fill button exists as a single accent for the Hero's primary action, not a general button system.
- **Do** use `.reveal-on-scroll` for any new scroll-triggered entrance instead of a fresh `IntersectionObserver` — it is CSS-only, visible-by-default, and already handles no-JS/no-support/reduced-motion.
- **Do** rely on `:focus-visible` for new interactive elements rather than adding another one-off `focus-visible:ring-*` — the baseline rule already covers anything that doesn't declare its own ring.

### Don't:
- **Don't** read `secondary`/`zinc-500` as still being Tailwind's stock `neutral-500`/`zinc-500` — both were deliberately retuned this wave to clear WCAG AA as real content; treat the new hexes in the frontmatter as canonical.
- **Don't** assume dark mode's `zinc-*` utility usage will be replaced by the light-mode custom token names without a dedicated component-editing pass — that seam is documented and contrast-verified, not eliminated, this wave.
- **Don't** darken `border`/`zinc-800`/`zinc-700` to chase a 3:1 UI-component ratio without also deciding to redesign the whole hairline-divider visual language — treat the current values as a deliberate, documented trade-off, not an oversight, except for the flagged `ReadmeDropdown` toggle boundary.
- **Don't** add a second self-hosted family. IBM Plex Sans at two weights covers every role (`font-medium`/`font-semibold` resolve via standard CSS weight-matching, not a third file) — introducing a display/editorial face would contradict PRODUCT.md's backend-engineer-not-design-agency positioning.
- **Don't** add card-style shadows or background-tinted surfaces to inline content — the build's depth model is flat-plus-hairline-border everywhere except the two modal/overlay surfaces.
