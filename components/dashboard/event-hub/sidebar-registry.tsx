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
      <div className="rounded-2xl border border-border bg-card p-6 shadow-lg space-y-5 ring-1 ring-primary/5">
        <div className="space-y-1.5">
          
          <h3 className="text-lg font-bold text-foreground">
            Zapisz się na {event.name}
          </h3>
        </div>

        {/* Remaining spots */}
        <div className="space-y-2">
          <div className="flex justify-between items-end text-xs">
            <span className="text-muted-foreground font-medium">Pozostałe miejsca</span>
            <span className="text-primary font-bold">{spotsPercent}% wolnych</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${spotsPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="font-bold text-foreground">{event.spotsLeft}</span>
            <span className="text-muted-foreground">/ {totalSpots}</span>
          </div>
        </div>

        {/* Current price */}
        <div className="rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/10 p-4">
          <p className="text-xs font-medium text-muted-foreground">Aktualne wpisowe</p>
          <p className="font-display text-2xl font-black text-foreground mt-1">
            {getEventPriceDisplay(event.distances)}
          </p>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <Button size="lg" className="w-full gap-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all" onClick={onRegister}>
            Zarejestruj się teraz &rarr;
          </Button>

          <Button variant="outline" className="w-full rounded-xl font-medium" onClick={onDemoAction}>
            Zgłoszenie grupowe
          </Button>
        </div>
      </div>

      {/* Quick links */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Przydatne odnośniki
        </h4>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => onTabChange("regulations")}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/20 hover:bg-muted/50 transition-all border border-border/40 hover:border-border text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
          >
            <span className="text-sm font-medium text-foreground">Regulamin zawodów</span>
            <span className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all">&rarr;</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange("participants")}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/20 hover:bg-muted/50 transition-all border border-border/40 hover:border-border text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
          >
            <span className="text-sm font-medium text-foreground">Lista startowa</span>
            <span className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  )
}
