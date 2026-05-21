"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Bell, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="DATASPORT"
              width={140}
              height={36}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink href="/" active={pathname === "/"}>Strona główna</NavLink>
          <NavLink href="/zawody" active={pathname.startsWith("/zawody")}>Zawody</NavLink>
          <NavLink href="/wyniki" active={pathname.startsWith("/wyniki")}>Wyniki</NavLink>
          <NavLink href="/rywalizacje" active={pathname.startsWith("/rywalizacje")}>Rywalizacje</NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="group relative text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary group-hover:bg-white" />
            <span className="sr-only">Powiadomienia</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Zmień motyw</span>
          </Button>

          <div className="hidden h-9 w-9 overflow-hidden rounded-full lg:block">
            <div className="flex h-full w-full items-center justify-center bg-primary/10 text-sm font-semibold text-primary">
              SR
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${active
        ? "bg-muted text-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
    >
      {children}
    </Link>
  )
}
