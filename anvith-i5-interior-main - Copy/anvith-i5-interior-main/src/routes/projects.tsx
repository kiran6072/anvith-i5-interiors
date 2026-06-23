import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/components/sections/Projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Portfolio — Interior Design Projects in Bangalore | ANVITH i5" },
      { name: "description", content: "Selected interior design projects: modular kitchens, luxury homes, commercial spaces and bespoke furniture by ANVITH i5." },
      { property: "og:title", content: "Portfolio — ANVITH i5" },
      { property: "og:description", content: "150+ delivered projects across Bangalore." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <>
      <section className="relative pt-40 pb-4">
        <div className="container-luxe">
          <span className="eyebrow">Selected work</span>
          <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            A portfolio that <span className="text-gradient-gold">speaks softly.</span>
          </h1>
        </div>
      </section>
      <Projects />
    </>
  );
}
