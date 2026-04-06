# The Daily Harvest — Project Kickstart Guide

A Next.js real-life gardening game for **Cam and Leesh**. Log your garden tasks — watering, weeding, harvesting — earn XP, and compete on a live leaderboard.

---

## The Concept

This is an **IRL (in real life) game**. No simulated gardens — you go outside, do the actual thing, then tap a button to log it.

**Players:** Cam and Leesh. Both have accounts. Either can log a task; the other can see it in real time.

**The loop:**
1. Go out to the garden and do a task (water, weed, harvest, etc.)
2. Open the app, tap the task
3. Earn XP — the other player sees your update
4. Check the leaderboard and feel either smug or motivated

**The competitive edge:**
- Each player has their own XP total and level
- A shared leaderboard shows who's ahead
- Achievements are per-player (first to harvest, most weeding streak, etc.)
- Some tasks are shared/garden-wide (planting, stage updates) and some are personal (who actually did the watering today)

---

## 1. Project Setup

This repo is already bootstrapped. To get started:

```bash
pnpm install
pnpm run dev      # localhost:3000
```

**Dev Container:** Open in VS Code / Cursor and run **"Dev Containers: Reopen in Container"**. Node 22 + `pnpm install` run automatically, port 3000 is forwarded.

---

## 2. Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with nav + player header
│   ├── page.tsx            # Dashboard — leaderboard + recent activity feed
│   ├── globals.css         # Tailwind v4 @theme tokens (garden palette)
│   ├── garden/
│   │   └── page.tsx        # Tunnel map — 7 spaces, plant stages
│   └── log/
│       └── page.tsx        # Log a task (water / weed / harvest / other)
├── components/
│   ├── TunnelMap.tsx       # 7-space plant grid
│   ├── PlantCard.tsx       # Individual plant slot
│   ├── XPBar.tsx           # Player XP bar
│   ├── LevelBadge.tsx      # Level display
│   ├── Leaderboard.tsx     # Cam vs Leesh score card
│   ├── ActivityFeed.tsx    # Recent logs by either player
│   ├── TaskButton.tsx      # Big tap-to-log button (water / weed / etc.)
│   └── AchievementToast.tsx # Badge pop-up on unlock
├── lib/
│   ├── gardenData.ts       # Plant slots, growth stages, static config
│   ├── achievements.ts     # Achievement definitions + trigger logic
│   ├── xp.ts               # XP values, level thresholds, helpers
│   └── players.ts          # Player profiles (Cam, Leesh)
└── types/
    └── garden.ts           # TypeScript interfaces
```

---

## 3. Core Data Model

### Players

```ts
export type PlayerId = 'cam' | 'leesh'

export interface Player {
  id: PlayerId
  name: string       // 'Cam' | 'Leesh'
  xp: number
  level: number
}
```

### Tasks (what earns XP)

```ts
export type TaskType = 'water' | 'weed' | 'harvest' | 'plant' | 'check'

export interface TaskLog {
  id: string
  playerId: PlayerId
  taskType: TaskType
  plantSlotId?: number   // optional — which tunnel space
  loggedAt: string       // ISO datetime
  notes?: string
}
```

### XP per task

| Task      | XP |
|-----------|----|
| Water     | 10 |
| Weed      | 15 |
| Harvest   | 50 |
| Plant     | 20 |
| Check in  | 5  |

### Plant stages (shared, not per-player)

```ts
export type GrowthStage = 'empty' | 'planted' | 'sprouting' | 'growing' | 'flowering' | 'harvest'

export interface PlantSlot {
  id: number
  label: string
  plantName: string
  stage: GrowthStage
  plantedDate?: string
  expectedHarvestDays?: number   // days from planted to harvest
  notes?: string
}
```

---

## 4. Gamification

### Levels (per player)

| Level | Name            | XP Required |
|-------|-----------------|-------------|
| 1     | Seedling        | 0           |
| 2     | Sprout          | 150         |
| 3     | Grower          | 400         |
| 4     | Harvester       | 900         |
| 5     | Master Gardener | 2000        |

### Achievements (per player)

| Badge               | Trigger                                        |
|---------------------|------------------------------------------------|
| First Drop          | Log your first watering                        |
| Weed Warrior        | Weed 5 times total                             |
| First Harvest       | First plant reaches harvest and you logged it  |
| On a Streak         | Log a task 3 days in a row                     |
| Green Fingers       | 3 plants in 'growing' or beyond at once        |
| Dedicated Grower    | Log 10 tasks total                             |
| Tunnel Complete     | All 7 spaces have an active plant              |

### Leaderboard

The dashboard shows a simple head-to-head: Cam's XP vs Leesh's XP, who's ahead, and the most recent task logged by each.

---

## 5. Color Theme

Palette lives in `src/app/globals.css` under `@theme inline`:

```css
--color-garden-green:  #4a7c59;   /* sage — primary */
--color-garden-light:  #a8d5b5;   /* mint — accents */
--color-garden-soil:   #7b5e3a;   /* warm brown — cards, text */
--color-garden-straw:  #e8d5a3;   /* pale wheat — backgrounds */
--color-garden-brick:  #c9756c;   /* dusty pink — XP bar, buttons */
--color-garden-sky:    #b8d4e8;   /* soft blue — page tint */
```

Fonts: **Fredoka** (headings) + **Nunito** (body) — already wired in `layout.tsx`.

---

## 6. Pages

### `/` — Dashboard
- Leaderboard card: Cam XP vs Leesh XP, current levels
- Activity feed: last ~10 task logs from both players
- Quick-log buttons (water / weed shortcuts)

### `/garden` — Tunnel Map
- 7 plant slots in a grid
- Each shows plant name, current stage, days since planted
- Tap a slot to update its stage

### `/log` — Log a Task
- Choose task type (water, weed, harvest, plant, check)
- Optionally link to a tunnel space
- Add a note
- Submit → XP is awarded, activity feed updates

---

## 7. State / Storage

Start with **local state + `localStorage`** to get the app working without a backend. Shape it like this so swapping to a database later is straightforward:

```ts
// stored in localStorage under 'dailyHarvest'
interface AppState {
  players: Record<PlayerId, Player>
  taskLogs: TaskLog[]
  tunnelSlots: PlantSlot[]
  achievements: Record<PlayerId, string[]>   // achievement ids unlocked
}
```

When you're ready to go multi-device (so Cam and Leesh can both log from their phones), swap `localStorage` for **Vercel Postgres** or **Upstash Redis** with a simple API route layer.

---

## 8. First Build Sprint

Work through these in order to get something playable quickly:

- [ ] Build `/log` page with task buttons — hardcoded player for now
- [ ] Wire XP to localStorage so it persists between visits
- [ ] Build the leaderboard component on `/`
- [ ] Build the activity feed
- [ ] Add the tunnel map on `/garden` with stage update
- [ ] Add achievement unlock logic + toast
- [ ] Deploy to Vercel so you can use it on your phones
- [ ] Add player switching (or simple "who are you?" login) so Cam and Leesh log separately

---

## 9. Useful Commands

```bash
pnpm install                                                    # install deps
pnpm run dev                                                    # localhost:3000
pnpm run build                                                  # production build
pnpm run lint                                                   # lint check
git add -A && git commit -m "feat: describe your change" && git push
```

---

*Good luck out there. May your courgettes not become weapons and your XP bar stay ahead of Cam's.*
