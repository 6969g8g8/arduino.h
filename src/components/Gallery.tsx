import { motion } from 'framer-motion'
import { formatDuration } from '../lib/storage'
import type { MaPiece } from '../types'

interface GalleryProps {
  pieces: MaPiece[]
  onBack: () => void
  onDelete: (id: string) => void
}

export function Gallery({ pieces, onBack, onDelete }: GalleryProps) {
  return (
    <section className="view gallery">
      <header className="panel-header">
        <button type="button" className="btn ghost" onClick={onBack}>
          返回
        </button>
        <h2>墨集</h2>
        <span className="panel-spacer" />
      </header>

      {pieces.length === 0 ? (
        <div className="gallery-empty">
          <p>還沒有留下任何間。</p>
          <p className="muted">坐下三數分鐘，墨會替你記得空白。</p>
        </div>
      ) : (
        <ul className="gallery-grid">
          {pieces.map((piece, index) => (
            <motion.li
              key={piece.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.55 }}
            >
              <article className="gallery-card">
                <img src={piece.inkDataUrl} alt={piece.title} />
                <div className="gallery-card-body">
                  <h3>{piece.title}</h3>
                  <p>
                    {new Date(piece.createdAt).toLocaleDateString('zh-Hant', {
                      month: 'short',
                      day: 'numeric',
                    })}
                    · {formatDuration(piece.durationMs)}
                  </p>
                  <button
                    type="button"
                    className="btn ghost danger"
                    onClick={() => onDelete(piece.id)}
                  >
                    抹去
                  </button>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  )
}
