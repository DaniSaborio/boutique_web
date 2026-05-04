"use client";

import { use, useState, useEffect } from "react";
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
      alert("✓ Added to cart!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-foreground/70">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Product not found
        </h1>
        <Link href="/shop" className="btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm">
          <Link href="/shop" className="text-primary hover:text-primary-hover">
            Shop
          </Link>
          <span className="text-foreground/50">/</span>
          <span className="text-foreground/70">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-2xl aspect-square flex items-center justify-center">
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

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold font-display text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-foreground/70">{product.category}</p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
            </div>

            <p className="text-base text-foreground/70 leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Color: <span className="text-primary">{selectedColor}</span>
              </label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded border-2 font-medium transition ${
                      selectedColor === color
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-foreground hover:border-primary"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Size: <span className="text-primary">{selectedSize}</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border-2 font-medium transition ${
                      selectedSize === size
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-foreground hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="btn-accent w-full py-3"
            >
              Add to Cart
            </button>

            {/* Continue Shopping */}
            <Link href="/shop" className="btn-secondary w-full text-center block py-3">
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold font-display text-foreground mb-8">
              Related Products
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
