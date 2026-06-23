import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-sm bg-gradient-gold font-display text-lg font-bold text-primary-foreground shadow-luxe">
            A
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-wide">
              ANVITH <span className="text-gradient-gold">i5</span>
            </span>
            <span className="text-[0.62rem] uppercase tracking-[0.32em] text-muted-foreground">
              Interior & Furnitures
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`group relative text-sm tracking-wide transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gradient-gold transition-all duration-500 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex">
          <a
            href={`tel:${SITE.phone}`}
            className="rounded-sm bg-gradient-gold px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-luxe transition-transform hover:-translate-y-0.5"
          >
            {SITE.phone}
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-sm hairline md:hidden"
        >
          {open ? <X className="h-5 w-5 text-gold" /> : <Menu className="h-5 w-5 text-gold" />}
        </button>
      </div>

      {/* mobile */}
      {open && (
        <div className="border-t border-border/50 glass md:hidden">
          <nav className="container-luxe flex flex-col py-6">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="border-b border-border/30 py-4 text-sm tracking-wide text-foreground/90"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={`tel:${SITE.phone}`}
              className="mt-6 rounded-sm bg-gradient-gold px-5 py-3 text-center text-sm font-medium text-primary-foreground"
            >
              Call {SITE.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
