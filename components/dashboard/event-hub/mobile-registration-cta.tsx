import { Button } from "@/components/ui/button"
import { getEventPriceDisplay } from "@/lib/mock-data"
import type { EventHubEvent } from "./types"

type MobileRegistrationCtaProps = {
  event: EventHubEvent
  spotsPercent: number
  totalSpots: number
  onRegister: () => void
  onDemoAction: () => void
}

export function MobileRegistrationCta({
  event,
  spotsPercent,
  totalSpots,
  onRegister,
  onDemoAction,
}: MobileRegistrationCtaProps) {
  return (
    <div className="lg:hidden rounded-xl border border-border bg-card p-5 shadow-md space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-0.5">
          <p className="font-display text-xl font-black text-foreground">
            {getEventPriceDisplay(event.distances)}
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="font-bold text-primary">{event.spotsLeft}</span>
            {" "}wolnych z {totalSpots} miejsc
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-display text-2xl font-black text-foreground">{spotsPercent}<span className="text-sm font-semibold text-muted-foreground">%</span></p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">wolnych</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold" onClick={onRegister}>
          Zarejestruj się &rarr;
        </Button>
        <Button variant="outline" className="font-bold" onClick={onDemoAction}>
          Grupowo
        </Button>
      </div>
    </div>
  )
}
