"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback } from "react"
import { mockEvents, type Event } from "@/lib/mock-data"
import { getTopRecommendationBadge, type BadgeType } from "@/lib/recommendations"

const badgeConfig: Record<BadgeType, string> = {
  "last-year": "bg-amber-400 text-amber-950",
  "near-you": "bg-sky-400 text-sky-950",
  popular: "bg-rose-400 text-rose-950",
  recommended: "bg-white/90 text-zinc-800",
}

export function PromotedEvents() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // Select first 3 events as promoted events
  const promotedEvents = mockEvents.slice(0, 3)

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Polecane dla Ciebie</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollPrev}
            className="h-8 w-8 rounded-full bg-muted/50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollNext}
            className="h-8 w-8 rounded-full bg-muted/50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 pb-2">
          {promotedEvents.map((event) => (
            <Link key={event.id} href={`/zawody/${event.id}`}>
              <PromotedEventCard event={event} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function PromotedEventCard({ event }: { event: Event }) {
  const badge = getTopRecommendationBadge(event)

  return (
    <article className="group flex w-[260px] flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl bg-card shadow-lg ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Recommendation Badge */}
        {badge && (
          <span className={`absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide shadow-md ${badgeConfig[badge.type]}`}>
            {badge.label}
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <h3 className="text-sm font-bold text-white">{event.name}</h3>
          <div className="flex items-center gap-1 text-xs text-white/80">
            <MapPin className="h-3 w-3" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{event.date}</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-foreground">{event.spotsLeft}</span>
            <span className="text-muted-foreground"> miejsc</span>
          </div>
        </div>
      </div>
    </article>
  )
}