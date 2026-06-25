import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import founder from "@/assets/owner.jpeg";
import { SITE } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-sm bg-gradient-gold opacity-15 blur-3xl" />
          <div className="tilt-card relative overflow-hidden rounded-sm hairline shadow-card [transform-style:preserve-3d]">
            <img
  src={founder}
  alt={SITE.founder}
  loading="lazy"
  width={1024}
  height={1024}
  className="aspect-[4/5] w-full object-cover"
/>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6 pt-24">
              <div className="eyebrow">{SITE.founderTitle}</div>
              <div className="mt-2 font-display text-2xl">Mr. {SITE.founder}</div>
            </div>
          </div>
        </div>

        <div>
          <span className="eyebrow">About the studio</span>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            A craftsman's eye, a contractor's discipline,
            <span className="text-gradient-gold"> a designer's heart.</span>
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            ANVITH i5 was founded with a single belief — luxury isn't loud, it's resolved.
            For {SITE.years}+ years, Bharath and his team have built interiors that ageing gracefully
            and furniture that becomes the heirloom. Every project runs through our own design studio
            and workshop in Whitefield, Bangalore.
          </p>

          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border/50 bg-border/50 sm:grid-cols-2">
            {[
              { t: "Mission", d: "Honest pricing, real craftsmanship, on-time handover — every single project." },
              { t: "Vision", d: "To be the most trusted bespoke interior studio in South India." },
            ].map((b) => (
              <div key={b.t} className="bg-card p-7">
                <div className="eyebrow">{b.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>

          <Link
            to="/about"
            className="group mt-10 inline-flex items-center gap-2 text-sm tracking-wide text-gold"
          >
            Read our story
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
