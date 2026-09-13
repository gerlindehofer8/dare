export type Gender = 'Mann' | 'Frau'| 'Keine Angabe'
export type Category = 'Romantic' | 'Touch' | 'Flirty' | 'Massage' | 'Surprise' | 'Spicy'
export type Target = 'Mann' | 'Frau' | 'Beliebig'
export type GameMode = 'Classic' | 'Custom' | 'Choose' | 'Spicy'

export interface Dare { id: string; text: string; category: Category; spiceLevel: 1 | 2 | 3 | 4 | 5; target: Target; duration?: number; isTimer: boolean; isSpecial: boolean; spiceValue: number; description?: string; isCustom?: boolean; active?: boolean }
export interface Player { name: string; gender: Gender; skips: number }
export interface GameSettings { maxSpice: 1 | 2 | 3 | 4 | 5; timerEnabled: boolean; ownDares: boolean; selectedCategories: Category[]; unlimitedSkips: boolean; sound: boolean; animations: boolean; language: 'de'; surpriseChance: number }
export interface GameState { id: string; gameCode: string; players: [Player, Player]; mode: GameMode; settings: GameSettings; round: number; currentPlayerIndex: 0 | 1; spiceScore: number; currentDare: Dare; usedIds: string[]; history: string[]; completed: number; streak: number; paused: boolean; choosePending: boolean; createdAt: string }
