/** Deterministic PRNG for reproducible ink washes from a seed. */
export function mulberry32(seed: number) {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

export interface InkPoint {
  x: number
  y: number
  r: number
  a: number
  hueShift: number
}

export function buildInkField(
  seed: number,
  width: number,
  height: number,
  count = 28,
): InkPoint[] {
  const rand = mulberry32(seed)
  const cx = width * (0.35 + rand() * 0.3)
  const cy = height * (0.32 + rand() * 0.28)
  const points: InkPoint[] = []

  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2
    const dist = Math.pow(rand(), 0.65) * Math.min(width, height) * 0.38
    points.push({
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist * 1.15,
      r: 18 + rand() * 90,
      a: 0.04 + rand() * 0.14,
      hueShift: rand() * 28 - 14,
    })
  }
  return points
}

export function paintInkFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  points: InkPoint[],
  progress: number,
  stillness: number,
) {
  ctx.clearRect(0, 0, width, height)

  const g = ctx.createLinearGradient(0, 0, width, height)
  g.addColorStop(0, '#cfd8de')
  g.addColorStop(0.45, '#dce4e8')
  g.addColorStop(1, '#b7c5cc')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, width, height)

  // Soft paper grain
  const grain = Math.min(1400, Math.floor(width * height * 0.002))
  ctx.fillStyle = 'rgba(40, 55, 60, 0.03)'
  for (let i = 0; i < grain; i++) {
    const x = (i * 97) % width
    const y = (i * 53) % height
    ctx.fillRect(x, y, 1.2, 1.2)
  }

  const reveal = Math.min(1, Math.max(0, progress))
  const visible = Math.floor(points.length * (0.15 + reveal * 0.85))
  const breath = 0.85 + stillness * 0.25

  for (let i = 0; i < visible; i++) {
    const p = points[i]
    const local = Math.min(1, Math.max(0, (reveal * points.length - i) / 3))
    const radius = p.r * (0.45 + local * 0.7) * breath
    const alpha = p.a * local * (0.55 + stillness * 0.55)

    const ink = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius)
    const deep = `rgba(${28 + p.hueShift}, ${42 + p.hueShift * 0.4}, ${48}, ${alpha})`
    const mid = `rgba(${55 + p.hueShift}, ${78}, ${82}, ${alpha * 0.45})`
    ink.addColorStop(0, deep)
    ink.addColorStop(0.55, mid)
    ink.addColorStop(1, 'rgba(90, 110, 118, 0)')
    ctx.fillStyle = ink
    ctx.beginPath()
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  // Vertical wash stroke as signature
  if (reveal > 0.35) {
    const strokeAlpha = (reveal - 0.35) * 0.22 * stillness
    const sx = width * 0.62
    const grad = ctx.createLinearGradient(sx, height * 0.18, sx, height * 0.78)
    grad.addColorStop(0, 'rgba(32, 48, 54, 0)')
    grad.addColorStop(0.4, `rgba(32, 48, 54, ${strokeAlpha})`)
    grad.addColorStop(1, 'rgba(32, 48, 54, 0)')
    ctx.strokeStyle = grad
    ctx.lineWidth = 2 + stillness * 4
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(sx, height * 0.2)
    ctx.quadraticCurveTo(
      sx + 18 * stillness,
      height * 0.5,
      sx - 8,
      height * 0.76,
    )
    ctx.stroke()
  }
}
