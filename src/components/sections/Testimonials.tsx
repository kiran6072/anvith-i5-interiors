import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";

type T = {
  id: string;
  client_name: string;
  client_role: string;
  message: string;
  rating: number;
};

const data: T[] = [
  {
    id: "1",
    client_name: "Ramesh Kumar",
    client_role: "Home Owner",
    message:
      "ANVITH i5 transformed our home beautifully. Every detail was finished perfectly and on time.",
    rating: 5,
  },
  {
    id: "2",
    client_name: "Priya Sharma",
    client_role: "Apartment Owner",
    message:
      "Professional team, premium quality materials, and excellent customer support throughout the project.",
    rating: 5,
  },
  {
    id: "3",
    client_name: "Vijay Rao",
    client_role: "Villa Owner",
    message:
      "Highly recommended for luxury interiors. The final outcome exceeded our expectations.",
    rating: 5,
  },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (data.length < 2) return;

    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % data.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const t = data[idx];

  return (
    <section className="relative py-16">
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
                <Star
                  key={i}
                  className="h-4 w-4 fill-gold text-gold"
                />
              ))}
            </div>

            <div className="font-display text-lg">
              {t.client_name}
            </div>

            <div className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
              {t.client_role}
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-2">
            {data.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1 transition-all ${
                  i === idx
                    ? "w-8 bg-gradient-gold"
                    : "w-4 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}