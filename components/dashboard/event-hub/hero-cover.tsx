import Image from "next/image"
import { MapPin } from "lucide-react"
import type { EventHubEvent } from "./types"

type HeroCoverProps = {
  event: EventHubEvent
}

export function HeroCover({ event }: HeroCoverProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-zinc-950 text-white shadow-xl">
      {/* Dynamic mesh gradient background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.25),transparent_60%)] z-10" />
      <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/10 z-10" />

      {/* Hero image with dark tint */}
      <div className="absolute inset-0 z-0">
        <Image
          src={event.image}
          alt=""
          fill
          className="object-cover opacity-40 blur-sm scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={event.image}
            alt={event.name}
            fill
            priority
            className=" opacity-80 filter brightness-90 contrast-110 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg"
            }}
          />
        </div>
      </div>

      {/* Hero Content Area */}
      <div className="relative z-20 flex flex-col justify-end p-6 sm:p-8 md:p-10 min-h-48 sm:min-h-64 lg:min-h-80">
        <div className="space-y-4 max-w-4xl">
          <div className="flex flex-wrap gap-2">
            {event.distances.map((d) => (
              <span
                key={d}
                className="inline-flex items-center rounded-md bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground shadow-sm"
              >
                {d}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight drop-shadow-md break-words [hyphens:auto] [word-break:break-word]">
            {event.name}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-300 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary/80" />
              {event.location}
            </span>
            <span className="text-zinc-600 hidden sm:inline">&bull;</span>
            <span>{event.date}</span>
            <span className="text-zinc-600 hidden sm:inline">&bull;</span>
            <span>Start {event.startTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
