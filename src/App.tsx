import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { About } from './components/About'
import { Complete } from './components/Complete'
import { Gallery } from './components/Gallery'
import { Home } from './components/Home'
import { Session } from './components/Session'
import {
  deletePiece,
  loadPieces,
  pieceTitle,
  savePiece,
} from './lib/storage'
import { prepareStillness } from './lib/useStillness'
import type { MaPiece, SessionStats, View } from './types'
import './App.css'

export default function App() {
  const [view, setView] = useState<View>('home')
  const [pieces, setPieces] = useState<MaPiece[]>(() => loadPieces())
  const [lastStats, setLastStats] = useState<SessionStats | null>(null)

  const handleComplete = useCallback((stats: SessionStats) => {
    setLastStats(stats)
    setView('complete')
  }, [])

  const handleSave = () => {
    if (!lastStats) return
    const piece: MaPiece = {
      id: `${Date.now()}-${lastStats.seed}`,
      createdAt: Date.now(),
      durationMs: lastStats.durationMs,
      stillnessRatio: lastStats.stillnessRatio,
      seed: lastStats.seed,
      title: pieceTitle(lastStats.seed, lastStats.durationMs),
      inkDataUrl: lastStats.inkDataUrl,
    }
    setPieces(savePiece(piece))
    setView('gallery')
  }

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          className="view-stage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          {view === 'home' && (
            <Home
              pieceCount={pieces.length}
              onBegin={() => {
                void prepareStillness().finally(() => setView('session'))
              }}
              onGallery={() => setView('gallery')}
              onAbout={() => setView('about')}
            />
          )}
          {view === 'session' && (
            <Session
              onCancel={() => setView('home')}
              onComplete={handleComplete}
            />
          )}
          {view === 'complete' && lastStats && (
            <Complete
              stats={lastStats}
              onSave={handleSave}
              onDiscard={() => {
                setLastStats(null)
                setView('home')
              }}
              onAgain={() => {
                setLastStats(null)
                setView('session')
              }}
            />
          )}
          {view === 'gallery' && (
            <Gallery
              pieces={pieces}
              onBack={() => setView('home')}
              onDelete={(id) => setPieces(deletePiece(id))}
            />
          )}
          {view === 'about' && <About onBack={() => setView('home')} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
