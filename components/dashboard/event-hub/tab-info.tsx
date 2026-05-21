import {
  MapPin,
  ArrowLeftRight,
  Users,
  Clock,
  Ruler,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { EventHubEvent } from "./types"

type TabInfoProps = {
  event: EventHubEvent
  onDemoAction: () => void
}

export function TabInfo({ event, onDemoAction }: TabInfoProps) {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {/* About the event */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4">
        <h3 className="font-display text-lg font-bold text-foreground">
          O zawodach
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>

        <div className="mt-4 rounded-xl bg-muted/30 border border-border/50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-muted/50 transition-colors">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Organizator</p>
            <p className="text-sm font-bold text-foreground">{event.organizer}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
              {event.address}
            </p>
          </div>
          <Button variant="outline" size="sm" className="rounded-lg text-xs font-semibold" asChild>
            <a href="#regulamin">Kontakt z biurem</a>
          </Button>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="group/card rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center gap-2 mb-3">
            <Ruler className="h-4 w-4 text-primary/60" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Dystans główny</span>
          </div>
          <span className="font-display text-3xl font-black tracking-tight text-primary">{event.distances[0]}</span>
        </div>

        <div className="group/card rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-muted-foreground/60" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Godzina startu</span>
          </div>
          <span className="font-display text-3xl font-black tracking-tight text-foreground">{event.startTime}</span>
        </div>

        <div className="group/card rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-muted-foreground/60" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Zapisanych</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-black tracking-tight text-foreground">{event.participants}</span>
            <span className="text-xs font-medium text-muted-foreground">uczestników</span>
          </div>
        </div>
      </div>

      {/* Package exchange — featured card */}
      <div className="relative rounded-2xl border-2 border-amber-300/50 dark:border-amber-500/30 bg-gradient-to-br from-amber-50/80 via-card to-card dark:from-amber-950/20 dark:via-card dark:to-card p-6 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 dark:bg-amber-400/3 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 shadow-sm ring-1 ring-amber-500/20">
              <ArrowLeftRight className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-foreground">Giełda Pakietów</h4>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  <Sparkles className="h-3 w-3" />
                  Nowość
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                Nie możesz wystartować? Przekaż swój pakiet startowy innemu zawodnikowi — bezpiecznie i oficjalnie. Oszczędź lub znajdź tańsze wejściówki.
              </p>
            </div>
          </div>
          <Button size="default" className="shrink-0 gap-2 bg-amber-600 hover:bg-amber-700 text-white shadow-sm font-bold" onClick={onDemoAction}>
            Przejdź do giełdy
            <span className="font-black">&rarr;</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
