"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilter } from "@/components/ProductFilter";
import { Product } from "@/lib/types";
import { filterProducts, getAllProducts } from "@/lib/utils";
import Link from "next/link";

interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  search: string;
}

export default function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    category: searchParams.category || "",
    minPrice: 0,
    maxPrice: 1000,
    search: "",
  });

  useEffect(() => {
    const loadProducts = async () => {
      const prods = await getAllProducts();
      setProducts(prods);
      applyFilters(prods, { ...filters, category: searchParams.category || "" });
    };
    loadProducts();
  }, [searchParams.category]);

  const applyFilters = (prods: Product[], newFilters: FilterState) => {
    const result = filterProducts(prods, newFilters);
    setFiltered(result);
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-2">
            Shop Our Collection
          </h1>
          <p className="text-lg text-foreground/70">
            Explore {filtered.length} products
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filter */}
          <div className="lg:col-span-1">
            <ProductFilter
              products={products}
              onFilter={(newFilters) => applyFilters(products, newFilters)}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filtered.length === 0 ? (
              <div className="card text-center py-16">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  No products found
                </h2>
                <p className="text-foreground/70 mb-6">
                  Try adjusting your filters
                </p>
                <button
                  onClick={() =>
                    applyFilters(products, {
                      category: "",
                      minPrice: 0,
                      maxPrice: 1000,
                      search: "",
                    })
                  }
                  className="btn-primary inline-block"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showAddToCart={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
