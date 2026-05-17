import Link from "next/link";

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t mt-auto"
      style={{ background: "#141414", borderColor: "rgba(245,240,228,0.08)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--primary)" }}
              >
                <span className="font-display text-sm font-bold text-white leading-none">MB</span>
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className="font-display text-base font-bold text-white tracking-tight">Marilyn</span>
                <span className="text-[10px] uppercase font-medium" style={{ color: "var(--primary)", letterSpacing: "0.18em" }}>Boutique</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(245,239,230,0.5)" }}>
              Elegancia curada para la mujer moderna. Piezas atemporales que celebran la sofisticación.
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-5">
              {[
                { icon: <InstagramIcon />, label: "Instagram" },
                { icon: <FacebookIcon />, label: "Facebook" },
                { icon: <TwitterIcon />, label: "Twitter" },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                  style={{
                    background: "rgba(245,239,230,0.08)",
                    color: "rgba(245,239,230,0.55)",
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white">Tienda</h4>
            <ul className="space-y-3">
              {[
                { href: "/shop?category=dresses", label: "Vestidos" },
                { href: "/shop?category=tops", label: "Tops" },
                { href: "/shop?category=bottoms", label: "Pantalones" },
                { href: "/shop?category=accessories", label: "Accesorios" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm transition-colors"
                    style={{ color: "rgba(245,239,230,0.5)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white">Empresa</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Inicio" },
                { href: "/contact", label: "Contacto" },
                { href: "#", label: "Política de Privacidad" },
                { href: "#", label: "Términos de Servicio" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm transition-colors"
                    style={{ color: "rgba(245,239,230,0.5)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white">Contacto</h4>
            <ul className="space-y-3">
              <li className="text-sm" style={{ color: "rgba(245,239,230,0.5)" }}>
                hola@marilynboutique.com
              </li>
              <li className="text-sm" style={{ color: "rgba(245,239,230,0.5)" }}>
                +506 2234-5678
              </li>
              <li className="text-sm" style={{ color: "rgba(245,239,230,0.5)" }}>
                Av. Central, San José, CR
              </li>
              <li className="text-sm" style={{ color: "rgba(245,239,230,0.5)" }}>
                Lun–Sáb, 9am – 6pm
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "rgba(245,240,228,0.08)" }}
        >
          <p className="text-xs" style={{ color: "rgba(245,239,230,0.35)" }}>
            © {currentYear} Marilyn Boutique. Todos los derechos reservados.
          </p>
          <p className="text-xs" style={{ color: "rgba(245,239,230,0.35)" }}>
            La elegancia es una elección.
          </p>
        </div>
      </div>
    </footer>
  );
};
