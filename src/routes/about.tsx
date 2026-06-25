import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/sections/About";
import { StatsBar } from "@/components/sections/StatsBar";
import { Testimonials } from "@/components/sections/Testimonials";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ANVITH i5 Interior & Furnitures" },
      { name: "description", content: `Meet Bharath D N, founder of ANVITH i5 — ${SITE.years}+ years of bespoke interior design in Bangalore.` },
      { property: "og:title", content: "About ANVITH i5" },
      { property: "og:description", content: "Our story, mission and the people behind the studio." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative pt-40 pb-16">
        <div className="container-luxe">
          <span className="eyebrow">Our story</span>
          <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            Sixteen years of <span className="text-gradient-gold">quiet craftsmanship.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Founded by Mr. {SITE.founder}, ANVITH i5 has grown from a small Whitefield workshop into a
            full-service interior studio trusted by homeowners, founders and restaurateurs across Bangalore.
          </p>
        </div>
      </section>
      <About />
      <StatsBar />
      <Testimonials />
    </>
  );
}
