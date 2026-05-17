"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

const COLOR_MAP: Record<string, string> = {
  "Negro": "#1c1c1c",
  "Blanco": "#f0ece6",
  "Azul Marino": "#1e3a5f",
  "Azul Cielo": "#87ceeb",
  "Azul": "#3b82f6",
  "Rosa": "#f9a8c9",
  "Rosa Pastel": "#f9ccd3",
  "Rojo": "#dc2626",
  "Verde": "#16a34a",
  "Verde Olivo": "#6b7c45",
  "Gris": "#9ca3af",
  "Beige": "#e8d5b7",
  "Café": "#8b4513",
  "Floral": "#e8cfc8",
  "Crema": "#fdf5e6",
  "Nude": "#e3bc9a",
  "Naranja": "#f97316",
  "Coral": "#ff7f7f",
  "Morado": "#7c3aed",
  "Lavanda": "#c4b5fd",
  "Amarillo": "#fbbf24",
  "Dorado": "#d4af37",
  "Plateado": "#c0c0c0",
};

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showAddToCart = false,
}) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      quantity: 1,
      selectedColor: product.colors[0],
      selectedSize: product.sizes[0],
      price: product.price,
    });
  };

  return (
    <Link href={`/${product.id}`}>
      <article
        className="group cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--border)",
        }}
      >
        {/* Full-bleed image */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "3/4", background: "#f0ece6" }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Overlay with add-to-cart on mobile / desktop */}
          {showAddToCart && (
            <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              style={{
                background: "linear-gradient(to top, rgba(43,43,43,0.7) 0%, transparent 100%)",
              }}
            >
              <button
                onClick={handleAddToCart}
                className="w-full py-2.5 rounded-lg text-sm font-semibold transition-colors"
                style={{
                  background: "white",
                  color: "var(--primary)",
                }}
              >
                Agregar al Carrito
              </button>
            </div>
          )}

          {/* Badge */}
          {product.featured && (
            <span
              className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold rounded-full shadow"
              style={{ background: "var(--accent)", color: "white" }}
            >
              Destacado
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-3.5">
          <p
            className="text-[10px] font-semibold uppercase tracking-widest mb-1"
            style={{ color: "var(--primary)", opacity: 0.7 }}
          >
            {product.category}
          </p>
          <h3
            className="text-sm font-semibold line-clamp-2 leading-snug transition-colors group-hover:text-primary"
            style={{ color: "var(--foreground)" }}
          >
            {product.name}
          </h3>

          <div className="flex items-center justify-between mt-3">
            <span
              className="text-base font-bold"
              style={{ color: "var(--primary)" }}
            >
              {formatPrice(product.price)}
            </span>

            {product.colors.length > 0 && (
              <div className="flex gap-1.5">
                {product.colors.slice(0, 4).map((color, idx) => (
                  <span
                    key={idx}
                    className="w-3.5 h-3.5 rounded-full shadow-sm flex-shrink-0"
                    style={{
                      backgroundColor: COLOR_MAP[color] ?? "#d4c4bc",
                      border: "1.5px solid rgba(0,0,0,0.08)",
                    }}
                    title={color}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Static cart button (visible on touch devices) */}
          {showAddToCart && (
            <button
              onClick={handleAddToCart}
              className="md:hidden w-full mt-3 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              style={{
                background: "var(--primary)",
                color: "white",
              }}
            >
              Agregar al Carrito
            </button>
          )}
        </div>
      </article>
    </Link>
  );
};
