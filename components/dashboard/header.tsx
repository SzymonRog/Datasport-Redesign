"use client"

import { useState } from "react"
import Image from "next/image"
import { Bell, Menu, Moon, Sun, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isDark, setIsDark] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="DATASPORT"
            width={140}
            height={36}
            className="h-8 w-auto"
            priority
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink href="/" active>Strona główna</NavLink>
          <NavLink href="/zawody">Zawody</NavLink>
          <NavLink href="/wyniki">Wyniki</NavLink>
          <NavLink href="/rywalizacje">Rywalizacje</NavLink>
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
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Zmień motyw</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>

          <div className="hidden h-9 w-9 overflow-hidden rounded-full lg:block">
            <div className="flex h-full w-full items-center justify-center bg-primary/10 text-sm font-semibold text-primary">
              SR
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card p-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            <MobileNavLink href="/" active>Strona główna</MobileNavLink>
            <MobileNavLink href="/zawody">Zawody</MobileNavLink>
            <MobileNavLink href="/wyniki">Wyniki</MobileNavLink>
            <MobileNavLink href="/rywalizacje">Rywalizacje</MobileNavLink>
          </nav>
        </div>
      )}
    </header>
  )
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <a
      href={href}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active
        ? "bg-muted text-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
    >
      {children}
    </a>
  )
}

function MobileNavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <a
      href={href}
      className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${active
        ? "bg-muted text-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
    >
      {children}
    </a>
  )
}
