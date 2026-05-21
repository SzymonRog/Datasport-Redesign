import { Button } from "@/components/ui/button"
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
    <div className="lg:hidden rounded-2xl border border-border bg-card p-5 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-xs font-semibold text-muted-foreground">Pozostało {event.spotsLeft} z {totalSpots} miejsc</p>
          <p className="text-lg font-bold text-foreground">
            {event.pricingTiers ? event.pricingTiers[0].amount : "Wkrótce"}
          </p>
        </div>
        <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${spotsPercent}%` }}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <Button size="lg" className="flex-1 gap-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold" onClick={onRegister}>
          Zarejestruj się
          <span className="font-black">&rarr;</span>
        </Button>
        <Button variant="outline" className="rounded-xl font-bold" onClick={onDemoAction}>
          Grupowo
        </Button>
      </div>
    </div>
  )
}
