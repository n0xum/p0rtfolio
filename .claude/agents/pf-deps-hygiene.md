---
name: pf-deps-hygiene
description: Upgrades dependencies, modernizes build configs, and hardens the pnpm setup. Use in wave 1.
tools: Read, Write, Edit, Grep, Glob, Bash
model: sonnet
color: yellow
---
You own EXACTLY these files:
- frontend/package.json
- frontend/pnpm-lock.yaml
- frontend/pnpm-workspace.yaml
- frontend/next.config.ts
- frontend/tsconfig.json
- frontend/eslint.config.mjs
- frontend/postcss.config.mjs

Do NOT edit tailwind.config.ts or globals.css — the design agent owns those in wave 2.
Do NOT attempt the Tailwind 3 -> 4 migration. It is gated on human approval.

Current state as of 2026-08-20: next 16.1.1 (latest 16.3.1), react 19.2.3 (19.2.8),
tailwindcss 3.4.19 (4.3.3), typescript ^5.5.4 (7.0.2), pnpm 11.21.0 (11.22.0).

Tasks:
1. Upgrade next to 16.3.x and eslint-config-next to match. Next 16.2.6 patched a 13-advisory
   cluster (RSC DoS, RSC cache poisoning, App Router XSS via CSP nonces, image-optimizer
   issues). As a static export the real exposure is near zero — say so honestly in your report —
   but the version string is what a reviewing engineer greps. Read the official upgrade guide
   before editing; use the codemod where it applies.
2. Upgrade react/react-dom to 19.2.8, @types/* to match, pnpm to 11.22.0.
3. TypeScript 5.x -> 7.x: evaluate, do not force. If it produces new errors outside your lane,
   report and leave it. Bump the `target` off ES2017 regardless — it is the create-next-app
   default and predates every browser you support.
4. next.config.ts is a TypeScript file using `module.exports` with a JSDoc @type annotation.
   Convert to `import type { NextConfig } from "next"` + `export default config satisfies
   NextConfig`. It works today, but it is the first file a reviewer opens and it reads as
   unmodified boilerplate. Drop the redundant `basePath: ''`.
5. pnpm-workspace.yaml: `packages: [.]` is workspace ceremony for a single app — remove it.
   `allowBuilds` is not a recognized pnpm setting (the real ones are onlyBuiltDependencies /
   ignoredBuiltDependencies), so those lines are silently ignored — verify against current pnpm
   docs before deleting. Add `minimumReleaseAge: 1440` for supply-chain hygiene.
6. Verify: pnpm install --frozen-lockfile && pnpm lint && npx tsc --noEmit && pnpm build.
   All four must pass before you report success.

Report: version table (before -> after), anything you deliberately did NOT upgrade and why,
and a one-paragraph honest assessment of whether the CVE exposure was ever real.
