"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/dashboard/header"
import { BottomNav } from "@/components/dashboard/bottom-nav"
import { EventHub, type EventHubEvent } from "@/components/dashboard/event-hub"
import { mockEvents, mockEventHubActions, mockLeaderboards } from "@/lib/mock-data"

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const event = mockEvents.find((e) => e.id === Number(id))

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center px-4 pb-24 pt-10">
          <p className="text-muted-foreground">Nie znaleziono wydarzenia.</p>
          <button
            type="button"
            onClick={() => router.push("/zawody")}
            className="mt-4 text-sm font-medium text-primary"
          >
            Wróć do listy
          </button>
        </main>
        <BottomNav />
      </div>
    )
  }

  const hubEvent: EventHubEvent = {
    id: event.id,
    name: event.name,
    location: event.location,
    date: event.date,
    startTime: event.startTime,
    participants: event.participants,
    spotsLeft: event.spotsLeft,
    image: event.image,
    distances: event.distances,
    description: event.description,
    organizer: event.organizer,
    address: event.location,
    showLeaderboards: event.showLeaderboards,
    showPricing: event.showPricing,
    pricingTitle: event.pricingTitle,
    pricingTiers: event.pricingTiers,
    leaderboards: event.showLeaderboards ? mockLeaderboards : undefined,
  }

  const actions = mockEventHubActions(event.id)

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:pt-16 pt-5">
        <EventHub event={hubEvent} actions={actions} onBack={() => router.push("/zawody")} />
      </main>
      <BottomNav />
    </div>
  )
}
