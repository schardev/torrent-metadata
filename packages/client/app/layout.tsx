import siteConfig from "@/lib/siteConfig";
import "@/styles/global.css";
import clsx from "clsx";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-family-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: [
    "torrent",
    "metadata",
    "torrent info",
    "magnet url info",
    "torrent infohash",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.title}`,
    },
    description: siteConfig.description,
    siteName: siteConfig.title,
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 600,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@SaurabhCharde",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "bg-slate-950 text-slate-50 min-h-screen font-sans selection:bg-slate-600",
          "flex flex-col items-center gap-4",
          inter.variable,
        )}>
        {children}
        <footer className="px-4 py-4 w-full md:max-w-4xl">
          <p className="text-slate-400 text-sm lg:text-base">
            Built by{" "}
            <Link
              href={siteConfig.github}
              target="_blank"
              className="underline hover:text-slate-200">
              schardev
            </Link>
            . The source code is available on{" "}
            <Link
              href={siteConfig.source}
              target="_blank"
              className="underline hover:text-slate-200">
              GitHub
            </Link>
            .
          </p>
        </footer>
      </body>
    </html>
  );
}
