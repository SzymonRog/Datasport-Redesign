import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/dashboard/theme-provider'
import './globals.css'

const satoshi = localFont({
  src: [
    { path: '../public/fonts/Satoshi-Light.otf', weight: '300', style: 'normal' },
    { path: '../public/fonts/Satoshi-LightItalic.otf', weight: '300', style: 'italic' },
    { path: '../public/fonts/Satoshi-Regular.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Satoshi-Italic.otf', weight: '400', style: 'italic' },
    { path: '../public/fonts/Satoshi-Medium.otf', weight: '500', style: 'normal' },
    { path: '../public/fonts/Satoshi-MediumItalic.otf', weight: '500', style: 'italic' },
    { path: '../public/fonts/Satoshi-Bold.otf', weight: '700', style: 'normal' },
    { path: '../public/fonts/Satoshi-BoldItalic.otf', weight: '700', style: 'italic' },
    { path: '../public/fonts/Satoshi-Black.otf', weight: '900', style: 'normal' },
    { path: '../public/fonts/Satoshi-BlackItalic.otf', weight: '900', style: 'italic' },
  ],
  variable: '--font-satoshi',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
      <body className={`${satoshi.variable} ${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
