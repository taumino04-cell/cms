<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/9113740/201498864-2a900c64-d88f-4ed4-b5cf-770bcb57e1f5.png">
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/9113740/201498152-b171abb8-9225-487a-821c-6ff49ee48579.png">
</picture>

<div align="center"><strong>Next.js Admin Dashboard Starter Template With Shadcn-ui</strong></div>
<div align="center">Built with the Next.js 15 App Router</div>
<br />
<div align="center">
<a href="https://dub.sh/shadcn-dashboard">View Demo</a>
<span>
</div>

## Overview

This is a starter template using the following stack:

- Framework - [Next.js 15](https://nextjs.org/13)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [Firebase authentication](https://firebase.google.com/docs/auth)
- Error tracking - [<picture><img alt="Sentry" src="public/assets/sentry.svg">
        </picture>](https://sentry.io/for/nextjs/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy26q2-nextjs&utm_content=github-banner-project-tryfree)
- Styling - [Tailwind CSS v4](https://tailwindcss.com)
- Components - [Shadcn-ui](https://ui.shadcn.com)
- Schema Validations - [Zod](https://zod.dev)
- State Management - [Zustand](https://zustand-demo.pmnd.rs)
- Search params state manager - [Nuqs](https://nuqs.47ng.com/)
- Tables - [Tanstack Data Tables](https://ui.shadcn.com/docs/components/data-table) • [Dice table](https://www.diceui.com/docs/components/data-table)
- Forms - [React Hook Form](https://ui.shadcn.com/docs/components/form)
- Command+k interface - [kbar](https://kbar.vercel.app/)
- Linting - [ESLint](https://eslint.org)
- Pre-commit Hooks - [Husky](https://typicode.github.io/husky/)
- Formatting - [Prettier](https://prettier.io)
- i18n: [next-intl](https://next-intl-docs.vercel.app/) (locales: `en`, `vi`)

_If you are looking for a Tanstack start dashboard template, here is the [repo](https://git.new/tanstack-start-dashboard)._

## Pages

- Auth: `/auth/sign-in` — Firebase Google demo sign-in (no sign-up page)
- Dashboard Overview: `/dashboard/overview` — cards with Recharts; parallel routes with independent loading/error
- Products: `/dashboard/product` — TanStack Table with Nuqs-powered filters, pagination, sorting
- Product Detail: `/dashboard/product/[productId]` — example detail route
- Profile: `/dashboard/profile` — account management UI
- Kanban Board: `/dashboard/kanban` — drag-and-drop board via dnd-kit + Zustand
- Config Farm: `/dashboard/config-farm` plus `/task-categories`, `/process-stages`
- Not Found: catch-all route
- Global Error: Sentry-backed global error page

## Project Structure

```text
src/
  app/
    [locale]/                    # i18n segment (unprefixed URLs via next-intl)
      layout.tsx                 # providers: next-intl, Nuqs, theme, Firebase
      page.tsx                   # redirects → /dashboard/overview
      global-error.tsx           # Sentry-reported global error
      dashboard/
        layout.tsx               # chrome: sidebar + header + KBar + auth gate
        page.tsx                 # redirects → /dashboard/overview
        overview/                # parallel routes: @sales, @bar_stats, @area_stats, @pie_stats
        product/
          page.tsx
          [productId]/page.tsx
        profile/[[...profile]]/page.tsx
        kanban/page.tsx
        config-farm/
          page.tsx
          task-categories/page.tsx
          process-stages/page.tsx
      [...not-found]/page.tsx

  components/                    # UI + layout + KBar + primitives
  features/                      # auth, products, kanban, overview, profile
  hooks/                         # table state, media, debounce, etc.
  lib/                           # utils, font, firebase client, datatable helpers
  constants/                     # static data + mock API
  types/                         # shared TS types
```

## Internationalization

- Library: `next-intl` configured in `src/i18n/routing.ts` (locales: `en`, `vi`)
- URLs: `localePrefix: 'never'` in middleware for clean, unprefixed paths
- Provider: `NextIntlClientProvider` in `src/app/[locale]/layout.tsx`
- Language switcher: `src/components/language-switcher.tsx`

## Getting Started

Clone the repo:

```
git clone https://github.com/Kiranism/next-shadcn-dashboard-starter.git
cd next-shadcn-dashboard-starter
```

Install and run:

- `pnpm install`
- Copy envs: `cp env.example.txt .env.local`
- Add Firebase and optional Sentry envs to `.env.local`
- Start dev server: `pnpm dev` then open http://localhost:3000

Notes:

- Auth gating uses a cookie (`fb_auth`) set by the Firebase client provider and enforced by `src/middleware.ts`.
- Sentry is conditionally enabled via env in `next.config.ts`.

Cheers! 🥂
