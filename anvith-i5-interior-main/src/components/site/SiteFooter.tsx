import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Instagram, Facebook, Linkedin } from "lucide-react";
import { NAV, SERVICES, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-border/50 bg-gradient-onyx">
      <div className="container-luxe grid gap-12 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-sm bg-gradient-gold font-display text-lg font-bold text-primary-foreground">
              A
            </span>
            <span className="font-display text-xl">
              ANVITH <span className="text-gradient-gold">i5</span>
            </span>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            A boutique interior & furniture studio led by {SITE.founder}.
            {" "}{SITE.years}+ years of crafting homes, offices and bespoke pieces across Bangalore.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-sm hairline text-gold transition-colors hover:bg-gold/10"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Navigate</h4>
          <ul className="space-y-3 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-muted-foreground transition-colors hover:text-gold">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <h4 className="eyebrow mt-8 mb-5">Services</h4>
          <ul className="space-y-3 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug} className="text-muted-foreground">{s.title}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Contact</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{SITE.location}</li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={`tel:${SITE.phone}`} className="hover:text-gold">{SITE.phone}</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={`mailto:${SITE.email}`} className="hover:text-gold break-all">{SITE.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/30">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <span>Designed with intent in Bangalore.</span>
        </div>
      </div>
    </footer>
  );
}
