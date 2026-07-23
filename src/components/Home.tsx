import { motion } from 'framer-motion'

interface HomeProps {
  onBegin: () => void
  onGallery: () => void
  onAbout: () => void
  pieceCount: number
}

export function Home({ onBegin, onGallery, onAbout, pieceCount }: HomeProps) {
  return (
    <section className="view home">
      <div className="home-atmosphere" aria-hidden="true">
        <div className="mist mist-a" />
        <div className="mist mist-b" />
        <div className="horizon-line" />
      </div>

      <header className="home-brand">
        <motion.p
          className="brand-mark"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          間
        </motion.p>
        <motion.p
          className="brand-roma"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 1 }}
        >
          Ma
        </motion.p>
      </header>

      <motion.div
        className="home-copy"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.9 }}
      >
        <h1>把空白留下來</h1>
        <p>
          不計分鐘。坐好，讓墨色隨著你的靜默慢慢洇開——這是 App Store
          少見的暫停收集體驗。
        </p>
      </motion.div>

      <motion.div
        className="home-actions"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.8 }}
      >
        <button type="button" className="btn primary" onClick={onBegin}>
          進入一場間
        </button>
        <div className="home-secondary">
          <button type="button" className="btn ghost" onClick={onGallery}>
            墨集{pieceCount > 0 ? ` · ${pieceCount}` : ''}
          </button>
          <button type="button" className="btn ghost" onClick={onAbout}>
            何以獨特
          </button>
        </div>
      </motion.div>
    </section>
  )
}
