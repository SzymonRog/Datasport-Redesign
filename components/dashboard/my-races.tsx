"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, CreditCard, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
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
        {displayedRaces.sort((a, b) => a.daysUntil - b.daysUntil).map((race) => (
          <MyRaceCard key={race.id} race={race} />
        ))}
      </div>

      {mockUserRaces.length > 2 && (
        <Button
          variant="ghost"
          className="mt-4 w-full text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Pokaż mniej" : `Pokaż wszystkie (${mockUserRaces.length})`}
        </Button>
      )}
    </section>
  )
}

function MyRaceCard({ race }: { race: UserRace }) {
  const isPending = race.status === "pending_payment"

  return (
    <article className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      {/* Days Until Badge */}
      <div className="absolute right-0 top-0 z-10 rounded-bl-md bg-card/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold shadow-sm ring-1 ring-border">
        {race.daysUntil <= 30 ? (
          <span className="text-primary">Za {race.daysUntil} dni</span>
        ) : (
          <span className="text-muted-foreground">Za {race.daysUntil} dni</span>
        )}
      </div>

      <div className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Race Info */}
          <div className="flex gap-4">
            {/* Cover Image */}
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted shadow-sm">
              <Image
                src={race.cover}
                alt={race.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="min-w-0 pr-16 sm:pr-0">
              <h3 className="mb-2 text-lg font-semibold text-foreground leading-tight">{race.name}</h3>
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
                <span className="rounded-md bg-muted px-2 py-1 text-xs font-bold text-muted-foreground">
                  {race.distance}
                </span>
                <span className="rounded-md bg-muted px-2 py-1 text-xs font-bold text-muted-foreground">
                  {race.category}
                </span>
                <span className="rounded-lg bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                  Nr: {race.startNumber}
                </span>
                {isPending && (
                  <span className="flex items-center gap-1 rounded-md bg-amber-100 dark:bg-amber-900/30 px-2 py-1 text-xs font-bold text-amber-700 dark:text-amber-400">
                    <AlertCircle className="h-3 w-3" />
                    Oczekuje na płatność
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-3">
          {isPending ? (
            <Button
              variant="default"
              size="sm"
              className="gap-2 bg-amber-500 text-white hover:bg-amber-600"
              onClick={() => toast("Funkcja niedostępna w wersji demo")}
            >
              <CreditCard className="h-4 w-4" />
              <span>Opłać teraz</span>
            </Button>
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link href={`/bilet/${race.id}`}>Pokaż bilet</Link>
            </Button>
          )}
          <Button variant="outline" size="sm" asChild>
            <Link href={`/zawody/${race.id}`}>Szczegóły</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
