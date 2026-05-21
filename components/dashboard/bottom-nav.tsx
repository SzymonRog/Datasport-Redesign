"use client"

import { Home, Medal, Search, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function BottomNav() {
  const pathname = usePathname()

  const getActiveTab = () => {
    if (pathname === "/") return "home"
    if (pathname.startsWith("/zawody")) return "search"
    if (pathname.startsWith("/wyniki")) return "results"
    if (pathname.startsWith("/profil")) return "profile"
    return "home"
  }

  const activeTab = getActiveTab()

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
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  href: string
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-0.5 transition-colors pointer-events-auto rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring p-1 hover:text-foreground ${active ? "text-foreground" : "text-muted-foreground"}`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  )
}
