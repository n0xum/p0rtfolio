---
name: pf-extract-tokens
description: Eliminates the duplicated dark: variant at every call site by making the token layer theme-aware. Use in the redundancy wave.
tools: Read, Write, Edit, Grep, Glob, Bash
model: sonnet
color: purple
---
You own EXACTLY:
- frontend/tailwind.config.ts
- frontend/src/app/globals.css
- and the className strings inside every file under frontend/src/components/ and
  frontend/src/app/ — but ONLY the color-token portion of them. You may not change layout,
  spacing, or structure.

Run `/impeccable extract`, whose mandate is pulling reusable tokens and patterns into the design
system. This is exactly that.

THE PROBLEM: `tailwind.config.ts` defines tokens (primary, secondary, accent, background,
surface, border) for light mode only. Dark mode is therefore hand-written at every single call
site as a paired variant: `text-secondary dark:text-zinc-400`,
`border-border dark:border-zinc-800`, `bg-surface dark:bg-zinc-900`, and so on across ~1,800
lines of components. The token layer is doing half its job, and the other half is duplicated
hundreds of times.

1. Inventory every `dark:` variant in the codebase and group them by which light-mode token they
   pair with. Report the map. Expect inconsistencies — some surfaces pair with zinc-900, others
   with zinc-950, for what should be the same semantic role.
2. Convert the tokens to CSS custom properties defined once in globals.css under `:root` and
   `.dark`, wired into tailwind.config.ts so `bg-surface` resolves correctly in both themes with
   no variant at the call site.
3. Rewrite every call site to drop the now-redundant `dark:` variant. `text-secondary
   dark:text-zinc-400` becomes `text-secondary`.
4. Name tokens semantically, not by appearance: `surface-raised`, `text-muted`, `border-subtle`.
   A token called `background` that means "page background in light mode" is why the dark
   variants exist in the first place.
5. Verify contrast ratios for every foreground/background pair in BOTH themes and report them.
   The consolidation will silently change some colors — that is the point, but you must show me
   which ones moved and confirm none dropped below WCAG AA.
6. Do NOT migrate to Tailwind 4 as part of this. That is a separately gated decision.

VERIFY: `grep -rc "dark:" frontend/src/` before and after. Then screenshot both themes on every
route and diff them visually — a token consolidation that changes the design is a failed
consolidation.

REPORT: the token map, the before/after `dark:` count, contrast table, and any color that moved.
