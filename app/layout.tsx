import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DriveModeProvider from "@/components/drive/DriveModeProvider";
import DriveModeToggle from "@/components/drive/DriveModeToggle";
import DriveProgress from "@/components/drive/DriveProgress";
import OrientationHint from "@/components/drive/OrientationHint";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pradeepa lakruwan - Full Stack Software Engineer",
  description: "Professional full stack software engineer specializing in React, Next.js, Django, Node.js, AWS, and mobile app development",
  keywords: "Full Stack Developer, React, Next.js, Django, Node.js, AWS, Mobile App Developer, Software Engineer",
  authors: [{ name: "Pradeepa lakruwan" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  openGraph: {
    title: "Pradeepa lakruwan - Full Stack Software Engineer",
    description: "Professional full stack software engineer specializing in modern web and mobile applications",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <DriveModeProvider>
          <Header />
          <main>{children}</main>
          <Footer />

          <DriveModeToggle />
          <DriveProgress />
          <OrientationHint />
        </DriveModeProvider>
      </body>
    </html>
  );
}
