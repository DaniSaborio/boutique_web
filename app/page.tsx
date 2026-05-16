import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import { getAllProducts } from "@/lib/utils";

export const metadata = {
  title: "Marilyn Boutique - Elegancia Timeless",
  description: "Descubre colecciones elegantes y atemporales en Marilyn Boutique",
};

export default async function Home() {
  const products = await getAllProducts();

  return (
    <CartProvider products={products}>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden py-32 md:py-48">
          <div className="absolute inset-0 opacity-10">
            <svg className="absolute top-10 right-10 w-72 h-72 text-white" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white leading-tight mb-6">
                Elegancia Atemporal
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8">
                Colecciones cuidadosamente seleccionadas para la mujer moderna. Descubre sofisticación en cada pieza.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="#productos" className="bg-white text-primary hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-lg transition">
                  Ver Colección
                </Link>
                <Link href="/contact" className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg transition">
                  Contáctanos
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section id="productos" className="py-20 md:py-32 bg-card-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
                Nuestra Colección
              </h2>
              <p className="text-lg text-foreground/60">18 piezas seleccionadas con cuidado</p>
              <div className="w-16 h-1 bg-accent mx-auto mt-4"></div>
            </div>

            {products.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showAddToCart={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-foreground/70">No hay productos disponibles</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent-light text-white">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold font-display mb-4">
              Acceso Exclusivo
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Únete a nuestra comunidad y recibe acceso anticipado a nuevas colecciones.
            </p>
            <div className="flex gap-3 max-w-md mx-auto flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Ingresa tu correo"
                className="flex-1 px-6 py-3 rounded-lg text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-white text-primary font-bold px-8 py-3 rounded-lg hover:bg-gray-50 transition whitespace-nowrap">
                Suscribirse
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </CartProvider>
  );
}