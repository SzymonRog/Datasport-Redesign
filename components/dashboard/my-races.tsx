"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar, ChevronDown, ChevronRight, Info, MapPin, Ticket, CreditCard, ArrowRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockUserRaces, type UserRace } from "@/lib/mock-data"

export function MyRaces() {
  const [showAll, setShowAll] = useState(false)
  const displayedRaces = showAll ? mockUserRaces : mockUserRaces.slice(0, 2)

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Moje zawody</h2>
          <p className="text-sm text-muted-foreground">
            {mockUserRaces.length} {mockUserRaces.length === 1 ? "zapis" : "zapisów"} aktywnych
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {displayedRaces.map((race) => (
          <MyRaceCard key={race.id} race={race} />
        ))}
      </div>

      {mockUserRaces.length > 2 && (
        <Button
          variant="ghost"
          className="mt-4 w-full gap-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? (
            <>
              Pokaż mniej
              <ChevronDown className="h-4 w-4 rotate-180" />
            </>
          ) : (
            <>
              Pokaż wszystkie ({mockUserRaces.length})
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      )}
    </section>
  )
}

function MyRaceCard({ race }: { race: UserRace }) {
  const isPending = race.status === "pending_payment"

  const router = useRouter()

  return (
    <div 
      onClick={() => router.push(`/zawody/${race.id}`)} 
      className="block cursor-pointer"
    >
      <article className="group relative overflow-hidden rounded-2xl glass-panel shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Days Until Badge - Moved to top right corner */}
        <div className="absolute right-0 top-0 z-10 rounded-bl-xl bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold shadow-md ring-1 ring-border">
          {race.daysUntil <= 30 ? (
            <span className="text-red-600">Za {race.daysUntil} dni</span>
          ) : (
            <span className="text-zinc-600 dark:text-zinc-400">Za {race.daysUntil} dni</span>
          )}
        </div>

        {/* Removed Top Banner for Pending State */}

        <div className="p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {/* Race Info */}
            <div className="flex gap-4">
              {/* Cover Image */}
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-muted shadow-md transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={race.cover}
                  alt={race.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="min-w-0 pr-16 sm:pr-0">
                <h3 className="mb-2 text-lg font-display font-bold text-foreground leading-tight">{race.name}</h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {race.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {race.startTime}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-zinc-100 dark:bg-zinc-800 px-2 py-1 text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    {race.distance}
                  </span>
                  <span className="rounded-lg bg-zinc-100 dark:bg-zinc-800 px-2 py-1 text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    {race.category}
                  </span>
                  <span className="rounded-lg bg-red-50 dark:bg-red-950/30 px-2 py-1 text-xs font-bold text-red-600">
                    Nr: {race.startNumber}
                  </span>
                  {isPending && (
                    <span className="flex items-center gap-1 rounded-lg bg-amber-100 dark:bg-amber-900/30 px-2 py-1 text-xs font-bold text-amber-700 dark:text-amber-400">
                      <AlertCircle className="h-3 w-3" />
                      Oczekuje na płatność
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Actions - Removed divider */}
          <div className="mt-5 flex items-center gap-3">
            {isPending ? (
              <Button 
                variant="default" 
                size="sm" 
                className="gap-2 bg-amber-500 hover:bg-amber-600 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  // Payment logic
                }}
              >
                <CreditCard className="h-4 w-4" />
                <span>Opłać teraz</span>
              </Button>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                className="gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/bilet/${race.id}`);
                }}
              >
                <Ticket className="h-4 w-4" />
                <span>Pokaż bilet</span>
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/zawody/${race.id}`);
              }}
            >
              <Info className="h-4 w-4" />
              <span>Szczegóły</span>
            </Button>
          </div>
        </div>
      </article>
    </div>
  )
}
