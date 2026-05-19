"use client"

import { useState } from "react"
import { ChevronRight, Heart, MessageCircle, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const activities = [
  {
    id: 1,
    type: "news",
    title: "Zmiana opłaty startowej!",
    description: "Grupa 0 – rowerki biegowe do 5 lat – Za 10 dni zmieni się opłata startowa. Nowa kwota to 59.00 PLN.",
    date: "12.05.2026",
    location: "Bartków",
    likes: 0,
    comments: 0,
  },
  {
    id: 2,
    type: "news",
    title: "Zmiana opłaty startowej!",
    description: "Grupa I – do rocznika 2020 – Za 10 dni zmieni się opłata startowa. Nowa kwota to 59.00 PLN.",
    date: "12.05.2026",
    location: "Duszniki-Zdrój",
    likes: 0,
    comments: 0,
  },
  {
    id: 3,
    type: "news",
    title: "XVI Bieg Luptaki już 24 maja!",
    description: "Zapraszamy na XVI edycję Biegu Luptaki. Start o godzinie 10:00. Zapisy trwają!",
    date: "11.05.2026",
    location: "Wałbrzych",
    likes: 12,
    comments: 3,
  },
]

export function RecentActivity() {
  const [activeTab, setActiveTab] = useState<"all" | "news" | "photos">("all")

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Aktualności</h2>
          <p className="text-sm text-muted-foreground">Ostatnie wydarzenia ze społeczności</p>
        </div>
        <Button variant="ghost" className="gap-1 text-sm text-primary">
          Zobacz wszystkie
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-2">
        <TabButton active={activeTab === "all"} onClick={() => setActiveTab("all")}>
          Wszystko
        </TabButton>
        <TabButton active={activeTab === "news"} onClick={() => setActiveTab("news")}>
          Aktualności
        </TabButton>
        <TabButton active={activeTab === "photos"} onClick={() => setActiveTab("photos")}>
          Zdjęcia
        </TabButton>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </section>
  )
}

function TabButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  )
}

function ActivityCard({ activity }: { activity: typeof activities[0] }) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <span className="text-sm font-bold text-primary">DS</span>
            </div>
            <div>
              <p className="font-medium text-foreground">{activity.title}</p>
              <p className="text-xs text-muted-foreground">
                {activity.date} • {activity.location}
              </p>
            </div>
          </div>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {activity.description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-4 border-t border-border pt-4">
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
            <Heart className="h-4 w-4" />
            <span>{activity.likes || "Lubię"}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
            <MessageCircle className="h-4 w-4" />
            <span>{activity.comments || "Komentarz"}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
            <Share2 className="h-4 w-4" />
            <span>Udostępnij</span>
          </button>
        </div>
      </div>
    </article>
  )
}
