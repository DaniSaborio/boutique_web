import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import { getAllProducts, getFeaturedProducts } from "@/lib/utils";

export const metadata = {
  title: "Marilyn Boutique - Fashion Elegance",
  description: "Discover elegant, timeless fashion collections at Marilyn Boutique",
};

// Icon Components
const DressIcon = () => (
  <svg className="w-16 h-16 mx-auto text-accent" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C12 2 9 6 9 9v3h2v9c0 1.1.9 2 2 2s2-.9 2-2v-9h2V9c0-3-3-7-3-7zm0 0h.01M7 12h10M12 21h.01"/>
  </svg>
);

const BlouseIcon = () => (
  <svg className="w-16 h-16 mx-auto text-accent" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L8 6v2h2v6H4v8h16v-8h-6V8h2V6l-4-4zm-2 4h4v2h-4V6zm6 8v6H8v-6h8z"/>
  </svg>
);

const PantsIcon = () => (
  <svg className="w-16 h-16 mx-auto text-accent" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 1C9.45 1 9 1.45 9 2v9H5v10c0 1.1.9 2 2 2h2v-2h6v2h2c1.1 0 2-.9 2-2v-10h-4V2c0-.55-.45-1-1-1h-2zm0 2h2v8h-2V3zm-2 11h2v2h-2v-2zm2 4H8v2h2v-2zm2 0h2v2h-2v-2zm4-4h2v2h-2v-2z"/>
  </svg>
);

const AccessoryIcon = () => (
  <svg className="w-16 h-16 mx-auto text-accent" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-2.12-2.66-4.04 5.27h15L13.96 9.29z"/>
  </svg>
);

export default async function Home() {
  const products = await getAllProducts();
  const featured = await getFeaturedProducts(6);

  return (
    <CartProvider products={products}>
      <Header />
      <main className="flex-1">
        {/* Hero Section - Premium Landing */}
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
                Timeless Elegance
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8">
                Curated collections for the modern woman. Discover sophistication in every piece.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/shop" className="btn-primary bg-white text-primary hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-lg">
                  Explore Collection
                </Link>
                <Link href="/contact" className="btn-secondary border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-20 md:py-32 bg-card-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
                Featured Collection
              </h2>
              <div className="w-16 h-1 bg-accent mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((product) => (
                <div key={product.id} className="group">
                  <ProductCard
                    product={product}
                    showAddToCart={true}
                  />
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link href="/shop" className="btn-primary inline-block px-8 py-3 text-lg">
                View All Products →
              </Link>
            </div>
          </div>
        </section>

        {/* Collections Categories */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-background to-background/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
                Shop by Category
              </h2>
              <div className="w-16 h-1 bg-accent mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: "Dresses", category: "dresses", icon: DressIcon },
                { name: "Blouses", category: "tops", icon: BlouseIcon },
                { name: "Bottoms", category: "bottoms", icon: PantsIcon },
                { name: "Accessories", category: "accessories", icon: AccessoryIcon },
              ].map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.category}
                    href={`/shop?category=${cat.category}`}
                    className="group relative overflow-hidden rounded-xl bg-white card hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 group-hover:from-primary/10 group-hover:to-accent/10 transition"></div>
                    <div className="relative p-8 text-center">
                      <Icon />
                      <h3 className="text-2xl font-bold text-foreground mt-4 group-hover:text-primary transition">
                        {cat.name}
                      </h3>
                      <p className="text-foreground/60 mt-2 text-sm">Explore now →</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* All Products Grid for Reference */}
        <section className="py-20 md:py-32 bg-card-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
                Complete Collection
              </h2>
              <p className="text-lg text-foreground/60">All our carefully curated pieces</p>
              <div className="w-16 h-1 bg-accent mx-auto mt-4"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 12).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showAddToCart={true}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent-light text-white">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Exclusive Access
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Join our community and receive early access to new collections and exclusive member-only offers.
            </p>
            <div className="flex gap-3 max-w-md mx-auto flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-white text-primary font-bold px-8 py-3 rounded-lg hover:bg-gray-50 transition whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-card-bg border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-foreground/70">Authentic Quality</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">Free</div>
                <p className="text-foreground/70">Shipping on Orders</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">30 Days</div>
                <p className="text-foreground/70">Easy Returns</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </CartProvider>
  );
}
