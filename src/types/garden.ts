export type PlayerId = 'cam' | 'leesh'

export interface Player {
  id: PlayerId
  name: string
  xp: number
  level: number
}

export type TaskType = 'water' | 'weed' | 'harvest' | 'plant' | 'check'

export interface TaskLog {
  id: string
  playerId: PlayerId
  taskType: TaskType
  plantSlotId?: number
  loggedAt: string
  notes?: string
}

export type GrowthStage = 'empty' | 'planted' | 'sprouting' | 'growing' | 'flowering' | 'harvest'

export interface PlantSlot {
  id: number
  label: string
  plantName: string
  stage: GrowthStage
  plantedDate?: string
  expectedHarvestDays?: number
  notes?: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  emoji: string
}

export interface AppState {
  players: Record<PlayerId, Player>
  taskLogs: TaskLog[]
  tunnelSlots: PlantSlot[]
  unlockedAchievements: Record<PlayerId, string[]>
}
