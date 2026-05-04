import { Product, Cart, CartItem } from "./types";

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const formatPriceRaw = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const calculateCartTotals = (items: CartItem[], products: Product[]): { subtotal: number; tax: number; total: number } => {
  const subtotal = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return { subtotal, tax, total };
};

export const filterProducts = (
  products: Product[],
  filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }
): Product[] => {
  return products.filter((product) => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    if (
      filters.minPrice !== undefined &&
      product.price < filters.minPrice
    ) {
      return false;
    }

    if (
      filters.maxPrice !== undefined &&
      product.price > filters.maxPrice
    ) {
      return false;
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(searchLower);
      const matchesDescription = product.description
        .toLowerCase()
        .includes(searchLower);

      if (!matchesName && !matchesDescription) {
        return false;
      }
    }

    return true;
  });
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch("/data/products.json");
    const products: Product[] = await response.json();
    return products.find((p) => p.id === id) || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch("/data/products.json", { cache: "no-store" });
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  const products = await getAllProducts();
  return products.filter((p) => p.category === category);
};

export const getFeaturedProducts = async (limit: number = 6): Promise<Product[]> => {
  const products = await getAllProducts();
  return products.filter((p) => p.featured).slice(0, limit);
};

export const getCategories = async (): Promise<string[]> => {
  const products = await getAllProducts();
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories).sort();
};

export const getPrice = (products: Product[]): { min: number; max: number } => {
  if (products.length === 0) {
    return { min: 0, max: 0 };
  }

  const prices = products.map((p) => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};
