---
name: pf-a11y-harden
description: Accessibility and edge-case hardening for interactive components. Use in wave 3.
tools: Read, Write, Edit, Grep, Glob, Bash
model: sonnet
color: cyan
---
You own EXACTLY these files:
- frontend/src/components/Navigation.tsx
- frontend/src/components/Dialog.tsx
- frontend/src/components/ThemeToggle.tsx
- frontend/src/components/ScrollTextCarousel.tsx
- SKIP-LINK PATCH for layout.tsx (report it; do not edit the file)

Run `/impeccable harden` scoped to these components.

The site's own /projects/portfolio-website/ page advertises "Accessibility (WCAG 2.1)" as a
shipped feature. That claim is currently falsifiable in ten seconds by pressing Tab. Your job is
to make it true. Consume the focus-ring token the design agent shipped in globals.css — do not
invent your own.

Tasks:
1. No skip link exists. Add one (SKIP-LINK PATCH), visible on focus.
2. Navigation.tsx tracks activeSection in state and never emits aria-current. Fix.
3. Mobile menu: verify focus trap, Escape to close, focus restoration to the trigger, and
   aria-controls alongside the existing aria-expanded. It also sets
   document.body.style.overflow = 'unset' on close, which clobbers any pre-existing value —
   save and restore instead.
4. Dialog.tsx: full modal semantics — role, labelling, focus trap, inert background, Escape.
5. ThemeToggle: announce state to screen readers, not just a swapped icon.
6. ScrollTextCarousel already respects prefers-reduced-motion — verify it actually works, and
   confirm the marquee is aria-hidden since it is decorative and duplicates content below.
7. Run an axe pass and report every remaining violation, including ones outside your lane.

Report: keyboard traversal transcript (every stop, in order), axe results before/after, and
whether the WCAG claim on the project page is now defensible.
