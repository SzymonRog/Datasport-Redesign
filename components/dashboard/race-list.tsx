"use client"

import { useState } from "react"
import { RaceSearchBar } from "@/components/dashboard/race-search-bar"
import { RaceListItem } from "@/components/dashboard/race-list-item"
import { EmptyRacesState } from "@/components/dashboard/empty-races-state"
import { mockUserRaces, type UserRace } from "@/lib/mock-data"

interface RaceListProps {
  title?: string
  races?: UserRace[]
}

export function RaceList({ title = "Moje zawody", races = mockUserRaces }: RaceListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRaces = races.filter((race) => {
    const matchesSearch =
      race.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      race.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      race.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      race.distance.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">
          {races.length} {races.length === 1 ? "zapis" : races.length < 5 ? "zapisy" : "zapisów"}
        </p>
      </div>

      <div className="mb-4">
        <RaceSearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      {filteredRaces.length > 0 ? (
        <div className="space-y-3">
          {filteredRaces.map((race) => (
            <RaceListItem key={race.id} race={race} />
          ))}
        </div>
      ) : (
        <EmptyRacesState searchTerm={searchTerm} />
      )}
    </section>
  )
}
