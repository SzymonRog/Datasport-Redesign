import { Edit, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProfileCard() {
  return (
    <div className="glass-panel overflow-hidden rounded-2xl">
      {/* Cover Image/Pattern */}
      <div className="h-24 bg-gradient-to-r from-red-600 to-red-400" />
      
      <div className="relative px-6 pb-6 text-center">
        {/* Avatar */}
        <div className="mx-auto -mt-12 mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white dark:border-zinc-950 bg-zinc-100 dark:bg-zinc-800 shadow-md transition-transform hover:scale-105">
          <User className="h-10 w-10 text-zinc-400 dark:text-zinc-500" />
        </div>

        {/* Info */}
        <h2 className="text-2xl font-display font-bold text-foreground leading-tight">Szymon Rogala</h2>
        <p className="mt-1 flex items-center justify-center gap-1 text-sm font-medium text-muted-foreground">
          <MapPin className="h-3 w-3" />
          Wielka Lipa
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <StatItem label="Treningi GPS" value="0" />
          <StatItem label="Zapisy" value="11" highlight />
          <StatItem label="Wyniki" value="6" />
        </div>

        <Button variant="outline" className="mt-6 w-full rounded-xl">
          Zobacz profil
        </Button>
      </div>
    </div>
  )
}

function StatItem({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-3 text-center transition-colors ${highlight ? "bg-red-50 dark:bg-red-950/30 ring-1 ring-red-100 dark:ring-red-900/50" : "bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 ring-1 ring-border shadow-md"}`}>
      <p className={`text-xl font-display font-bold ${highlight ? "text-red-600" : "text-foreground"}`}>
        {value}
      </p>
      <p className="text-xs font-medium text-muted-foreground mt-1">{label}</p>
    </div>
  )
}
