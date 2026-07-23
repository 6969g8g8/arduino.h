import { useEffect, useRef, useState } from 'react'

interface StillnessState {
  stillness: number
  motionAllowed: boolean
}

type MotionPermissionRequest = {
  requestPermission?: () => Promise<PermissionState>
}

async function requestMotionPermission(): Promise<boolean> {
  const DME = DeviceMotionEvent as unknown as MotionPermissionRequest
  if (typeof DME.requestPermission === 'function') {
    try {
      const state = await DME.requestPermission()
      return state === 'granted'
    } catch {
      return false
    }
  }
  return 'DeviceMotionEvent' in window
}

/**
 * Call from a user gesture (e.g. start button) before mounting the session.
 */
export async function prepareStillness(): Promise<boolean> {
  return requestMotionPermission()
}

/**
 * Estimates stillness from DeviceMotion when available.
 * Falls back to a calm baseline so desktop / denied-permission still works.
 */
export function useStillness(active: boolean): StillnessState {
  const [stillness, setStillness] = useState(0.72)
  const [motionAllowed, setMotionAllowed] = useState(false)
  const ema = useRef(0.08)

  useEffect(() => {
    if (!active) return

    let attached = false
    let cancelled = false

    const onMotion = (event: DeviceMotionEvent) => {
      const a = event.accelerationIncludingGravity
      if (!a || a.x == null || a.y == null || a.z == null) return
      const mag = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z)
      const jitter = Math.min(1, Math.abs(mag - 9.8) / 4)
      ema.current = ema.current * 0.86 + jitter * 0.14
      const next = Math.max(0.08, Math.min(1, 1 - ema.current * 1.6))
      setStillness(next)
    }

    const attach = () => {
      if (attached || cancelled) return
      window.addEventListener('devicemotion', onMotion)
      attached = true
      setMotionAllowed(true)
    }

    void (async () => {
      const granted = await requestMotionPermission()
      if (cancelled) return
      if (granted) attach()
      else setMotionAllowed(false)
    })()

    const fallback = window.setInterval(() => {
      if (!attached) {
        const t = Date.now() / 1000
        setStillness(0.68 + Math.sin(t * 0.7) * 0.08)
      }
    }, 200)

    return () => {
      cancelled = true
      if (attached) window.removeEventListener('devicemotion', onMotion)
      window.clearInterval(fallback)
    }
  }, [active])

  return { stillness, motionAllowed }
}
