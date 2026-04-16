import { useEffect, useRef, useState } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'

// Cycling words that type/erase on the second headline line
const CYCLING_WORDS = ['nordestina', 'inovadora', 'acessível', 'nordestina']

function useTypewriter(words, { startDelay = 400, typeSpeed = 80, eraseSpeed = 45, pauseAfter = 1800 } = {}) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setTyping(true), startDelay)
    return () => clearTimeout(startTimer)
  }, [startDelay])

  useEffect(() => {
    if (!typing) return
    const word = words[wordIdx % words.length]
    let i = 0
    let erasing = false

    const tick = () => {
      if (!erasing) {
        i++
        setDisplay(word.slice(0, i))
        if (i >= word.length) {
          // pause then erase — but if it's the last word, keep it
          if (wordIdx >= words.length - 1) return
          erasing = true
          setTimeout(tick, pauseAfter)
          return
        }
      } else {
        i--
        setDisplay(word.slice(0, i))
        if (i <= 0) {
          setWordIdx((w) => w + 1)
          return
        }
      }
      setTimeout(tick, erasing ? eraseSpeed : typeSpeed)
    }

    const id = setTimeout(tick, typeSpeed)
    return () => clearTimeout(id)
  }, [typing, wordIdx, words, typeSpeed, eraseSpeed, pauseAfter])

  const isDone = wordIdx >= words.length - 1 && display === words[words.length - 1]
  return { display, isDone }
}

export default function Hero() {
  const canvasRef = useRef(null)
  const { display: typedWord, isDone } = useTypewriter(CYCLING_WORDS)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    const mouse = { x: -9999, y: -9999 }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    window.addEventListener('mousemove', onMouseMove)

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Regular particles
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      isHub: false,
    }))

    // Hub nodes — bigger, pulsing
    const hubs = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 3 + 4,
      phase: Math.random() * Math.PI * 2,
      pulseR: 0,
    }))

    // Streaks — fast data packets along edges
    const streaks = Array.from({ length: 6 }, () => ({
      fromIdx: Math.floor(Math.random() * particles.length),
      toIdx: Math.floor(Math.random() * particles.length),
      progress: Math.random(),
      speed: Math.random() * 0.012 + 0.006,
      alpha: Math.random() * 0.7 + 0.3,
    }))

    // Ripple waves triggered periodically
    const ripples = []
    let rippleTimer = 0

    const all = [...particles, ...hubs]

    const draw = () => {
      t += 0.012
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // ── Connections ──────────────────────────────────────
      for (let i = 0; i < all.length; i++) {
        for (let j = i + 1; j < all.length; j++) {
          const dx = all[i].x - all[j].x
          const dy = all[i].y - all[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 160

          if (dist < maxDist) {
            const mdx = all[i].x - mouse.x
            const mdy = all[i].y - mouse.y
            const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy)
            const mouseBoost = mouseDist < 200 ? (1 - mouseDist / 200) * 0.5 : 0
            const base = 0.12 * (1 - dist / maxDist) + mouseBoost

            ctx.beginPath()
            ctx.moveTo(all[i].x, all[i].y)
            ctx.lineTo(all[j].x, all[j].y)
            ctx.strokeStyle = `rgba(245, 197, 24, ${base})`
            ctx.lineWidth = base > 0.2 ? 1.2 : 0.6
            ctx.stroke()
          }
        }
      }

      // ── Mouse proximity glow lines ────────────────────────
      all.forEach((p) => {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180) {
          ctx.beginPath()
          ctx.moveTo(mouse.x, mouse.y)
          ctx.lineTo(p.x, p.y)
          const alpha = (1 - dist / 180) * 0.35
          ctx.strokeStyle = `rgba(255, 220, 50, ${alpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      })

      // ── Regular particles ─────────────────────────────────
      particles.forEach((p) => {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const md = Math.sqrt(dx * dx + dy * dy)
        const glow = md < 150 ? (1 - md / 150) * 14 : 0

        ctx.save()
        ctx.shadowBlur = 6 + glow
        ctx.shadowColor = 'rgba(245, 197, 24, 0.8)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r + (glow > 0 ? 1 : 0), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245, 197, 24, ${p.alpha + (glow > 0 ? 0.3 : 0)})`
        ctx.fill()
        ctx.restore()

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })

      // ── Hub nodes with pulse rings ────────────────────────
      hubs.forEach((h) => {
        const pulse = Math.sin(t * 1.8 + h.phase)
        const outerR = h.r + 6 + pulse * 4

        // outer glow ring
        ctx.save()
        ctx.beginPath()
        ctx.arc(h.x, h.y, outerR, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(245, 197, 24, ${0.15 + pulse * 0.08})`
        ctx.lineWidth = 1.5
        ctx.shadowBlur = 20
        ctx.shadowColor = 'rgba(245, 197, 24, 0.6)'
        ctx.stroke()
        ctx.restore()

        // second ring
        ctx.save()
        ctx.beginPath()
        ctx.arc(h.x, h.y, outerR * 1.7, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(245, 197, 24, ${0.05 + pulse * 0.04})`
        ctx.lineWidth = 0.8
        ctx.stroke()
        ctx.restore()

        // core dot
        ctx.save()
        ctx.shadowBlur = 24
        ctx.shadowColor = 'rgba(255, 220, 30, 0.9)'
        ctx.beginPath()
        ctx.arc(h.x, h.y, h.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 220, 30, 0.95)`
        ctx.fill()
        ctx.restore()

        h.x += h.vx
        h.y += h.vy
        if (h.x < 0 || h.x > canvas.width) h.vx *= -1
        if (h.y < 0 || h.y > canvas.height) h.vy *= -1
      })

      // ── Data streaks along edges ──────────────────────────
      streaks.forEach((s) => {
        const from = particles[s.fromIdx]
        const to = particles[s.toIdx]
        const dx = to.x - from.x
        const dy = to.y - from.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 30 && dist < 160) {
          const x = from.x + dx * s.progress
          const y = from.y + dy * s.progress

          ctx.save()
          ctx.shadowBlur = 10
          ctx.shadowColor = 'rgba(255, 240, 80, 0.9)'
          ctx.beginPath()
          ctx.arc(x, y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 240, 80, ${s.alpha})`
          ctx.fill()
          ctx.restore()
        }
        s.progress += s.speed
        if (s.progress > 1) {
          s.progress = 0
          s.fromIdx = Math.floor(Math.random() * particles.length)
          s.toIdx = Math.floor(Math.random() * particles.length)
          s.alpha = Math.random() * 0.7 + 0.3
        }
      })

      // ── Ripple waves ──────────────────────────────────────
      rippleTimer++
      if (rippleTimer > 120) {
        rippleTimer = 0
        const hub = hubs[Math.floor(Math.random() * hubs.length)]
        ripples.push({ x: hub.x, y: hub.y, r: 0, maxR: 220, alpha: 0.5 })
      }
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i]
        rp.r += 2.2
        rp.alpha -= 0.006
        if (rp.alpha <= 0) { ripples.splice(i, 1); continue }

        ctx.save()
        ctx.beginPath()
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(245, 197, 24, ${rp.alpha})`
        ctx.lineWidth = 1.2
        ctx.stroke()
        ctx.restore()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black"
    >
      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Layered radial gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(245,197,24,0.10) 0%, transparent 65%)',
            'radial-gradient(ellipse 40% 40% at 20% 80%, rgba(245,197,24,0.06) 0%, transparent 60%)',
            'radial-gradient(ellipse 30% 30% at 80% 70%, rgba(245,197,24,0.05) 0%, transparent 55%)',
          ].join(', '),
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 text-center">
        {/* Location badge */}
        <div className="inline-flex items-center gap-2 bg-brand-gray-mid border border-brand-yellow/20 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
          <MapPin size={13} className="text-brand-yellow" />
          <span className="font-body text-xs text-white/60 tracking-wide uppercase">
            Moreno, Pernambuco | Nordeste do Brasil
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-heading font-bold leading-none tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)' }}
        >
          <span className="block text-white animate-fade-up" style={{ animationDelay: '100ms' }}>
            Tecnologia
          </span>
          <span
            className="block gradient-text animate-fade-up"
            style={{ animationDelay: '220ms' }}
          >
            {typedWord}
            {!isDone && (
              <span
                className="inline-block align-baseline ml-1 w-[3px] rounded-sm bg-brand-yellow"
                style={{
                  height: 'clamp(2rem, 5.5vw, 5.5rem)',
                  animation: 'cursorBlink 0.65s step-end infinite',
                  verticalAlign: 'middle',
                }}
                aria-hidden="true"
              />
            )}
          </span>
          <span className="block text-white animate-fade-up" style={{ animationDelay: '340ms' }}>
            com alcance{' '}
            <span className="relative inline-block">
              nacional
              <span
                className="absolute -bottom-1 left-0 w-full h-1 bg-brand-yellow rounded-full animate-fade-in"
                style={{ animationDelay: '700ms' }}
                aria-hidden="true"
              />
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="font-body text-white/60 max-w-2xl mx-auto text-lg leading-relaxed mb-10 animate-fade-up"
          style={{ animationDelay: '460ms' }}
        >
          Combinamos criatividade local com as melhores tecnologias do mercado para construir
          produtos digitais que realmente funcionam e fazem diferença no seu negócio.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: '580ms' }}
        >
          <a
            href="#contact"
            className="group flex items-center gap-2 bg-brand-yellow text-brand-black font-heading font-bold px-8 py-4 rounded-full hover:bg-brand-yellow-light transition-all duration-200 cursor-pointer yellow-glow hover:scale-105"
          >
            Comece agora
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="#products"
            className="flex items-center gap-2 border border-white/20 text-white/80 font-heading font-semibold px-8 py-4 rounded-full hover:border-brand-yellow/50 hover:text-white transition-all duration-200 cursor-pointer"
          >
            Ver soluções
          </a>
        </div>

        {/* Stats */}
        <div
          className="mt-20 grid grid-cols-3 gap-6 max-w-lg mx-auto animate-fade-up"
          style={{ animationDelay: '700ms' }}
        >
          {[
            { value: '2', label: 'Projetos em produção' },
            { value: '24/7', label: 'Suporte e disponibilidade' },
            { value: 'NE', label: 'Feito no Nordeste' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="font-heading font-bold text-2xl text-brand-yellow">{s.value}</span>
              <span className="font-body text-xs text-white/40 leading-tight text-center">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to top, #0A0A0A, transparent)' }}
      />
    </section>
  )
}
