"use client";

import { useState, useEffect, use } from "react";
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

const CATEGORY_LABELS: Record<string, string> = {
  dresses: "Vestidos",
  tops: "Tops",
  bottoms: "Pantalones",
  accessories: "Accesorios",
};

export default function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = use(searchParams);
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    category: category || "",
    minPrice: 0,
    maxPrice: 1000,
    search: "",
  });

  useEffect(() => {
    const loadProducts = async () => {
      const prods = await getAllProducts();
      setProducts(prods);
      applyFilters(prods, { ...filters, category: category || "" });
    };
    loadProducts();
  }, [category]);

  const applyFilters = (prods: Product[], newFilters: FilterState) => {
    const result = filterProducts(prods, newFilters);
    setFiltered(result);
    setFilters(newFilters);
  };

  const activeCategory = CATEGORY_LABELS[filters.category] ?? null;

  return (
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>
      {/* Page header */}
      <div
        className="border-b"
        style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-2 text-sm mb-3"
            style={{ color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--primary)" }}>Inicio</Link>
            <span>/</span>
            <span>Tienda</span>
            {activeCategory && (
              <>
                <span>/</span>
                <span>{activeCategory}</span>
              </>
            )}
          </div>
          <h1
            className="font-display font-bold text-3xl md:text-4xl"
            style={{ color: "var(--foreground)" }}
          >
            {activeCategory ?? "Toda la Colección"}
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
            {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilter
              products={products}
              onFilter={(newFilters) => applyFilters(products, newFilters)}
            />
          </div>

          {/* Grid */}
          <div className="lg:col-span-3">
            {filtered.length === 0 ? (
              <div
                className="rounded-xl border text-center py-20"
                style={{
                  background: "var(--card-bg)",
                  borderColor: "var(--border)",
                }}
              >
                <svg
                  className="w-12 h-12 mx-auto mb-4"
                  style={{ color: "rgba(191,155,48,0.4)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 16.803z" />
                </svg>
                <h2
                  className="font-display font-semibold text-xl mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  Sin resultados
                </h2>
                <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
                  Prueba ajustando los filtros de búsqueda.
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
                  className="btn-primary"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
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
