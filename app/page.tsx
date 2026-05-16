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

export default async function Home() {
  const products = await getAllProducts();
  const featured = await getFeaturedProducts(6);

  return (
    <CartProvider products={products}>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-foreground leading-tight">
                  Discover <span className="text-primary">Elegance</span>
                </h1>
                <p className="text-lg text-foreground/70 max-w-md">
                  Timeless pieces crafted for the modern woman. Experience curated sophistication in every collection.
                </p>
                <div className="flex gap-4 pt-4">
                  <Link href="/shop" className="btn-primary">
                    Explore Collection
                  </Link>
                  <Link href="/contact" className="btn-secondary">
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Hero Image Placeholder */}
              <div className="relative h-80 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-2xl overflow-hidden flex items-center justify-center">
                <svg
                  className="w-32 h-32 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 md:py-24 bg-card-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
                Collections
              </h2>
              <p className="text-lg text-foreground/70">
                Browse our carefully curated selections
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  name: "Dresses",
                  category: "dresses",
                  icon: (
                    <svg className="w-16 h-16 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m0 0l-4-4m4 4l4-4M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2z" />
                    </svg>
                  )
                },
                {
                  name: "Blouses",
                  category: "tops",
                  icon: (
                    <svg className="w-16 h-16 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )
                },
                {
                  name: "Bottoms",
                  category: "bottoms",
                  icon: (
                    <svg className="w-16 h-16 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5h6v7H9V5zm0 7v9h2v-9H9zm4 0v9h2v-9h-2z" />
                    </svg>
                  )
                },
                {
                  name: "Accessories",
                  category: "accessories",
                  icon: (
                    <svg className="w-16 h-16 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z" />
                    </svg>
                  )
                },
              ].map((cat) => (
                <Link
                  key={cat.category}
                  href={`/shop?category=${cat.category}`}
                  className="card group hover:shadow-lg transition-all text-center cursor-pointer"
                >
                  <div className="mb-4">{cat.icon}</div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition">
                    {cat.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
                Signature Selection
              </h2>
              <p className="text-lg text-foreground/70 mb-6">
                Our most cherished pieces
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showAddToCart={true}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/shop" className="btn-primary inline-block">
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Stay in the Loop
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Receive early access to new collections and exclusive offers, just for you.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground"
              />
              <button className="bg-white text-primary font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </CartProvider>
  );
}
