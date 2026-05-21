import { Activity, Flame, Route, Timer, Trophy } from "lucide-react"

export function StatsOverview() {
  return (
    <section className="overflow-hidden rounded-xl glass-panel hover-lift">
      <div className="border-b border-border p-4">
        <h3 className="font-semibold text-foreground">Forma / obciążenie</h3>
        <p className="text-sm text-muted-foreground">Ostatnie 2 tygodnie</p>
      </div>

      <div className="divide-y divide-border">
        <StatRow
          icon={<Activity className="h-4 w-4" />}
          label="Ocena"
          value="Powalcz więcej"
          valueColor="text-primary"
        />
        <StatRow
          icon={<Flame className="h-4 w-4" />}
          label="Obciążenie"
          value="0"
        />
        <StatRow
          icon={<Timer className="h-4 w-4" />}
          label="Śr. dobowe"
          value="0"
        />
        <StatRow
          icon={<Route className="h-4 w-4" />}
          label="KM miesiąc"
          value="0"
        />
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center gap-4 rounded-xl bg-muted/50 p-4 transition-colors hover:bg-muted ring-1 ring-border">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Ukończone zawody</p>
            <p className="text-2xl font-bold text-foreground">12</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl bg-muted/50 p-4 transition-colors hover:bg-muted ring-1 ring-border">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Timer className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Aktywne starty</p>
            <p className="text-2xl font-bold text-foreground">2</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatRow({
  icon,
  label,
  value,
  valueColor = "text-foreground",
}: {
  icon: React.ReactNode
  label: string
  value: string
  valueColor?: string
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          {icon}
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <span className={`font-medium ${valueColor}`}>{value}</span>
    </div>
  )
}
