import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Koľko stojí realita?",
  description: "Nie si chudobný. Len žiješ v realite.",
  metadataBase: new URL("https://kolko-stoji-realita.vercel.app"),
  openGraph: {
    title: "Koľko stojí realita?",
    description: "Nie si chudobný. Len žiješ v realite.",
    url: "https://kolko-stoji-realita.vercel.app",
    siteName: "Koľko stojí realita?",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Koľko stojí realita? Nie si chudobný. Len žiješ v realite.",
      },
    ],
    locale: "sk_SK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koľko stojí realita?",
    description: "Nie si chudobný. Len žiješ v realite.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
