'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import type { AppState, PlayerId, TaskType, PlantSlot } from '@/types/garden'
import { initialState, playerWithUpdatedLevel } from '@/lib/players'
import { XP_REWARDS } from '@/lib/gardenData'

const STORAGE_KEY = 'dailyHarvest'

interface GameContextValue {
  state: AppState
  logTask: (playerId: PlayerId, taskType: TaskType, plantSlotId?: number, notes?: string) => void
  plantInSlot: (playerId: PlayerId, slotId: number, plantName: string, expectedHarvestDays?: number) => void
  harvestSlot: (playerId: PlayerId, slotId: number) => void
  activePlayer: PlayerId | null
  setActivePlayer: (id: PlayerId | null) => void
}

const GameContext = createContext<GameContextValue | null>(null)

function loadState(): AppState {
  if (typeof window === 'undefined') return initialState()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore corrupt data */ }
  return initialState()
}

function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch { /* quota exceeded etc */ }
}

function makeLog(playerId: PlayerId, taskType: TaskType, plantSlotId?: number, notes?: string) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    playerId,
    taskType,
    plantSlotId,
    loggedAt: new Date().toISOString(),
    notes,
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => initialState())
  const [activePlayer, setActivePlayer] = useState<PlayerId | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setState(loadState())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) saveState(state)
  }, [state, hydrated])

  const logTask = useCallback(
    (playerId: PlayerId, taskType: TaskType, plantSlotId?: number, notes?: string) => {
      setState(prev => {
        const xpGain = XP_REWARDS[taskType]
        const player = prev.players[playerId]
        const updated = playerWithUpdatedLevel({ ...player, xp: player.xp + xpGain })

        return {
          ...prev,
          players: { ...prev.players, [playerId]: updated },
          taskLogs: [makeLog(playerId, taskType, plantSlotId, notes), ...prev.taskLogs].slice(0, 200),
        }
      })
    },
    [],
  )

  const plantInSlot = useCallback(
    (playerId: PlayerId, slotId: number, plantName: string, expectedHarvestDays?: number) => {
      setState(prev => {
        const xpGain = XP_REWARDS.plant
        const player = prev.players[playerId]
        const updated = playerWithUpdatedLevel({ ...player, xp: player.xp + xpGain })

        const slots = prev.tunnelSlots.map((s): PlantSlot =>
          s.id === slotId
            ? { ...s, plantName, stage: 'planted', plantedDate: new Date().toISOString().slice(0, 10), expectedHarvestDays }
            : s,
        )

        return {
          ...prev,
          players: { ...prev.players, [playerId]: updated },
          tunnelSlots: slots,
          taskLogs: [makeLog(playerId, 'plant', slotId, `Planted ${plantName}`), ...prev.taskLogs].slice(0, 200),
        }
      })
    },
    [],
  )

  const harvestSlot = useCallback(
    (playerId: PlayerId, slotId: number) => {
      setState(prev => {
        const slot = prev.tunnelSlots.find(s => s.id === slotId)
        const xpGain = XP_REWARDS.harvest
        const player = prev.players[playerId]
        const updated = playerWithUpdatedLevel({ ...player, xp: player.xp + xpGain })

        const slots = prev.tunnelSlots.map((s): PlantSlot =>
          s.id === slotId
            ? { ...s, stage: 'empty', plantedDate: undefined, expectedHarvestDays: undefined, plantName: '' }
            : s,
        )

        return {
          ...prev,
          players: { ...prev.players, [playerId]: updated },
          tunnelSlots: slots,
          taskLogs: [
            makeLog(playerId, 'harvest', slotId, `Harvested ${slot?.plantName ?? ''}`),
            ...prev.taskLogs,
          ].slice(0, 200),
        }
      })
    },
    [],
  )

  return (
    <GameContext.Provider value={{ state, logTask, plantInSlot, harvestSlot, activePlayer, setActivePlayer }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used inside <GameProvider>')
  return ctx
}
