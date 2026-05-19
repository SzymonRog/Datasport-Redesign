"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface RaceSearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RaceSearchBar({ value, onChange, placeholder = "Szukaj zawodów..." }: RaceSearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-12"
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange("")}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
        >
          <X className="h-3.5 w-3.5" />
          <span className="sr-only">Wyczyść</span>
        </Button>
      )}
    </div>
  )
}