import type { MaPiece } from '../types'

const STORAGE_KEY = 'ma-pieces-v1'

export function loadPieces(): MaPiece[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as MaPiece[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function savePiece(piece: MaPiece): MaPiece[] {
  const next = [piece, ...loadPieces()].slice(0, 48)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export function deletePiece(id: string): MaPiece[] {
  const next = loadPieces().filter((p) => p.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export function formatDuration(ms: number): string {
  const totalSec = Math.max(0, Math.round(ms / 1000))
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  if (m === 0) return `${s} 秒`
  return `${m} 分 ${s.toString().padStart(2, '0')} 秒`
}

export function pieceTitle(seed: number, durationMs: number): string {
  const tones = [
    '晨霧',
    '薄暮',
    '餘響',
    '靜脈',
    '空庭',
    '遠岸',
    '淺息',
    '影隙',
    '冷泉',
    '石間',
    '微瀾',
    '沉墨',
  ]
  const tone = tones[Math.abs(seed) % tones.length]
  const mins = Math.max(1, Math.round(durationMs / 60000))
  return `${tone}·${mins}`
}
