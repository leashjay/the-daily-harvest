import type { Metadata } from 'next'
import Link from 'next/link'
import { Fredoka, Nunito } from 'next/font/google'
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
  description: 'Cam and Leesh\'s real-life garden game — log tasks, earn XP, compete.',
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
        <nav className="border-b border-garden-light/60 bg-white/70 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-3 flex gap-6 text-sm font-heading font-semibold text-garden-soil">
            <Link href="/" className="text-garden-green hover:text-garden-brick transition-colors">
              Dashboard
            </Link>
            <Link href="/garden" className="text-garden-green hover:text-garden-brick transition-colors">
              Grow tunnel
            </Link>
            <Link href="/log" className="text-garden-green hover:text-garden-brick transition-colors">
              Log task
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
