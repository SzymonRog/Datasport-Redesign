"use client"

import Image from "next/image"
import { Calendar, MapPin, AlertCircle } from "lucide-react"
import type { UserRace } from "@/lib/mock-data"

interface RaceListItemProps {
  race: UserRace
}

export function RaceListItem({ race }: RaceListItemProps) {
  const isPending = race.status === "pending_payment"

  const statusConfig = {
    confirmed: {
      label: "Potwierdzone",
      classes: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    },
    pending_payment: {
      label: "Oczekuje na płatność",
      classes: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
    },
    cancelled: {
      label: "Anulowane",
      classes: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
    },
  }

  const status = statusConfig[race.status]

  return (
    <article className="group cursor-pointer rounded-xl border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-start gap-3">
        {/* Cover Image */}
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={race.cover}
            alt={race.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-foreground leading-tight">
              {race.name}
            </h3>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.classes}`}>
              {status.label}
            </span>
          </div>

          <div className="mt-1.5 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{race.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{race.startTime}</span>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">{race.distance}</span>
            <span className="text-xs font-medium text-muted-foreground">{race.category}</span>
            {isPending && (
              <div className="flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/20 px-2 py-0.5">
                <AlertCircle className="h-3 w-3 text-amber-700 dark:text-amber-400" />
                <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
                  {race.daysUntil} dni
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
