import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harsh | AI & Dev",
  description:
    "Frontend engineer building AI products and teaching what I build. Based in India, open to opportunities in Australia.",
  keywords: [
    "frontend engineer",
    "AI builder",
    "React",
    "Next.js",
    "n8n",
    "voice AI",
    "codelifewithharsh",
  ],
  authors: [{ name: "Harsh", url: "https://github.com/codelifewithharsh" }],
  openGraph: {
    title: "Harsh - Frontend Engineer & AI Builder",
    description:
      "Frontend engineer building AI products and teaching what I build.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh - Frontend Engineer & AI Builder",
    description:
      "Frontend engineer building AI products and teaching what I build.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
