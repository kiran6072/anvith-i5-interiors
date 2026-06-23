import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SERVICES, SITE } from "@/lib/site";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  service: z.string().max(80).optional(),
  message: z.string().trim().min(10, "Tell us a little more").max(1500),
});

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const { error } = await supabase.from("enquiries").insert(parsed.data);
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit. Please try again or call us.");
      return;
    }
    toast.success("Enquiry received. We'll be in touch within 24 hours.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section id="contact" className="relative py-32">
      <div className="container-luxe grid gap-12 lg:grid-cols-2">
        <div>
          <span className="eyebrow">Get in touch</span>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            Let's build something <span className="text-gradient-gold">extraordinary.</span>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            Share a few details and Bharath will reach out personally — typically within 24 hours.
            Or call us directly, we love a good conversation about design.
          </p>

          <div className="mt-10 space-y-5">
            <a href={`tel:${SITE.phone}`} className="group flex items-start gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-sm hairline text-gold">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">Call</div>
                <div className="mt-1 font-display text-lg group-hover:text-gold">{SITE.phone}</div>
              </div>
            </a>
            <a href={`mailto:${SITE.email}`} className="group flex items-start gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-sm hairline text-gold">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">Email</div>
                <div className="mt-1 font-display text-lg group-hover:text-gold break-all">{SITE.email}</div>
              </div>
            </a>
            <a href={SITE.mapsLink} target="_blank" rel="noopener" className="group flex items-start gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-sm hairline text-gold">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">Studio</div>
                <div className="mt-1 font-display text-lg group-hover:text-gold">{SITE.location}</div>
              </div>
            </a>
          </div>

          <div className="mt-10 overflow-hidden rounded-sm hairline">
            <iframe
              src={SITE.mapsEmbed}
              title="ANVITH i5 Location"
              className="h-64 w-full grayscale"
              loading="lazy"
            />
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="glass rounded-sm p-8 shadow-card"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field name="name" label="Your name" placeholder="Priya Menon" error={errors.name} />
            <Field name="phone" label="Phone" placeholder="+91 ..." error={errors.phone} />
          </div>
          <Field
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email}
            className="mt-5"
          />
          <div className="mt-5">
            <label className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">
              Service required
            </label>
            <select
              name="service"
              defaultValue=""
              className="mt-2 w-full rounded-sm border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-gold"
            >
              <option value="">Select a service</option>
              {SERVICES.map((s) => (
                <option key={s.slug} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>
          <div className="mt-5">
            <label className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">
              Project brief
            </label>
            <textarea
              name="message"
              rows={5}
              placeholder="Tell us about your space, timeline, references…"
              className="mt-2 w-full rounded-sm border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-gold"
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-sm bg-gradient-gold px-6 py-4 text-sm font-medium tracking-wide text-primary-foreground shadow-luxe transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {submitting ? "Sending…" : <>Submit enquiry <Send className="h-4 w-4" /></>}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  name, label, placeholder, type = "text", error, className = "",
}: { name: string; label: string; placeholder?: string; type?: string; error?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-sm border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-gold"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
