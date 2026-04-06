import type { PlantSlot, Achievement, TaskType } from '@/types/garden'

export const tunnelSlots: PlantSlot[] = [
  { id: 1, label: 'Space 1', plantName: 'Rocket',      stage: 'sprouting', expectedHarvestDays: 40 },
  { id: 2, label: 'Space 2', plantName: 'Spinach',     stage: 'sprouting', expectedHarvestDays: 45 },
  { id: 3, label: 'Space 3', plantName: 'Broccoli',    stage: 'sprouting', expectedHarvestDays: 80 },
  { id: 4, label: 'Space 4', plantName: 'Cauliflower', stage: 'sprouting', expectedHarvestDays: 75 },
  { id: 5, label: 'Space 5', plantName: 'Radish',      stage: 'empty',     expectedHarvestDays: 30 },
  { id: 6, label: 'Space 6', plantName: 'Carrot',      stage: 'empty',     expectedHarvestDays: 70 },
  { id: 7, label: 'Space 7', plantName: 'Seedling?',   stage: 'empty' },
]

export const STAGE_LABELS: Record<string, string> = {
  empty:     '⬜ Empty',
  planted:   '🌰 Planted',
  sprouting: '🌱 Sprouting',
  growing:   '🌿 Growing',
  flowering: '🌸 Flowering',
  harvest:   '🍅 Ready to Harvest',
}

export const STAGE_COLORS: Record<string, string> = {
  empty:     'bg-gray-100 text-gray-400',
  planted:   'bg-amber-100 text-amber-700',
  sprouting: 'bg-lime-100 text-lime-700',
  growing:   'bg-green-100 text-green-700',
  flowering: 'bg-pink-100 text-pink-700',
  harvest:   'bg-red-100 text-red-700',
}

export const XP_REWARDS: Record<TaskType, number> = {
  water:   10,
  weed:    15,
  harvest: 50,
  plant:   20,
  check:   5,
}

export const TASK_LABELS: Record<TaskType, string> = {
  water:   'Watered',
  weed:    'Weeded',
  harvest: 'Harvested',
  plant:   'Planted',
  check:   'Checked in',
}
