"use client";

import Link from "next/link";
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
      <div className="card group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Image Container */}
        <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-lg">
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Badge */}
          {product.featured && (
            <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 text-xs font-bold rounded-full">
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
