import { Button } from "@/components/ui/button"
import { getEventPriceDisplay } from "@/lib/mock-data"
import type { EventHubEvent, EventHubTab } from "./types"

type SidebarRegistryProps = {
  event: EventHubEvent
  spotsPercent: number
  totalSpots: number
  onRegister: () => void
  onDemoAction: () => void
  onTabChange: (tab: EventHubTab) => void
}

export function SidebarRegistry({
  event,
  spotsPercent,
  totalSpots,
  onRegister,
  onDemoAction,
  onTabChange,
}: SidebarRegistryProps) {
  return (
    <div className="space-y-6 lg:sticky lg:top-24 min-w-0 w-full">

      {/* Main Registry Block */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-md space-y-5 ring-1 ring-primary/5">
        <h3 className="text-lg font-bold text-foreground">
          Zapisz się na {event.name}
        </h3>

        {/* Capacity — two-stat grid, no crowdfunding bar */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Dostępność miejsc</p>
          <div className="grid grid-cols-2 divide-x divide-border rounded-md border border-border overflow-hidden">
            <div className="p-3 text-center">
              <p className="font-display text-2xl font-black text-foreground">{event.participants}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">Zapisanych</p>
            </div>
            <div className="p-3 text-center">
              <p className="font-display text-2xl font-black text-primary">{event.spotsLeft}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">Wolnych</p>
            </div>
          </div>
          {/* Thin capacity fill — data context, not hero element */}
          <div className="h-px bg-border overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${Math.round((event.participants / totalSpots) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-muted-foreground">{totalSpots} miejsc łącznie</p>
        </div>

        {/* Current price */}
        <div className="rounded-md bg-primary/5 dark:bg-primary/10 border border-primary/10 p-4">
          <p className="text-xs font-medium text-muted-foreground">Aktualne wpisowe</p>
          <p className="font-display text-2xl font-black text-foreground mt-1">
            {getEventPriceDisplay(event.distances)}
          </p>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all" onClick={onRegister}>
            Zarejestruj się teraz &rarr;
          </Button>
          <Button variant="outline" className="w-full font-medium" onClick={onDemoAction}>
            Zgłoszenie grupowe
          </Button>
        </div>
      </div>

      {/* Quick links */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Przydatne odnośniki
        </h4>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => onTabChange("regulations")}
            className="w-full flex items-center justify-between p-3 rounded-md bg-muted/20 hover:bg-muted/50 transition-all border border-border/40 hover:border-border text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
          >
            <span className="text-sm font-medium text-foreground">Regulamin zawodów</span>
            <span className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all">&rarr;</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange("participants")}
            className="w-full flex items-center justify-between p-3 rounded-md bg-muted/20 hover:bg-muted/50 transition-all border border-border/40 hover:border-border text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
          >
            <span className="text-sm font-medium text-foreground">Lista startowa</span>
            <span className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  )
}
