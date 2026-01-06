import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Portfolio - Alexander Kruska",
  description: "Software-Entwickler in Ausbildung bei Lufthansa Industry Solutions. Spezialisiert auf Backend-Entwicklung mit Go und moderne Web-Anwendungen mit Next.js.",
  keywords: "Portfolio, Webentwicklung, Full-Stack, React, Next.js, TypeScript, Go, Alexander Kruska, Lufthansa Industry Solutions",
  authors: [{ name: "Alexander Kruska" }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://alexander-kruska.dev",
    siteName: "Portfolio - Alexander Kruska",
    title: "Portfolio - Alexander Kruska",
    description: "Software-Entwickler in Ausbildung bei Lufthansa Industry Solutions. Spezialisiert auf Backend-Entwicklung mit Go und moderne Web-Anwendungen mit Next.js.",
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
    description: "Software-Entwickler in Ausbildung bei Lufthansa Industry Solutions",
    images: ["/images/portfolio.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth" suppressHydrationWarning>
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
      </head>
      <body className="font-sans antialiased bg-background dark:bg-zinc-950 text-primary dark:text-zinc-50 transition-colors">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
