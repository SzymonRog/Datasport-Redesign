import { Button } from "@/components/ui/button"
import { getDistancePricingRates } from "@/lib/mock-data"
import type { EventHubEvent } from "./types"

type TabRegulationsProps = {
  event: EventHubEvent
}

export function TabRegulations({ event }: TabRegulationsProps) {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {/* Multi-Dimensional Pricing Table Card */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="border-b border-border bg-muted/30 px-6 py-4">
          <h3 className="text-base font-semibold text-foreground">
            Opłaty startowe
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">Wysokość wpisowego zależy od dystansu oraz terminu wpłaty</p>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Horizontal scroll indicators */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10 sm:hidden" />
          <div className="overflow-x-auto w-full max-w-full scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0">
            <table className="w-full text-sm min-w-[550px] sm:min-w-0">
              <thead>
                <tr className="border-b border-border bg-muted/20 text-left text-xs font-medium text-muted-foreground">
                  <th className="px-6 py-3.5">Dystans</th>
                  <th className="px-6 py-3.5 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 font-extrabold">I termin (do 31.12)</th>
                  <th className="px-6 py-3.5">II termin (do 31.03)</th>
                  <th className="px-6 py-3.5">III termin (do 15.05)</th>
                  <th className="px-6 py-3.5 text-right">Biuro zawodów</th>
                </tr>
              </thead>
              <tbody>
                {event.distances.map((dist) => {
                  const rates = getDistancePricingRates(dist)

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
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
        <h3 className="text-base font-semibold text-foreground">
          Regulamin i Oświadczenia
        </h3>

        <div className="grid gap-3">
          <div className="flex items-center justify-between p-3 rounded-md border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary font-bold text-xs">
                PDF
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Oficjalny Regulamin Zawodów</p>
                <p className="text-[11px] text-muted-foreground">PDF &bull; 420 KB</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-xs shrink-0">
              Pobierz
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-md border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-bold text-xs">
                PDF
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Warunki Ubezpieczenia NNW</p>
                <p className="text-[11px] text-muted-foreground">PDF &bull; 1.2 MB</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-xs shrink-0">
              Pobierz
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

