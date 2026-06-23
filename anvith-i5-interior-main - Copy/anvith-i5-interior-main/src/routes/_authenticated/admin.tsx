import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { LogOut, Trash2, CheckCircle2, Mail, Phone, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — ANVITH i5" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Enquiry = {
  id: string; name: string; email: string; phone: string;
  service: string | null; message: string; status: string; created_at: string;
};
type Project = {
  id: string; title: string; category: string; location: string | null;
  image_url: string; featured: boolean; published: boolean;
};

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState<"enquiries" | "projects">("enquiries");

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50">
        <div className="container-luxe flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-sm bg-gradient-gold font-display font-bold text-primary-foreground">A</span>
            <span className="font-display">Admin</span>
          </Link>
          <button onClick={signOut} className="inline-flex items-center gap-2 rounded-sm hairline px-4 py-2 text-xs">
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </header>

      <div className="container-luxe py-10">
        <div className="flex gap-2">
          {(["enquiries", "projects"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`rounded-sm px-4 py-2 text-xs uppercase tracking-[0.24em] ${tab === t ? "bg-gradient-gold text-primary-foreground" : "hairline text-muted-foreground"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "enquiries" ? <EnquiriesPanel /> : <ProjectsPanel />}
        </div>
      </div>
    </div>
  );
}

function EnquiriesPanel() {
  const qc = useQueryClient();
  const { data = [], isLoading } = useQuery({
    queryKey: ["enquiries"],
    queryFn: async () => {
      const { data, error } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Enquiry[];
    },
  });

  async function markDone(id: string) {
    const { error } = await supabase.from("enquiries").update({ status: "completed" }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Marked complete");
    qc.invalidateQueries({ queryKey: ["enquiries"] });
  }
  async function remove(id: string) {
    if (!confirm("Delete this enquiry?")) return;
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["enquiries"] });
  }

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (data.length === 0)
    return <p className="text-sm text-muted-foreground">No enquiries yet. They'll appear here when submitted.</p>;

  return (
    <div className="grid gap-4">
      {data.map((e) => (
        <article key={e.id} className="rounded-sm hairline bg-card p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="font-display text-lg">{e.name}</div>
              <div className="mt-1 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <a href={`mailto:${e.email}`} className="inline-flex items-center gap-1 hover:text-gold"><Mail className="h-3 w-3" />{e.email}</a>
                <a href={`tel:${e.phone}`} className="inline-flex items-center gap-1 hover:text-gold"><Phone className="h-3 w-3" />{e.phone}</a>
                {e.service && <span className="text-gold">{e.service}</span>}
                <span>{new Date(e.created_at).toLocaleString()}</span>
              </div>
            </div>
            <span className={`rounded-sm px-2 py-1 text-[0.62rem] uppercase tracking-[0.24em] ${e.status === "completed" ? "bg-gold/15 text-gold" : "hairline text-muted-foreground"}`}>
              {e.status}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-foreground/90">{e.message}</p>
          <div className="mt-5 flex gap-2">
            {e.status !== "completed" && (
              <button onClick={() => markDone(e.id)} className="inline-flex items-center gap-2 rounded-sm hairline px-3 py-2 text-xs hover:bg-gold/5">
                <CheckCircle2 className="h-3.5 w-3.5 text-gold" /> Mark done
              </button>
            )}
            <button onClick={() => remove(e.id)} className="inline-flex items-center gap-2 rounded-sm hairline px-3 py-2 text-xs hover:bg-destructive/10">
              <Trash2 className="h-3.5 w-3.5 text-destructive" /> Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

function ProjectsPanel() {
  const qc = useQueryClient();
  const [form, setForm] = useState({ title: "", category: "Home Interior", location: "", image_url: "" });
  const { data = [], isLoading } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Project[];
    },
  });

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.image_url) return toast.error("Title and image URL required");
    const { error } = await supabase.from("projects").insert(form);
    if (error) return toast.error(error.message);
    setForm({ title: "", category: "Home Interior", location: "", image_url: "" });
    toast.success("Project added");
    qc.invalidateQueries({ queryKey: ["admin-projects"] });
    qc.invalidateQueries({ queryKey: ["projects"] });
  }
  async function remove(id: string) {
    if (!confirm("Delete project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-projects"] });
    qc.invalidateQueries({ queryKey: ["projects"] });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
      <form onSubmit={add} className="glass h-fit rounded-sm p-6">
        <h3 className="font-display text-lg">Add project</h3>
        <div className="mt-4 space-y-3">
          {(["title", "category", "location", "image_url"] as const).map((k) => (
            <input
              key={k}
              required={k === "title" || k === "image_url"}
              placeholder={k.replace("_", " ")}
              value={form[k]}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              className="w-full rounded-sm border border-input bg-background/50 px-3 py-2 text-sm focus:border-gold outline-none"
            />
          ))}
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gradient-gold py-2.5 text-sm font-medium text-primary-foreground">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </form>

      <div className="grid gap-3">
        {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {data.map((p) => (
          <div key={p.id} className="flex gap-4 rounded-sm hairline bg-card p-3">
            <img src={p.image_url} alt={p.title} className="h-20 w-28 rounded-sm object-cover" loading="lazy" />
            <div className="flex-1">
              <div className="font-display">{p.title}</div>
              <div className="text-xs text-muted-foreground">{p.category} · {p.location}</div>
            </div>
            <button onClick={() => remove(p.id)} className="self-start rounded-sm hairline p-2 hover:bg-destructive/10">
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
