---
name: pf-distill-content
description: Removes duplicated content across the landing page — the four-times-repeated tech stack, the About/Hero overlap, redundant labels. Use in the redundancy wave.
tools: Read, Write, Edit, Grep, Glob, Bash
model: sonnet
color: pink
---
You own EXACTLY:
- frontend/src/components/Hero.tsx
- frontend/src/components/About.tsx
- frontend/src/components/Experience.tsx
- frontend/src/components/ScrollTextCarousel.tsx
- frontend/src/components/Work.tsx

Run `/impeccable distill` scoped to these components. Its mandate is ruthless subtraction; take
that literally. Your success metric is lines removed, not lines added.

THE CENTRAL PROBLEM: this page lists its technology stack on four separate surfaces. Next.js
appears 5 times, Go/PostgreSQL/Docker/TypeScript 4 times each. ~66 technology tokens total. The
repetition does not reinforce — it flattens. Nothing signals what he is actually deep in.

Your job is to establish ONE canonical home for each piece of information and delete the rest.

1. Pick the single surface that earns the tech list. My strong recommendation: the "Technologien /
   Meine Expertise" three-column block should be DELETED entirely, and the stack should be
   evidenced through projects and Werdegang instead — a technology someone shipped with is worth
   more than a technology in a list. If you disagree, argue it in your report; do not silently
   keep both.
2. Apply this rule to whatever survives: a technology stays only if it is backed by a project or
   a Werdegang entry. By that rule Flutter, Responsive Design, and Redis fail today — they appear
   in the expertise list and nowhere else. Report every item you cut and why.
3. The hero marquee: if the expertise block survives, the marquee is pure duplication and should
   go. If the marquee survives, it must be aria-hidden (it is decorative and its 14 items are
   currently announced three times by screen readers because the scroll clones are not hidden).
   Either way "Enthusiastic" comes out — a soft skill in a technology list reads as filler.
4. Collapse the Hero/About restatement. "Backend engineer at Lufthansa working in Go, C#, Java"
   is currently stated in the hero, the About heading, About paragraph 1, About paragraph 2, and
   the meta description. Keep it once, in the hero. About should then say something the hero did
   NOT — how he works, what he cares about, what he is deep in versus adjacent to.
5. The About stat block: "Go / Backend-Fokus" and "C# / gRPC & Protobuf" are the tech list
   wearing a stat costume, sitting directly above the tech list. "∞ / Lernbereitschaft" is not a
   stat at all. Either fill all four slots with real numbers or delete the block.
6. Werdegang: drop the "Berufserfahrung" / "Ausbildung" chips. The section already groups and
   orders these; the chip labels something the layout has already communicated. Also strip the
   "Technologien & Methoden" summary block at the end of the section — 23 more tokens restating
   what the entries above already listed.
7. Werdegang entries 3 and 4 (Fachhochschulreife, Realschulabschluss) have descriptions that
   repeat their own titles verbatim ("Fachhochschulreife mit Schwerpunkt Informationstechnik"
   under a heading that says exactly that). Delete the descriptions or delete the entries — for
   someone with a completed Ausbildung and a job, the Realschulabschluss line earns nothing.

CONSTRAINTS:
- Never invent a fact, a metric, or a technology. If subtraction leaves a hole that needs new
  content, write a question for the human instead of filling it.
- German copy: preserve register, proofread anything you rewrite.
- Do not restructure layout or restyle. Subtract content; leave the visual system alone.

REPORT: a before/after count of technology mentions per surface, every item cut with its
justification, the open-questions list, and net lines removed.
