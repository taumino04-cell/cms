# Next Shadcn Dashboard Starter — Project Overview

A Next.js 15 + React 19 admin dashboard starter using Tailwind CSS v4, shadcn/ui, Firebase Authentication, TanStack Table, Recharts, Nuqs (type‑safe URL state), next-intl (i18n), and Sentry error tracking.

## Tech Stack
- Framework: Next.js 15 (App Router) / React 19
- Styling: Tailwind v4, shadcn/ui
- Auth: Firebase Authentication (client)
- Tables/Filters: TanStack Table + custom toolbar, Nuqs
- Forms/Validation: React Hook Form + Zod
- Charts: Recharts
- i18n: next-intl (en, vi)
- Error Tracking: Sentry
- Command Palette: KBar

## Project Structure
```
src/
  app/                      # App Router pages/layouts
    [locale]/               # i18n-aware segment (URLs un-prefixed via next-intl)
      dashboard/            # Protected dashboard
        overview/           # Parallel routes (@sales, @bar_stats, ...)
        product/
        kanban/
        profile/
        config-farm/
          task-categories/
          process-stages/
  components/               # UI + layout + kbar
  features/                 # Feature modules (auth, products, kanban, overview, profile)
  hooks/                    # Custom hooks (table state, media, etc.)
  lib/                      # Utilities (font, utils, datatable helpers)
  constants/                # Static data + mock API
  types/                    # Shared TS types
```

## Routing & Layout
- Root layout sets theme, fonts, Nuqs, next-intl, and Firebase auth provider: `src/app/[locale]/layout.tsx`
- Middleware handles locale negotiation (next-intl, `localePrefix: 'never'`) and protects routes via Firebase auth cookie: `src/middleware.ts`
- Auth redirects:
  - `/`: `src/app/[locale]/page.tsx` → unauthenticated → `/auth/sign-in`, else `/dashboard/overview`
  - `/dashboard`: `src/app/[locale]/dashboard/page.tsx` → same redirect logic
- Dashboard chrome: `src/app/[locale]/dashboard/layout.tsx` with `AppSidebar` + `Header` and KBar wrapper

## Internationalization (i18n)
- Locales: `en`, `vi` defined in `src/i18n/routing.ts`
- Provider: `NextIntlClientProvider` in `src/app/[locale]/layout.tsx`
- URL strategy: Unprefixed URLs via `localePrefix: 'never'` (locale stored/negotiated)
- Language switcher: `src/components/language-switcher.tsx`

## Authentication (Firebase)
- Provider: `src/components/layout/firebase-auth-provider.tsx` wired in `src/components/layout/providers.tsx`
- Client hook: `useFirebaseAuth()`
- Route guard: `src/components/auth/require-auth.tsx` (used in `src/app/[locale]/dashboard/layout.tsx`)
- Sign-in page: `src/app/[locale]/auth/sign-in/[[...sign-in]]/page.tsx` (Google demo via Firebase). No sign-up page in this starter.

## Dashboard: Overview (Parallel Routes)
- Slots under `overview/` render independently with loading/error boundaries:
  - `@sales/page.tsx` → `RecentSales`
  - `@bar_stats/page.tsx` → `BarGraph`
  - `@area_stats/page.tsx` → `AreaGraph`
  - `@pie_stats/page.tsx` → `PieGraph`
- Layout composing tiles: `src/app/[locale]/dashboard/overview/layout.tsx`

## Products: Server‑like Table
- Page: `src/app/[locale]/dashboard/product/page.tsx`
- Listing: `src/features/products/components/product-listing.tsx`
  - Reads URL params via Nuqs `searchParamsCache`
  - Fetches from mock API: `src/constants/mock-api.ts`
- Table UI & state:
  - Table: `src/components/ui/table.tsx`, `.../table/data-table.tsx`
  - Toolbar/filters: `.../table/data-table-toolbar.tsx`
  - Hook syncing table ↔ URL: `src/hooks/use-data-table.ts`
  - Columns + filter metadata: `src/features/products/components/product-tables/columns.tsx`

## Kanban
- Page: `src/app/[locale]/dashboard/kanban/page.tsx`
- Board + dialogs + store utils: `src/features/kanban/components/*`, `src/features/kanban/utils/*`

## Config Farm
- Index: `src/app/[locale]/dashboard/config-farm/page.tsx`
- Task Categories: `src/app/[locale]/dashboard/config-farm/task-categories/page.tsx`
- Process Stages: `src/app/[locale]/dashboard/config-farm/process-stages/page.tsx`

## KBar (Cmd+K)
- Provider and actions from `navItems`: `src/components/kbar/index.tsx`, `src/constants/data.ts`

## Theming & UX
- Theme provider/toggle: `src/components/layout/ThemeToggle/*`
- Fonts + class utilities: `src/lib/font.ts`, `src/lib/utils.ts`
- Global styles: `src/app/[locale]/globals.css`, `src/app/[locale]/theme.css`

## Error Handling & Sentry
- Global error boundary (reports to Sentry): `src/app/[locale]/global-error.tsx`
- Instrumentation: `src/instrumentation.ts`, `src/instrumentation-client.ts`
- Config hooked in `next.config.ts` (conditionally enabled via env)

## Environment & Running Locally
1) Install deps: `pnpm install`
2) Copy env: `cp env.example.txt .env.local` (Firebase keyless mode works without keys; add keys to claim app. Optional Sentry vars.)
3) Dev server: `pnpm dev` and open http://localhost:3000

## Notable Components
- Sidebar system: `src/components/ui/sidebar.tsx` with cookie‑persisted state
- App sidebar: `src/components/layout/app-sidebar.tsx`
- Header: `src/components/layout/header.tsx`
- Language switcher: `src/components/language-switcher.tsx`

---
If you’d like this exported elsewhere (e.g., `README.md` section or `/docs/index.md`) or expanded with screenshots, let me know.
