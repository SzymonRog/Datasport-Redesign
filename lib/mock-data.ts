export type Event = {
  id: number
  name: string
  location: string
  date: string
  startTime: string
  participants: number
  spotsLeft: number
  image: string
  distances: string[]
  description: string
  organizer: string
  showLeaderboards?: boolean
  showPricing?: boolean
  pricingTitle?: string
  pricingTiers?: PricingTier[]
}

export type LeaderboardEntry = {
  name: string
  value: string
}

export type Leaderboard = {
  id: string
  title: string
  unit: string
  entries: LeaderboardEntry[]
}

export type PricingTier = {
  from: string
  to: string
  amount: string
}

export type DistancePricingRates = {
  early: string
  standard: string
  late: string
  office: string
}

export type EventHubActionTier = "primary" | "secondary" | "utility"

export type EventHubAction = {
  id: string
  title: string
  description: string
  href: string
  tier: EventHubActionTier
  /** Short label for compact row UI */
  shortLabel?: string
  variant?: "default" | "highlight"
}

export type Participant = {
  bib: string
  name: string
  city: string
  club: string
  category: string
  status: string
}

export type UserRaceStatus = "confirmed" | "pending_payment" | "cancelled"

export type UserRace = {
  id: number
  name: string
  location: string
  date: string
  startTime: string
  startNumber: string
  category: string
  distance: string
  daysUntil: number
  status: UserRaceStatus
  cover: string
  participantName?: string
}

// Pricing tiers — defined before mockEvents so they can be referenced inline
export const mockMarathonPricing: PricingTier[] = [
  { from: "2025-09-07", to: "2025-12-31", amount: "140.00 PLN" },
  { from: "2026-01-01", to: "2026-03-31", amount: "170.00 PLN" },
  { from: "2026-04-01", to: "2026-05-15", amount: "200.00 PLN" },
]

export const mockHalfMarathonPricing: PricingTier[] = [
  { from: "2025-09-07", to: "2025-12-31", amount: "100.00 PLN" },
  { from: "2026-01-01", to: "2026-03-31", amount: "120.00 PLN" },
  { from: "2026-04-01", to: "2026-05-15", amount: "150.00 PLN" },
]

export const mockTenKmPricing: PricingTier[] = [
  { from: "2025-09-07", to: "2025-12-31", amount: "80.00 PLN" },
  { from: "2026-01-01", to: "2026-03-31", amount: "100.00 PLN" },
  { from: "2026-04-01", to: "2026-05-15", amount: "120.00 PLN" },
]

// Canonical per-distance pricing rates (source of truth for all pricing UI)
const pricingRatesMap: Record<string, DistancePricingRates> = {
  marathon:     { early: "140 PLN", standard: "170 PLN", late: "200 PLN", office: "250 PLN" },
  half:         { early: "100 PLN", standard: "120 PLN", late: "150 PLN", office: "190 PLN" },
  "10km":       { early: "80 PLN",  standard: "100 PLN", late: "120 PLN", office: "150 PLN" },
  "5km":        { early: "70 PLN",  standard: "90 PLN",  late: "110 PLN", office: "140 PLN" },
  "15km":       { early: "80 PLN",  standard: "100 PLN", late: "120 PLN", office: "150 PLN" },
  sprint:       { early: "90 PLN",  standard: "110 PLN", late: "130 PLN", office: "160 PLN" },
  olympic:      { early: "120 PLN", standard: "140 PLN", late: "170 PLN", office: "210 PLN" },
  triathlon:    { early: "130 PLN", standard: "160 PLN", late: "190 PLN", office: "230 PLN" },
  "trail-short":{ early: "90 PLN",  standard: "110 PLN", late: "130 PLN", office: "160 PLN" },
  "trail-long": { early: "120 PLN", standard: "150 PLN", late: "180 PLN", office: "220 PLN" },
  "bike-short": { early: "80 PLN",  standard: "100 PLN", late: "120 PLN", office: "150 PLN" },
  "bike-med":   { early: "110 PLN", standard: "130 PLN", late: "160 PLN", office: "200 PLN" },
  "bike-long":  { early: "140 PLN", standard: "170 PLN", late: "200 PLN", office: "250 PLN" },
}

function classifyDistance(distance: string): string {
  const d = distance.toLowerCase()

  // Trail variants (must check before numeric checks)
  if (d.includes("trail")) {
    const km = parseInt(d, 10)
    return km > 15 ? "trail-long" : "trail-short"
  }

  // Marathon / half-marathon by name
  if (d.includes("maraton") && !d.includes("pół")) return "marathon"
  if (d.includes("półmaraton")) return "half"

  // Multisport
  if (d === "sprint") return "sprint"
  if (d === "olympic") return "olympic"
  if (d.includes("triathlon") || d.includes("triatlon")) return "triathlon"

  // Numeric distances
  const km = parseInt(d, 10)
  if (!isNaN(km)) {
    if (km >= 100) return "bike-long"
    if (km === 60) return "bike-med"
    if (km === 42) return "marathon"
    if (km === 30) return "bike-short"
    if (km === 21) return "half"
    if (km === 15) return "15km"
    if (km === 10) return "10km"
    if (km <= 5) return "5km"
  }

  if (d.includes("dycha")) return "10km"

  return "10km"
}

export function getDistancePricingRates(distance: string): DistancePricingRates {
  return pricingRatesMap[classifyDistance(distance)]
}

// Helper function to get pricing tiers based on distance
export const getPricingForDistance = (distance: string): PricingTier[] => {
  const d = distance.toLowerCase()
  if ((d.includes("maraton") && !d.includes("pół")) || d.includes("42")) {
    return mockMarathonPricing
  } else if (d.includes("półmaraton") || (d.includes("21") && d.includes("km"))) {
    return mockHalfMarathonPricing
  } else if (d.includes("10") || d.includes("dycha")) {
    return mockTenKmPricing
  }
  return mockTenKmPricing
}

export function getEventPriceDisplay(distances: string[]): string {
  const amounts = distances.map((d) => {
    const rates = getDistancePricingRates(d)
    return parseFloat(rates.early)
  })

  const unique = [...new Set(amounts)].sort((a, b) => a - b)

  if (unique.length === 1) {
    return `${unique[0]} PLN`
  }
  return `${unique[0]} – ${unique[unique.length - 1]} PLN`
}

// Single source of truth for all event data
export const mockEvents: Event[] = [
  {
    id: 1,
    name: "MARCONI Duathlon",
    location: "Świdnica",
    date: "17 maja 2026",
    startTime: "9:00",
    participants: 342,
    spotsLeft: 158,
    image: "/images/races/marconi-duathlon.png",
    distances: ["Sprint", "Olympic"],
    description:
      "MARCONI Duathlon to prestiżowe zawody dwubojowe łączące bieg i jazdę na rowerze. Trasy Sprint i Olympic poprowadzą uczestników przez malownicze okolice Świdnicy. Idealna impreza dla miłośników sportu wielodyscyplinowego — od debiutantów po doświadczonych triathlonistów.",
    organizer: "Fundacja Na Fundamentach Sportu",
    showLeaderboards: false,
    showPricing: false,
  },
  {
    id: 2,
    name: "Sowi Bieg 2026",
    location: "Góry Sowie",
    date: "24 maja 2026",
    startTime: "8:00",
    participants: 567,
    spotsLeft: 233,
    image: "/images/races/sowi-bieg.png",
    distances: ["10km", "21km", "42km"],
    description:
      "Sowi Bieg to kameralny bieg górski w sercu Gór Sowich. Trasy o długości 10, 21 i 42 km prowadzą leśnymi szlakami przez Wzgórza Sowich. Impreza łączy sportową rywalizację z miłością do natury — towarzyszy jej przedstartowa rywalizacja treningowa dla zapisanych uczestników.",
    organizer: "Fundacja Na Fundamentach Sportu",
    showLeaderboards: true,
    showPricing: true,
    pricingTitle: "Maraton 42km",
    pricingTiers: mockMarathonPricing,
  },
  {
    id: 3,
    name: "Triplet Leśny",
    location: "Nadleśnictwo Grodzisk",
    date: "7 czerwca 2026",
    startTime: "7:00",
    participants: 189,
    spotsLeft: 111,
    image: "/images/races/triplet-lesny.png",
    distances: ["Triathlon"],
    description:
      "Triplet Leśny to triathlon w unikalnej scenerii nadleśnictwa Grodzisk. Zawody łączą pływanie, jazdę na rowerze i bieg w otoczeniu lasów Puszczy Noteckiej. Jeden dystans — jedno wielkie wyzwanie dla każdego triathlonisty.",
    organizer: "Fundacja Na Fundamentach Sportu",
    showLeaderboards: false,
    showPricing: false,
  },
  {
    id: 4,
    name: "Bieg Ślęza",
    location: "Ślęża",
    date: "15 czerwca 2026",
    startTime: "9:30",
    participants: 456,
    spotsLeft: 54,
    image: "/images/races/bieg-sleza.png",
    distances: ["10km", "21km"],
    description:
      "Bieg Ślęza to klasyczne zawody biegowe u podnóża świętej góry Ślęzy. Dwie trasy — 10 km i 21 km — poprowadzą uczestników przez lasy i szlaki Masywu Ślęży. Silna tradycja, malownicza trasa i sportowa atmosfera czynią ten bieg wyjątkowym wydarzeniem w regionie.",
    organizer: "Fundacja Na Fundamentach Sportu",
    showLeaderboards: false,
    showPricing: true,
    pricingTitle: "Bieg 21km",
    pricingTiers: mockHalfMarathonPricing,
  },
  {
    id: 5,
    name: "Bieg Wrocław",
    location: "Wrocław",
    date: "22 czerwca 2026",
    startTime: "10:00",
    participants: 789,
    spotsLeft: 211,
    image: "/images/races/bieg-wroclaw.png",
    distances: ["5km", "10km", "Maraton"],
    description:
      "Bieg Wrocław to wielki festiwal biegowy w sercu miasta nad Odrą. Trzy dystanse — 5 km, 10 km i Maraton — gwarantują doskonałą zabawę dla całych rodzin i profesjonalistów. Trasa prowadzi przez ikoniczne miejsca Wrocławia, a pełen pakiet usług zapewnia niezapomniane przeżycia.",
    organizer: "Fundacja Na Fundamentach Sportu",
    showLeaderboards: false,
    showPricing: true,
    pricingTitle: "Bieg 10km",
    pricingTiers: mockTenKmPricing,
  },
  {
    id: 6,
    name: "Bike Maraton",
    location: "Karkonosze",
    date: "29 czerwca 2026",
    startTime: "8:00",
    participants: 234,
    spotsLeft: 166,
    image: "/images/races/bike-maraton.png",
    distances: ["30km", "60km", "100km"],
    description:
      "Bike Maraton Karkonosze to spektakularny wyścig rowerowy w górach. Trzy dystanse — 30, 60 i 100 km — oferują wyzwania na każdym poziomie zaawansowania. Karkonoskie szlaki, przepiękne widoki i rywalizacja w najpiękniejszej górskiej scenerii.",
    organizer: "Fundacja Na Fundamentach Sportu",
    showLeaderboards: false,
    showPricing: false,
  },
  {
    id: 7,
    name: "Rudawy Festiwal",
    location: "Rudawy Janowickie",
    date: "6 lipca 2026",
    startTime: "9:00",
    participants: 156,
    spotsLeft: 144,
    image: "/images/races/rudawy-festiwal.png",
    distances: ["15km Trail", "30km Trail"],
    description:
      "Rudawy Festiwal to impreza biegów górskich w Rudawach Janowickich. Trasy 15 i 30 km trail prowadzą przez charakterystyczne skały i granity Rudaw. Doskonała okazja dla miłośników trail runningu i górskiej przygody.",
    organizer: "Fundacja Na Fundamentach Sportu",
    showLeaderboards: false,
    showPricing: false,
  },
  {
    id: 8,
    name: "Bike Maraton Kids",
    location: "Szklarska Poręba",
    date: "13 czerwca 2026",
    startTime: "10:00",
    participants: 120,
    spotsLeft: 80,
    image: "/images/races/bike-maraton.png",
    distances: ["10km", "15km"],
    description:
      "Bike Maraton Kids to zawody rowerowe dedykowane najmłodszym sportowcom. Trasy 10 i 15 km prowadzą przez leśne ścieżki Szklarskiej Poręby, oferując bezpieczną i emocjonującą przygodę dla dzieci w każdym wieku. Start wraz z rodzicami mile widziany!",
    organizer: "Fundacja Na Fundamentach Sportu",
    showLeaderboards: false,
    showPricing: true,
    pricingTitle: "Dystans dziecięcy",
    pricingTiers: mockTenKmPricing,
  },
  {
    id: 9,
    name: "Rudawy Wiosenny Festiwal",
    location: "Rudawy Janowickie",
    date: "20 czerwca 2026",
    startTime: "9:00",
    participants: 198,
    spotsLeft: 102,
    image: "/images/races/rudawy-festiwal.png",
    distances: ["10km Trail", "15km Trail", "30km Trail"],
    description:
      "Rudawy Wiosenny Festiwal to wiosenna edycja biegów górskich w Rudawach Janowickich. Trzy dystanse trail — 10, 15 i 30 km — poprowadzą uczestników przez kwitnące wiosennie szlaki Rudaw. Impreza łącząca rywalizację z celebracją nadejścia wiosny w górach.",
    organizer: "Fundacja Na Fundamentach Sportu",
    showLeaderboards: false,
    showPricing: true,
    pricingTitle: "Bieg 15km Trail",
    pricingTiers: mockTenKmPricing,
  },
]

// Mock leaderboards data
export const mockLeaderboards: Leaderboard[] = [
  {
    id: "km",
    title: "Koneser kilometrów",
    unit: "km",
    entries: [
      { name: "Jan Kowalski", value: "2272.63" },
      { name: "Anna Nowak", value: "1984.20" },
      { name: "Piotr Wiśniewski", value: "1850.15" },
      { name: "Maria Kowalczyk", value: "1720.80" },
      { name: "Tomasz Zieliński", value: "1650.45" },
    ],
  },
  {
    id: "pace",
    title: "Sprinter",
    unit: "min/km",
    entries: [
      { name: "Piotr Wiśniewski", value: "4.31" },
      { name: "Maria Kowalczyk", value: "4.45" },
      { name: "Jan Kowalski", value: "4.52" },
      { name: "Anna Nowak", value: "4.58" },
      { name: "Katarzyna Lewandowska", value: "5.02" },
    ],
  },
  {
    id: "trainings",
    title: "Kolekcjoner treningów",
    unit: "treningów",
    entries: [
      { name: "Tomasz Zieliński", value: "192" },
      { name: "Katarzyna Lewandowska", value: "178" },
      { name: "Michał Wójcik", value: "165" },
      { name: "Magdalena Kamińska", value: "158" },
      { name: "Paweł Lewandowski", value: "149" },
    ],
  },
]

// Mock participants data for starting list
export const mockParticipants: Participant[] = [
  { bib: "001", name: "Jan Kowalski", city: "Warszawa", club: "Acro Run Team", category: "M30", status: "Opłacony" },
  { bib: "002", name: "Anna Nowak", city: "Kraków", club: "Wawel Biega", category: "K20", status: "Opłacony" },
  { bib: "003", name: "Piotr Wiśniewski", city: "Sosnowiec", club: "Zagłębie Runners", category: "M40", status: "Opłacony" },
  { bib: "004", name: "Maria Kowalczyk", city: "Katowice", club: "Silesia Marathon Club", category: "K30", status: "Opłacony" },
  { bib: "005", name: "Tomasz Zieliński", city: "Dąbrowa Górnicza", club: "Pogoria Tri", category: "M30", status: "Opłacony" },
  { bib: "006", name: "Katarzyna Lewandowska", city: "Gliwice", club: "Runners Gliwice", category: "K40", status: "Opłacony" },
  { bib: "007", name: "Michał Wójcik", city: "Wrocław", club: "Śląsk Run", category: "M20", status: "Opłacony" },
  { bib: "008", name: "Magdalena Kamińska", city: "Poznań", club: "Malta Poznań", category: "K30", status: "Opłacony" },
  { bib: "009", name: "Paweł Lewandowski", city: "Gdańsk", club: "Trójmiasto Ultra", category: "M40", status: "Opłacony" },
  { bib: "010", name: "Karolina Dąbrowska", city: "Łódź", club: "Łódź Kocha Biegać", category: "K20", status: "Opłacony" },
  { bib: "011", name: "Jakub Nowak", city: "Katowice", club: "Górnik Biegowy", category: "M35", status: "Opłacony" },
  { bib: "012", name: "Alicja Wiśniewska", city: "Bydgoszcz", club: "Bydgostia Runners", category: "K25", status: "Opłacony" },
  { bib: "013", name: "Krzysztof Lewandowski", city: "Szczecin", club: "Pogoń Biegacz", category: "M45", status: "Opłacony" },
  { bib: "014", name: "Anna Malinowska", city: "Lublin", club: "Lublin Biega", category: "K35", status: "Opłacony" },
  { bib: "015", name: "Marek Król", city: "Kielce", club: "Korona Bieg", category: "M50", status: "Opłacony" },
]

// Mock user race registrations — id matches the corresponding mockEvents id
export const mockUserRaces: UserRace[] = [
  {
    id: 1, // mockEvents id 1: MARCONI Duathlon
    name: "MARCONI Duathlon",
    location: "Świdnica",
    date: "17 maja 2026",
    startTime: "9:00",
    startNumber: "156",
    category: "M30",
    distance: "Sprint",
    daysUntil: 2,
    status: "confirmed",
    cover: "/images/races/marconi-duathlon.png",
    participantName: "Szymon Rogala",
  },
  {
    id: 2, // mockEvents id 2: Sowi Bieg 2026
    name: "Sowi Bieg 2026",
    location: "Góry Sowie",
    date: "24 maja 2026",
    startTime: "8:00",
    startNumber: "389",
    category: "M30",
    distance: "21km",
    daysUntil: 5,
    status: "confirmed",
    cover: "/images/races/sowi-bieg.png",
    participantName: "Szymon Rogala",
  },
  {
    id: 3, // mockEvents id 3: Triplet Leśny
    name: "Triplet Leśny",
    location: "Nadleśnictwo Grodzisk",
    date: "7 czerwca 2026",
    startTime: "7:00",
    startNumber: "2847",
    category: "M30",
    distance: "Triathlon",
    daysUntil: 19,
    status: "pending_payment",
    cover: "/images/races/triplet-lesny.png",
    participantName: "Szymon Rogala",
  },
  {
    id: 8, // mockEvents id 8: Bike Maraton Kids
    name: "Bike Maraton Kids",
    location: "Szklarska Poręba",
    date: "13 czerwca 2026",
    startTime: "10:00",
    startNumber: "78",
    category: "Dzieci 10-12",
    distance: "15km",
    daysUntil: 25,
    status: "confirmed",
    cover: "/images/races/bike-maraton.png",
    participantName: "Szymon Rogala",
  },
  {
    id: 9, // mockEvents id 9: Rudawy Wiosenny Festiwal
    name: "Rudawy Wiosenny Festiwal",
    location: "Rudawy Janowickie",
    date: "20 czerwca 2026",
    startTime: "9:00",
    startNumber: "112",
    category: "K25",
    distance: "15km Trail",
    daysUntil: 32,
    status: "confirmed",
    cover: "/images/races/rudawy-festiwal.png",
    participantName: "Szymon Rogala",
  },
]

// Mock event hub actions
export const mockEventHubActions = (eventId: number | string): EventHubAction[] => {
  const zapisyBase = `/zapisy?event=${eventId}`
  return [
    {
      id: "signup-individual",
      title: "Zapisz się na zawody",
      shortLabel: "Zapis indywidualny",
      description:
        "Dla osób pełnoletnich. Niepełnoletni — formularze zgody rodziców przy zapisie.",
      href: zapisyBase,
      tier: "primary",
    },
    {
      id: "payment",
      title: "Zapłać za start",
      shortLabel: "Opłata startowa",
      description: "Opłać swój start, start innej osoby lub całej grupy.",
      href: zapisyBase,
      tier: "primary",
    },
    {
      id: "results",
      title: "Wyniki zawodów",
      shortLabel: "Wyniki",
      description: "Wyniki na żywo — kliknij zawodnika, aby zobaczyć szczegóły.",
      href: "/wyniki",
      tier: "primary",
    },
    {
      id: "exchange",
      title: "Giełda Pakietów",
      description:
        "Oficjalna wymiana pakietów startowych między zawodnikami — bezpiecznie i z weryfikacją organizatora.",
      href: "#gielda-pakietow",
      tier: "secondary",
      variant: "highlight",
    },
    {
      id: "regulations",
      title: "Regulamin zawodów",
      shortLabel: "Regulamin",
      description: "Umowa z organizatorem oraz dane kontaktowe.",
      href: "#regulamin",
      tier: "secondary",
    },
    {
      id: "participants",
      title: "Lista zgłoszonych",
      shortLabel: "Uczestnicy",
      description: "Kto opłacił start — z linkiem do historii startów.",
      href: "#lista-zgloszonych",
      tier: "secondary",
    },
    {
      id: "stats",
      title: "Statystyki zapisów",
      shortLabel: "Statystyki",
      description: "Zapisani vs opłaceni — podgląd na bieżąco.",
      href: "#statystyki",
      tier: "secondary",
    },
    {
      id: "signup-group",
      title: "Zapisy — rodzice i trenerzy",
      shortLabel: "Zapis grupowy",
      description: "Zapisz podopiecznych lub dzieci z jednego miejsca.",
      href: `${zapisyBase}&type=group`,
      tier: "secondary",
    },
    {
      id: "voucher",
      title: "Voucher prezentowy",
      shortLabel: "Voucher",
      description: "Start w prezencie dla bliskiej osoby.",
      href: `${zapisyBase}&voucher=1`,
      tier: "utility",
    },
    {
      id: "insurance",
      title: "Ubezpieczenia",
      shortLabel: "Ubezpieczenia",
      description: "NNW i ochrona kosztów rezygnacji — wybór przy zapisie.",
      href: "#ubezpieczenia",
      tier: "utility",
    },
  ]
}
