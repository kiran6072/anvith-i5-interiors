import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

function useCounter(target: number, start: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { v: useCounter(SITE.projects, inView), s: "+", l: "Projects Delivered" },
    { v: useCounter(SITE.years, inView), s: "+", l: "Years of Craft" },
    { v: useCounter(SITE.clients, inView), s: "+", l: "Happy Clients" },
    { v: useCounter(SITE.satisfaction, inView), s: "%", l: "Satisfaction" },
  ];

  return (
    <section ref={ref} className="relative py-24">
      <div className="container-luxe">
        <div className="grid gap-px overflow-hidden rounded-sm border border-border/50 bg-border/40 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="bg-card px-8 py-12">
              <div className="font-display text-5xl text-gradient-gold md:text-6xl">
                {s.v}<span>{s.s}</span>
              </div>
              <div className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
