import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { CartProvider } from "@/lib/cart-context";
import { getAllProducts } from "@/lib/utils";

export const metadata = {
  title: "Contacto - Marilyn Boutique",
};

const contactItems = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <rect width="20" height="16" x="2" y="4" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    title: "Correo",
    content: "hola@marilynboutique.com",
    sub: "Respondemos en menos de 24h",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: "Teléfono",
    content: "+506 2234-5678",
    sub: "Lunes a sábado, 9am – 6pm",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Dirección",
    content: "Av. Central, San José, CR",
    sub: "Visítanos en tienda física",
  },
];

export default async function ContactPage() {
  const products = await getAllProducts();

  return (
    <CartProvider products={products}>
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section
          className="border-b"
          style={{
            background: "#141414",
            borderColor: "rgba(245,240,228,0.1)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em] mb-4"
              style={{ color: "var(--primary)" }}
            >
              Estamos aquí para ti
            </p>
            <h1
              className="font-display font-bold text-4xl md:text-5xl mb-4"
              style={{ color: "#F5F0E4" }}
            >
              Contáctanos
            </h1>
            <p className="max-w-lg mx-auto text-base" style={{ color: "rgba(245,240,228,0.65)" }}>
              ¿Tienes preguntas sobre un pedido o nuestra colección? Escríbenos y te respondemos a la brevedad.
            </p>
          </div>
        </section>

        {/* Contact cards */}
        <section className="py-12" style={{ background: "var(--background)" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-3 gap-4">
              {contactItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border p-5 flex flex-col items-center text-center gap-3"
                  style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(191,155,48,0.1)",
                      color: "var(--primary)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "var(--foreground)" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-sm font-medium mt-0.5"
                      style={{ color: "var(--primary)" }}
                    >
                      {item.content}
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section
          className="py-12 pb-20"
          style={{ background: "var(--background)" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h2
                className="font-display font-bold text-2xl md:text-3xl"
                style={{ color: "var(--foreground)" }}
              >
                Envíanos un mensaje
              </h2>
              <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
                Completa el formulario y te responderemos pronto.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>

      </main>
      <Footer />
    </CartProvider>
  );
}
