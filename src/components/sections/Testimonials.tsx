import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type T = {
  id: string;
  client_name: string;
  client_role: string | null;
  message: string;
  rating: number;
};

async function fetchTestimonials(): Promise<T[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("id,client_name,client_role,message,rating")
    .eq("approved", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export function Testimonials() {
  const { data = [] } = useQuery({ queryKey: ["testimonials"], queryFn: fetchTestimonials });
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (data.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % data.length), 6000);
    return () => clearInterval(t);
  }, [data.length]);

  if (data.length === 0) return null;
  const t = data[idx];

  return (
    <section className="relative py-32">
      <div className="container-luxe">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Client voices</span>
          <Quote className="mx-auto mt-6 h-10 w-10 text-gold" />
          <p
            key={t.id}
            className="mt-8 font-display text-2xl leading-relaxed md:text-3xl animate-fade-up"
          >
            "{t.message}"
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <div className="font-display text-lg">{t.client_name}</div>
            {t.client_role && (
              <div className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                {t.client_role}
              </div>
            )}
          </div>

          {data.length > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {data.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-1 transition-all ${i === idx ? "w-8 bg-gradient-gold" : "w-4 bg-border"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
