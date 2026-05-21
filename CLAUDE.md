# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Datasport dashboard redesign — a Polish-language athlete portal ("Portal Zawodnika") for browsing races/events, registering, viewing tickets, results, and rivalries. Built as a mobile-first Next.js app with mock data (no backend API).

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build (TypeScript errors are ignored via `ignoreBuildErrors: true` in next.config.mjs)
- `pnpm lint` — run ESLint

## Tech Stack

- **Next.js 16** (App Router, React 19, RSC enabled)
- **Tailwind CSS v4** with `tw-animate-css` (imported via `@import 'tailwindcss'` in globals.css, no tailwind.config — uses CSS-native config)
- **shadcn/ui** (new-york style, Radix primitives, `components/ui/`)  — icon library: lucide-react
- **Fonts**: Inter (body) + Outfit (headings), loaded via `next/font/google`
- **Theme**: light/dark via `next-themes`, CSS variables in oklch color space defined in `app/globals.css`

## Architecture

### Routing (App Router)

All pages are in `app/`. Key routes:
- `/` — main dashboard (client component): race signup, my races, activity feed, profile card
- `/zawody` — browse all events; `/zawody/[id]` — event detail (EventHub)
- `/zapisy` — user's registrations
- `/bilet/[id]` — ticket/pass view for a registered race
- `/wyniki` — results; `/rywalizacje` — rivalries
- `/new-user`, `/no-trainings` — onboarding/empty states

There is a single root layout (`app/layout.tsx`) wrapping everything in ThemeProvider. No nested layouts.

### Components

- `components/dashboard/` — all domain-specific components (header, bottom-nav, race cards, event hub, skeletons, etc.)
- `components/ui/` — shadcn/ui primitives (do not manually edit; managed via `npx shadcn@latest add`)
- `components/theme-provider.tsx` — next-themes wrapper

### Data Layer

- `lib/mock-data.ts` — all mock data (events, user races, activities, profile)
- `lib/types.ts` — shared TypeScript interfaces (`RaceEvent`, `UserRace`, `EventDetail`, `Activity`, `UserProfile`, etc.)
- `lib/recommendations.ts` — event recommendation logic
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

No API routes, no database. All data is imported directly from mock-data.

### Path Aliases

`@/*` maps to project root (e.g., `@/components/ui/button`, `@/lib/utils`).

## Conventions

- The app language is Polish — all user-facing text (labels, headings, descriptions) must be in Polish.
- Images are unoptimized (`images: { unoptimized: true }` in next config) — static exports or external hosting assumed.
- Loading states use skeleton components (`app/*/loading.tsx` files + `components/dashboard/skeletons.tsx`).
- Bottom navigation is the primary mobile nav; header is desktop-focused.
