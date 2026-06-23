import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, PhoneCall } from "lucide-react";
import heroImg from "@/assets/hero-interior.jpg";
import { SITE } from "@/lib/site";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setParallax({ x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section ref={ref} className="relative isolate min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          transform: `scale(1.08) translate(${parallax.x * -14}px, ${parallax.y * -14}px)`,
          transition: "transform 200ms ease-out",
        }}
      >
        <img
          src={heroImg}
          alt="Luxury interior with gold accents"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-overlay" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.78_0.12_80/0.15),transparent_60%)]" />

      {/* Floating gold orb */}
      <div
        className="pointer-events-none absolute right-[8%] top-[18%] -z-10 h-72 w-72 rounded-full bg-gradient-gold opacity-20 blur-3xl"
        style={{ transform: `translate(${parallax.x * 24}px, ${parallax.y * 24}px)` }}
      />

      <div className="container-luxe relative flex min-h-screen flex-col justify-center pt-32 pb-24">
        <span className="eyebrow animate-fade-up">{SITE.years}+ Years · Whitefield, Bangalore</span>

        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem] animate-fade-up delay-100">
          Interiors that whisper
          <br />
          <span className="text-gradient-gold italic">luxury</span>, built to last
          <span className="text-gradient-gold">.</span>
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg animate-fade-up delay-200">
          {SITE.name}. Bespoke modular kitchens, turnkey home interiors and custom furniture —
          designed and crafted under one roof by Mr. {SITE.founder}.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up delay-300">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 rounded-sm bg-gradient-gold px-7 py-4 text-sm font-medium tracking-wide text-primary-foreground shadow-luxe transition-transform hover:-translate-y-0.5"
          >
            Start your project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={`tel:${SITE.phone}`}
            className="inline-flex items-center gap-3 rounded-sm hairline px-7 py-4 text-sm tracking-wide text-foreground transition-colors hover:bg-gold/5"
          >
            <PhoneCall className="h-4 w-4 text-gold" />
            {SITE.phone}
          </a>
        </div>

        {/* Stats strip */}
        <div className="mt-20 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-sm border border-border/40 bg-border/40 animate-fade-up delay-500">
          {[
            { v: `${SITE.projects}+`, l: "Projects" },
            { v: `${SITE.years}+`, l: "Years" },
            { v: `${SITE.clients}+`, l: "Clients" },
          ].map((s) => (
            <div key={s.l} className="bg-background/70 px-6 py-5 backdrop-blur">
              <div className="font-display text-3xl text-gradient-gold">{s.v}</div>
              <div className="mt-1 text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* scroll indicator */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
        scroll
      </div>
    </section>
  );
}
