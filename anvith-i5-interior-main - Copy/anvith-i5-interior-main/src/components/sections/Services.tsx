import { ChefHat, Home, Building2, Armchair, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/site";
import { Link } from "@tanstack/react-router";

const ICONS = [ChefHat, Home, Building2, Armchair];

export function Services() {
  return (
    <section id="services" className="relative py-32">
      <div className="absolute inset-x-0 top-1/2 -z-10 h-[60%] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.12_80/0.08),transparent_70%)]" />
      <div className="container-luxe">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">What we craft</span>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              Four practices, <span className="text-gradient-gold">one studio.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Design, project management and manufacturing under one roof — so quality, timeline and cost stay aligned.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <article
                key={s.slug}
                className="group relative overflow-hidden rounded-sm hairline bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-gold opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-25" />
                <div className="grid h-14 w-14 place-items-center rounded-sm hairline bg-background/60 text-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>
                <ul className="mt-5 space-y-2 text-xs text-muted-foreground">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 before:h-px before:w-4 before:bg-gold">
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-gold"
                >
                  Enquire
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
