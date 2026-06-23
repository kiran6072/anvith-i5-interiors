import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

type ProjectItem = {
  id: string;
  image: string;
  alt: string;
};

const PROJECTS: ProjectItem[] = Array.from({ length: 65 }, (_, index) => {
  const number = index + 1;
  return {
    id: `project-${number}`,
    alt: `ANVITH i5 Interior Project ${number} in Bangalore`,
    image: `/projects/${number}.jpeg`,
  };
});

const STATS = [
  { value: "65+", label: "Projects Completed" },
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

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + PROJECTS_PER_PAGE, PROJECTS.length));
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) => {
          if (current === null) return 0;
          return (current + 1) % visibleProjects.length;
        });
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => {
          if (current === null) return 0;
          return (current - 1 + visibleProjects.length) % visibleProjects.length;
        });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, visibleProjects.length]);

  return (
    <section id="our-projects" className="relative py-32 scroll-mt-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.10),transparent_55%)]" />
      <div className="container-luxe">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Our Projects</span>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              Interior projects that balance <span className="text-gradient-gold">luxury and calm.</span>
            </h2>
          </div>
          <Link to="/projects" className="text-sm tracking-wide text-gold">
            View full portfolio →
          </Link>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Explore a refined gallery of 65+ completed interiors, each crafted for comfort, clarity and custom luxury.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.5rem] border border-border/50 bg-[#0d0b0a] p-8 shadow-luxe transition-all duration-500 hover:-translate-y-1"
            >
              <div className="text-3xl font-bold text-foreground md:text-4xl">{stat.value}</div>
              <div className="mt-3 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 columns-2 gap-4 md:columns-3 xl:columns-4">
          {visibleProjects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="mb-4 inline-block w-full break-inside-avoid overflow-hidden rounded-[1.5rem] bg-card text-left shadow-luxe transition-all duration-500 hover:-translate-y-1"
            >
              <div className="group relative overflow-hidden rounded-[1.5rem]">
                <img
                  src={project.image}
                  alt={project.alt}
                  loading="lazy"
                  className="h-full w-full min-h-[260px] object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute inset-x-0 bottom-0 p-5 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="text-sm font-semibold leading-tight text-gold">ANVITH i5 Interior Project</h3>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          {!allLoaded ? (
            <button
              type="button"
              onClick={handleLoadMore}
              className="rounded-[1.5rem] border border-gold bg-gold/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-gold shadow-luxe transition-all duration-300 hover:bg-gold/20 hover:-translate-y-1"
            >
              See More Projects
            </button>
          ) : (
            <p className="text-sm uppercase tracking-[0.28em] text-gold">All Projects Loaded</p>
          )}
        </div>
      </div>

      {currentProject ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Project lightbox"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-[1100px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#090707] shadow-2xl"
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
              loading="lazy"
              className="h-[70vh] w-full object-cover"
            />
            <div className="border-t border-white/10 bg-[#090707] p-6 text-white">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gold">ANVITH i5 Interior Project</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((current) =>
                        current === null ? 0 : (current - 1 + visibleProjects.length) % visibleProjects.length,
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
                      setLightboxIndex((current) =>
                        current === null ? 0 : (current + 1) % visibleProjects.length,
                      )
                    }
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                    aria-label="Next image"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                A bespoke interior design project from ANVITH i5 studio in Whitefield, Bangalore. Crafted with precision, delivered with luxury.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
