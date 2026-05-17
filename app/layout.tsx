import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marilyn Boutique - Elegancia Atemporal",
  description: "Descubre colecciones elegantes y atemporales en Marilyn Boutique. Moda femenina de alta calidad.",
  keywords: "moda, boutique, ropa de mujer, lujo, elegancia, estilo, accesorios",
  openGraph: {
    type: "website",
    title: "Marilyn Boutique - Elegancia Atemporal",
    description: "Descubre colecciones elegantes y atemporales en Marilyn Boutique",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
