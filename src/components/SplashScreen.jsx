import { useEffect, useRef, useState } from 'react'

// Total duration before splash exits: ~3000ms
const BOOT_LINES = [
  'NORDEX_OS v2.4.1 — BOOT SEQUENCE',
  'Initializing core modules.............. OK',
  'Loading AI subsystems.................. OK',
  'Establishing secure connection......... OK',
  'Mounting cloud infrastructure.......... OK',
  'System ready.',
]

export default function SplashScreen({ onDone }) {
  const canvasRef = useRef(null)
  const [phase, setPhase] = useState('boot')   // boot → logo → exit
  const [visibleLines, setVisibleLines] = useState([])
  const [logoChars, setLogoChars] = useState('')
  const [techChars, setTechChars] = useState('')
  const [exiting, setExiting] = useState(false)

  // ── Canvas grid / scan line ──────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let scanY = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // dot grid
      const spacing = 32
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          ctx.beginPath()
          ctx.arc(x, y, 0.8, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(245, 197, 24, 0.08)'
          ctx.fill()
        }
      }

      // horizontal scan line
      const grad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60)
      grad.addColorStop(0, 'rgba(245,197,24,0)')
      grad.addColorStop(0.5, 'rgba(245,197,24,0.12)')
      grad.addColorStop(1, 'rgba(245,197,24,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, scanY - 60, canvas.width, 120)

      // thin bright line
      ctx.beginPath()
      ctx.moveTo(0, scanY)
      ctx.lineTo(canvas.width, scanY)
      ctx.strokeStyle = 'rgba(245,197,24,0.35)'
      ctx.lineWidth = 1
      ctx.stroke()

      scanY += 2.5
      if (scanY > canvas.height) scanY = 0

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // ── Boot log lines ───────────────────────────────────────
  useEffect(() => {
    if (phase !== 'boot') return
    let lineIdx = 0
    const next = () => {
      if (lineIdx < BOOT_LINES.length) {
        setVisibleLines((prev) => [...prev, BOOT_LINES[lineIdx]])
        lineIdx++
        setTimeout(next, lineIdx === 1 ? 80 : 120)
      } else {
        // transition to logo phase
        setTimeout(() => setPhase('logo'), 150)
      }
    }
    const timer = setTimeout(next, 100)
    return () => clearTimeout(timer)
  }, [phase])

  // ── Logo typing ──────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'logo') return
    const word = 'NORDEX'
    let i = 0
    const id = setInterval(() => {
      i++
      setLogoChars(word.slice(0, i))
      if (i >= word.length) {
        clearInterval(id)
        // type ".TECH" after short pause
        setTimeout(() => {
          const tech = '.TECH'
          let j = 0
          const id2 = setInterval(() => {
            j++
            setTechChars(tech.slice(0, j))
            if (j >= tech.length) {
              clearInterval(id2)
              // start exit
              setTimeout(() => {
                setExiting(true)
                setTimeout(onDone, 500)
              }, 300)
            }
          }, 55)
        }, 120)
      }
    }, 45)
    return () => clearInterval(id)
  }, [phase, onDone])

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-brand-black overflow-hidden"
      style={{
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'translateY(-12px)' : 'translateY(0)',
        pointerEvents: exiting ? 'none' : 'all',
      }}
      aria-live="polite"
      aria-label="Carregando Nordex Tech"
    >
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      {/* Boot log — bottom left */}
      <div className="absolute bottom-10 left-10 max-w-sm hidden md:block" aria-hidden="true">
        {visibleLines.map((line, i) => (
          <p
            key={i}
            className="font-mono text-xs leading-6 text-brand-yellow/40"
            style={{
              animation: 'fadeIn 0.2s ease forwards',
              opacity: 0,
              animationFillMode: 'forwards',
            }}
          >
            <span className="text-brand-yellow/20 mr-2">{String(i).padStart(2, '0')}</span>
            {line}
          </p>
        ))}
      </div>

      {/* Corner brackets */}
      {[
        'top-6 left-6 border-t border-l',
        'top-6 right-6 border-t border-r',
        'bottom-6 left-6 border-b border-l',
        'bottom-6 right-6 border-b border-r',
      ].map((cls) => (
        <div
          key={cls}
          className={`absolute w-8 h-8 border-brand-yellow/30 ${cls}`}
          aria-hidden="true"
        />
      ))}

      {/* Center logo */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-4">
        {/* Main logo text */}
        <div className="relative">
          <h1
            className="font-heading font-bold tracking-tight leading-none select-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}
          >
            <span
              className="text-white"
              style={{
                textShadow:
                  logoChars.length > 0
                    ? '0 0 40px rgba(255,255,255,0.15)'
                    : 'none',
              }}
            >
              {logoChars}
            </span>
            <span
              className="gradient-text"
              style={{
                textShadow:
                  techChars.length > 0
                    ? '0 0 40px rgba(245,197,24,0.4)'
                    : 'none',
              }}
            >
              {techChars}
            </span>
            {/* blinking cursor */}
            {phase === 'logo' && techChars.length < 5 && (
              <span
                className="inline-block w-[3px] bg-brand-yellow ml-1 align-middle"
                style={{
                  height: 'clamp(2.4rem, 8vw, 5.5rem)',
                  animation: 'blink 0.7s step-end infinite',
                }}
                aria-hidden="true"
              />
            )}
          </h1>

          {/* Underline sweep */}
          {techChars.length === 5 && (
            <div
              className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-brand-yellow via-brand-yellow-light to-transparent rounded-full"
              style={{
                animation: 'sweepIn 0.4s ease forwards',
                width: 0,
              }}
            />
          )}
        </div>

        {/* Tagline */}
        {techChars.length === 5 && (
          <p
            className="font-body text-sm text-white/30 tracking-[0.3em] uppercase"
            style={{ animation: 'fadeIn 0.4s ease 0.1s forwards', opacity: 0 }}
          >
            Tecnologia nordestina
          </p>
        )}

        {/* Progress bar */}
        <div className="mt-10 w-48 h-px bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-yellow rounded-full"
            style={{
              transition: 'width 1.6s linear',
              width: phase === 'boot' ? '60%' : '100%',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
        @keyframes sweepIn { from { width: 0 } to { width: 100% } }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  )
}
