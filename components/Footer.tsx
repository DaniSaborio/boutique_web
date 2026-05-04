import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card-bg border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold font-display text-primary mb-4">
              StyleVault
            </h3>
            <p className="text-sm text-foreground/70">
              Discover curated fashion collections for modern style.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop?category=dresses" className="text-foreground/70 hover:text-primary transition">
                  Dresses
                </Link>
              </li>
              <li>
                <Link href="/shop?category=tops" className="text-foreground/70 hover:text-primary transition">
                  Tops
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bottoms" className="text-foreground/70 hover:text-primary transition">
                  Bottoms
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessories" className="text-foreground/70 hover:text-primary transition">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-foreground/70 hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/70 hover:text-primary transition">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-foreground/70 hover:text-primary transition">
                Instagram
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition">
                Facebook
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition">
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-foreground/70">
            © {currentYear} StyleVault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
