"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

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
    <Link href={`/shop/${product.id}`}>
      <div className="card group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badge */}
          {product.featured && (
            <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition">
            {product.name}
          </h3>

          <p className="text-sm text-foreground/60 mt-2 line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Colors */}
          <div className="flex gap-2 mt-3">
            {product.colors.slice(0, 3).map((color, idx) => (
              <div
                key={idx}
                className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                title={color}
              />
            ))}
          </div>

          {/* Add to Cart Button */}
          {showAddToCart && (
            <button
              onClick={handleAddToCart}
              className="btn-primary w-full mt-4"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};
