import type { Metadata, Viewport } from 'next'
import { Inter, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/dashboard/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-outfit'
});

export const metadata: Metadata = {
  title: 'DATASPORT - Portal Zawodnika',
  description: 'Portal zawodnika - treningi, zawody, wyniki',
}

export const viewport: Viewport = {
  themeColor: '#dc2626',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className="bg-background" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
