"use client"

import { Header } from "@/components/dashboard/header"
import { PromotedEvents } from "@/components/dashboard/promoted-events"
import { EventCard } from "@/components/dashboard/event-card"
import { RaceSearchBar } from "@/components/dashboard/race-search-bar"
import { RaceFilters, type SortOption } from "@/components/dashboard/race-filters"
import { BottomNav } from "@/components/dashboard/bottom-nav"
import { useState, useMemo } from "react"
import { mockEvents } from "@/lib/mock-data"

const POLISH_MONTHS: Record<string, number> = {
  stycznia: 0, lutego: 1, marca: 2, kwietnia: 3, maja: 4, czerwca: 5,
  lipca: 6, sierpnia: 7, września: 8, października: 9, listopada: 10, grudnia: 11,
}

function parsePolishDate(dateStr: string): Date {
  const [day, monthStr, year] = dateStr.split(" ")
  return new Date(parseInt(year), POLISH_MONTHS[monthStr] ?? 0, parseInt(day))
}

const ALL_DISTANCES = Array.from(new Set(mockEvents.flatMap((e) => e.distances)))

export default function ZawodyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("date")
  const [selectedDistances, setSelectedDistances] = useState<string[]>([])

  const toggleDistance = (distance: string) => {
    setSelectedDistances((prev) =>
      prev.includes(distance) ? prev.filter((d) => d !== distance) : [...prev, distance]
    )
  }

  const filteredEvents = useMemo(() => {
    let events = mockEvents.filter((event) => {
      const matchesSearch =
        !searchTerm ||
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDistance =
        selectedDistances.length === 0 ||
        event.distances.some((d) => selectedDistances.includes(d))

      return matchesSearch && matchesDistance
    })

    if (sortBy === "date") {
      events = [...events].sort(
        (a, b) => parsePolishDate(a.date).getTime() - parsePolishDate(b.date).getTime()
      )
    } else {
      events = [...events].sort((a, b) => b.participants - a.participants)
    }

    return events
  }, [searchTerm, selectedDistances, sortBy])

  const handleSignUp = (id: number) => {
    console.log("Signing up for event:", id)
  }

  const hasActiveFilters = searchTerm.length > 0 || selectedDistances.length > 0

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:py-3 sm:px-6 lg:px-8">
        {/* Promoted Events */}
        <section className="mb-8">
          <PromotedEvents />
        </section>

        {/* Search + Filters — unified toolbar */}
        <div className="mb-6 flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <RaceSearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Szukaj zawodów..."
            />
          </div>
          <RaceFilters
            sortBy={sortBy}
            onSortChange={setSortBy}
            availableDistances={ALL_DISTANCES}
            selectedDistances={selectedDistances}
            onDistanceToggle={toggleDistance}
            onClearDistances={() => setSelectedDistances([])}
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
                {hasActiveFilters
                  ? "Spróbuj zmienić filtry lub inne zapytanie."
                  : "Brak dostępnych zawodów w tej chwili."}
              </p>
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

function fractionalWord(count: number): string {
  if (count === 1) return "a"
  if (count >= 2 && count <= 4) return "i"
  return "ów"
}
