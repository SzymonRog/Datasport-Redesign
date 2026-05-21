"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Event } from "@/lib/mock-data"

import { use } from "react"
import { useRouter } from "next/navigation"

interface EventCardProps {
  event: Event
  onSignUp?: (id: number) => void
}


export function EventCard({ event, onSignUp }: EventCardProps) {
  const router = useRouter()
  const isAlmostFull = event.spotsLeft < 100

  const handleSignUpClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onSignUp?.(event.id)

    router.push(`/zawody/${event.id}`) // Navigate to the sign-up page
  }

  return (
    <Link href={`/zawody/${event.id}`} className="block">
      <article className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="flex gap-3 p-3 sm:gap-4 sm:p-4">
          {/* Cover Image */}
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted sm:h-20 sm:w-20">
            <Image
              src={event.image}
              alt={event.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            {/* Title + Spots Badge */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-foreground leading-tight sm:text-base">
                {event.name}
              </h3>
              {isAlmostFull && (
                <span className="flex-shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary whitespace-nowrap">
                  {event.spotsLeft} miejsc
                </span>
              )}
            </div>

            {/* Location & Date — prominent */}
            <div className="mt-1.5 flex flex-col gap-0.5">
              <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {event.location}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 text-primary/60" />
                {event.date}, godz. {event.startTime}
              </span>
            </div>

            {/* Distances + Participants + CTA */}
            <div className="mt-2.5 flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex flex-nowrap gap-1 overflow-hidden">
                  {event.distances.slice(0, 2).map((distance) => (
                    <span
                      key={distance}
                      className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground whitespace-nowrap"
                    >
                      {distance}
                    </span>
                  ))}
                  {event.distances.length > 2 && (
                    <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground whitespace-nowrap">
                      +{event.distances.length - 2}
                    </span>
                  )}
                </div>
                <span className="hidden flex-shrink-0 text-xs text-muted-foreground sm:inline">
                  · {event.participants} os.
                </span>
              </div>
              <Button
                size="sm"
                className="h-8 flex-shrink-0 gap-1 rounded-lg px-3 text-xs"
                onClick={handleSignUpClick}
              >
                Zapisz się
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}