import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Project = {
  id: string;
  title: string;
  category: string;
  location: string | null;
  image_url: string;
  description: string | null;
};

async function fetchProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("id,title,category,location,image_url,description")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Failed to fetch projects:", error);
      return [];
    }
    return data ?? [];
  } catch (error) {
    console.error("Unexpected error fetching projects:", error);
    return [];
  }
}

export function Projects({ limit, showFilter = true }: { limit?: number; showFilter?: boolean }) {
  const { data: projects = [] } = useQuery({ queryKey: ["projects"], queryFn: fetchProjects });
  const [filter, setFilter] = useState<string>("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects],
  );

  const visible = useMemo(() => {
    const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);
    return limit ? list.slice(0, limit) : list;
  }, [projects, filter, limit]);

  return (
    <section id="projects" className="relative py-32">
      <div className="container-luxe">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Selected work</span>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              A portfolio that <span className="text-gradient-gold">speaks softly.</span>
            </h2>
          </div>
          {!limit && (
            <Link to="/projects" className="text-sm tracking-wide text-gold">
              All projects →
            </Link>
          )}
        </div>

        {showFilter && categories.length > 1 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-sm px-4 py-2 text-xs uppercase tracking-[0.24em] transition-all ${
                  filter === c
                    ? "bg-gradient-gold text-primary-foreground"
                    : "hairline text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <article
              key={p.id}
              className={`group relative overflow-hidden rounded-sm hairline bg-card transition-all duration-700 hover:-translate-y-1 ${
                i % 5 === 0 ? "lg:row-span-2" : ""
              }`}
            >
              <div className={`relative overflow-hidden ${i % 5 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                <img
                  src={p.image_url}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="text-[0.62rem] uppercase tracking-[0.28em] text-gold">{p.category}</div>
                <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
                {p.location && <p className="mt-1 text-xs text-muted-foreground">{p.location}</p>}
              </div>
              <ArrowUpRight className="absolute right-5 top-5 h-5 w-5 text-gold opacity-0 transition-opacity group-hover:opacity-100" />
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-12 text-center text-sm text-muted-foreground">Portfolio coming soon.</p>
        )}
      </div>
    </section>
  );
}
