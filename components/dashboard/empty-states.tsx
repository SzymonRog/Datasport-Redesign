import { ArrowRight, CalendarPlus, Map, Medal, Route, Timer, Trophy, Watch } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmptyMyRaces() {
  return (
    <section className="overflow-hidden rounded-2xl border-2 border-dashed border-border bg-card/50">
      <div className="flex flex-col items-center px-6 py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Medal className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-foreground">Nie masz jeszcze zapisów</h2>
        <p className="mb-6 max-w-sm text-muted-foreground">
          Znajdź swoje pierwsze zawody i dołącz do tysięcy biegaczy w całej Polsce
        </p>
        <Button size="lg" className="gap-2">
          <CalendarPlus className="h-5 w-5" />
          Przeglądaj zawody
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}

export function EmptyCompletedRaces() {
  return (
    <div className="rounded-xl border-2 border-dashed border-border bg-card/50 p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
        <Trophy className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mb-1 font-medium text-foreground">Brak ukończonych zawodów</h3>
      <p className="text-sm text-muted-foreground">
        Twoje wyniki pojawią się tutaj po pierwszym biegu
      </p>
    </div>
  )
}

export function EmptyTrainingStats() {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border p-4">
        <h3 className="font-semibold text-foreground">Forma / obciążenie</h3>
        <p className="text-sm text-muted-foreground">Ostatnie 2 tygodnie</p>
      </div>

      <div className="flex flex-col items-center px-6 py-10 text-center">
        <h4 className="mb-2 font-medium text-foreground">Brak danych treningowych</h4>
        <p className="mb-6 max-w-xs text-sm text-muted-foreground">
          Połącz swój zegarek sportowy lub aplikację, aby śledzić postępy
        </p>
        <Button variant="outline" size="sm">
          Połącz urządzenie
        </Button>
      </div>

      <div className="border-t border-border p-4">
        <div className="grid grid-cols-4 gap-3 text-center">
          <StatPlaceholder icon={<Route className="h-4 w-4" />} label="GPS" />
          <StatPlaceholder icon={<Timer className="h-4 w-4" />} label="Czas" />
          <StatPlaceholder icon={<Map className="h-4 w-4" />} label="Dystans" />
          <StatPlaceholder icon={<Trophy className="h-4 w-4" />} label="Wyniki" />
        </div>
      </div>
    </section>
  )
}

function StatPlaceholder({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        {icon}
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-lg font-semibold text-muted-foreground/50">—</span>
    </div>
  )
}

export function EmptyQuickActions() {
  return (
    <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/90">
      <div className="p-6 lg:p-8">
        <div className="mx-auto max-w-2xl text-center text-primary-foreground">
          <span className="mb-3 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
            Witaj w DATASPORT
          </span>
          <h1 className="mb-4 text-balance text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Rozpocznij swoją przygodę biegową
          </h1>
          <p className="mb-8 text-pretty text-primary-foreground/80">
            Znajdź zawody w swojej okolicy, śledź swoje wyniki i dołącz do społeczności 
            tysięcy biegaczy w całej Polsce.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="secondary" className="gap-2">
              <CalendarPlus className="h-5 w-5" />
              Zapisz się na zawody
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <Watch className="h-5 w-5" />
              Połącz zegarek
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EmptyProfileStats() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-xl bg-muted/50 p-4 text-center">
        <p className="text-2xl font-bold text-muted-foreground/50">0</p>
        <p className="text-sm text-muted-foreground">Treningi GPS</p>
      </div>
      <div className="rounded-xl bg-muted/50 p-4 text-center">
        <p className="text-2xl font-bold text-muted-foreground/50">0</p>
        <p className="text-sm text-muted-foreground">Zapisy</p>
      </div>
      <div className="rounded-xl bg-muted/50 p-4 text-center">
        <p className="text-2xl font-bold text-muted-foreground/50">0</p>
        <p className="text-sm text-muted-foreground">Wyniki</p>
      </div>
    </div>
  )
}
