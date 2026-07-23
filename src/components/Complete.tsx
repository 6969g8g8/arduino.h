import { motion } from 'framer-motion'
import { formatDuration, pieceTitle } from '../lib/storage'
import type { SessionStats } from '../types'

interface CompleteProps {
  stats: SessionStats
  onSave: () => void
  onDiscard: () => void
  onAgain: () => void
}

export function Complete({ stats, onSave, onDiscard, onAgain }: CompleteProps) {
  const title = pieceTitle(stats.seed, stats.durationMs)
  const stillnessPct = Math.round(stats.stillnessRatio * 100)

  return (
    <section className="view complete">
      <motion.div
        className="complete-frame"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={stats.inkDataUrl} alt={title} className="complete-ink" />
      </motion.div>

      <motion.div
        className="complete-meta"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
      >
        <p className="complete-kicker">一場間已成形</p>
        <h2>{title}</h2>
        <p className="complete-stats">
          實感 {formatDuration(stats.durationMs)} · 靜默度 {stillnessPct}%
        </p>
        <p className="complete-note">
          數字只在結束後出現。過程裡，時間只是墨。
        </p>
      </motion.div>

      <div className="complete-actions">
        <button type="button" className="btn primary" onClick={onSave}>
          收入墨集
        </button>
        <div className="home-secondary">
          <button type="button" className="btn ghost" onClick={onAgain}>
            再留一場
          </button>
          <button type="button" className="btn ghost" onClick={onDiscard}>
            放下
          </button>
        </div>
      </div>
    </section>
  )
}
