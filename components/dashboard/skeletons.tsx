import { Skeleton } from "@/components/ui/skeleton"

// ─── Race Signup Carousel ─────────────────────────────────────────────
export function RaceSignupSkeleton() {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Skeleton className="h-7 w-56 rounded-lg" />
          <Skeleton className="mt-2 h-4 w-40 rounded-md" />
        </div>
        <div className="hidden gap-2 sm:flex">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>
      <div className="flex gap-4 overflow-hidden pt-2 pb-4 px-1">
        {/* CTA Card skeleton */}
        <div className="w-[280px] flex-shrink-0 rounded-2xl border border-border bg-card p-8 shadow-md sm:w-[300px]">
          <Skeleton className="h-10 w-24 rounded-lg" />
          <Skeleton className="mt-2 h-10 w-20 rounded-lg" />
          <Skeleton className="mt-4 h-4 w-48 rounded-md" />
          <div className="mt-12 flex items-center justify-between">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
        {/* Race card skeletons */}
        {Array.from({ length: 3 }).map((_, i) => (
          <RaceCardSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}

export function RaceCardSkeleton() {
  return (
    <article className="flex w-[280px] flex-shrink-0 flex-col overflow-hidden rounded-2xl bg-card shadow-md ring-1 ring-border sm:w-[300px]">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="flex flex-1 flex-col p-5">
        <Skeleton className="mb-3 h-6 w-3/4 rounded-lg" />
        <div className="mb-5 space-y-2.5">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-32 rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-36 rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-28 rounded-md" />
          </div>
        </div>
        <div className="mb-6 flex gap-2">
          <Skeleton className="h-6 w-14 rounded-lg" />
          <Skeleton className="h-6 w-12 rounded-lg" />
          <Skeleton className="h-6 w-16 rounded-lg" />
        </div>
        <Skeleton className="mt-auto h-10 w-full rounded-xl" />
      </div>
    </article>
  )
}

// ─── My Races (Dashboard) ─────────────────────────────────────────────
export function MyRacesSkeleton() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Skeleton className="h-6 w-32 rounded-lg" />
          <Skeleton className="mt-1 h-4 w-28 rounded-md" />
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <MyRaceCardSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}

export function MyRaceCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-border/60 bg-card/90 shadow-md">
      <div className="p-5">
        <div className="flex gap-4">
          <Skeleton className="h-20 w-20 flex-shrink-0 rounded-xl" />
          <div className="min-w-0 flex-1">
            <Skeleton className="mb-2 h-5 w-3/4 rounded-lg" />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
            <div className="mt-3 flex gap-2">
              <Skeleton className="h-6 w-14 rounded-lg" />
              <Skeleton className="h-6 w-10 rounded-lg" />
              <Skeleton className="h-6 w-16 rounded-lg" />
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Skeleton className="h-8 w-28 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>
    </article>
  )
}

// ─── Profile Card ─────────────────────────────────────────────────────
export function ProfileCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/90 shadow-md">
      <Skeleton className="h-24 w-full rounded-none" />
      <div className="relative px-6 pb-6 text-center">
        <Skeleton className="mx-auto -mt-12 mb-4 h-24 w-24 rounded-full" />
        <Skeleton className="mx-auto h-7 w-40 rounded-lg" />
        <Skeleton className="mx-auto mt-2 h-4 w-24 rounded-md" />
        <div className="mt-6 grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-muted/50 p-3 text-center ring-1 ring-border">
              <Skeleton className="mx-auto h-6 w-8 rounded-md" />
              <Skeleton className="mx-auto mt-1 h-3 w-16 rounded-sm" />
            </div>
          ))}
        </div>
        <Skeleton className="mt-6 h-10 w-full rounded-xl" />
      </div>
    </div>
  )
}

// ─── Stats Overview ───────────────────────────────────────────────────
export function StatsOverviewSkeleton() {
  return (
    <section className="overflow-hidden rounded-xl border border-border/60 bg-card/90 shadow-md">
      <div className="border-b border-border p-4">
        <Skeleton className="h-5 w-36 rounded-lg" />
        <Skeleton className="mt-1 h-4 w-28 rounded-md" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>
        ))}
      </div>
      <div className="space-y-3 p-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 rounded-xl bg-muted/30 p-4 ring-1 ring-border">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div>
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="mt-1 h-7 w-10 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Recent Activity ──────────────────────────────────────────────────
export function RecentActivitySkeleton() {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Skeleton className="h-6 w-28 rounded-lg" />
          <Skeleton className="mt-1 h-4 w-48 rounded-md" />
        </div>
        <Skeleton className="h-8 w-32 rounded-lg" />
      </div>
      <div className="mb-4 flex gap-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-16 rounded-full" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <ActivityCardSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}

export function ActivityCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card shadow-md">
      <div className="p-5">
        <div className="mb-3 flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-4 w-40 rounded-md" />
            <Skeleton className="mt-1 h-3 w-28 rounded-sm" />
          </div>
        </div>
        <Skeleton className="mb-2 h-4 w-full rounded-md" />
        <Skeleton className="mb-4 h-4 w-3/4 rounded-md" />
        <div className="flex items-center gap-4 border-t border-border pt-4">
          <Skeleton className="h-4 w-14 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
      </div>
    </article>
  )
}

// ─── Event Card (list item on /zawody) ────────────────────────────────
export function EventCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card shadow-md">
      <div className="flex gap-3 p-3 sm:gap-4 sm:p-4">
        <Skeleton className="h-16 w-16 flex-shrink-0 rounded-lg sm:h-20 sm:w-20" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Skeleton className="h-4 w-3/5 rounded-md sm:h-5" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
          <div className="mt-1.5 flex flex-col gap-0.5">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-4 w-40 rounded-md" />
          </div>
          <div className="mt-2.5 flex items-center justify-between gap-2">
            <div className="flex gap-1">
              <Skeleton className="h-5 w-12 rounded-md" />
              <Skeleton className="h-5 w-10 rounded-md" />
            </div>
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
        </div>
      </div>
    </article>
  )
}

// ─── Promoted Event Card ──────────────────────────────────────────────
export function PromotedEventsSkeleton() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-6 w-40 rounded-lg" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
      <div className="flex gap-4 overflow-hidden pb-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <PromotedEventCardSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}

export function PromotedEventCardSkeleton() {
  return (
    <article className="flex w-[260px] flex-shrink-0 flex-col overflow-hidden rounded-2xl bg-card shadow-lg ring-1 ring-border">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-24 rounded-sm" />
          <Skeleton className="h-3 w-16 rounded-sm" />
        </div>
      </div>
    </article>
  )
}

// ─── Race List Item (on /zapisy) ──────────────────────────────────────
export function RaceListItemSkeleton() {
  return (
    <article className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <Skeleton className="h-16 w-16 flex-shrink-0 rounded-lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Skeleton className="h-4 w-3/5 rounded-md" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <div className="mt-1.5 space-y-1">
            <Skeleton className="h-3 w-24 rounded-sm" />
            <Skeleton className="h-3 w-32 rounded-sm" />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Skeleton className="h-3 w-12 rounded-sm" />
            <Skeleton className="h-3 w-10 rounded-sm" />
          </div>
        </div>
      </div>
    </article>
  )
}

// ─── Race List (full /zapisy section) ─────────────────────────────────
export function RaceListSkeleton() {
  return (
    <section>
      <div className="mb-4">
        <Skeleton className="h-6 w-32 rounded-lg" />
        <Skeleton className="mt-1 h-4 w-20 rounded-md" />
      </div>
      <Skeleton className="mb-4 h-10 w-full rounded-xl" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <RaceListItemSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}

// ─── Event Hub (event detail page) ────────────────────────────────────
export function EventHubSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      {/* Back nav */}
      <Skeleton className="h-7 w-44 rounded-lg" />

      {/* Hero */}
      <Skeleton className="min-h-80 w-full rounded-3xl lg:min-h-90" />

      {/* Dual-column grid */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 items-start">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="flex gap-6 border-b border-border pb-3">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>

          {/* Info tab content */}
          <div className="space-y-6">
            {/* Description card */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <Skeleton className="h-6 w-28 rounded-lg" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-3/4 rounded-md" />
              <div className="mt-6 rounded-xl bg-muted/30 border border-border/50 p-4">
                <Skeleton className="h-3 w-20 rounded-sm" />
                <Skeleton className="mt-1 h-4 w-36 rounded-md" />
                <Skeleton className="mt-1 h-3 w-28 rounded-sm" />
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-sm min-h-[100px] flex flex-col justify-between">
                  <Skeleton className="h-3 w-24 rounded-sm" />
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
              ))}
            </div>

            {/* Exchange banner */}
            <Skeleton className="h-28 w-full rounded-2xl" />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Registration block */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-lg space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32 rounded-md" />
              <Skeleton className="h-5 w-40 rounded-md" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-24 rounded-sm" />
                <Skeleton className="h-3 w-16 rounded-sm" />
              </div>
              <Skeleton className="h-2.5 w-full rounded-full" />
              <div className="flex justify-between">
                <Skeleton className="h-3 w-8 rounded-sm" />
                <Skeleton className="h-3 w-12 rounded-sm" />
              </div>
            </div>
            <div className="rounded-xl bg-muted/40 border border-border p-3">
              <Skeleton className="h-3 w-24 rounded-sm" />
              <Skeleton className="mt-1 h-6 w-16 rounded-md" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-11 w-full rounded-xl" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
          </div>

          {/* Quick links */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
            <Skeleton className="h-4 w-36 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Ticket Page ──────────────────────────────────────────────────────
export function TicketSkeleton() {
  return (
    <div className="mx-auto max-w-lg px-4 py-6 sm:px-6">
      <Skeleton className="mb-6 h-5 w-16 rounded-md" />

      <div className="overflow-hidden rounded-3xl bg-card shadow-2xl ring-1 ring-border">
        {/* Top red section */}
        <div className="bg-muted p-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <Skeleton className="mt-4 h-7 w-3/4 rounded-lg" />
        </div>

        {/* QR section */}
        <div className="flex flex-col items-center justify-center p-8">
          <Skeleton className="mb-6 h-56 w-56 rounded-2xl" />
          <Skeleton className="h-3 w-24 rounded-sm" />
          <Skeleton className="mt-2 h-12 w-24 rounded-lg" />
        </div>

        {/* Dashed divider placeholder */}
        <div className="px-4">
          <div className="w-full border-t-2 border-dashed border-border" />
        </div>

        {/* Details */}
        <div className="p-8">
          <div className="grid grid-cols-2 gap-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-3 w-16 rounded-sm" />
                <Skeleton className="h-4 w-28 rounded-md" />
              </div>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <Skeleton className="h-10 flex-1 rounded-xl" />
            <Skeleton className="h-10 w-10 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Full Page Skeletons (compose the above) ──────────────────────────
export function DashboardPageSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <RaceSignupSkeleton />

      <div className="mt-10">
        <MyRacesSkeleton />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <RecentActivitySkeleton />
        </div>
        <div className="space-y-6">
          <ProfileCardSkeleton />
          <StatsOverviewSkeleton />
        </div>
      </div>
    </main>
  )
}

export function ZawodyPageSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:py-3 sm:px-6 lg:px-8">
      <section className="mb-8">
        <PromotedEventsSkeleton />
      </section>

      <div className="mb-6 flex items-center gap-2">
        <Skeleton className="h-10 min-w-0 flex-1 rounded-xl" />
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-6 w-36 rounded-lg" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </main>
  )
}

export function ZapisyPageSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <RaceListSkeleton />
    </main>
  )
}

export function EventDetailPageSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:pt-16 pt-5">
      <EventHubSkeleton />
    </main>
  )
}

export function TicketPageSkeleton() {
  return (
    <main>
      <TicketSkeleton />
    </main>
  )
}
