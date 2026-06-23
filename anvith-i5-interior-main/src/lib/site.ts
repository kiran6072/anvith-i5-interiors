export const SITE = {
  name: "ANVITH i5 Interior & Furnitures",
  short: "ANVITH i5",
  tagline: "Crafted Interiors. Bespoke Furniture.",
  founder: "Bharath Gowda M",
  founderTitle: "Founder & Managing Director",
  years: 16,
  projects: 150,
  clients: 120,
  satisfaction: 98,
  phone: "+91 9900839731",
  phoneRaw: "919900839731",
  email: "bharathhowda9731@gmail.com",
  location: "Whitefield, Bangalore, Karnataka",
  mapsEmbed:
    "https://www.google.com/maps?q=Whitefield,+Bangalore&output=embed",
  mapsLink: "https://www.google.com/maps?q=Whitefield,+Bangalore",
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
  {
    slug: "modular-kitchens",
    title: "Modular Kitchens",
    blurb:
      "European-grade modular kitchens engineered for Indian cooking, finished in matte lacquers, veneers and quartz.",
    points: ["Soft-close hardware", "Lifetime carcass warranty", "Bespoke layouts"],
  },
  {
    slug: "home-interiors",
    title: "Home Interiors",
    blurb:
      "Turnkey 2/3/4 BHK interiors — living, bedrooms, wardrobes, foyer — designed and delivered as one.",
    points: ["3D walkthroughs", "Single-point delivery", "On-time handover"],
  },
  {
    slug: "commercial-interiors",
    title: "Commercial Interiors",
    blurb:
      "Offices, cafés, clinics and retail. Brand-first interiors built to a hard deadline and a hard budget.",
    points: ["Project management", "Vendor stack", "Phased fit-outs"],
  },
  {
    slug: "custom-furniture",
    title: "Custom Furniture",
    blurb:
      "Bespoke beds, wardrobes, vanities, study units and statement pieces — made in our own workshop.",
    points: ["In-house carpentry", "Premium veneers", "Brass & leather inlays"],
  },
] as const;
