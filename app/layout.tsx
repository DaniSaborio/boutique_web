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
  title: "StyleVault - Fashion Boutique",
  description: "Discover curated fashion collections at StyleVault. Premium clothing and accessories for modern style.",
  keywords: "fashion, boutique, clothing, style, accessories",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    title: "StyleVault - Fashion Boutique",
    description: "Discover curated fashion collections at StyleVault",
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
