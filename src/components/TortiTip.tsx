'use client'

import { useEffect, useState } from 'react'

const tips = [
  'Pssst... your courgette is looking suspiciously large. Better harvest it before it becomes a weapon.',
  'I supervise. I do not water. We\'ve been over this.',
  'The tomatoes need sun. I also need sun. Coincidence? I think not.',
  'You forgot to check Space 4 again. I saw you.',
  'In my professional opinion, the basil smells excellent. Well done.',
]

function pickTip(): string {
  return tips[Math.floor(Math.random() * tips.length)]
}

export default function TortiTip() {
  const [tip, setTip] = useState<string | null>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setTip(pickTip())
    })
    return () => cancelAnimationFrame(id)
  }, [])

  if (!tip) {
    return (
      <aside className="flex gap-4 items-start bg-garden-torti/5 border border-garden-torti/20 rounded-2xl p-4 min-h-[5rem]">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-garden-torti/20 flex items-center justify-center text-2xl">
          😼
        </div>
        <div className="flex-1 animate-pulse bg-garden-torti/10 rounded h-12" />
      </aside>
    )
  }

  return (
    <aside className="flex gap-4 items-start bg-garden-torti/5 border border-garden-torti/20 rounded-2xl p-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-garden-torti/20 flex items-center justify-center text-2xl">
        😼
      </div>
      <div>
        <p className="text-xs font-heading font-semibold text-garden-torti/70 uppercase tracking-wide mb-1">
          Torti says…
        </p>
        <p className="text-sm text-gray-700 italic">{tip}</p>
      </div>
    </aside>
  )
}
