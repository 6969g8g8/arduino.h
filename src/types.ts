export type View = 'home' | 'session' | 'complete' | 'gallery' | 'about'

export interface MaPiece {
  id: string
  createdAt: number
  durationMs: number
  stillnessRatio: number
  seed: number
  title: string
  inkDataUrl: string
}

export interface SessionStats {
  durationMs: number
  stillnessRatio: number
  seed: number
  inkDataUrl: string
}
