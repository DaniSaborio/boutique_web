import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import { getAllProducts } from "@/lib/utils";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await getAllProducts();

  return (
    <CartProvider products={products}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </CartProvider>
  );
}
