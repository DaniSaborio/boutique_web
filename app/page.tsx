import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import { getAllProducts } from "@/lib/utils";

export const metadata = {
  title: "Marilyn Boutique - Elegancia Atemporal",
  description: "Descubre colecciones elegantes y atemporales en Marilyn Boutique",
};

export default async function Home() {
  const products = await getAllProducts();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <CartProvider products={products}>
      <Header />
      <main className="flex-1">

        {/* ── Hero (fondo oscuro → texto blanco/dorado) ── */}
        <section className="relative overflow-hidden" style={{ background: "#141414" }}>
          <div
            className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full opacity-[0.05] pointer-events-none"
            style={{ background: "var(--primary)", transform: "translate(30%, -30%)" }}
          />
          <div
            className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
            style={{ background: "var(--primary)", transform: "translate(-40%, 40%)" }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40 lg:py-52 text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em] mb-6"
              style={{ color: "var(--primary)" }}
            >
              Nueva Colección 2025
            </p>

            <h1
              className="font-display font-bold leading-[0.92] mb-8"
              style={{
                color: "#F5F0E4",
                fontSize: "clamp(3.5rem, 10vw, 8rem)",
              }}
            >
              Elegancia<br />Atemporal
            </h1>

            <p className="text-lg max-w-md mx-auto mb-10" style={{ color: "rgba(245,240,228,0.65)" }}>
              Piezas seleccionadas para la mujer moderna que abraza la sofisticación en cada detalle.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                href="#productos"
                className="px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wide uppercase transition-all"
                style={{ background: "var(--primary)", color: "white" }}
              >
                Ver Colección
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wide uppercase transition-all border"
                style={{ borderColor: "rgba(245,240,228,0.25)", color: "#F5F0E4" }}
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </section>

        {/* ── Value strip ─────────────────────────────── */}
        <section
          className="border-y"
          style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0"
              style={{ borderColor: "var(--border)" }}
            >
              {[
                { label: "Envío gratis", sub: "En pedidos +₡50,000" },
                { label: "Devoluciones", sub: "30 días sin preguntas" },
                { label: "Pago seguro", sub: "Encriptación SSL" },
                { label: "Atención", sub: "Lunes a sábado" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center text-center gap-1.5 py-5 px-4"
                >
                  <div
                    className="w-5 h-0.5 rounded-full mb-0.5"
                    style={{ background: "var(--primary)" }}
                  />
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {item.label}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Products ───────────────────────── */}
        <section
          id="productos"
          className="py-20 md:py-28"
          style={{ background: "var(--background)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-[0.25em] mb-2"
                  style={{ color: "var(--primary)" }}
                >
                  Destacados
                </p>
                <h2
                  className="font-display font-bold text-3xl md:text-4xl"
                  style={{ color: "var(--foreground)" }}
                >
                  Nuestra Colección
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-sm font-semibold whitespace-nowrap flex items-center gap-1.5 group"
                style={{ color: "var(--primary)" }}
              >
                Ver todo
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {featured.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {featured.map((product) => (
                  <ProductCard key={product.id} product={product} showAddToCart={true} />
                ))}
              </div>
            ) : (
              <p className="text-center py-12" style={{ color: "var(--text-muted)" }}>
                No hay productos disponibles
              </p>
            )}

            <div className="text-center mt-12">
              <Link href="/shop" className="btn-primary">
                Ver toda la colección
              </Link>
            </div>
          </div>
        </section>

        {/* ── Newsletter (fondo dorado → texto blanco) ─ */}
        <section className="py-20" style={{ background: "var(--primary)" }}>
          <div className="max-w-xl mx-auto px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>
              Comunidad exclusiva
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
              Acceso Anticipado
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
              Sé la primera en conocer las nuevas colecciones y ofertas especiales.
            </p>
            <div className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="tu@correo.com"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  color: "white",
                  width: "auto",
                  flex: 1,
                }}
              />
              <button
                className="px-5 py-3 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors"
                style={{ background: "white", color: "var(--primary)" }}
              >
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
