"use client"

import { Header } from "@/components/dashboard/header"
import { PromotedEvents } from "@/components/dashboard/promoted-events"
import { EventCard } from "@/components/dashboard/event-card"
import { RaceSearchBar } from "@/components/dashboard/race-search-bar"
import { BottomNav } from "@/components/dashboard/bottom-nav"
import { useState } from "react"
import { mockEvents } from "@/lib/mock-data"

interface Event {
  id: number
  name: string
  location: string
  date: string
  startTime: string
  participants: number
  spotsLeft: number
  image: string
  distances: string[]
}

export default function ZawodyPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  const handleSignUp = (id: number) => {
    console.log("Signing up for event:", id)
    // In real app, this would make an API call
  }

  return (
    <div className="bg-geometric min-h-screen bg-background pb-24 lg:pb-8">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:py-3 sm:px-6 lg:px-8">
        {/* Promoted Events */}
        <section className="mb-8">
          <PromotedEvents />
        </section>

        {/* Search */}
        <div className="mb-6">
          <RaceSearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Szukaj zawodów..."
          />
        </div>

        {/* Events List */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Wszystkie zawody</h2>
            <span className="text-sm text-muted-foreground">
              {filteredEvents.length} wynik{fractionalWord(filteredEvents.length)}
            </span>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="space-y-3">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} onSignUp={handleSignUp} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
                <svg className="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m6 6v-8a6 6 0 01-6-6v8a6 6 0 01-6 6H3"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Nie znaleziono zawodów
              </h3>
              <p className="mt-2 text-sm text-muted-foreground text-center">
                {searchTerm
                  ? `Brak wyników dla "${searchTerm}". Spróbuj innego zapytania.`
                  : "Brak dostępnych zawodów w tej chwili."}
              </p>
            </div>
          )}
        </section>
      </main>

      <BottomNav activeTab="search" />
    </div>
  )
}

function fractionalWord(count: number): string {
  if (count === 1) return "a"
  if (count >= 2 && count <= 4) return "i"
  return "ów"
}