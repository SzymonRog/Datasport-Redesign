import Image from "next/image"

type TabLeaderboardProps = {
  showLeaderboards: boolean
}

export function TabLeaderboard({ showLeaderboards }: TabLeaderboardProps) {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      {showLeaderboards ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-lg font-semibold text-foreground">
                Przedstartowe Wyzwanie
              </h3>
              <p className="text-xs text-muted-foreground">Rywalizacja w treningach od momentu rejestracji na bieg</p>
            </div>
            <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              Live
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <LeaderboardCard
              badgeImage="/badge1.png"
              badgeAlt="Koneser Kilometrów"
              label="Wyzwanie"
              title="Koneser Kilometrów"
              headerGradient="from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20"
              labelColor="text-amber-600 dark:text-amber-400"
              accentColor="amber"
              first={{ name: "Jan Kowalski", club: "Acro Run Team", value: "2272.6", unit: "km" }}
              second={{ name: "Anna Nowak", value: "1984.2", unit: "km" }}
            />

            <LeaderboardCard
              badgeImage="/sprint_badge.png"
              badgeAlt="Najlepsze Tempo"
              label="Wyzwanie"
              title="Najlepsze Tempo"
              headerGradient="from-sky-50 to-sky-100 dark:from-sky-950/30 dark:to-sky-900/20"
              labelColor="text-sky-600 dark:text-sky-400"
              accentColor="sky"
              first={{ name: "Piotr Wiśniewski", club: "Zagłębie Runners", value: "4:31", unit: "/km" }}
              second={{ name: "Maria Kowalczyk", value: "4:45", unit: "/km" }}
            />

            <LeaderboardCard
              badgeImage="/treningi_badge.png"
              badgeAlt="Kolekcjoner Treningów"
              label="Wyzwanie"
              title="Kolekcjoner Treningów"
              headerGradient="from-red-50 to-rose-100 dark:from-red-950/30 dark:to-rose-900/20"
              labelColor="text-primary"
              accentColor="red"
              first={{ name: "Tomasz Zieliński", club: "Pogoria Tri", value: "192", unit: "tr." }}
              second={{ name: "Katarzyna Lewandowska", value: "178", unit: "tr." }}
            />
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card p-12 text-center space-y-3 shadow-sm">
          <h4 className="text-base font-semibold text-foreground">
            Rywalizacja niedostępna
          </h4>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Treningi i pre-wyzwania zostaną uruchomione po rozpoczęciu oficjalnej rejestracji.
          </p>
        </div>
      )}
    </div>
  )
}

type LeaderboardEntry = {
  name: string
  club?: string
  value: string
  unit: string
}

type LeaderboardCardProps = {
  badgeImage: string
  badgeAlt: string
  label: string
  title: string
  headerGradient: string
  labelColor: string
  accentColor: "amber" | "sky" | "red"
  first: LeaderboardEntry
  second: LeaderboardEntry
}

const accentStyles = {
  amber: {
    firstBg: "bg-amber-500/5 border-amber-500/20",
    badge: "bg-amber-500 text-black",
    value: "text-amber-600 dark:text-amber-400",
  },
  sky: {
    firstBg: "bg-sky-500/5 border-sky-500/20",
    badge: "bg-sky-500 text-white",
    value: "text-sky-600 dark:text-sky-400",
  },
  red: {
    firstBg: "bg-red-500/5 border-red-500/20",
    badge: "bg-primary text-white",
    value: "text-primary",
  },
}

function LeaderboardCard({
  badgeImage,
  badgeAlt,
  label,
  title,
  headerGradient,
  labelColor,
  accentColor,
  first,
  second,
}: LeaderboardCardProps) {
  const styles = accentStyles[accentColor]

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Badge header */}
      <div className={`relative bg-gradient-to-br ${headerGradient} p-4 flex items-center gap-4 border-b border-border`}>
        <Image src={badgeImage} alt={badgeAlt} width={56} height={56} className="shrink-0 drop-shadow-md" />
        <div className="min-w-0">
          <span className={`text-xs font-semibold ${labelColor}`}>{label}</span>
          <h4 className="text-sm font-semibold text-foreground leading-tight">{title}</h4>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {/* 1st Place */}
        <div className={`flex items-center gap-3 rounded-md ${styles.firstBg} border p-3`}>
          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${styles.badge} text-xs font-black shadow-sm`}>1</span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-foreground">{first.name}</p>
            {first.club && <p className="text-[11px] text-muted-foreground">{first.club}</p>}
          </div>
          <span className={`font-display text-base font-black ${styles.value} whitespace-nowrap`}>{first.value}<span className="text-[10px] font-semibold ml-0.5">{first.unit}</span></span>
        </div>
        {/* 2nd Place */}
        <div className="flex items-center gap-3 rounded-md p-3 hover:bg-muted/30 transition-colors">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">2</span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">{second.name}</p>
          </div>
          <span className="font-display text-sm font-bold text-muted-foreground whitespace-nowrap">{second.value}<span className="text-[10px] font-normal ml-0.5">{second.unit}</span></span>
        </div>
      </div>
    </div>
  )
}
