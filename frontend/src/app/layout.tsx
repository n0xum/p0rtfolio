import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import JsonLd from "@/components/JsonLd";
import Footer from "@/components/Footer";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alexander-kruska.dev"),
  title: "Portfolio - Alexander Kruska",
  description: "IT-Berater und Softwareentwickler bei Lufthansa Industry Solutions. Spezialisiert auf robuste Backend-Services mit Go, C# und Java.",
  authors: [{ name: "Alexander Kruska" }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://alexander-kruska.dev",
    siteName: "Portfolio - Alexander Kruska",
    title: "Portfolio - Alexander Kruska",
    description: "IT-Berater und Softwareentwickler bei Lufthansa Industry Solutions. Spezialisiert auf robuste Backend-Services mit Go, C# und Java.",
    images: [
      {
        url: "/images/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Alexander Kruska Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Alexander Kruska",
    description: "IT-Berater und Softwareentwickler bei Lufthansa Industry Solutions",
    images: ["/images/portfolio.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`scroll-smooth ${ibmPlexSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  const theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <JsonLd />
      </head>
      <body className="font-sans antialiased bg-background dark:bg-zinc-950 text-primary dark:text-zinc-50 transition-colors">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background dark:focus:bg-zinc-950 focus:text-primary dark:focus:text-zinc-50 focus:border focus:border-border dark:focus:border-zinc-800 focus:rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          Zum Inhalt springen
        </a>
        <ThemeProvider>
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
