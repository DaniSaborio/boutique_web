"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Logo } from "./Logo";

export const Header = () => {
  const { itemCount } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/shop", label: "Tienda" },
    { href: "/contact", label: "Contacto" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--border)",
        boxShadow: "0 1px 0 rgba(191,155,48,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{
                  color: isActive(href) ? "var(--primary)" : "var(--foreground)",
                  background: isActive(href)
                    ? "rgba(191,155,48,0.08)"
                    : "transparent",
                }}
              >
                {label}
                {isActive(href) && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{ background: "var(--primary)" }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
              style={{ color: "var(--foreground)" }}
              aria-label={`Carrito, ${itemCount} artículo${itemCount !== 1 ? "s" : ""}`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.75}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                  style={{ background: "var(--accent)" }}
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-lg transition-colors"
              style={{ color: "var(--foreground)" }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
        >
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: isActive(href) ? "var(--primary)" : "var(--foreground)",
                  background: isActive(href)
                    ? "rgba(191,155,48,0.08)"
                    : "transparent",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
