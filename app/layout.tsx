import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { buildMetadata, personJsonLd, websiteJsonLd, SITE_URL } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    title: "Pradeepa Lakruwan — Full Stack Software Engineer | Python, Django, AWS & AI Automation",
    description:
      "Full Stack Software Engineer building production-ready backend systems, AWS cloud architecture, React Native applications, payment integrations, and AI automation.",
  }),
  keywords: [
    "Full Stack Software Engineer",
    "Backend Engineer",
    "Full Stack Developer",
    "Python",
    "Django",
    "React",
    "Next.js",
    "React Native",
    "AWS",
    "AI Automation",
    "Claude API",
  ],
  authors: [{ name: "Pradeepa Lakruwan", url: SITE_URL }],
  creator: "Pradeepa Lakruwan",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F5FA" },
    { media: "(prefers-color-scheme: dark)", color: "#05060B" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme'),m=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(!t&&m))document.documentElement.classList.add('dark')}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </head>
      <body className="font-sans">
        {/* reducedMotion="user" makes every Framer Motion animation in the
            tree honor the OS prefers-reduced-motion setting automatically —
            Framer's animations set styles directly via JS, so the CSS
            reduced-motion override above never touches them without this. */}
        <MotionConfig reducedMotion="user">
          <SiteChrome>{children}</SiteChrome>
        </MotionConfig>
      </body>
    </html>
  );
}
