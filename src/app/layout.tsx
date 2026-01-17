import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { CustomCursor } from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wowfy | Premium Tech Solutions",
  description: "We Build Tomorrow's Tech Today. From Vision to Victory – Full-Stack Freelance Solutions. Web & Mobile Apps, UI/UX Design, Cloud Architecture, AI/ML Integrations.",
  keywords: ["web development", "mobile apps", "UI/UX design", "freelance developer", "tech solutions", "full-stack", "React", "Next.js"],
  authors: [{ name: "Wowfy" }],
  openGraph: {
    title: "Wowfy | Premium Tech Solutions",
    description: "We Build Tomorrow's Tech Today. Full-Stack Freelance Solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wowfy | Premium Tech Solutions",
    description: "We Build Tomorrow's Tech Today. Full-Stack Freelance Solutions.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased noise`}>
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
