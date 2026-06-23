import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent("Hello ANVITH i5, I'd like to discuss an interior project.")}`}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-gold shadow-luxe transition-transform hover:scale-110"
    >
      <MessageCircle className="h-6 w-6 text-primary-foreground" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-gold/40" />
    </a>
  );
}
