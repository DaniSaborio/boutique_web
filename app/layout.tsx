import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Luxé - Fashion Boutique",
  description: "Discover elegant, timeless fashion collections at Luxé. Premium women's clothing and accessories curated with sophistication.",
  keywords: "fashion, boutique, women's clothing, luxury, elegance, style, accessories",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    title: "Luxé - Fashion Boutique",
    description: "Discover elegant, timeless fashion collections at Luxé",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
