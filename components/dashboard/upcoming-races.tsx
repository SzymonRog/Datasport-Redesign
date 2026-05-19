"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, ChevronRight, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockEvents, type Event } from "@/lib/mock-data"

const POLISH_MONTHS: Record<string, number> = {
  "stycznia": 0, "lutego": 1, "marca": 2, "kwietnia": 3, "maja": 4, "czerwca": 5,
  "lipca": 6, "sierpnia": 7, "września": 8, "października": 9, "listopada": 10, "grudnia": 11,
}

function getDaysUntil(dateStr: string): number {
  const [day, month, year] = dateStr.split(" ")
  const eventDate = new Date(Number(year), POLISH_MONTHS[month] ?? 0, Number(day))
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.ceil((eventDate.getTime() - today.getTime()) / 86_400_000)
}

// Show the 3 nearest upcoming events
const upcomingRaces = mockEvents
  .filter((e) => getDaysUntil(e.date) > 0)
  .slice(0, 3)

export function UpcomingRaces() {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Zapisy ruszają wkrótce</h2>
          <p className="text-sm text-muted-foreground">Nadchodzące zawody w Twojej okolicy</p>
        </div>
        <Link href="/zawody">
          <Button variant="ghost" className="gap-1 text-sm">
            Zobacz wszystkie
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {upcomingRaces.map((race) => (
          <Link key={race.id} href={`/zawody/${race.id}`}>
            <RaceCard race={race} />
          </Link>
        ))}
      </div>
    </section>
  )
}

function RaceCard({ race }: { race: Event }) {
  const daysUntil = getDaysUntil(race.date)

  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg">
      {/* Cover Image */}
      <div className="relative h-32 w-full overflow-hidden bg-muted sm:h-40">
        <Image
          src={race.image}
          alt={race.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="mb-2 font-semibold text-foreground">
            {race.name}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {race.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {race.date}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {race.participants} zapisanych
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:flex-shrink-0">
          {daysUntil <= 30 && (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Za {daysUntil} dni
            </span>
          )}
          <Link href={`/zawody/${race.id}`}>
            <Button size="sm" className="gap-1">
              Zapisz się
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
