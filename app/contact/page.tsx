import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { CartProvider } from "@/lib/cart-context";
import { getAllProducts } from "@/lib/utils";

export const metadata = {
  title: "Contact Us - StyleVault",
};

export default async function ContactPage() {
  const products = await getAllProducts();

  return (
    <CartProvider products={products}>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Info Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: "📧",
                  title: "Email",
                  content: "hello@stylevault.com",
                },
                {
                  icon: "📞",
                  title: "Phone",
                  content: "+1 (555) 123-4567",
                },
                {
                  icon: "📍",
                  title: "Address",
                  content: "123 Fashion Street, New York, NY 10001",
                },
              ].map((item, idx) => (
                <div key={idx} className="card text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-12 bg-card-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold font-display text-foreground mb-2">
                Send us a Message
              </h2>
              <p className="text-foreground/70">
                Fill out the form below and we'll get back to you shortly.
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
