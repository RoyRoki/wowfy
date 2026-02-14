import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { CustomCursor } from "@/components/CustomCursor";
import { AnimatedFavicon } from "@/components/AnimatedFavicon";

// Display font - Bold geometric elegance for hero headlines
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["700", "800"],
});

// Heading font - Open, precise, distinctive for section titles
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["500", "600", "700"],
});

// Body font - Screen-optimized clarity for readability
const interDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "RokiRoy Digital | Premium Tech Solutions",
  description: "We Build Tomorrow's Tech Today. From Vision to Victory – Full-Stack Freelance Solutions. Web & Mobile Apps, UI/UX Design, Cloud Architecture, AI/ML Integrations.",
  keywords: ["web development", "mobile apps", "UI/UX design", "freelance developer", "tech solutions", "full-stack", "React", "Next.js"],
  authors: [{ name: "RokiRoy Digital" }],
  openGraph: {
    title: "RokiRoy Digital | Premium Tech Solutions",
    description: "We Build Tomorrow's Tech Today. Full-Stack Freelance Solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RokiRoy Digital | Premium Tech Solutions",
    description: "We Build Tomorrow's Tech Today. Full-Stack Freelance Solutions.",
  },
  icons: {
    icon: "/favicons/web.svg",
    shortcut: "/favicons/web.svg",
    apple: "/favicons/web.svg",
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
      <body className={`${interDisplay.variable} ${manrope.variable} ${outfit.variable} font-sans antialiased noise`}>
        <Providers>
          <CustomCursor />
          <AnimatedFavicon />
          {children}
        </Providers>
      </body>
    </html>
  );
}
