import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDisplay } from "@/components/CartDisplay";
import { CartProvider } from "@/lib/cart-context";
import { getAllProducts } from "@/lib/utils";

export const metadata = {
  title: "Shopping Cart - StyleVault",
};

export default async function CartPage() {
  const products = await getAllProducts();

  return (
    <CartProvider products={products}>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-8">
            Shopping Cart
          </h1>
          <CartDisplay products={products} />
        </div>
      </main>
      <Footer />
    </CartProvider>
  );
}
