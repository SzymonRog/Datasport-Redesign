"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Calendar, MapPin, User, Download, Share2, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/dashboard/header"
import { BottomNav } from "@/components/dashboard/bottom-nav"

const myRaces = [
  {
    id: 1,
    name: "Dziecięcy Bieg Po Zdrowie",
    location: "Nowiny",
    date: "30 maja 2026",
    startTime: "11:00",
    startNumber: "156",
    category: "Dzieci 10-12 lat",
    distance: "2 km",
    daysUntil: 17,
    status: "confirmed",
    cover: "/images/races/bike-maraton.png",
    participantName: "Szymon Kowalski",
  },
  {
    id: 2,
    name: "12. PKO Cracovia Półmaraton Królewski",
    location: "Kraków",
    date: "11 października 2026",
    startTime: "12:00",
    startNumber: "2847",
    category: "M30",
    distance: "21.1 km",
    daysUntil: 151,
    status: "confirmed",
    cover: "/images/races/marconi-duathlon.png",
    participantName: "Szymon Kowalski",
  },
]

export default function TicketPage() {
  const params = useParams()
  const router = useRouter()
  const raceId = Number(params.id)
  const race = myRaces.find((r) => r.id === raceId)

  if (!race) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">Nie znaleziono biletu</h1>
          <p className="mt-2 text-muted-foreground">Ten bilet nie istnieje lub zawody nie zostały jeszcze opłacone.</p>
          <Button className="mt-6" onClick={() => router.push("/")}>
            Wróć do startu
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-24 lg:pb-8">
      <Header />

      <main className="mx-auto max-w-lg px-4 py-6 sm:px-6">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Wróć
        </button>

        {/* Ticket Content */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl shadow-zinc-200 dark:shadow-none ring-1 ring-border">
          {/* Top Section - Race Info */}
          <div className="bg-primary p-6 text-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">Bilet na zawody</span>
              <div className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold">
                POTWIERDZONO
              </div>
            </div>
            <h1 className="mt-4 text-2xl font-display font-bold leading-tight">
              {race.name}
            </h1>
          </div>

          {/* Middle Section - QR Code */}
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="relative mb-6 rounded-2xl bg-white p-4 shadow-inner ring-1 ring-zinc-100">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=DATASPORT-TICKET-${race.id}-${race.startNumber}`}
                alt="Ticket QR Code"
                className="h-48 w-48"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <QrCode className="h-20 w-20" />
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Numer Startowy</p>
              <p className="text-5xl font-display font-black text-foreground">{race.startNumber}</p>
            </div>
          </div>

          {/* Dashed Divider */}
          <div className="relative flex items-center px-4">
            <div className="absolute -left-3 h-6 w-6 rounded-full bg-zinc-50 dark:bg-zinc-950 ring-1 ring-border" />
            <div className="w-full border-t-2 border-dashed border-zinc-100 dark:border-zinc-800" />
            <div className="absolute -right-3 h-6 w-6 rounded-full bg-zinc-50 dark:bg-zinc-950 ring-1 ring-border" />
          </div>

          {/* Bottom Section - Details */}
          <div className="p-8">
            <div className="grid grid-cols-2 gap-y-6">
              <DetailItem label="Zawodnik" value={race.participantName} icon={<User className="h-3.5 w-3.5" />} />
              <DetailItem label="Dystans" value={race.distance} icon={<MapPin className="h-3.5 w-3.5" />} />
              <DetailItem label="Data" value={race.date} icon={<Calendar className="h-3.5 w-3.5" />} />
              <DetailItem label="Kategoria" value={race.category} icon={<Info className="h-3.5 w-3.5" />} />
            </div>

            <div className="mt-8 flex gap-3">
              <Button className="w-full gap-2 rounded-xl" variant="default">
                <Download className="h-4 w-4" />
                Pobierz PDF
              </Button>
              <Button variant="outline" size="icon" className="rounded-xl">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Proszę okazać ten kod QR w biurze zawodów <br /> podczas odbioru pakietu startowego.
        </p>
      </main>

      <BottomNav activeTab="" />
    </div>
  )
}

function DetailItem({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
        {icon}
        {label}
      </p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  )
}

function Info({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}
