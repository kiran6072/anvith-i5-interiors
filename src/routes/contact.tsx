import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ANVITH i5 Interior & Furnitures, Whitefield Bangalore" },
      { name: "description", content: "Call +91 9900839731 or send an enquiry. Studio in Whitefield, Bangalore." },
      { property: "og:title", content: "Contact ANVITH i5" },
      { property: "og:description", content: "Whitefield, Bangalore. Personal reply within 24 hours." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="relative pt-40 pb-4">
        <div className="container-luxe">
          <span className="eyebrow">Let's talk</span>
          <h1 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            Tell us about <span className="text-gradient-gold">your space.</span>
          </h1>
        </div>
      </section>
      <Contact />
    </>
  );
}
