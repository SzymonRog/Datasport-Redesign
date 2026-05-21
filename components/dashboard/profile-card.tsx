import { Edit, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProfileCard() {
  return (
    <div className="glass-panel overflow-hidden rounded-2xl">
      {/* Cover Image/Pattern */}
      <div className="h-24 bg-gradient-to-r from-red-600 to-red-400" />
      
      <div className="relative px-6 pb-6 text-center">
        {/* Avatar */}
        <div className="mx-auto -mt-12 mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-card bg-muted shadow-md transition-transform hover:scale-105">
          <User className="h-10 w-10 text-muted-foreground" />
        </div>

        {/* Info */}
        <h2 className="text-xl font-semibold text-foreground leading-tight">Szymon Rogala</h2>
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
    <div className={`rounded-xl p-3 text-center transition-colors ${highlight ? "bg-primary/10 ring-1 ring-primary/20" : "bg-muted/50 hover:bg-muted ring-1 ring-border"}`}>
      <p className={`text-xl font-bold ${highlight ? "text-primary" : "text-foreground"}`}>
        {value}
      </p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  )
}
