"use client";

import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";

interface CartDisplayProps {
  products: Product[];
}

export const CartDisplay: React.FC<CartDisplayProps> = ({ products }) => {
  const { items, removeItem, updateQuantity, subtotal, tax, total } = useCart();

  if (items.length === 0) {
    return (
      <div
        className="rounded-xl border text-center py-24"
        style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
      >
        <svg
          className="w-14 h-14 mx-auto mb-5"
          style={{ color: "rgba(191,155,48,0.35)" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.25}
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h2
          className="font-display font-semibold text-xl mb-2"
          style={{ color: "var(--foreground)" }}
        >
          Tu carrito está vacío
        </h2>
        <p className="text-sm mb-7" style={{ color: "var(--text-muted)" }}>
          Explora nuestra colección y encuentra algo que te encante.
        </p>
        <Link href="/shop" className="btn-primary">
          Ir a la Tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      {/* Items */}
      <div className="lg:col-span-2 space-y-3">
        {items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;

          return (
            <div
              key={item.productId}
              className="rounded-xl border p-4 flex gap-4"
              style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
            >
              {/* Image placeholder */}
              <div
                className="w-20 h-24 rounded-lg flex-shrink-0 overflow-hidden"
                style={{ background: "rgba(191,155,48,0.1)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div className="min-w-0">
                    <h3
                      className="font-semibold text-sm truncate"
                      style={{ color: "var(--foreground)" }}
                    >
                      {product.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {item.selectedColor && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(191,155,48,0.1)",
                            color: "var(--primary)",
                          }}
                        >
                          {item.selectedColor}
                        </span>
                      )}
                      {item.selectedSize && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(191,155,48,0.1)",
                            color: "var(--primary)",
                          }}
                        >
                          Talla {item.selectedSize}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    className="text-sm font-bold flex-shrink-0"
                    style={{ color: "var(--primary)" }}
                  >
                    {formatPrice(product.price * item.quantity)}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity */}
                  <div
                    className="flex items-center rounded-lg overflow-hidden border"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-lg font-medium transition-colors hover:bg-gray-50"
                      style={{ color: "var(--foreground)" }}
                      aria-label="Quitar uno"
                    >
                      −
                    </button>
                    <span
                      className="w-8 text-center text-sm font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-lg font-medium transition-colors hover:bg-gray-50"
                      style={{ color: "var(--foreground)" }}
                      aria-label="Agregar uno"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="flex items-center gap-1 text-xs font-medium transition-colors hover:opacity-70"
                    style={{ color: "var(--error)" }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-sm font-medium mt-2 transition-colors"
          style={{ color: "var(--primary)" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Seguir Comprando
        </Link>
      </div>

      {/* Summary */}
      <div
        className="rounded-xl border p-5 sticky top-24"
        style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
      >
        <h2
          className="font-display font-semibold text-lg mb-5"
          style={{ color: "var(--foreground)" }}
        >
          Resumen del Pedido
        </h2>

        <div className="space-y-3 mb-5">
          <div className="flex justify-between text-sm">
            <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
            <span className="font-medium" style={{ color: "var(--foreground)" }}>
              {formatPrice(subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: "var(--text-muted)" }}>Impuesto (8%)</span>
            <span className="font-medium" style={{ color: "var(--foreground)" }}>
              {formatPrice(tax)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: "var(--text-muted)" }}>Envío</span>
            <span className="font-medium" style={{ color: "var(--success)" }}>
              Gratis
            </span>
          </div>
        </div>

        <div
          className="border-t pt-4 mb-6"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex justify-between items-center">
            <span
              className="font-semibold text-base"
              style={{ color: "var(--foreground)" }}
            >
              Total
            </span>
            <span
              className="font-bold text-xl"
              style={{ color: "var(--primary)" }}
            >
              {formatPrice(total)}
            </span>
          </div>
        </div>

        <button
          className="btn-accent w-full"
          onClick={() =>
            alert("¡Gracias por tu pedido!\n\nEsto es una demo. La integración de pago llegará pronto.")
          }
        >
          Proceder al Pago
        </button>

        <div className="flex items-center justify-center gap-2 mt-4">
          <svg className="w-4 h-4" style={{ color: "var(--text-muted)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Pago 100% seguro y encriptado
          </p>
        </div>
      </div>
    </div>
  );
};
