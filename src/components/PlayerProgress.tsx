'use client'

import { useGame } from '@/context/GameContext'
import XPBar from './XPBar'

export default function PlayerProgress() {
  const { state } = useGame()

  return (
    <div>
      <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-garden-straw/70 mb-3">
        Gardener progress
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <XPBar player={state.players.cam} />
        <XPBar player={state.players.leesh} />
      </div>
    </div>
  )
}
