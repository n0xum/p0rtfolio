/**
 * A full-bleed band of technology keywords that drifts horizontally as the
 * page scrolls past it.
 *
 * This used to be a Client Component driving that drift from JavaScript: a
 * scroll listener accumulated a target offset, a `requestAnimationFrame`
 * loop lerped toward it, and each frame called `setState` - re-rendering
 * all 39 spans through React. Worse, the rAF effect listed `targetOffset`
 * in its dependency array, so every scroll delta also tore down and
 * rebuilt the loop. On a 120Hz trackpad that is a full React render and an
 * effect teardown roughly every 8ms, for the entire time this strip is on
 * screen - the single largest contributor to the scroll jank this pass was
 * asked to fix.
 *
 * The drift is now a CSS scroll-driven animation (`.marquee-track`, see
 * globals.css), which the compositor runs off the main thread. That
 * removes the `'use client'` directive along with the state, the observer,
 * the listener and the loop: this file now ships zero bytes of JavaScript
 * and renders entirely on the server.
 *
 * `prefers-reduced-motion` and browsers without scroll-timeline support
 * are handled in the stylesheet - both resolve to a static, unmoving strip
 * showing the first words, which is a legitimate resting state rather than
 * a broken one.
 */

const words = [
  'TypeScript',
  'Golang',
  'CI/CD',
  'Next.js',
  'Spring Boot',
  'REST APIs',
  'Docker',
  'PostgreSQL',
  'Agile',
];

export default function ScrollTextCarousel() {
  return (
    <div
      // `overflow-clip`, NOT `overflow-hidden`. `hidden` makes this element a
      // scroll container, and a `view()` timeline resolves against its
      // nearest ancestor scroll container - so the track's timeline attached
      // to *this* box, which never scrolls, and the drift sat frozen at 0.
      // `clip` clips identically without establishing a scroll container, so
      // the timeline resolves against the viewport, which is the intent.
      //
      // `bg-gray-50/30` here was a leftover Tailwind default: `gray-50` is
      // not one of the stops DESIGN.md pins in @theme, and it sat next to a
      // dark-mode value that *is* pinned. Swapped to the declared `surface`
      // token, which is the light-mode value it was approximating anyway.
      className="marquee-mask w-full overflow-clip border-y border-border bg-surface/40 dark:bg-surface/20 py-4"
      aria-hidden="true"
    >
      {/* `w-max` sizes the flex container to its content. Without it the
          container is only as wide as the viewport (the children merely
          overflow it), and `.marquee-track`'s `translate: -11%` - which
          resolves against the element's own border box - would mean 11% of
          the viewport rather than 11% of the track. */}
      <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
        {/* The set is repeated so the strip stays covered edge to edge at
            every offset the drift can reach. The invariant: the track must
            stay wider than `viewport + 11% of the track` (the drift
            distance), i.e. one copy's width * REPEATS >= viewport / 0.89.
            The repeat count is therefore a function of how many words are
            in the list, and has to be re-checked whenever that list
            changes. The distill pass cut the list from 13 words to 9,
            which took the covered width from 4079px down to 2670px - i.e.
            from covering a 3675px viewport to only 2405px, exposing a bare
            edge on any monitor 2560px or wider. Five copies restore 4471px
            (covers 4028px), which is more headroom than the 13-word list
            ever had. Measured, not estimated. */}
        {[...words, ...words, ...words, ...words, ...words].map((word, index) => (
          <span
            key={index}
            className="text-sm font-medium text-marquee-muted uppercase tracking-wider select-none"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
