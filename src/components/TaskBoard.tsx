'use client'

import { useState, useCallback } from 'react'
import { useGame } from '@/context/GameContext'
import { XP_REWARDS } from '@/lib/gardenData'

interface Toast {
  id: string
  text: string
  xp: number
}

function daysAgo(isoDate: string): number {
  const then = new Date(isoDate)
  const now = new Date()
  return Math.floor((now.getTime() - then.getTime()) / 86_400_000)
}

function daysUntilHarvest(plantedDate?: string, expectedDays?: number): number | null {
  if (!plantedDate || !expectedDays) return null
  const elapsed = daysAgo(plantedDate)
  return Math.max(0, expectedDays - elapsed)
}

export default function TaskBoard() {
  const { logTask, plantInSlot, harvestSlot, activePlayer, state } = useGame()
  const [toasts, setToasts] = useState<Toast[]>([])
  const [plantingSlotId, setPlantingSlotId] = useState<number | null>(null)
  const [plantName, setPlantName] = useState('')
  const [harvestDays, setHarvestDays] = useState('')

  const addToast = useCallback((text: string, xp: number) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    setToasts(prev => [...prev, { id, text, xp }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2500)
  }, [])

  const handleChore = useCallback(
    (type: 'water' | 'weed') => {
      if (!activePlayer) return
      logTask(activePlayer, type)
      const label = type === 'water' ? 'Watered the tunnel' : 'Weeded the tunnel'
      addToast(label, XP_REWARDS[type])
    },
    [activePlayer, logTask, addToast],
  )

  const handlePlant = useCallback(() => {
    if (!activePlayer || !plantingSlotId || !plantName.trim()) return
    const days = harvestDays ? parseInt(harvestDays, 10) : undefined
    plantInSlot(activePlayer, plantingSlotId, plantName.trim(), days)
    addToast(`Planted ${plantName.trim()}`, XP_REWARDS.plant)
    setPlantingSlotId(null)
    setPlantName('')
    setHarvestDays('')
  }, [activePlayer, plantingSlotId, plantName, harvestDays, plantInSlot, addToast])

  const handleHarvest = useCallback(
    (slotId: number, name: string) => {
      if (!activePlayer) return
      harvestSlot(activePlayer, slotId)
      addToast(`Harvested ${name}`, XP_REWARDS.harvest)
    },
    [activePlayer, harvestSlot, addToast],
  )

  const recentLogs = state.taskLogs.filter(l => l.playerId === activePlayer).slice(0, 6)
  const emptySlots = state.tunnelSlots.filter(s => s.stage === 'empty')
  const grownSlots = state.tunnelSlots.filter(s => s.stage !== 'empty')

  return (
    <div className="space-y-8">

      {/* ── Daily chores ── */}
      <section>
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-garden-straw/50 mb-3">
          Daily chores — whole tunnel
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => handleChore('water')}
            className="group relative overflow-hidden rounded-2xl border-2 border-garden-soil/25 bg-garden-soil/20 p-5 text-left transition-all hover:border-blue-400/40 hover:bg-blue-900/15 active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:animate-bounce">💧</span>
              <div>
                <p className="font-heading font-semibold text-garden-straw text-lg">Water</p>
                <p className="text-garden-straw/50 text-xs">Give everything a good drink</p>
              </div>
            </div>
            <span className="absolute top-3 right-3 text-xs font-heading text-garden-light/50">+{XP_REWARDS.water} XP</span>
          </button>

          <button
            onClick={() => handleChore('weed')}
            className="group relative overflow-hidden rounded-2xl border-2 border-garden-soil/25 bg-garden-soil/20 p-5 text-left transition-all hover:border-green-400/40 hover:bg-green-900/15 active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl group-hover:animate-bounce">🌿</span>
              <div>
                <p className="font-heading font-semibold text-garden-straw text-lg">Weed</p>
                <p className="text-garden-straw/50 text-xs">Pull out the unwanted guests</p>
              </div>
            </div>
            <span className="absolute top-3 right-3 text-xs font-heading text-garden-light/50">+{XP_REWARDS.weed} XP</span>
          </button>
        </div>
      </section>

      {/* ── Plant something new ── */}
      <section>
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-garden-straw/50 mb-3">
          Plant something new
        </h2>

        {emptySlots.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-garden-soil/20 bg-garden-soil/10 p-6 text-center">
            <p className="text-garden-straw/40 text-sm italic">All spaces are planted — nice work!</p>
          </div>
        ) : plantingSlotId === null ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {emptySlots.map(slot => (
              <button
                key={slot.id}
                onClick={() => setPlantingSlotId(slot.id)}
                className="rounded-2xl border-2 border-dashed border-garden-straw/20 bg-garden-soil/15 p-4 text-center transition-all hover:border-garden-light/40 hover:bg-garden-green/15 active:scale-95"
              >
                <span className="text-3xl block mb-1">🪴</span>
                <p className="font-heading font-semibold text-garden-straw text-sm">{slot.label}</p>
                <p className="text-garden-straw/40 text-xs mt-0.5">Empty bed</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-garden-light/30 bg-garden-green/10 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-heading font-semibold text-garden-light text-base">
                Planting in {state.tunnelSlots.find(s => s.id === plantingSlotId)?.label}
              </p>
              <button
                onClick={() => { setPlantingSlotId(null); setPlantName(''); setHarvestDays('') }}
                className="text-garden-straw/50 hover:text-garden-straw text-xs font-heading"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-garden-straw/60 font-heading mb-1">What are you planting?</label>
                <input
                  type="text"
                  value={plantName}
                  onChange={e => setPlantName(e.target.value)}
                  placeholder="e.g. Tomatoes, Rocket, Courgette"
                  className="w-full rounded-xl bg-garden-soil/30 border border-garden-soil/20 px-4 py-2.5 text-sm text-garden-straw placeholder:text-garden-straw/30 font-body focus:outline-none focus:border-garden-light/50"
                />
              </div>
              <div>
                <label className="block text-xs text-garden-straw/60 font-heading mb-1">Days until harvest (approx)</label>
                <input
                  type="number"
                  value={harvestDays}
                  onChange={e => setHarvestDays(e.target.value)}
                  placeholder="e.g. 60"
                  min="1"
                  className="w-full rounded-xl bg-garden-soil/30 border border-garden-soil/20 px-4 py-2.5 text-sm text-garden-straw placeholder:text-garden-straw/30 font-body focus:outline-none focus:border-garden-light/50"
                />
              </div>
            </div>

            <button
              onClick={handlePlant}
              disabled={!plantName.trim()}
              className="w-full rounded-xl bg-garden-green/80 hover:bg-garden-green text-white font-heading font-semibold py-3 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              🪴 Plant it — +{XP_REWARDS.plant} XP
            </button>
          </div>
        )}
      </section>

      {/* ── Growing & harvest ── */}
      {grownSlots.length > 0 && (
        <section>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-garden-straw/50 mb-3">
            Growing now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {grownSlots.map(slot => {
              const remaining = daysUntilHarvest(slot.plantedDate, slot.expectedHarvestDays)
              const readyish = remaining !== null && remaining <= 0
              return (
                <div
                  key={slot.id}
                  className={`rounded-2xl border-2 p-4 transition-all ${
                    readyish
                      ? 'border-garden-light/40 bg-garden-green/15'
                      : 'border-garden-soil/25 bg-garden-soil/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="font-heading font-semibold text-garden-straw text-base">{slot.plantName}</p>
                      <p className="text-xs text-garden-straw/40 font-heading">{slot.label}</p>
                    </div>
                    {readyish && <span className="text-2xl">🍅</span>}
                  </div>

                  {slot.plantedDate && (
                    <p className="text-xs text-garden-straw/50 mt-1">
                      Planted {slot.plantedDate} · {daysAgo(slot.plantedDate)} days ago
                    </p>
                  )}

                  {remaining !== null && !readyish && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-garden-straw/50 mb-1">
                        <span>~{remaining} days left</span>
                        <span>{slot.expectedHarvestDays}d total</span>
                      </div>
                      <div className="h-1.5 bg-garden-straw/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-garden-green rounded-full transition-all"
                          style={{ width: `${Math.min(100, ((slot.expectedHarvestDays! - remaining) / slot.expectedHarvestDays!) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {readyish && (
                    <button
                      onClick={() => handleHarvest(slot.id, slot.plantName)}
                      className="mt-3 w-full rounded-xl bg-garden-brick/60 hover:bg-garden-brick text-white font-heading font-semibold py-2 text-sm transition-all active:scale-[0.98]"
                    >
                      🧺 Harvest — +{XP_REWARDS.harvest} XP
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Recent activity ── */}
      {recentLogs.length > 0 && (
        <section>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-garden-straw/50 mb-3">
            Recent
          </h2>
          <div className="space-y-1.5">
            {recentLogs.map(log => (
              <div
                key={log.id}
                className="flex items-center gap-3 bg-garden-soil/15 rounded-xl px-4 py-2 border border-garden-soil/10"
              >
                <span className="text-base">
                  {log.taskType === 'water' ? '💧' : log.taskType === 'weed' ? '🌿' : log.taskType === 'plant' ? '🪴' : '🧺'}
                </span>
                <span className="text-sm text-garden-straw/70 flex-1">
                  {log.notes ?? log.taskType}
                </span>
                <span className="text-xs text-garden-light/40 font-heading">
                  +{XP_REWARDS[log.taskType]} XP
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* XP toasts */}
      <div className="fixed bottom-6 right-6 space-y-2 z-50 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="bg-garden-green text-white rounded-xl px-4 py-2.5 shadow-lg font-heading font-semibold text-sm animate-bounce"
          >
            {toast.text} <span className="text-garden-light ml-1">+{toast.xp} XP</span>
          </div>
        ))}
      </div>
    </div>
  )
}
