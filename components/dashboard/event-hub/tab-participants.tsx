import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { EventHubEvent } from "./types"

type TabParticipantsProps = {
  event: EventHubEvent
}

export function TabParticipants({ event }: TabParticipantsProps) {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <div className="rounded-xl border border-border bg-card p-5 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-2 max-w-lg mx-auto text-center">
          <h3 className="text-xl font-bold text-foreground">
            Lista startowa
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Lista uczestników i numery startowe są synchronizowane z oficjalnym systemem wyników <strong className="text-foreground">Datasport</strong>.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0 rounded-md bg-muted/50 border border-border p-4 sm:px-6 sm:py-3 mx-auto w-full sm:w-auto sm:inline-flex">
            <div className="text-center sm:text-left">
              <p className="text-xs text-muted-foreground">Zapisani</p>
              <p className="text-lg font-bold text-foreground">
                {event.participants} osób
              </p>
            </div>
            <div className="hidden sm:block h-8 w-px bg-border mx-4" />
            <div className="border-t sm:border-0 border-border pt-3 sm:pt-0 text-center sm:text-left">
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center justify-center sm:justify-start gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Aktywny online
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 gap-2 font-bold" asChild>
            <a href="https://wyniki.datasport.pl" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Otwórz listę na Datasport
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
