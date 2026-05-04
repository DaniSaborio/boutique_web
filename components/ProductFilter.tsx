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
    setPriceRange({ min: Math.floor(range.min), max: Math.ceil(range.max) });
  }, [products]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = {
      ...filters,
      category: e.target.value,
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      minPrice: Number(e.target.value),
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      maxPrice: Number(e.target.value),
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      search: e.target.value,
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      category: "",
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      search: "",
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <aside className="bg-card-bg border border-border rounded-lg p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-display text-foreground">
          Filters
        </h2>
        <button
          onClick={handleReset}
          className="text-sm text-primary hover:text-primary-hover transition"
        >
          Reset
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-foreground mb-2">
          Search
        </label>
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-foreground mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className="w-full"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Price Range
        </label>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-foreground/60">
              Min: ${filters.minPrice}
            </label>
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.minPrice}
              onChange={handleMinPriceChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-xs text-foreground/60">
              Max: ${filters.maxPrice}
            </label>
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.maxPrice}
              onChange={handleMaxPriceChange}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
