"use client"

import { CalendarPlus, Home, Medal, Search, User } from "lucide-react"
import Link from "next/link"

interface BottomNavProps {
  activeTab: string
  onTabChange?: (tab: string) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg lg:hidden pb-[calc(env(safe-area-inset-bottom)+4px)] pt-1 pointer-events-auto">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-4">
        <NavItem
          icon={<Home className="h-5 w-5" />}
          label="Start"
          active={activeTab === "home"}
          href="/"
        />
        <NavItem
          icon={<Search className="h-5 w-5" />}
          label="Szukaj"
          active={activeTab === "search"}
          href="/zawody"
        />
        <NavItem
          icon={<CalendarPlus className="h-5 w-5" />}
          label="Zapisz się"
          active={activeTab === "register"}
          href="/zapisy"
          highlight
        />
        <NavItem
          icon={<Medal className="h-5 w-5" />}
          label="Wyniki"
          active={activeTab === "results"}
          href="/wyniki"
        />
        <NavItem
          icon={<User className="h-5 w-5" />}
          label="Profil"
          active={activeTab === "profile"}
          href="/profil"
        />
      </div>
    </nav>
  )
}

function NavItem({
  icon,
  label,
  active,
  href,
  highlight,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  href: string
  highlight?: boolean
}) {
  const baseClasses = "flex flex-col items-center gap-0.5 transition-colors pointer-events-auto"
  const activeClasses = highlight ? "" : "text-foreground"
  const inactiveClasses = highlight ? "text-primary" : "text-muted-foreground"

  if (highlight) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${activeClasses}`}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-transform">
          {icon}
        </div>
        <span className="text-[10px] font-medium text-primary">{label}</span>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses} hover:text-foreground`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  )
}
