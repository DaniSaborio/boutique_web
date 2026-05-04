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
      <div className="card text-center py-16">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Your cart is empty
        </h2>
        <p className="text-foreground/70 mb-6">
          Start shopping to add items to your cart.
        </p>
        <Link href="/shop" className="btn-primary inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cart Items */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-foreground">
                Product
              </th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">
                Price
              </th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">
                Quantity
              </th>
              <th className="text-right py-3 px-4 font-semibold text-foreground">
                Total
              </th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;

              return (
                <tr key={item.productId} className="border-b border-border">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-foreground">
                        {product.name}
                      </p>
                      {item.selectedColor && (
                        <p className="text-sm text-foreground/60">
                          Color: {item.selectedColor}
                        </p>
                      )}
                      {item.selectedSize && (
                        <p className="text-sm text-foreground/60">
                          Size: {item.selectedSize}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {formatPrice(product.price)}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-semibold text-foreground">
                    {formatPrice(product.price * item.quantity)}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-error hover:text-red-700 transition text-sm font-semibold"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Cart Summary */}
      <div className="card bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-foreground/70">Subtotal:</span>
            <span className="font-semibold text-foreground">
              {formatPrice(subtotal)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground/70">Tax (8%):</span>
            <span className="font-semibold text-foreground">
              {formatPrice(tax)}
            </span>
          </div>
          <div className="border-t border-primary/20 pt-3 flex justify-between items-center">
            <span className="text-lg font-bold text-foreground">Total:</span>
            <span className="text-xl font-bold text-primary">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          className="btn-accent w-full mt-6"
          onClick={() =>
            alert("✅ Thank you for your order!\n\nThis is a demo. Payment integration coming soon!")
          }
        >
          Proceed to Checkout
        </button>

        {/* Continue Shopping */}
        <Link href="/shop" className="btn-secondary w-full mt-2 text-center block">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};
