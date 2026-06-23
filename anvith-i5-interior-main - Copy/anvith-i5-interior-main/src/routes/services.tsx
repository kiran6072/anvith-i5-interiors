import { createFileRoute } from "@tanstack/react-router";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Modular Kitchens, Home & Commercial Interiors | ANVITH i5" },
      { name: "description", content: "Modular kitchens, turnkey home interiors, commercial fit-outs and bespoke furniture in Bangalore." },
      { property: "og:title", content: "Services — ANVITH i5" },
      { property: "og:description", content: "Four practices, one studio. Design, project management and manufacturing in Bangalore." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="relative pt-40 pb-8">
        <div className="container-luxe">
          <span className="eyebrow">What we do</span>
          <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            Four practices. <span className="text-gradient-gold">One studio.</span>
          </h1>
        </div>
      </section>
      <Services />
      <Contact />
    </>
  );
}
