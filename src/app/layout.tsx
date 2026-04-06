import type { Metadata } from 'next'
import Link from 'next/link'
import { Fredoka, Nunito } from 'next/font/google'
import { GameProvider } from '@/context/GameContext'
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
        <nav className="border-b border-garden-soil/30 bg-garden-soil/30 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-3 flex gap-6 text-sm font-heading font-semibold">
            <Link href="/" className="text-garden-light hover:text-garden-straw transition-colors">
              Grow tunnel
            </Link>
            <Link href="/log" className="text-garden-light hover:text-garden-straw transition-colors">
              Log task
            </Link>
          </div>
        </nav>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  )
}
