"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { getCategories, getPrice } from "@/lib/utils";

interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  search: string;
}

interface ProductFilterProps {
  products: Product[];
  onFilter: (filters: FilterState) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  dresses: "Vestidos",
  tops: "Tops",
  bottoms: "Pantalones",
  accessories: "Accesorios",
};

export const ProductFilter: React.FC<ProductFilterProps> = ({
  products,
  onFilter,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    minPrice: 0,
    maxPrice: 1000,
    search: "",
  });

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };
    loadCategories();

    const range = getPrice(products);
    const min = Math.floor(range.min);
    const max = Math.ceil(range.max);
    setPriceRange({ min, max });
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  }, [products]);

  const update = (partial: Partial<FilterState>) => {
    const next = { ...filters, ...partial };
    setFilters(next);
    onFilter(next);
  };

  const handleReset = () => {
    const reset: FilterState = {
      category: "",
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      search: "",
    };
    setFilters(reset);
    onFilter(reset);
  };

  const hasActiveFilters =
    filters.category !== "" ||
    filters.search !== "" ||
    filters.minPrice > priceRange.min ||
    filters.maxPrice < priceRange.max;

  return (
    <aside
      className="rounded-xl border p-5 h-fit sticky top-24"
      style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2
          className="font-display font-semibold text-base"
          style={{ color: "var(--foreground)" }}
        >
          Filtros
        </h2>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-xs font-semibold px-2.5 py-1 rounded-md transition-colors"
            style={{
              color: "var(--primary)",
              background: "rgba(191,155,48,0.1)",
            }}
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-5">
        <label
          className="block text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: "var(--text-muted)" }}
        >
          Buscar
        </label>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            style={{ color: "var(--text-muted)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            className="pl-9"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t mb-5" style={{ borderColor: "var(--border)" }} />

      {/* Category */}
      <div className="mb-5">
        <label
          className="block text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: "var(--text-muted)" }}
        >
          Categoría
        </label>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => update({ category: "" })}
            className="text-left text-sm px-3 py-2 rounded-lg transition-colors font-medium"
            style={{
              background:
                filters.category === ""
                  ? "rgba(191,155,48,0.12)"
                  : "transparent",
              color:
                filters.category === ""
                  ? "var(--primary)"
                  : "var(--foreground)",
            }}
          >
            Todas las categorías
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => update({ category: cat })}
              className="text-left text-sm px-3 py-2 rounded-lg transition-colors font-medium"
              style={{
                background:
                  filters.category === cat
                    ? "rgba(191,155,48,0.12)"
                    : "transparent",
                color:
                  filters.category === cat
                    ? "var(--primary)"
                    : "var(--foreground)",
              }}
            >
              {CATEGORY_LABELS[cat] ?? cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t mb-5" style={{ borderColor: "var(--border)" }} />

      {/* Price Range */}
      <div>
        <label
          className="block text-xs font-semibold uppercase tracking-wider mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          Precio
        </label>

        <div className="flex justify-between text-sm font-semibold mb-3"
          style={{ color: "var(--primary)" }}>
          <span>₡{filters.minPrice.toLocaleString()}</span>
          <span>₡{filters.maxPrice.toLocaleString()}</span>
        </div>

        <div className="space-y-4">
          <div>
            <label
              className="text-xs mb-1.5 block"
              style={{ color: "var(--text-muted)" }}
            >
              Mínimo
            </label>
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              step={500}
              value={filters.minPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val <= filters.maxPrice) update({ minPrice: val });
              }}
            />
          </div>
          <div>
            <label
              className="text-xs mb-1.5 block"
              style={{ color: "var(--text-muted)" }}
            >
              Máximo
            </label>
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              step={500}
              value={filters.maxPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= filters.minPrice) update({ maxPrice: val });
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
