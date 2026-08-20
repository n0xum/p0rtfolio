import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://alexander-kruska.dev"),
  title: "Portfolio - Alexander Kruska",
  description: "Backend Software Engineer bei Lufthansa Industry Solutions. Spezialisiert auf robuste Backend-Services mit Go, C# und Java.",
  authors: [{ name: "Alexander Kruska" }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://alexander-kruska.dev",
    siteName: "Portfolio - Alexander Kruska",
    title: "Portfolio - Alexander Kruska",
    description: "Backend Software Engineer bei Lufthansa Industry Solutions. Spezialisiert auf robuste Backend-Services mit Go, C# und Java.",
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
    description: "Backend Software Engineer bei Lufthansa Industry Solutions",
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
        <JsonLd />
      </head>
      <body className="font-sans antialiased bg-background dark:bg-zinc-950 text-primary dark:text-zinc-50 transition-colors">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
