"use client"

import { Medal } from "lucide-react"

interface EmptyRacesStateProps {
  searchTerm: string
}

export function EmptyRacesState({ searchTerm }: EmptyRacesStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
        <Medal className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">
        Nie znaleziono zawodów
      </h3>
      <p className="mt-2 text-sm text-muted-foreground text-center">
        {searchTerm
          ? `Brak wyników dla "${searchTerm}". Spróbuj innego zapytania.`
          : "Nie masz żadnych zapisów na zawody w tej chwili."}
      </p>
    </div>
  )
}