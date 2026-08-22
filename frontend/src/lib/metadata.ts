import type { Metadata } from "next";

// Single canonical home for the site's brand name and elevator-pitch
// description. Previously each of these was hand-copied into `title`,
// `openGraph.title`/`description`, and `twitter.title`/`description` in two
// separate files, and drifted once (the layout's `twitter.description` was
// a hand-truncated, out-of-date copy missing the second sentence). Every
// consumer below reads from these two constants instead.
export const SITE_NAME = "Portfolio - Alexander Kruska";
export const SITE_DESCRIPTION =
  "IT-Berater und Softwareentwickler bei der Lufthansa Industry Solutions. Spezialisiert auf robuste Backend-Services mit Go, C# und Java.";

// The OG/Twitter share-card image. `metadataBase` (set once, in the root
// layout) resolves this relative path to an absolute URL for every route
// that uses it, so it is written once here rather than as a literal object
// in every `generateMetadata`/`metadata` export.
const DEFAULT_OG_IMAGE = {
  url: "/images/portfolio.png",
  width: 1200,
  height: 630,
  alt: "Alexander Kruska Portfolio",
};

interface BuildMetadataOptions {
  /** Used verbatim for the page `<title>`, `og:title`, and `twitter:title`. */
  title: string;
  /** Used verbatim for the page description, `og:description`, and `twitter:description`. */
  description: string;
  /** Path relative to `metadataBase`, e.g. "/" or "/projects/structify". */
  path: string;
  /** OpenGraph object type. Defaults to "website"; project pages pass "article". */
  type?: "website" | "article";
  /** Per-page OG image override (e.g. a project's own screenshot). Falls back to the site's default share-card image. */
  image?: { url: string; alt: string };
}

/**
 * Builds the `title`/`description`/`openGraph`/`twitter` fields shared by
 * every route's metadata. `og:site_name` is a genuinely distinct fact from
 * `og:title` (it identifies the site across every page, not just this one)
 * so it stays a separate field - but it now always reads from `SITE_NAME`
 * instead of being retyped as a literal string per call site.
 */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  image,
}: BuildMetadataOptions): Metadata {
  const ogImage = image
    ? { ...DEFAULT_OG_IMAGE, url: image.url, alt: image.alt }
    : DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    openGraph: {
      type,
      locale: "de_DE",
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}
