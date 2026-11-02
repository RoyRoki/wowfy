import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { CustomCursor } from "@/components/CustomCursor";
import { GlobalLoader } from "@/components/ui/global-loader";

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

const SITE_NAME = "RokiRoy Digital";
const SITE_TITLE = "Roki Roy | Freelance Web & App Developer in India";
const SITE_DESCRIPTION =
  "Roki Roy is a freelance full-stack developer in Siliguri, India. He builds websites, web apps and mobile apps for startups, from design through deployment.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rokiroy.in"),
  title: {
    default: SITE_TITLE,
    template: "%s | RokiRoy Digital",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "web development",
    "web app development",
    "mobile app development",
    "UI/UX design",
    "Next.js developer",
    "React developer",
    "Flutter developer",
    "freelance web developer India",
    "freelance full-stack developer",
    "freelance web developer for startups",
    "freelance app developer",
    "startup web app development",
    "Siliguri freelance developer",
  ],
  authors: [{ name: "Roki Roy", url: "https://www.rokiroy.in" }],
  creator: "Roki Roy",
  publisher: "RokiRoy Digital",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.rokiroy.in",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Roki Roy — Freelance Web & App Developer in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: "@MRrokiroy",
    creator: "@MRrokiroy",
    images: ["/twitter-image.jpg"],
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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9948218546114476"
          crossOrigin="anonymous"
        />
        <GlobalLoader />
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
