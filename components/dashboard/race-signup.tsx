"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback } from "react"
import { mockEvents, type Event } from "@/lib/mock-data"

export function RaceSignup() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps"
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold tracking-tight text-foreground">Zapisz się na zawody</h2>
          <p className="mt-1 text-sm font-medium text-muted-foreground">Wybierz swój następny cel</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden gap-2 sm:flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollPrev}
              className="h-9 w-9 rounded-full bg-card shadow-md border border-border"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollNext}
              className="h-9 w-9 rounded-full bg-card shadow-md border border-border"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="-mx-1 overflow-hidden px-1" ref={emblaRef}>
        <div className="flex gap-4 pt-2 pb-4 px-1">
          {/* CTA Card */}
          <article className="group relative flex w-[280px] flex-shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-2xl bg-card p-8 shadow-md ring-1 ring-border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:w-[300px]">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 dark:from-red-950/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10">
              <h3 className="mb-4 text-4xl font-display font-bold leading-none tracking-tight text-foreground">
                Odkryj <br />
                <span className="text-red-600">Więcej</span>
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                Tysiące wydarzeń sportowych w całej Polsce.
              </p>
            </div>

            <div className="relative z-10 mt-12">
              <Link href="/zawody" className="flex items-center justify-between w-full">
                <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-red-600">Zobacz kalendarz</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-all duration-500 group-hover:translate-x-2 group-hover:bg-red-600 group-hover:text-white shadow-md">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            </div>
          </article>

          {mockEvents.map((race) => (
            <RaceCard key={race.id} race={race} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RaceCard({ race }: { race: Event }) {
  return (
    <article className="group flex w-[280px] flex-shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl bg-card shadow-md ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[300px]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={race.image}
          alt={race.name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-red-600 shadow-md ring-1 ring-border">
          {race.spotsLeft} miejsc
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-3 text-xl font-display font-bold text-foreground leading-tight">{race.name}</h3>

        <div className="mb-5 space-y-2.5 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{race.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{race.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{race.participants} zapisanych</span>
          </div>
        </div>

        {/* Distances */}
        <div className="mb-6 flex flex-wrap gap-2">
          {race.distances.map((distance) => (
            <span
              key={distance}
              className="rounded-lg bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-bold text-zinc-600 dark:text-zinc-400 transition-colors group-hover:bg-red-50 dark:group-hover:bg-red-950/30 group-hover:text-red-600"
            >
              {distance}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link href={`/zawody/${race.id}`}>
          <Button className="mt-auto w-full gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-colors">
            Zapisz się
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </article>
  )
}
