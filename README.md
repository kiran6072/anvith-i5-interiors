# Anvith I5 Interiors

Marketing and admin site for **Anvith I5 Interiors**, founded by Mr. Bharath D N. Built with TanStack Start, React 19, Tailwind CSS v4, and Lovable Cloud (Supabase) for auth and data.

## Tech Stack

- **Framework:** TanStack Start v1 + React 19 (SSR/Edge)
- **Build:** Vite 7
- **Styling:** Tailwind CSS v4 (via `src/styles.css`)
- **UI:** shadcn/ui + Radix primitives
- **Backend:** Supabase (auth, database, storage) via Lovable Cloud
- **Forms:** React Hook Form + Zod
- **Data:** TanStack Query

## Getting Started

### Prerequisites
- [Bun](https://bun.sh) (or npm/pnpm)
- A Supabase project (or use Lovable Cloud)

### Install

```bash
bun install
```

### Environment

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

### Develop

```bash
bun run dev
```

App runs at http://localhost:8080.

### Build

```bash
bun run build
```

## Project Structure

```
src/
  routes/          File-based routes (TanStack Router)
    __root.tsx     Root layout + global head
    index.tsx      Home page
    about.tsx      About page
    auth.tsx       Admin sign-in
    _authenticated/  Admin-only routes
  components/
    sections/      Landing-page sections
    ui/            shadcn/ui primitives
  assets/projects/ Project gallery images
  integrations/supabase/  Auto-generated Supabase client
  lib/             Server functions, site config, utilities
supabase/migrations/  Database migrations
```

## Deployment

This repo can be deployed to any platform that supports Vite + Cloudflare Workers (default target), or via [Lovable](https://lovable.dev).

## License

MIT — see [LICENSE](./LICENSE).
