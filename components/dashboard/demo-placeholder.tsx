"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DemoPlaceholderProps {
  title: string
  description?: string
}

export function DemoPlaceholder({ title, description }: DemoPlaceholderProps) {
  const router = useRouter()

  return (
    <main className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <Lock className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description ?? "Ta strona nie jest dostępna — to tylko demonstracja konceptu."}
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Wróć
        </Button>
      </div>
    </main>
  )
}
