'use client'

import { useGame } from '@/context/GameContext'
import TaskBoard from '@/components/TaskBoard'

export default function LogPage() {
  const { activePlayer, setActivePlayer, state } = useGame()

  return (
    <main className="min-h-[calc(100vh-3.5rem)] px-4 py-6 md:px-8">
      <div className="max-w-3xl mx-auto space-y-6">

        <header>
          <h1 className="font-heading text-3xl font-semibold text-garden-light">Garden log</h1>
          <p className="text-garden-straw/70 text-sm mt-1">
            Who&apos;s been out in the tunnel?
          </p>
        </header>

        {/* Player picker */}
        <div className="flex gap-3">
          {(['cam', 'leesh'] as const).map(id => {
            const player = state.players[id]
            const active = activePlayer === id
            return (
              <button
                key={id}
                onClick={() => setActivePlayer(active ? null : id)}
                className={`
                  flex-1 flex items-center gap-3 rounded-2xl px-5 py-4 border-2 transition-all font-heading font-semibold
                  ${active
                    ? 'border-garden-light bg-garden-green/30 text-garden-light scale-[1.02]'
                    : 'border-garden-soil/30 bg-garden-soil/20 text-garden-straw/60 hover:border-garden-straw/40'}
                `}
              >
                <span className={`
                  w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold
                  ${active ? 'bg-garden-light text-garden-soil' : 'bg-garden-soil/40 text-garden-straw/50'}
                `}>
                  Lv{player.level}
                </span>
                <div className="text-left">
                  <p className="text-lg leading-tight">{player.name}</p>
                  <p className={`text-xs ${active ? 'text-garden-light/70' : 'text-garden-straw/40'}`}>
                    {player.xp} XP
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {!activePlayer && (
          <div className="text-center py-12 space-y-2">
            <p className="text-4xl">👆</p>
            <p className="text-garden-straw/50 text-sm italic">
              Tap your name to get started
            </p>
          </div>
        )}

        {activePlayer && <TaskBoard />}
      </div>
    </main>
  )
}
