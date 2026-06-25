import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/700.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-gradient-gold">404</h1>
        <h2 className="mt-4 font-display text-xl text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-sm bg-gradient-gold px-5 py-2.5 text-sm font-medium text-primary-foreground">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-sm bg-gradient-gold px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >Try again</button>
          <a href="/" className="rounded-sm hairline px-5 py-2.5 text-sm">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ANVITH i5 — Luxury Interior Designers & Furniture, Whitefield Bangalore" },
      { name: "description", content: "Bespoke modular kitchens, turnkey home interiors and custom furniture by Bharath D N. 16+ years, 150+ projects across Bangalore." },
      { name: "author", content: "ANVITH i5 Interior & Furnitures" },
      { name: "theme-color", content: "#101010" },
      { property: "og:title", content: "ANVITH i5 — Luxury Interior Designers & Furniture, Whitefield Bangalore" },
      { property: "og:description", content: "Bespoke modular kitchens, turnkey home interiors and custom furniture by Bharath D N. 16+ years, 150+ projects across Bangalore." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ANVITH i5 — Luxury Interior Designers & Furniture, Whitefield Bangalore" },
      { name: "twitter:description", content: "Bespoke modular kitchens, turnkey home interiors and custom furniture by Bharath D N. 16+ years, 150+ projects across Bangalore." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/fb64f94c-d81e-4c7f-ada0-7e5ed79ce414" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/fb64f94c-d81e-4c7f-ada0-7e5ed79ce414" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const isAdmin =
    pathname.startsWith("/admin") || pathname === "/auth";

  return (
    <QueryClientProvider client={queryClient}>
      {!isAdmin && <SiteHeader />}

      <main className="min-h-screen">
        <Outlet />
      </main>

      {!isAdmin && <SiteFooter />}
      {!isAdmin && <WhatsAppFab />}

      <Toaster
        theme="dark"
        position="bottom-center"
        richColors
      />
    </QueryClientProvider>
  );
}