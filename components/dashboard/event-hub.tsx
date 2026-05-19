"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  ArrowLeftRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { EventHubAction, PricingTier, Participant, Leaderboard } from "@/lib/mock-data"
import { mockParticipants } from "@/lib/mock-data"

export type EventHubEvent = {
  id: number
  name: string
  location: string
  date: string
  startTime: string
  participants: number
  spotsLeft: number
  image: string
  distances: string[]
  description: string
  organizer: string
  address: string
  showLeaderboards?: boolean
  showPricing?: boolean
  pricingTitle?: string
  pricingTiers?: PricingTier[]
  leaderboards?: any[]
}

type EventHubProps = {
  event: EventHubEvent
  actions: EventHubAction[]
  onBack: () => void
}




export function EventHub({ event, actions, onBack }: EventHubProps) {
  const [activeTab, setActiveTab] = useState<"info" | "leaderboard" | "regulations" | "participants">("info")
  const [searchTerm, setSearchTerm] = useState("")

  const totalSpots = event.participants + event.spotsLeft
  const spotsPercent = totalSpots > 0 ? Math.round((event.spotsLeft / totalSpots) * 100) : 0
  const showLeaderboards = event.showLeaderboards !== false
  const signupHref = `/zapisy?event=${event.id}`

  // Filtered starting list
  const filteredRunners = mockParticipants.filter((runner) =>
    runner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    runner.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    runner.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
    runner.bib.includes(searchTerm)
  )

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      {/* Back navigation */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-lg  px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Powrót do listy zawodów
        </button>
      </div>

      {/* 1. HERO COVER SECTION (Athletic Gazette Style) */}
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
        <div className="relative z-20 flex flex-col justify-end p-6 sm:p-8 md:p-10 min-h-80 lg:min-h-90">
          {/* Gazette Title Header */}
          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-wrap gap-2">
              {event.distances.map((d) => (
                <span
                  key={d}
                  className="inline-flex items-center rounded-md bg-primary px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-primary-foreground shadow-md"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Giant Italicized Outfit Title */}
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold italic tracking-tight uppercase leading-none drop-shadow-md break-words [hyphens:auto] [word-break:break-word]">
              {event.name}
            </h1>

            {/* Subtitle Details Panel */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-sm text-zinc-300 font-medium border-l-2 border-primary/60 pl-4 uppercase tracking-wider text-[11px]">
              <span className="inline-flex items-center gap-1">
                <span className="text-[10px] font-black text-primary bg-primary/15 px-1.5 py-0.5 rounded mr-1">LOKALIZACJA</span>
                {event.location}
              </span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1">
                <span className="text-[10px] font-black text-primary bg-primary/15 px-1.5 py-0.5 rounded mr-1">DATA</span>
                {event.date}
              </span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1">
                <span className="text-[10px] font-black text-primary bg-primary/15 px-1.5 py-0.5 rounded mr-1">START</span>
                Godzina {event.startTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DUAL-COLUMN GRID LAYOUT (Main Editorial Section) */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 items-start w-full max-w-full overflow-hidden lg:overflow-visible">

        {/* LEFT COLUMN: Clean Tabbed Details Panel (65% width) */}
        <div className="lg:col-span-2 space-y-6 min-w-0 w-full">
          {/* Mobile Tab Scroll Helper */}
          <div className="sm:hidden flex items-center justify-between px-1 mb-2">
            <span className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-widest">Kategorie informacji</span>
            <span className="text-[9px] text-primary font-black uppercase tracking-widest flex items-center gap-1 animate-pulse">
              Przewiń
            </span>
          </div>

          {/* High-End Segmented Tab Buttons */}
          <div className="relative w-full overflow-hidden">
            {/* Horizontal fade indicator */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10 sm:hidden" />
            <div className="flex border-b border-border overflow-x-auto scrollbar-hide gap-6 -mx-4 px-4 sm:mx-0 sm:px-0">
              {(["info", "leaderboard", "regulations", "participants"] as const).map((tab) => {
                const isActive = activeTab === tab
                const labels = {
                  info: "Informacje",
                  leaderboard: "Rywalizacja",
                  regulations: "Opłaty i Regulamin",
                  participants: "Lista startowa",
                }

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`relative pb-3 text-sm font-extrabold uppercase tracking-widest whitespace-nowrap transition-all ${isActive ? "text-foreground font-black" : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {labels[tab]}
                    {isActive && (
                      <span className="absolute bottom-0 inset-x-0 h-1 bg-primary rounded-full" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* TAB CONTENTS */}
          <div className="min-h-[400px]">
            {/* TAB 1: OVERVIEW & DESCRIPTION */}
            {activeTab === "info" && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                {/* O zawodach text card */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                  <h3 className="font-display text-xl font-extrabold uppercase tracking-wider text-foreground">
                    O zawodach
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                    {event.description}
                  </p>

                  {/* Additional organizer card */}
                  <div className="mt-6 rounded-xl bg-muted/30 border border-border/50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary">Organizator</p>
                      <p className="text-sm font-bold text-foreground">{event.organizer}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
                        {event.address}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg text-xs font-bold" asChild>
                      <a href="#regulamin">Kontakt z biurem</a>
                    </Button>
                  </div>
                </div>

                {/* Key Race metrics (Horizontally asymmetric Gazeteer Grid) */}
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                  {/* Card 1: Bold Primary Header Accent */}
                  <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm border-t-4 border-t-primary flex flex-col justify-between min-h-[100px]">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Dystans główny</span>
                    <span className="font-display text-3xl font-black tracking-tight text-primary uppercase italic">{event.distances[0]}</span>
                  </div>

                  {/* Card 2: Brutalist Inline Border Bottom Accent */}
                  <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm border-b-4 border-b-foreground flex flex-col justify-between min-h-[100px]">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Godzina startu</span>
                    <span className="font-display text-3xl font-black tracking-tight text-foreground uppercase">{event.startTime}</span>
                  </div>

                  {/* Card 3: Monochromatic Editorial Left Accent */}
                  <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm border-l-4 border-l-primary flex flex-col justify-between min-h-[100px]">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Frekwencja</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-3xl font-black tracking-tight text-foreground">{event.participants}</span>
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">uczestników</span>
                    </div>
                  </div>
                </div>

                {/* VeloExchange - Brutalist Highlighted Banner */}
                <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-card to-amber-500/5 p-6 shadow-sm">
                  {/* Visual warning stripes top corner */}
                  <div className="absolute top-0 right-0 w-24 h-6 bg-amber-500/15 rotate-45 translate-x-8 -translate-y-2 pointer-events-none" />

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-black shadow-md">
                        <ArrowLeftRight className="h-6 w-6 font-bold" />
                      </div>
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 rounded bg-amber-500/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
                          BEZPIECZNA WYMIANA
                        </span>
                        <h4 className="font-display text-base font-extrabold text-foreground">Oficjalna Giełda Pakietów</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
                          Nie możesz wystartować? Przekaż swój pakiet innemu zawodnikowi w pełni bezpiecznie. Całość transakcji jest weryfikowana przez organizatora.
                        </p>
                      </div>
                    </div>
                    <Button size="sm" className="rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-xs tracking-wider shrink-0 uppercase">
                      Przejdź do giełdy
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: RYWALIZACJA (LIVE LEADERBOARDS) */}
            {activeTab === "leaderboard" && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                {showLeaderboards ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-display text-xl font-extrabold uppercase tracking-wider text-foreground">
                          Przedstartowe Wyzwanie
                        </h3>
                        <p className="text-xs text-muted-foreground">Rywalizacja w treningach od momentu rejestracji na bieg</p>
                      </div>
                      <span className="inline-flex items-center rounded border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-black uppercase tracking-widest text-primary shadow-sm">
                        LIVE RANKING
                      </span>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                      {/* Kilometer Challenge */}
                      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
                        {/* Badge header */}
                        <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 p-4 flex items-center gap-4 border-b border-border">
                          <Image src="/badge1.png" alt="Koneser Kilometrów" width={56} height={56} className="shrink-0 drop-shadow-md" />
                          <div className="min-w-0">
                            <span className="text-[9px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">Wyzwanie</span>
                            <h4 className="text-sm font-extrabold uppercase tracking-wider text-foreground leading-tight">Koneser Kilometrów</h4>
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          {/* 1st Place */}
                          <div className="flex items-center gap-3 rounded-xl bg-amber-500/5 border border-amber-500/20 p-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-black shadow-sm">1</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-bold text-foreground">Jan Kowalski</p>
                              <p className="text-[11px] text-muted-foreground">Acro Run Team</p>
                            </div>
                            <span className="font-display text-base font-black text-amber-600 dark:text-amber-400 whitespace-nowrap">2272.6<span className="text-[10px] font-semibold ml-0.5">km</span></span>
                          </div>
                          {/* 2nd Place */}
                          <div className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted/30 transition-colors">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">2</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-foreground">Anna Nowak</p>
                            </div>
                            <span className="font-display text-sm font-bold text-muted-foreground whitespace-nowrap">1984.2<span className="text-[10px] font-normal ml-0.5">km</span></span>
                          </div>
                        </div>
                      </div>

                      {/* Speed Challenge */}
                      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
                        {/* Badge header */}
                        <div className="relative bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-950/30 dark:to-sky-900/20 p-4 flex items-center gap-4 border-b border-border">
                          <Image src="/sprint_badge.png" alt="Najlepsze Tempo" width={56} height={56} className="shrink-0 drop-shadow-md" />
                          <div className="min-w-0">
                            <span className="text-[9px] font-black text-sky-600 dark:text-sky-400 uppercase tracking-widest">Wyzwanie</span>
                            <h4 className="text-sm font-extrabold uppercase tracking-wider text-foreground leading-tight">Najlepsze Tempo</h4>
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          {/* 1st Place */}
                          <div className="flex items-center gap-3 rounded-xl bg-sky-500/5 border border-sky-500/20 p-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-black text-white shadow-sm">1</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-bold text-foreground">Piotr Wiśniewski</p>
                              <p className="text-[11px] text-muted-foreground">Zagłębie Runners</p>
                            </div>
                            <span className="font-display text-base font-black text-sky-600 dark:text-sky-400 whitespace-nowrap">4:31<span className="text-[10px] font-semibold ml-0.5">/km</span></span>
                          </div>
                          {/* 2nd Place */}
                          <div className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted/30 transition-colors">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">2</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-foreground">Maria Kowalczyk</p>
                            </div>
                            <span className="font-display text-sm font-bold text-muted-foreground whitespace-nowrap">4:45<span className="text-[10px] font-normal ml-0.5">/km</span></span>
                          </div>
                        </div>
                      </div>

                      {/* Training Collector */}
                      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
                        {/* Badge header */}
                        <div className="relative bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-950/30 dark:to-rose-900/20 p-4 flex items-center gap-4 border-b border-border">
                          <Image src="/treningi_badge.png" alt="Kolekcjoner Treningów" width={56} height={56} className="shrink-0 drop-shadow-md" />
                          <div className="min-w-0">
                            <span className="text-[9px] font-black text-primary uppercase tracking-widest">Wyzwanie</span>
                            <h4 className="text-sm font-extrabold uppercase tracking-wider text-foreground leading-tight">Kolekcjoner Treningów</h4>
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          {/* 1st Place */}
                          <div className="flex items-center gap-3 rounded-xl bg-red-500/5 border border-red-500/20 p-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black text-white shadow-sm">1</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-bold text-foreground">Tomasz Zieliński</p>
                              <p className="text-[11px] text-muted-foreground">Pogoria Tri</p>
                            </div>
                            <span className="font-display text-base font-black text-primary whitespace-nowrap">192<span className="text-[10px] font-semibold ml-0.5">tr.</span></span>
                          </div>
                          {/* 2nd Place */}
                          <div className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted/30 transition-colors">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">2</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-foreground">Katarzyna Lewandowska</p>
                            </div>
                            <span className="font-display text-sm font-bold text-muted-foreground whitespace-nowrap">178<span className="text-[10px] font-normal ml-0.5">tr.</span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-border bg-card p-12 text-center space-y-4 shadow-sm">
                    <div className="inline-flex items-center rounded bg-muted border border-border px-3 py-1.5 text-xs font-black uppercase tracking-widest text-muted-foreground mx-auto">
                      STATUS WYŁĄCZONY
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-extrabold uppercase tracking-wider text-foreground">
                        Rywalizacja niedostępna
                      </h4>
                      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                        Treningi i pre-wyzwania są wyłączone dla tego wydarzenia. Zostaną uruchomione po rozpoczęciu oficjalnej rejestracji.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: REGULATIONS & FEES */}
            {activeTab === "regulations" && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                {/* Multi-Dimensional Pricing Table Card */}
                <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                  <div className="border-b border-border bg-muted/30 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-base font-extrabold uppercase tracking-wider text-foreground">
                          Siatka Opłat Startowych
                        </h3>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-semibold">Wysokość wpisowego zależy od dystansu oraz terminu wpłaty</p>
                    </div>

                  </div>

                  <div className="relative w-full overflow-hidden">
                    {/* Horizontal scroll indicators */}
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10 sm:hidden" />
                    <div className="overflow-x-auto w-full max-w-full scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0">
                      <table className="w-full text-sm min-w-[550px] sm:min-w-0">
                        <thead>
                          <tr className="border-b border-border bg-muted/20 text-left text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                            <th className="px-6 py-3.5">Dystans</th>
                            <th className="px-6 py-3.5 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 font-extrabold">I termin (do 31.12)</th>
                            <th className="px-6 py-3.5">II termin (do 31.03)</th>
                            <th className="px-6 py-3.5">III termin (do 15.05)</th>
                            <th className="px-6 py-3.5 text-right">Biuro zawodów</th>
                          </tr>
                        </thead>
                        <tbody>
                          {event.distances.map((dist) => {
                            // Generate robust multi-dimensional pricing rates based on index
                            let rates = { early: "70 PLN", standard: "90 PLN", late: "110 PLN", office: "140 PLN" }
                            if (dist.toLowerCase().includes("maraton") && !dist.toLowerCase().includes("pół")) {
                              rates = { early: "140 PLN", standard: "170 PLN", late: "200 PLN", office: "250 PLN" }
                            } else if (dist.toLowerCase().includes("półmaraton")) {
                              rates = { early: "100 PLN", standard: "120 PLN", late: "150 PLN", office: "190 PLN" }
                            } else if (dist.toLowerCase().includes("10") || dist.toLowerCase().includes("dycha")) {
                              rates = { early: "80 PLN", standard: "100 PLN", late: "120 PLN", office: "150 PLN" }
                            }

                            return (
                              <tr key={dist} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                                <td className="px-6 py-4 font-bold text-foreground">
                                  <span className="whitespace-nowrap">{dist}</span>
                                </td>
                                <td className="px-6 py-4 font-display text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 whitespace-nowrap">
                                  {rates.early}
                                </td>
                                <td className="px-6 py-4 font-display text-sm font-semibold text-muted-foreground whitespace-nowrap">
                                  {rates.standard}
                                </td>
                                <td className="px-6 py-4 font-display text-sm font-semibold text-muted-foreground whitespace-nowrap">
                                  {rates.late}
                                </td>
                                <td className="px-6 py-4 text-right font-display text-sm font-semibold text-muted-foreground whitespace-nowrap">
                                  {rates.office}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Rules Documents Downloads */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                  <h3 className="font-display text-base font-extrabold uppercase tracking-wider text-foreground">
                    Regulamin i Oświadczenia
                  </h3>

                  <div className="grid gap-3">
                    <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-primary font-black text-xs">
                          PDF
                        </div>
                        <div>
                          <p className="text-xs font-bold text-foreground">Oficjalny Regulamin Zawodów</p>
                          <p className="text-[10px] text-muted-foreground">Format: PDF • Rozmiar: 420 KB</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-lg text-xs font-bold uppercase tracking-wider shrink-0">
                        Pobierz
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 font-black text-xs">
                          PDF
                        </div>
                        <div>
                          <p className="text-xs font-bold text-foreground">Warunki Ubezpieczenia NNW</p>
                          <p className="text-[10px] text-muted-foreground">Format: PDF • Rozmiar: 1.2 MB</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-lg text-xs font-bold uppercase tracking-wider shrink-0">
                        Pobierz
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: INTERACTIVE STARTING LIST */}
            {activeTab === "participants" && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                <div className="rounded-2xl border border-border bg-card p-8 md:p-10 shadow-sm relative overflow-hidden text-center space-y-6">
                  {/* Subtle decorative mesh bg for visual premium aesthetic */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.03),transparent_70%)] pointer-events-none" />

                  <div className="inline-flex items-center rounded bg-primary/10 border border-primary/20 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-primary shadow-sm mx-auto">
                    REJESTR UCZESTNIKÓW
                  </div>

                  <div className="space-y-2 max-w-lg mx-auto">
                    <h3 className="font-display text-2xl font-black uppercase tracking-wider text-foreground">
                      Oficjalna Lista Startowa
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Lista uczestników, podział na kategorie wiekowe oraz numery startowe są na bieżąco synchronizowane bezpośrednio w oficjalnym systemie pomiaru czasu i wyników <strong className="text-foreground">Datasport</strong>.
                    </p>
                  </div>

                  {/* Registered runners counter quick card */}
                  <div className="inline-flex items-center gap-4 bg-muted/50 border border-border px-6 py-3 rounded-xl mx-auto">
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Zapisani zawodnicy</p>
                      <p className="font-display text-lg font-black text-foreground">
                        {event.participants} osób
                      </p>
                    </div>
                    <div className="h-8 w-px bg-border" />
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status pomiaru</p>
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        Aktywny online
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button size="lg" className="rounded-xl text-xs font-extrabold uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 hover-lift px-8" asChild>
                      <a href="https://wyniki.datasport.pl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                        <span>Otwórz listę na Datasport</span>
                        <span className="text-xs font-black">➔</span>
                      </a>
                    </Button>
                  </div>

                  <p className="text-[10px] text-muted-foreground max-w-xs mx-auto">
                    Po kliknięciu przycisku zostaniesz przekierowany do oficjalnego portalu wyników Datasport w nowym oknie.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky "Starting Block" Registry Panel (35% width) */}
        <div className="space-y-6 lg:sticky lg:top-24 min-w-0 w-full">

          {/* Main Registry Block */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-lg space-y-6 relative overflow-hidden">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 rounded bg-muted border border-border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-muted-foreground">
                REJESTRACJA OTWARTA
              </span>
              <h3 className="font-display text-lg font-extrabold uppercase tracking-wider text-foreground">
                Zgłoszenie na Bieg
              </h3>
            </div>

            {/* Remaining spots progress meter */}
            <div className="space-y-2">
              <div className="flex justify-between items-end text-xs font-bold">
                <span className="text-muted-foreground uppercase tracking-widest text-[9px]">Pozostałe miejsca</span>
                <span className="text-primary font-extrabold">{spotsPercent}% wolnych</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-muted relative">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500 ease-out shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                  style={{ width: `${spotsPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-extrabold mt-1">
                <span className="text-foreground">{event.spotsLeft}</span>
                <span className="text-muted-foreground font-semibold">/ {totalSpots}</span>
              </div>
            </div>

            {/* Pricing Hint Banner */}
            <div className="rounded-xl bg-muted/40 border border-border p-3 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Aktualne wpisowe</p>
                <p className="font-display text-lg font-black text-foreground">
                  {event.pricingTiers ? event.pricingTiers[0].amount : "Wkrótce"}
                </p>
              </div>
            </div>

            {/* Mega CTAs */}
            <div className="space-y-3">
              <Button size="lg" className="w-full gap-2 rounded-xl text-xs font-extrabold uppercase tracking-widest bg-primary hover:bg-primary/95 hover-lift shadow-lg shadow-primary/20 text-white" asChild>
                <Link href={signupHref}>
                  Zarejestruj się teraz
                  <span className="text-xs font-black ml-1">➔</span>
                </Link>
              </Button>

              <Button variant="outline" className="w-full gap-2 rounded-xl text-xs font-extrabold uppercase hover:text-primary hover:bg-muted/40 tracking-widest border-border bg-transparent " asChild>
                <Link href={`${signupHref}&type=group`}>
                  Zgłoszenie grupowe
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Info Sidebar Items */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
            <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-foreground">
              Przydatne odnośniki
            </h4>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setActiveTab("regulations")}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors border border-border/40 text-left"
              >
                <span className="text-xs font-bold text-foreground">Regulamin zawodów</span>
                <span className="text-xs font-black text-muted-foreground/60">➔</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("participants")}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors border border-border/40 text-left"
              >
                <span className="text-xs font-bold text-foreground">Lista startowa i opłaty</span>
                <span className="text-xs font-black text-muted-foreground/60">➔</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
