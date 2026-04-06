import type { Metadata } from 'next'
import { Fredoka, Nunito } from 'next/font/google'
import { GameProvider } from '@/context/GameContext'
import BottomNav from '@/components/BottomNav'
import './globals.css'

const heading = Fredoka({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-fredoka',
})

const body = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'The Daily Harvest',
  description: 'Cam and Leesh\'s real-life garden game — log tasks, earn XP, grow together.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${heading.variable} ${body.variable} font-body antialiased min-h-screen`}
      >
        <GameProvider>
          {children}
          <BottomNav />
        </GameProvider>
      </body>
    </html>
  )
}
