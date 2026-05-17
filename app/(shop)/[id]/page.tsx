"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice, getProductById, getAllProducts } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { ProductCard } from "@/components/ProductCard";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      const prod = await getProductById(id);
      if (prod) {
        setProduct(prod);
        setSelectedColor(prod.colors[0]);
        setSelectedSize(prod.sizes[0]);

        const allProducts = await getAllProducts();
        const related = allProducts
          .filter((p) => p.category === prod.category && p.id !== prod.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        productId: product.id,
        quantity,
        selectedColor,
        selectedSize,
        price: product.price,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--background)" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "var(--primary)", borderTopColor: "transparent" }}
          />
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Cargando producto...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-5"
        style={{ background: "var(--background)" }}
      >
        <svg
          className="w-14 h-14"
          style={{ color: "rgba(191,155,48,0.4)" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.25}
        >
          <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
        </svg>
        <div className="text-center">
          <h1 className="font-display font-bold text-2xl mb-2" style={{ color: "var(--foreground)" }}>
            Producto no encontrado
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            El producto que buscas no existe o fue removido.
          </p>
          <Link href="/shop" className="btn-primary">
            Volver a la Tienda
          </Link>
        </div>
      </div>
    );
  }

  const CATEGORY_LABELS: Record<string, string> = {
    dresses: "Vestidos",
    tops: "Tops",
    bottoms: "Pantalones",
    accessories: "Accesorios",
  };

  return (
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: "var(--text-muted)" }}>
          <Link href="/" style={{ color: "var(--primary)" }}>Inicio</Link>
          <span>/</span>
          <Link href="/shop" style={{ color: "var(--primary)" }}>Tienda</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} style={{ color: "var(--primary)" }}>
            {CATEGORY_LABELS[product.category] ?? product.category}
          </Link>
          <span>/</span>
          <span className="truncate max-w-[160px]">{product.name}</span>
        </nav>

        {/* Main grid */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-20">
          {/* Image */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: "3/4", background: "#f0ece6" }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {product.featured && (
              <span
                className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold rounded-full shadow"
                style={{ background: "var(--accent)", color: "white" }}
              >
                Destacado
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            {/* Title & category */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.25em] mb-2"
                style={{ color: "var(--primary)", opacity: 0.75 }}
              >
                {CATEGORY_LABELS[product.category] ?? product.category}
              </p>
              <h1
                className="font-display font-bold text-3xl md:text-4xl leading-tight"
                style={{ color: "var(--foreground)" }}
              >
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div
              className="flex items-baseline gap-3 py-4 border-y"
              style={{ borderColor: "var(--border)" }}
            >
              <span className="font-bold text-3xl" style={{ color: "var(--primary)" }}>
                {formatPrice(product.price)}
              </span>
              {product.stock && product.stock <= 5 && (
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(232,57,26,0.1)", color: "var(--error)" }}
                >
                  Solo {product.stock} disponibles
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {product.description}
            </p>

            {/* Color */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ color: "var(--text-muted)" }}>
                Color: <span style={{ color: "var(--primary)", textTransform: "none" }}>{selectedColor}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all border"
                    style={{
                      borderColor: selectedColor === color ? "var(--primary)" : "var(--border)",
                      background: selectedColor === color ? "rgba(191,155,48,0.1)" : "transparent",
                      color: selectedColor === color ? "var(--primary)" : "var(--foreground)",
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ color: "var(--text-muted)" }}>
                Talla: <span style={{ color: "var(--primary)", textTransform: "none" }}>{selectedSize}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="w-12 h-12 rounded-lg text-sm font-semibold transition-all border"
                    style={{
                      borderColor: selectedSize === size ? "var(--primary)" : "var(--border)",
                      background: selectedSize === size ? "rgba(191,155,48,0.1)" : "transparent",
                      color: selectedSize === size ? "var(--primary)" : "var(--foreground)",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ color: "var(--text-muted)" }}>
                Cantidad
              </p>
              <div
                className="inline-flex items-center rounded-xl border overflow-hidden"
                style={{ borderColor: "var(--border)" }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center text-lg font-medium transition-colors"
                  style={{ color: "var(--foreground)" }}
                >
                  −
                </button>
                <span
                  className="w-11 text-center text-sm font-bold border-x"
                  style={{ color: "var(--foreground)", borderColor: "var(--border)" }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 flex items-center justify-center text-lg font-medium transition-colors"
                  style={{ color: "var(--foreground)" }}
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="btn-accent w-full py-4 text-base"
                style={added ? { background: "var(--success)", color: "#1a4a2e" } : {}}
              >
                {added ? "✓ Agregado al Carrito" : "Agregar al Carrito"}
              </button>
              <Link href="/cart" className="btn-secondary w-full py-4 text-base text-center">
                Ver Carrito
              </Link>
            </div>

            {/* Trust signals */}
            <div
              className="flex flex-wrap gap-4 pt-2 border-t text-xs"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Envío gratis +₡50,000
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Devoluciones 30 días
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Pago seguro SSL
              </span>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-8">
              <h2
                className="font-display font-bold text-2xl md:text-3xl"
                style={{ color: "var(--foreground)" }}
              >
                También te puede gustar
              </h2>
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} showAddToCart={true} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
