import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

type ProjectItem = { id: string; image: string; alt: string };

// Add more entries here as new photos come in.
const TOTAL_PROJECTS = 65;

const PROJECTS: ProjectItem[] = Array.from(
  { length: TOTAL_PROJECTS },
  (_, index) => ({
    id: `project-${index + 1}`,
    image: `/${index + 1}.jpeg`,
    alt: `ANVITH i5 Interior Project ${index + 1}`,
  })
);

const STATS = [
  { value: `${PROJECTS.length}+`, label: "Projects Completed" },
  { value: "500+", label: "Happy Clients" },
  { value: "10+", label: "Years Experience" },
  { value: "100%", label: "Customized Designs" },
];

const PROJECTS_PER_PAGE = 12;

export function OurProjects() {
  const [displayCount, setDisplayCount] = useState(PROJECTS_PER_PAGE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleProjects = PROJECTS.slice(0, displayCount);
  const allLoaded = displayCount >= PROJECTS.length;
  const currentProject = lightboxIndex !== null ? visibleProjects[lightboxIndex] : null;

  const handleLoadMore = () =>
    setDisplayCount((prev) => Math.min(prev + PROJECTS_PER_PAGE, PROJECTS.length));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") {
        setLightboxIndex((c) => (c === null ? 0 : (c + 1) % visibleProjects.length));
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((c) =>
          c === null ? 0 : (c - 1 + visibleProjects.length) % visibleProjects.length,
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, visibleProjects.length]);

  return (
    <section id="our-projects" className="relative py-32">
      <div className="container-luxe">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Our Projects</span>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              Interior projects that balance{" "}
              <span className="text-gradient-gold">luxury and calm.</span>
            </h2>
          </div>
          <Link to="/projects" className="text-sm tracking-wide text-gold">
            View full portfolio →
          </Link>
        </div>

        <p className="mt-6 max-w-3xl text-muted-foreground">
          Explore a refined gallery of {PROJECTS.length}+ completed interiors, each crafted for
          comfort, clarity and custom luxury.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-sm hairline bg-card p-6 text-center"
            >
              <div className="font-display text-3xl text-gradient-gold">{stat.value}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {visibleProjects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="mb-4 inline-block w-full break-inside-avoid overflow-hidden rounded-[1.5rem] bg-card text-left shadow-luxe transition-all duration-500 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-gold">
                    ANVITH i5 Interior Project
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          {!allLoaded ? (
            <button
              type="button"
              onClick={handleLoadMore}
              className="rounded-sm bg-gradient-gold px-8 py-3 text-xs uppercase tracking-[0.28em] text-primary-foreground"
            >
              See More Projects
            </button>
          ) : (
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
              All Projects Loaded
            </p>
          )}
        </div>
      </div>

      {currentProject ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-background"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white transition hover:bg-white/10"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            <img
              src={currentProject.image}
              alt={currentProject.alt}
              className="max-h-[70vh] w-full object-contain"
            />

            <div className="flex items-center justify-between gap-4 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-gold">
                ANVITH i5 Interior Project
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((c) =>
                      c === null
                        ? 0
                        : (c - 1 + visibleProjects.length) % visibleProjects.length,
                    )
                  }
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                  aria-label="Previous image"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((c) =>
                      c === null ? 0 : (c + 1) % visibleProjects.length,
                    )
                  }
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                  aria-label="Next image"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <p className="border-t border-white/5 px-6 pb-6 pt-4 text-sm text-muted-foreground">
              A bespoke interior design project from ANVITH i5 studio in Whitefield, Bangalore.
              Crafted with precision, delivered with luxury.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
