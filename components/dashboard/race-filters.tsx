"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronDown, SlidersHorizontal } from "lucide-react"

export type SortOption = "date" | "participants"

/**
 * Canonical distance categories, ordered by prevalence.
 * Distances are listed most-common-first within each group.
 * Any distance from availableDistances not found here falls into "Inne".
 */
const DISTANCE_CATEGORIES = [
  {
    label: "Bieganie",
    key: "running",
    distances: ["5km", "10km", "15km", "21km", "42km", "Maraton"],
  },
  {
    label: "Trail",
    key: "trail",
    distances: ["10km Trail", "15km Trail", "30km Trail"],
  },
  {
    label: "Kolarstwo",
    key: "cycling",
    distances: ["30km", "60km", "100km"],
  },
  {
    label: "Multisport",
    key: "multisport",
    distances: ["Sprint", "Olympic", "Triathlon"],
  },
] as const

interface RaceFiltersProps {
  sortBy: SortOption
  onSortChange: (value: SortOption) => void
  availableDistances: string[]
  selectedDistances: string[]
  onDistanceToggle: (distance: string) => void
  onClearDistances: () => void
}

export function RaceFilters({
  sortBy,
  onSortChange,
  availableDistances,
  selectedDistances,
  onDistanceToggle,
  onClearDistances,
}: RaceFiltersProps) {
  const [open, setOpen] = useState(false)

  // Filter each category to only distances that actually exist in the data
  const visibleCategories = DISTANCE_CATEGORIES.map((cat) => ({
    ...cat,
    distances: cat.distances.filter((d) => availableDistances.includes(d)),
  })).filter((cat) => cat.distances.length > 0)

  // Distances that don't belong to any canonical category
  const categorizedSet = new Set(DISTANCE_CATEGORIES.flatMap((c) => c.distances as readonly string[]))
  const uncategorized = availableDistances.filter((d) => !categorizedSet.has(d))

  const selectedCount = selectedDistances.length
  const isActive = selectedCount > 0

  return (
    <div className="flex shrink-0 items-center gap-2">
      {/* ── Sort ── */}
      <Select value={sortBy} onValueChange={(v) => onSortChange(v as SortOption)}>
        <SelectTrigger className="h-9 w-auto min-w-[90px] gap-1 px-3 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value="date">Data</SelectItem>
          <SelectItem value="participants">Uczestnicy</SelectItem>
        </SelectContent>
      </Select>

      {/* ── Distance filter ── */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "gap-1.5 font-normal",
              isActive && "border-primary/40 bg-primary/5 dark:bg-primary/10",
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span>Dystans</span>
            {isActive && (
              <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-primary-foreground">
                {selectedCount}
              </span>
            )}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 shrink-0 text-muted-foreground/60 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="end" sideOffset={6} className="w-64 p-0">
          <div className="divide-y divide-border">
            {visibleCategories.map((category) => (
              <CategorySection
                key={category.key}
                label={category.label}
                distances={category.distances as string[]}
                selectedDistances={selectedDistances}
                onDistanceToggle={onDistanceToggle}
              />
            ))}

            {uncategorized.length > 0 && (
              <CategorySection
                label="Inne"
                distances={uncategorized}
                selectedDistances={selectedDistances}
                onDistanceToggle={onDistanceToggle}
              />
            )}

            {isActive && (
              <div className="px-3 py-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onClearDistances()
                    setOpen(false)
                  }}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Wyczyść filtry dystansu
                </button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

interface CategorySectionProps {
  label: string
  distances: string[]
  selectedDistances: string[]
  onDistanceToggle: (distance: string) => void
}

function CategorySection({ label, distances, selectedDistances, onDistanceToggle }: CategorySectionProps) {
  return (
    <div className="px-3 py-2.5">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
        {distances.map((distance) => (
          <DistanceItem
            key={distance}
            distance={distance}
            checked={selectedDistances.includes(distance)}
            onToggle={onDistanceToggle}
          />
        ))}
      </div>
    </div>
  )
}

interface DistanceItemProps {
  distance: string
  checked: boolean
  onToggle: (distance: string) => void
}

function DistanceItem({ distance, checked, onToggle }: DistanceItemProps) {
  return (
    <label
      className="flex flex-row w-full justify-start items-center gap-2 rounded-sm px-2 py-1.5 text-left transition-colors bg-transparent hover:bg-muted cursor-pointer"
    >
      <Checkbox
        checked={checked}
        onCheckedChange={() => onToggle(distance)}
        onClick={(e) => e.stopPropagation()}
        className="shrink-0"
      />
      <span className="select-none truncate text-sm leading-none text-foreground">
        {distance}
      </span>
    </label>
  )
}
