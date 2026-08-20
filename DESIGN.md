---
name: Alexander Kruska Portfolio
description: Minimalist German-language professional portfolio for a backend-leaning software engineer.
colors:
  primary: "#1a1a1a"
  secondary: "#737373"
  accent: "#2563eb"
  accent-muted: "#60a5fa"
  background: "#fafafa"
  surface: "#f5f5f5"
  border: "#e5e7eb"
  dark-background: "#0a0a0a"
  dark-surface: "zinc-900 (#18181b)"
  dark-border: "zinc-800 (#27272a)"
  dark-text: "zinc-50 (#fafafa)"
  dark-text-muted: "zinc-400 (#a1a1aa)"
typography:
  display:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "3rem (text-5xl), 4.5rem at md (text-7xl)"
    fontWeight: 700
    lineHeight: "tight (leading-tight)"
    letterSpacing: "tight (tracking-tight)"
  headline:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "1.875rem (text-3xl), 2.25rem at md (text-4xl)"
    fontWeight: 700
    lineHeight: "tight/normal"
  eyebrow-label:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "0.875rem (text-sm)"
    fontWeight: 400
    letterSpacing: "wide (tracking-wider)"
    fontFeature: "uppercase"
  body:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "1rem (text-base), 1.125rem (text-lg) for lead paragraphs"
    fontWeight: 400
    lineHeight: "1.6 (body default) / relaxed (leading-relaxed) on prose paragraphs"
  label:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "0.75rem (text-xs) to 0.875rem (text-sm)"
    fontWeight: 500
  code:
    fontFamily: "Monaco, Courier New, monospace"
    fontSize: "0.875rem (text-sm)"
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

This is a single-page, section-scrolling personal portfolio (Hero, About, Work, Experience, Contact) plus three GitHub-README-backed project detail pages. The visual system is **unstyled-by-intent minimalism**: a near-black-on-off-white palette, one blue accent used sparingly for links and hover states, no imagery beyond a single profile photo, no illustration, no gradients, and almost no shadows. The layout leans entirely on typographic scale, generous vertical whitespace, and thin hairline borders to create hierarchy — there is no card-with-shadow or colored-surface vocabulary anywhere in the build.

Dark mode is a first-class, persisted feature (class-based `dark:` Tailwind variants, toggled via `ThemeToggle.tsx` and an inline pre-hydration `<script>` in `layout.tsx` that reads `localStorage` / `prefers-color-scheme` before paint to avoid a flash). In dark mode the system does not reuse the light-mode custom tokens (`primary`, `background`, `surface`, `border`) — it switches to raw Tailwind `zinc-*` scale values instead (`zinc-950`, `zinc-900`, `zinc-800`, `zinc-400`, `zinc-50`). This is a real, observed seam in the token system, not a stylistic choice: the project effectively runs two parallel palettes (custom hex tokens for light, Tailwind zinc scale for dark) rather than one token set with light/dark values.

The font stack is `system-ui` with OS-native fallbacks — there is no webfont, no `next/font`, and no custom typeface anywhere in the build. This is the Tailwind/Next.js scaffold default left in place, not a chosen typographic identity.

**Key Characteristics:**
- Two-tone-plus-one-accent palette: near-black text, off-white background, single blue accent used only on links/hover/active states.
- No card surfaces, no drop shadows on content (only `shadow-lg` on the two overlay/dialog surfaces — mobile menu drawer and modal dialog).
- Hairline borders (`1px`, `border-border` / `dark:border-zinc-800`) are the primary structural device — they divide skill categories, project entries, contact rows, and section footers.
- Large, generous section rhythm: ~128–160px of vertical padding per full-height section, with a `max-w-3xl` (48rem) content column.
- System font stack, no webfont — an inherited default, not a decision.

## Colors

The palette is a restrained two-tone system (near-black text / off-white surface) with a single blue accent, defined as flat hex custom properties in `tailwind.config.ts`.

### Primary
- **Near-Black** (`#1a1a1a`, token `primary`): default body/heading text color in light mode; also the fill color of the outlined primary CTA on hover.

### Secondary
- **Neutral Gray** (`#737373`, token `secondary`): all muted/supporting text — subtitles, descriptions, eyebrow labels, timestamps, nav links in their inactive state.

### Tertiary
- **Subtle Blue** (`#2563eb`, token `accent`) — this is Tailwind's stock `blue-600` value, unmodified. Used for hover states on nav links, the "Details ansehen" project links, the code-icon accent in `CodeSnippet`, focus rings, and text selection background.
- **Muted Blue** (`#60a5fa`, token `accent-muted`) — Tailwind's stock `blue-400`, unmodified. Serves as the accent's dark-mode hover counterpart throughout (`dark:hover:text-accent-muted`).

### Neutral
- **Off-White** (`#fafafa`, token `background`): page background in light mode; also `body`'s literal background-color in `globals.css` (duplicated as both a Tailwind token and a hardcoded value).
- **Light Surface** (`#f5f5f5`, token `surface`): reserved for card/dropdown surfaces — used narrowly (e.g. `ThemeToggle` hover background, active mobile nav item background).
- **Border Gray** (`#e5e7eb`, token `border`): all hairline dividers and outline strokes in light mode.
- **Dark Background** (`#0a0a0a`, `zinc-950`): page background in dark mode. Not a custom token — the build applies raw `dark:bg-zinc-950` rather than a `dark-background` entry in `tailwind.config.ts`.
- **Dark Text** (`zinc-50` / `zinc-400`): dark-mode primary/secondary text, again via raw Tailwind zinc scale rather than dedicated dark tokens.

### Named Rules
**The One-Accent Rule.** Blue (`accent` / `accent-muted`) appears only on interactive elements — links, hover states, active nav indicators, focus rings, code accents. It never appears as a background fill, a section header color, or a decorative element.

**The Custom-Token-Light / Zinc-Scale-Dark Rule (observed, not prescriptive).** Light mode consistently uses the seven custom hex tokens (`primary`, `secondary`, `accent`, `accent-muted`, `background`, `surface`, `border`). Dark mode never reuses those tokens — every `dark:` variant reaches for the raw Tailwind `zinc-*` scale instead. This is a structural inconsistency in the current token system, recorded here as a fact of the build, not endorsed as a pattern to extend.

## Typography

**Body Font:** system-ui (with `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif`) — **this is an inherited Tailwind/Next.js default with no webfont loaded**, not a typographic decision. No `next/font` usage exists anywhere in the codebase.
**Label/Mono Font:** Monaco (with `Courier New, monospace`) — used for the code snippet block and contact email/handle values; also an unmodified stock fallback stack.

**Character:** A single system sans stack carries every text role; hierarchy comes entirely from size, weight, and letter-spacing (uppercase tracked labels vs. large bold headlines), not from font pairing.

### Hierarchy
- **Display** (bold/700, `text-5xl` → `md:text-7xl`, `leading-tight`): Hero name/greeting only — the single largest text on the site.
- **Headline** (bold/700, `text-3xl` → `md:text-4xl`): Section titles ("Meine Expertise", "Ausgewählte Arbeiten", "Lass uns zusammenarbeiten", About's lead line).
- **Title** (bold/700, `text-xl` / `text-2xl`): Project card titles, dialog titles, code-snippet heading.
- **Body** (regular/400, `text-base`–`text-lg`, `leading-relaxed`): Paragraph copy in About, Contact intro, markdown-rendered README body text. `text-lg` used specifically for lead paragraphs.
- **Label** (`text-sm`, `tracking-wider`, uppercase): Section eyebrows ("Über mich", "Kontakt", "Technologien"), nav links, contact-link labels, tech-tag chips (`text-xs` variant for the smallest tags).

### Named Rules
**The Uppercase-Eyebrow Rule.** Every section is introduced by a `text-sm uppercase tracking-wider` label in the secondary/muted color before its bold headline — this pairing (`text-sm uppercase tracking-wider` → `text-3xl md:text-4xl font-bold`) repeats identically across About, Work, and Contact.

## Layout

Single-column, section-scrolling layout. Each major section (`Hero`, `About`, `Work`, `Experience`, `Contact`) is `min-h-screen` with a centered `max-w-3xl` (48rem) content column — this is the dominant content-width discipline across the whole site. The project detail route (`/projects/[slug]`) instead uses `max-w-4xl`, a wider column suited to rendered README/markdown content.

Section vertical padding follows a two-step rhythm: `py-32` (128px) as the base, stepping up to `lg:py-40` (160px) at large breakpoints — applied identically on About, Work, Experience, and Contact. Horizontal padding is `px-6` (24px) at mobile, `md:px-12` (48px) from the `md` breakpoint up, also applied identically across sections. The fixed top navigation is a `max-w-6xl`, `h-16` (64px) bar with `backdrop-blur-md` / `bg-background/80` translucency over content scrolling beneath it.

Internal spacing follows Tailwind's default scale used consistently but without a documented custom step system: `space-y-2` (8px) for tight lists, `space-y-4` (16px) for stacked items, `space-y-8` (32px) between project entries. No custom `spacing` scale is defined in `tailwind.config.ts` — every value observed is a stock Tailwind spacing step used by convention, not a project-defined token.

Responsive breakpoints are Tailwind defaults (`md:`, `lg:`) with no custom breakpoint configuration.

### Named Rules
**The Max-Width-3XL Rule.** All five homepage sections share one `max-w-3xl` reading column, centered with `w-full`. Only the project detail template widens to `max-w-4xl` to accommodate longer-form markdown.

## Elevation & Depth

The system is flat by default. There is no shadow vocabulary for content — sections, cards, project rows, and skill lists all sit at the same visual plane, separated only by hairline borders (`border-border` / `dark:border-zinc-800`) or whitespace, never by shadow or background-color layering. `shadow-lg` appears in exactly two places: the mobile navigation drawer and the modal `Dialog` panel — both are overlay surfaces that need to visually detach from the page, which is the only context shadows are used in.

### Shadow Vocabulary
- **Overlay shadow** (`box-shadow` via Tailwind `shadow-lg`): used only on the mobile nav drawer and the Impressum/Rechtliches `Dialog` panel, to lift a surface that sits above a scrim.

### Named Rules
**The Border-Not-Shadow Rule.** Depth and separation within the page flow (between skill categories, between project entries, between the contact list and the footer) is conveyed by a single hairline border, never a shadow or a tonal surface change. Shadows are reserved exclusively for the two modal/overlay surfaces.

## Shapes

The form language is almost entirely square. `borderRadius` is not customized in `tailwind.config.ts` — every rounded corner observed is a stock Tailwind step (`rounded` = 4px, `rounded-lg` = 8px), and most interactive elements (the primary CTA button, nav links, project rows, dialog panel) are unrounded rectangles or plain text with no radius at all. The two rounded exceptions are: `rounded-full` on the circular profile photo and the mobile hamburger bars, and `rounded`/`rounded-lg` on small isolated UI chrome — the code block container, the copy button, and the theme-toggle hit area. Borders are consistently `1px` hairlines in the neutral border color, with one `2px` exception on the primary Hero CTA (`border-2`) and the profile photo ring (`border-2`).

## Components

### Buttons
- **Shape:** square corners (no radius) on the sole primary CTA; the error-page retry button repeats the same treatment.
- **Primary:** outlined, not filled — `border-2 border-primary`, transparent background, `px-6 py-3`, `text-sm font-medium`. On hover it inverts to a filled block (`hover:bg-primary hover:text-background`), transitioning over `duration-300`.
- **Ghost/link-style:** most calls to action on the site (Contact links, "Details ansehen", nav links) are plain text with `transition-colors` and an accent-color or underline hover — there is no secondary filled-button variant anywhere in the build; text-link is the default interactive pattern.

### Chips (tech tags)
- **Style:** `text-xs`, `px-2 py-1`, `border border-border` (hairline, no fill), muted secondary text color. No background fill, no rounded corners — a bordered label, not a pill.

### Cards / Containers
- **Corner Style:** square (no radius) except the modal dialog and code block, which use no radius and `rounded-lg` respectively — inconsistent, not a deliberate card system.
- **Background:** project rows and skill groups have no background fill; they sit directly on the page background and are separated by a bottom hairline border (`border-b border-border`, `pb-8`, `last:border-b-0`).
- **Shadow Strategy:** none on inline content cards (see Elevation & Depth); shadow only applies to the true overlay containers (Dialog, mobile drawer).
- **Border:** `1px border-border` / `dark:border-zinc-800` bottom border only (not full perimeter) on project rows and skill category headers.
- **Internal Padding:** project rows use `pb-8`; the Dialog content area uses `p-6`.

### Navigation
- Fixed top bar, `h-16`, translucent `bg-background/80` with `backdrop-blur-md`, bottom hairline border. Desktop links are `text-sm`, with the active section marked by primary-color text plus a `1px` underline bar positioned via absolute offset (not a background pill). Inactive links are secondary-color with a color transition on hover. Mobile collapses to a hamburger icon (three `w-6 h-0.5` bars that rotate into an X) opening a right-side `w-64` drawer with `shadow-lg` and a left `border-l-2` active-state indicator.

### Modal (Dialog)
- Square-cornered panel (`max-w-2xl`, `border border-border`, `shadow-lg`) over a `bg-black/50` scrim with `backdrop-filter: blur(4px)`. Focus is trapped and moved to the first focusable element on open; Escape closes it. Used for the two German legal-disclosure surfaces (Impressum, Rechtliches) reached from the Contact footer — required content, not optional chrome.

## Do's and Don'ts

### Do:
- **Do** keep the accent blue (`#2563eb` / `#60a5fa`) confined to interactive states (links, hover, focus, active nav indicator) — it does not appear as a fill or section color anywhere in the build.
- **Do** use hairline `1px` borders (`border-border` / `dark:border-zinc-800`) as the default separator between content blocks; reserve `shadow-lg` for true overlay surfaces (modal, mobile drawer) only.
- **Do** keep homepage sections on the shared `max-w-3xl` column with `py-32`/`lg:py-40` vertical rhythm and `px-6`/`md:px-12` horizontal rhythm — this pairing repeats identically across About, Work, Experience, and Contact and is the strongest layout invariant in the build.
- **Do** treat text-links as the default CTA pattern; the bordered outline-to-fill button exists as a single accent for the Hero's primary action, not a general button system.

### Don't:
- **Don't** assume dark mode inherits the light-mode custom tokens (`primary`, `background`, `surface`, `border`) — as built, every `dark:` variant reaches for raw `zinc-*` values instead. Treat this split as a recorded fact to reconcile deliberately, not a pattern to keep extending.
- **Don't** read the system-ui font stack or the unmodified `blue-600`/`blue-400` accent hexes as intentional brand choices — they are untouched framework defaults with no webfont, no custom typeface, and no accent-hue exploration behind them.
- **Don't** add card-style shadows or background-tinted surfaces to inline content (project rows, skill groups, contact rows) — the build's depth model is flat-plus-hairline-border everywhere except the two modal/overlay surfaces.
- **Don't** treat `focus-visible` rings as a site-wide guarantee. They exist on `ThemeToggle`, the `Dialog` close button, and the error-page retry button, but are absent from the primary nav links, the Hero CTA, the "Details ansehen" project links, and the Contact links/footer buttons — a real accessibility gap given PRODUCT.md's stated WCAG 2.1 bar, not a pattern to replicate elsewhere.
