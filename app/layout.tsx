import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pradeepalakruwan.com"),
  title: "Pradeepa Lakruwan — Full Stack Software Engineer",
  description:
    "I design and build production-ready software systems that help businesses launch faster, automate operations, and scale with confidence. Specialising in React, Next.js, Django, React Native, and AWS.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Django",
    "React Native",
    "AWS",
    "Software Engineer",
    "Mobile App Developer",
    "Python",
    "TypeScript",
  ],
  authors: [{ name: "Pradeepa Lakruwan", url: "https://pradeepalakruwan.com" }],
  creator: "Pradeepa Lakruwan",
  openGraph: {
    title: "Pradeepa Lakruwan — Full Stack Software Engineer",
    description:
      "Production-ready software systems — React, Django, React Native, and AWS.",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pradeepa Lakruwan — Full Stack Software Engineer",
    description:
      "Production-ready software systems — React, Django, React Native, and AWS.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ECF0F5" },
    { media: "(prefers-color-scheme: dark)", color: "#090E18" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme'),m=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(!t&&m))document.documentElement.classList.add('dark')}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
