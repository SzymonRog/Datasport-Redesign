import { CalendarPlus, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function QuickActions() {
  return (
    <section className="overflow-hidden rounded-xl bg-card border border-border shadow-sm">
      <div className="grid gap-6 p-6 lg:grid-cols-2 lg:gap-8 lg:p-8">
        {/* Main CTA */}
        <div className="flex flex-col justify-center">
          <span className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Nowy sezon
          </span>
          <h1 className="mb-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Zapisz się na nadchodzące zawody
          </h1>
          <p className="mb-6 max-w-md text-pretty text-muted-foreground">
            Odkryj wydarzenia w swojej okolicy i dołącz do społeczności biegaczy. 
            Rejestracja na nowe biegi już otwarta.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg">
              Zapisz się teraz
            </Button>
            <Button size="lg" variant="outline">
              Znajdź zawody
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <QuickStatCard
            icon={<Trophy className="h-5 w-5" />}
            label="Ukończone zawody"
            value="6"
            trend="+2 w tym roku"
          />
          <QuickStatCard
            icon={<CalendarPlus className="h-5 w-5" />}
            label="Aktywne zapisy"
            value="11"
            trend="3 nadchodzące"
          />
          <div className="col-span-2 rounded-md bg-muted p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Następne zawody</span>
              <span className="rounded-md bg-foreground px-2 py-0.5 text-xs font-medium text-background">
                Za 17 dni
              </span>
            </div>
            <p className="mb-1 font-semibold text-foreground">Dziecięcy Bieg Po Zdrowie</p>
            <p className="text-sm text-muted-foreground">30 maja 2026 • Nowiny</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function QuickStatCard({
  icon,
  label,
  value,
  trend,
}: {
  icon: React.ReactNode
  label: string
  value: string
  trend: string
}) {
  return (
    <div className="rounded-md border border-border bg-background p-4">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-sm bg-muted text-foreground">
        {icon}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{trend}</p>
    </div>
  )
}
