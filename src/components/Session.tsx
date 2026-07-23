import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { buildInkField, paintInkFrame, type InkPoint } from '../lib/ink'
import { useStillness } from '../lib/useStillness'
import type { SessionStats } from '../types'

interface SessionProps {
  onCancel: () => void
  onComplete: (stats: SessionStats) => void
}

/** ~75s of active presence to complete one wash. */
const TARGET_MS = 75_000

export function Session({ onCancel, onComplete }: SessionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<InkPoint[] | null>(null)
  const sizeRef = useRef({ w: 0, h: 0 })
  const seed = useMemo(() => Math.floor(Math.random() * 1_000_000_000), [])
  const { stillness, motionAllowed } = useStillness(true)
  const stillnessRef = useRef(stillness)
  const visibleRef = useRef(
    typeof document === 'undefined' ? true : document.visibilityState === 'visible',
  )
  const [whisper, setWhisper] = useState('留下空白')
  const [progress, setProgress] = useState(0)
  const lastProgressPaint = useRef(0)
  const stillnessAcc = useRef({ sum: 0, n: 0 })
  const startedAt = useRef(performance.now())
  const activeElapsed = useRef(0)
  const lastTick = useRef(performance.now())
  const completed = useRef(false)
  const onCompleteRef = useRef(onComplete)

  stillnessRef.current = stillness
  onCompleteRef.current = onComplete

  useEffect(() => {
    const onVis = () => {
      const isVisible = document.visibilityState === 'visible'
      visibleRef.current = isVisible
      setWhisper(isVisible ? '留下空白' : '回來，墨才會繼續洇')
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  useEffect(() => {
    let raf = 0
    const loop = () => {
      const now = performance.now()
      const dt = now - lastTick.current
      lastTick.current = now
      const still = stillnessRef.current
      const visible = visibleRef.current

      if (visible) {
        const rate = 0.35 + still * 0.9
        activeElapsed.current += dt * rate
        stillnessAcc.current.sum += still
        stillnessAcc.current.n += 1
      }

      const canvas = canvasRef.current
      if (canvas) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const w = canvas.clientWidth
        const h = canvas.clientHeight
        if (w > 0 && h > 0) {
          if (
            canvas.width !== Math.floor(w * dpr) ||
            canvas.height !== Math.floor(h * dpr)
          ) {
            canvas.width = Math.floor(w * dpr)
            canvas.height = Math.floor(h * dpr)
          }
          if (sizeRef.current.w !== w || sizeRef.current.h !== h) {
            sizeRef.current = { w, h }
            pointsRef.current = buildInkField(seed, w, h)
          }
          const ctx = canvas.getContext('2d')
          const points = pointsRef.current
          if (ctx && points) {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            const p = Math.min(1, activeElapsed.current / TARGET_MS)
            paintInkFrame(ctx, w, h, points, p, still)
            if (now - lastProgressPaint.current > 100) {
              lastProgressPaint.current = now
              setProgress(p)
            }
          }
        }
      }

      if (activeElapsed.current >= TARGET_MS && !completed.current) {
        completed.current = true
        const ratio =
          stillnessAcc.current.n === 0
            ? still
            : stillnessAcc.current.sum / stillnessAcc.current.n
        const dataUrl = canvasRef.current?.toDataURL('image/jpeg', 0.92) ?? ''
        onCompleteRef.current({
          durationMs: performance.now() - startedAt.current,
          stillnessRatio: ratio,
          seed,
          inkDataUrl: dataUrl,
        })
        return
      }

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [seed])

  return (
    <section className="view session">
      <canvas ref={canvasRef} className="ink-canvas" aria-label="墨色正在形成" />

      <div className="session-veil">
        <motion.p
          className="session-whisper"
          animate={{ opacity: visibleRef.current ? [0.35, 0.7, 0.35] : 0.25 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {whisper}
        </motion.p>

        <div className="session-meter" aria-hidden="true">
          <div
            className="session-meter-fill"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>

        <p className="session-hint">
          {motionAllowed
            ? '手機越靜，墨色越沉'
            : '看著畫面。離開分頁，墨會停住'}
        </p>

        <button type="button" className="btn ghost session-leave" onClick={onCancel}>
          提前離開
        </button>
      </div>
    </section>
  )
}
