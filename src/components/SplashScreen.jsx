import { useEffect, useRef } from 'react'
import { animate, createTimeline, stagger } from 'animejs'

const BOOT_LINES = [
  'NORDEX_OS v2.4.1 — BOOT SEQUENCE',
  'Initializing core modules.............. OK',
  'Loading AI subsystems.................. OK',
  'Establishing secure connection......... OK',
  'Mounting cloud infrastructure.......... OK',
  'System ready.',
]

export default function SplashScreen({ onDone }) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const lineRefs = useRef([])
  const logoMainRef = useRef(null)
  const logoTechRef = useRef(null)
  const underlineRef = useRef(null)
  const taglineRef = useRef(null)
  const progressRef = useRef(null)

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

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const spacing = 32
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          ctx.beginPath()
          ctx.arc(x, y, 0.8, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(245, 197, 24, 0.08)'
          ctx.fill()
        }
      }

      const grad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60)
      grad.addColorStop(0, 'rgba(245,197,24,0)')
      grad.addColorStop(0.5, 'rgba(245,197,24,0.12)')
      grad.addColorStop(1, 'rgba(245,197,24,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, scanY - 60, canvas.width, 120)

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

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    const logoMain = logoMainRef.current
    const logoTech = logoTechRef.current
    const underline = underlineRef.current
    const tagline = taglineRef.current
    const progress = progressRef.current
    const bootLines = lineRefs.current.filter(Boolean)

    if (!root || !logoMain || !logoTech || !underline || !tagline || !progress || !bootLines.length) return

    const timeline = createTimeline({
      defaults: { ease: 'out(3)' },
      onComplete: () => onDone(),
    })

    timeline
      .add(bootLines, {
        opacity: [0, 1],
        x: ['-0.75rem', 0],
        duration: 240,
        delay: stagger(110),
      })
      .add(progress, {
        width: ['0%', '58%'],
        duration: 820,
        ease: 'inOut(2)',
      }, 0)
      .add(logoMain, {
        opacity: [0, 1],
        clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
        duration: 520,
        ease: 'inOut(2)',
      }, '+=60')
      .add(logoTech, {
        opacity: [0, 1],
        clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
        duration: 420,
        ease: 'inOut(2)',
      }, '-=140')
      .add(underline, {
        opacity: [0, 1],
        scaleX: [0, 1],
        duration: 360,
      }, '-=120')
      .add(tagline, {
        opacity: [0, 1],
        y: ['0.75rem', 0],
        duration: 320,
      }, '-=180')
      .add(progress, {
        width: ['58%', '100%'],
        duration: 540,
        ease: 'inOut(2)',
      }, '-=320')
      .add({}, { duration: 260 })
      .add(root, {
        opacity: [1, 0],
        y: [0, -18],
        scale: [1, 1.015],
        duration: 520,
        ease: 'inOut(2)',
      })

    return () => timeline.pause()
  }, [onDone])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col bg-brand-black overflow-hidden"
      style={{ pointerEvents: 'all' }}
      aria-live="polite"
      aria-label="Carregando Nordex Tech"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      <div className="absolute bottom-10 left-10 max-w-sm hidden md:block" aria-hidden="true">
        {BOOT_LINES.map((line, i) => (
          <p
            key={line}
            ref={(el) => { lineRefs.current[i] = el }}
            className="font-mono text-xs leading-6 text-brand-yellow/40 opacity-0"
          >
            <span className="text-brand-yellow/20 mr-2">{String(i).padStart(2, '0')}</span>
            {line}
          </p>
        ))}
      </div>

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

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-4">
        <div className="relative">
          <h1
            className="font-heading font-bold tracking-tight leading-none select-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}
          >
            <span
              ref={logoMainRef}
              className="text-white inline-block"
              style={{
                opacity: 0,
                clipPath: 'inset(0 100% 0 0)',
                textShadow: '0 0 40px rgba(255,255,255,0.15)',
              }}
            >
              NORDEX
            </span>
            <span
              ref={logoTechRef}
              className="gradient-text inline-block"
              style={{
                opacity: 0,
                clipPath: 'inset(0 100% 0 0)',
                textShadow: '0 0 40px rgba(245,197,24,0.4)',
              }}
            >
              .TECH
            </span>
          </h1>

          <div
            ref={underlineRef}
            className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-brand-yellow via-brand-yellow-light to-transparent rounded-full origin-left"
            style={{ opacity: 0, transform: 'scaleX(0)' }}
          />
        </div>

        <p
          ref={taglineRef}
          className="font-body text-sm text-white/30 tracking-[0.3em] uppercase"
          style={{ opacity: 0, transform: 'translateY(0.75rem)' }}
        >
          Tecnologia nordestina
        </p>

        <div className="mt-10 w-48 h-px bg-white/8 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-brand-yellow rounded-full"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </div>
  )
}
