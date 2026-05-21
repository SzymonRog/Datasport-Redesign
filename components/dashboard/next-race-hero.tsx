"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, Ticket, ArrowRight, Clock, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockUserRaces } from "@/lib/mock-data"

export function NextRaceHero() {
  const router = useRouter()

  const nextRace = [...mockUserRaces]
    .filter((r) => r.status === "confirmed")
    .sort((a, b) => a.daysUntil - b.daysUntil)[0]

  if (!nextRace) return null

  const isImminent = nextRace.daysUntil <= 7

  return (
    <section className="group relative overflow-hidden rounded-2xl bg-card shadow-lg ring-1 ring-border">
      {/* Background image — subtle */}
      <div className="absolute inset-0">
        <Image
          src={nextRace.cover}
          alt=""
          fill
          className="object-cover opacity-[0.06] dark:opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.10] dark:group-hover:opacity-[0.06]"
        />
      </div>

      <div className="relative flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        {/* Left: Race info */}
        <div className="min-w-0 space-y-3">
          {/* Label with inline countdown */}
          <div className="flex items-center gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Twój następny start
            </p>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${
              isImminent
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground"
            }`}>
              {isImminent && <Flame className="h-3 w-3" />}
              za {nextRace.daysUntil} {nextRace.daysUntil === 1 ? "dzień" : "dni"}
            </span>
          </div>

          {/* Race name */}
          <h2 className="text-xl font-display font-bold text-foreground leading-tight sm:text-2xl">
            {nextRace.name}
          </h2>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-primary/60" />
              {nextRace.date}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {nextRace.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Start {nextRace.startTime}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
              {nextRace.distance}
            </span>
            <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
              {nextRace.category}
            </span>
            <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
              Nr startowy: {nextRace.startNumber}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-shrink-0 gap-3 sm:flex-col">
          <Button
            size="sm"
            className="gap-2"
            onClick={() => router.push(`/bilet/${nextRace.id}`)}
          >
            <Ticket className="h-4 w-4" />
            Pokaż bilet
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => router.push(`/zawody/${nextRace.id}`)}
          >
            Szczegóły
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
