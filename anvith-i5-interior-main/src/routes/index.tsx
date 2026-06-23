import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { StatsBar } from "@/components/sections/StatsBar";
import { OurProjects } from "@/components/sections/OurProjects";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ANVITH i5 — Luxury Interior Designers, Whitefield Bangalore" },
      { name: "description", content: "Bespoke modular kitchens, turnkey home interiors and custom furniture. 16+ years, 150+ projects, 120+ happy clients across Bangalore." },
      { property: "og:title", content: "ANVITH i5 — Luxury Interior Designers" },
      { property: "og:description", content: "Bespoke interiors and custom furniture in Bangalore." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <StatsBar />
      <OurProjects />
      <Projects limit={6} showFilter={false} />
      <Testimonials />
      <Contact />
    </>
  );
}
