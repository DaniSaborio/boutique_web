import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDisplay } from "@/components/CartDisplay";
import { CartProvider } from "@/lib/cart-context";
import { getAllProducts } from "@/lib/utils";

export const metadata = {
  title: "Carrito de Compras - Marilyn Boutique",
};

export default async function CartPage() {
  const products = await getAllProducts();

  return (
    <CartProvider products={products}>
      <Header />
      <main className="flex-1" style={{ background: "var(--background)" }}>
        {/* Page header */}
        <div
          className="border-b"
          style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1
              className="font-display font-bold text-3xl md:text-4xl"
              style={{ color: "var(--foreground)" }}
            >
              Carrito de Compras
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <CartDisplay products={products} />
        </div>
      </main>
      <Footer />
    </CartProvider>
  );
}
