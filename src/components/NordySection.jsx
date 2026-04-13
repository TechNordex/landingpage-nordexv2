import { useEffect, useRef, useState } from 'react'
import { animate, stagger } from 'animejs'
import {
  MessageCircle,
  Send,
  Globe,
  Clock,
  Users,
  Shield,
  BookOpen,
  Zap,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Wrench,
  HelpCircle,
  Store,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'

const PANELS = 4 // number of horizontal panels

// ── Animated chat mock ──────────────────────────────────────
function ChatMock({ channel }) {
  const [step, setStep] = useState(0)

  const conversations = {
    whatsapp: [
      { from: 'user', text: 'Oi! Quero agendar uma consulta com a Dra. Ana' },
      { from: 'nordy', text: 'Olá! Que ótimo. Temos horários disponíveis na terça (15h) ou quinta (10h). Qual prefere?' },
      { from: 'user', text: 'Quinta às 10h, por favor!' },
      { from: 'nordy', text: 'Agendado! Quinta-feira às 10h com a Dra. Ana. Vou te enviar um lembrete na véspera. Confirmado no sistema ✅' },
    ],
    telegram: [
      { from: 'user', text: 'Preciso remarcar minha reunião de amanhã' },
      { from: 'nordy', text: 'Claro! Vi aqui sua reunião às 14h com João Silva. Para quando quer remarcar?' },
      { from: 'user', text: 'Sexta às 16h se tiver vaga' },
      { from: 'nordy', text: 'Perfeito, sexta às 16h está disponível. Remarcado e as partes já foram notificadas ✅' },
    ],
    site: [
      { from: 'user', text: 'Vocês atendem sábado?' },
      { from: 'nordy', text: 'Sim! Sábados das 9h às 13h. Quer agendar um horário?' },
      { from: 'user', text: 'Quero! Sábado às 10h' },
      { from: 'nordy', text: 'Agendado para sábado às 10h! Você receberá uma confirmação por e-mail agora mesmo 📅' },
    ],
  }

  const msgs = conversations[channel]

  useEffect(() => {
    setStep(0)
    const timers = msgs.map((_, i) =>
      setTimeout(() => setStep(i + 1), 1000 + i * 2800)
    )
    // restart loop
    const loop = setTimeout(() => setStep(0), 1000 + msgs.length * 2800 + 3000)
    return () => { timers.forEach(clearTimeout); clearTimeout(loop) }
  }, [channel])

  const colors = { whatsapp: '#25D366', telegram: '#2AABEE', site: '#F5C518' }
  const labels = { whatsapp: 'WhatsApp', telegram: 'Telegram', site: 'Site' }
  const color = colors[channel]

  return (
    <div className="w-full max-w-xs md:max-w-sm mx-auto bg-brand-gray-mid rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      {/* header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8" style={{ background: `${color}18` }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${color}30` }}>
          {channel === 'whatsapp' && <MessageCircle size={16} style={{ color }} />}
          {channel === 'telegram' && <Send size={16} style={{ color }} />}
          {channel === 'site' && <Globe size={16} style={{ color }} />}
        </div>
        <div>
          <p className="font-heading font-semibold text-white text-xs">{labels[channel]}</p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-body text-xs text-white/40">Nordy online</span>
          </div>
        </div>
      </div>
      {/* messages */}
      <div className="p-3 md:p-4 space-y-2 min-h-44 md:min-h-56 flex flex-col justify-end">
        {msgs.slice(0, step).map((m, i) => (
          <div
            key={i}
            className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
            style={{ animation: 'fadeUp 0.3s ease forwards' }}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs font-body leading-snug ${
                m.from === 'user'
                  ? 'bg-brand-yellow/20 text-white/90 rounded-tr-sm'
                  : 'bg-brand-gray-light text-white/80 rounded-tl-sm'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {/* typing indicator */}
        {step < msgs.length && step > 0 && msgs[step - 1]?.from === 'user' && (
          <div className="flex justify-start">
            <div className="bg-brand-gray-light rounded-2xl rounded-tl-sm px-3 py-2 flex gap-1 items-center">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-brand-yellow/60"
                  style={{ animation: `bounce 1s ease ${i * 0.2}s infinite` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* input */}
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 bg-brand-gray-dark rounded-xl px-3 py-2 border border-white/8">
          <span className="font-body text-xs text-white/20 flex-1">Escreva uma mensagem...</span>
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${color}30` }}>
            <Send size={12} style={{ color }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Segments ────────────────────────────────────────────────
const segments = [
  { icon: ShoppingBag, label: 'E-commerce', desc: 'Tira dúvidas, rastreia pedidos e sugere produtos' },
  { icon: HeartPulse, label: 'Saúde', desc: 'Agenda consultas e responde orientações' },
  { icon: GraduationCap, label: 'Educação', desc: 'Atende alunos e facilita matrículas' },
  { icon: Wrench, label: 'Serviços', desc: 'Envia orçamentos e agenda visitas' },
  { icon: HelpCircle, label: 'FAQ', desc: 'Responde perguntas frequentes do seu negócio' },
  { icon: Store, label: 'Varejo', desc: 'Informa promoções, horários e catálogo' },
]

// ── Features ─────────────────────────────────────────────────
const features = [
  { icon: Users, title: 'Assistentes sob medida', desc: 'Um para vendas, outro para suporte, mais um para o jurídico. Cada assistente fala a linguagem do setor.' },
  { icon: BookOpen, title: 'Ensine em minutos', desc: 'Basta enviar seus materiais ou escrever as instruções. O Nordy aprende rapidinho.' },
  { icon: MessageCircle, title: 'WhatsApp sem complicação', desc: 'Conecte seu número e pronto: seus clientes são atendidos na hora, 24h por dia.' },
  { icon: Send, title: 'Telegram integrado', desc: 'Se sua equipe ou clientes usam Telegram, o Nordy também está lá com a mesma inteligência.' },
  { icon: Globe, title: 'Chat no seu site', desc: 'Coloque o Nordy no seu site em poucos cliques. Teste em tempo real antes de publicar.' },
  { icon: Shield, title: 'Segurança e controle total', desc: 'Saiba quem fez o quê, quando e por quê. Toda operação registrada com transparência.' },
]

// ── Stats ────────────────────────────────────────────────────
const stats = [
  { value: 'Na hora', label: 'Resposta em segundos', icon: Zap },
  { value: '100%', label: 'Clientes atendidos sem fila', icon: Users },
  { value: '24/7', label: 'Disponível dia e noite', icon: Clock },
  { value: 'Economia', label: 'Mais barato que um funcionário', icon: CheckCircle },
]

// ── Main component ───────────────────────────────────────────
const PANEL_LABELS = ['Introdução', 'Funcionalidades', 'Integrações', 'Segmentos']

export default function NordySection() {
  const sectionRef = useRef(null)
  const outerRef = useRef(null)
  const trackRef = useRef(null)
  const chatShellRef = useRef(null)
  const animatedPanelsRef = useRef(new Set())
  const [activeChannel, setActiveChannel] = useState('whatsapp')
  const [activePanel, setActivePanel] = useState(0)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const channels = ['whatsapp', 'telegram', 'site']
  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Cycle channels automatically
  useEffect(() => {
    const id = setInterval(() => {
      setActiveChannel((c) => {
        const i = channels.indexOf(c)
        return channels[(i + 1) % channels.length]
      })
    }, 6000)
    return () => clearInterval(id)
  }, [])

  // Snapping horizontal scroll with lerp (desktop only)
  useEffect(() => {
    if (isMobile) return
    const outer = outerRef.current
    const track = trackRef.current
    if (!outer || !track) return

    let currentX = 0
    let targetX = 0
    let rafId

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.1)
      if (Math.abs(currentX - targetX) < 0.5) currentX = targetX
      track.style.transform = `translateX(-${currentX}px)`
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    const onScroll = () => {
      const { top } = outer.getBoundingClientRect()
      const scrolled = Math.max(0, -top)
      const panelFloat = scrolled / window.innerHeight
      const snapped = Math.min(PANELS - 1, Math.max(0, Math.round(panelFloat)))
      targetX = snapped * window.innerWidth
      setActivePanel(snapped)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [isMobile])

  useEffect(() => {
    const shell = chatShellRef.current
    if (!shell) return

    animate(shell, {
      opacity: [0, 1],
      y: ['1rem', 0],
      scale: [0.985, 1],
      duration: 450,
      ease: 'out(3)',
    })
  }, [activeChannel, isMobile])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const animatePanel = (panelIndex) => {
      const panel = section.querySelector(`[data-nordy-panel="${panelIndex}"]`)
      if (!panel || animatedPanelsRef.current.has(panelIndex)) return

      const items = panel.querySelectorAll('[data-nordy-item]')
      if (!items.length) return

      animatedPanelsRef.current.add(panelIndex)

      animate(items, {
        opacity: [0, 1],
        y: ['1.5rem', 0],
        scale: [0.985, 1],
        delay: stagger(90, { ease: 'out(2)' }),
        duration: 650,
        ease: 'out(3)',
      })
    }

    if (isMobile) {
      const panels = section.querySelectorAll('[data-nordy-panel]')
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            animatePanel(entry.target.getAttribute('data-nordy-panel'))
          })
        },
        { threshold: 0.2 }
      )

      panels.forEach((panel) => observer.observe(panel))
      return () => observer.disconnect()
    }

    animatePanel(String(activePanel))
  }, [activePanel, isMobile])

  if (isMobile) {
    return (
      <section ref={sectionRef} id="nordy" aria-label="Nordy — Assistente de atendimento" className="bg-brand-black">
        {/* ── MOBILE: vertical stacked panels ── */}

        {/* Panel 1 — Intro */}
        <div data-nordy-panel="0" className="px-5 py-16 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,197,24,0.07) 0%, transparent 70%)'
          }} />
          <div className="relative">
            <div data-nordy-item className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
              <span className="font-body text-xs text-brand-yellow tracking-wide uppercase">Conheça o Nordy</span>
            </div>
            <h2 data-nordy-item className="font-heading font-bold leading-none mb-3" style={{ fontSize: 'clamp(3rem, 16vw, 5rem)' }}>
              <span className="gradient-text">Nordy</span>
            </h2>
            <p data-nordy-item className="font-heading font-semibold text-white text-xl mb-3 leading-snug">
              Seu assistente de atendimento
            </p>
            <p data-nordy-item className="font-body text-white/55 text-base leading-relaxed mb-8">
              Um atendente incansável que conhece seu negócio, responde seus clientes no
              WhatsApp, Telegram e site, 24 horas por dia, 7 dias por semana.
            </p>
            <a
              data-nordy-item
              href="#contact"
              className="group inline-flex items-center gap-2 bg-brand-yellow text-brand-black font-heading font-bold px-6 py-3.5 rounded-full hover:bg-brand-yellow-light transition-all duration-200 cursor-pointer yellow-glow"
            >
              Quero o Nordy
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <div className="grid grid-cols-2 gap-3 mt-8">
              {stats.map((s) => {
                const Icon = s.icon
                return (
                  <div data-nordy-item key={s.label} className="bg-brand-gray-mid border border-white/8 rounded-2xl p-4">
                    <div className="w-8 h-8 rounded-xl bg-brand-yellow/10 flex items-center justify-center mb-3">
                      <Icon size={16} className="text-brand-yellow" />
                    </div>
                    <p className="font-heading font-bold text-white text-lg mb-0.5">{s.value}</p>
                    <p className="font-body text-white/45 text-xs leading-snug">{s.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Panel 2 — Features */}
        <div data-nordy-panel="1" className="px-5 py-14 border-t border-white/8">
          <p data-nordy-item className="font-body text-brand-yellow text-xs uppercase tracking-widest mb-2">O que o Nordy faz</p>
          <h2 data-nordy-item className="font-heading font-bold text-white text-2xl leading-tight mb-2">
            Menos trabalho repetitivo.{' '}
            <span className="gradient-text">Mais tempo para o que importa.</span>
          </h2>
          <p data-nordy-item className="font-body text-white/50 text-sm leading-relaxed mb-8">
            O Nordy cuida do atendimento para que você e sua equipe possam focar no crescimento.
          </p>
          <div className="grid grid-cols-1 gap-3">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div data-nordy-item key={f.title} className="bg-brand-gray-mid border border-white/8 rounded-2xl p-4 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-brand-yellow" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white text-sm mb-1">{f.title}</h3>
                    <p className="font-body text-white/45 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Panel 3 — Integrations */}
        <div data-nordy-panel="2" className="px-5 py-14 border-t border-white/8">
          <p data-nordy-item className="font-body text-brand-yellow text-xs uppercase tracking-widest mb-2">Integrações</p>
          <h2 data-nordy-item className="font-heading font-bold text-white text-2xl leading-tight mb-8">
            Onde seus clientes estiverem,{' '}
            <span className="gradient-text">o Nordy está</span>
          </h2>
          <div data-nordy-item className="flex flex-col gap-3 mb-8">
            {[
              { label: 'WhatsApp', color: '#25D366', key: 'whatsapp', icon: MessageCircle },
              { label: 'Telegram', color: '#2AABEE', key: 'telegram', icon: Send },
              { label: 'Chat no Site', color: '#F5C518', key: 'site', icon: Globe },
            ].map((ch) => {
              const Icon = ch.icon
              return (
                <button
                  key={ch.key}
                  onClick={() => setActiveChannel(ch.key)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                    activeChannel === ch.key ? 'bg-white/5' : 'border-white/8 hover:border-white/15'
                  }`}
                  style={activeChannel === ch.key ? { borderColor: `${ch.color}50` } : {}}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${ch.color}20` }}>
                    <Icon size={18} style={{ color: ch.color }} />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-white text-sm">{ch.label}</p>
                    <p className="font-body text-white/40 text-xs">Atendimento automático 24/7</p>
                  </div>
                  {activeChannel === ch.key && (
                    <div className="ml-auto w-2 h-2 rounded-full flex-shrink-0" style={{ background: ch.color }} />
                  )}
                </button>
              )
            })}
          </div>
          <div ref={chatShellRef} data-nordy-item>
            <ChatMock key={activeChannel} channel={activeChannel} />
          </div>
        </div>

        {/* Panel 4 — Segments + CTA */}
        <div data-nordy-panel="3" className="px-5 py-14 border-t border-white/8">
          <p data-nordy-item className="font-body text-brand-yellow text-xs uppercase tracking-widest mb-2">Feito para o seu negócio</p>
          <h2 data-nordy-item className="font-heading font-bold text-white text-2xl leading-tight mb-8">
            Não importa o segmento,{' '}
            <span className="gradient-text">o Nordy se adapta</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-10">
            {segments.map((s) => {
              const Icon = s.icon
              return (
                <div data-nordy-item key={s.label} className="bg-brand-gray-mid border border-white/8 rounded-2xl p-4 text-center hover:border-brand-yellow/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 flex items-center justify-center mx-auto mb-2">
                    <Icon size={18} className="text-brand-yellow" />
                  </div>
                  <p className="font-heading font-semibold text-white text-sm mb-1">{s.label}</p>
                  <p className="font-body text-white/40 text-xs leading-snug">{s.desc}</p>
                </div>
              )
            })}
          </div>
          <div data-nordy-item className="bg-brand-gray-mid border border-brand-yellow/20 rounded-3xl p-6 yellow-glow">
            <h3 className="font-heading font-bold text-white text-lg mb-1">
              Pronto para ter o Nordy no seu negócio?
            </h3>
            <p className="font-body text-white/50 text-sm mb-5">
              Entre em contato e coloque seu atendimento no piloto automático.
            </p>
            <a
              href="https://nordy.nordex.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 bg-brand-yellow text-brand-black font-heading font-bold px-6 py-3.5 rounded-full hover:bg-brand-yellow-light transition-all duration-200 cursor-pointer"
            >
              Começar agora
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>

        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0) }
            50% { transform: translateY(-4px) }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(8px) }
            to { opacity: 1; transform: translateY(0) }
          }
        `}</style>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="nordy" aria-label="Nordy — Assistente de atendimento">
      {/* Outer: (PANELS - 1) extra viewports of scroll space + 1 viewport for the panel itself */}
      <div
        ref={outerRef}
        style={{ height: `${(PANELS + 1) * 100}vh` }}
        className="relative"
      >
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden bg-brand-black">

          {/* Panel dots indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
            {PANEL_LABELS.map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-1.5 group">
                <span className={`font-body text-xs transition-all duration-300 ${
                  activePanel === i ? 'text-brand-yellow opacity-100' : 'text-white/25 opacity-0 group-hover:opacity-100'
                }`}>
                  {label}
                </span>
                <div
                  className={`rounded-full transition-all duration-400 ${
                    activePanel === i
                      ? 'w-6 h-2 bg-brand-yellow'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Horizontal track */}
          <div
            ref={trackRef}
            className="flex h-full will-change-transform"
            style={{ width: `${PANELS * 100}vw` }}
          >

            {/* ── PANEL 1 — Intro ─────────────────────────── */}
            <div data-nordy-panel="0" className="w-screen h-full flex-shrink-0 flex items-center justify-center relative overflow-hidden px-6">
              {/* bg accent */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse 60% 60% at 60% 50%, rgba(245,197,24,0.07) 0%, transparent 70%)'
              }} />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-yellow/20 to-transparent" />

              <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-16 items-center">
                {/* Left */}
                <div>
                  {/* Badge */}
                  <div data-nordy-item className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/30 rounded-full px-4 py-1.5 mb-6">
                    <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                    <span className="font-body text-xs text-brand-yellow tracking-wide uppercase">Conheça o Nordy</span>
                  </div>

                  <h2 data-nordy-item className="font-heading font-bold leading-none mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>
                    <span className="gradient-text">Nordy</span>
                  </h2>
                  <p data-nordy-item className="font-heading font-semibold text-white text-2xl mb-4 leading-snug">
                    Seu assistente de<br />atendimento
                  </p>
                  <p data-nordy-item className="font-body text-white/55 text-lg leading-relaxed max-w-md mb-8">
                    Um atendente incansável que conhece seu negócio, responde seus clientes no
                    WhatsApp, Telegram e site, 24 horas por dia, 7 dias por semana, sem precisar de férias.
                  </p>
                  <a
                    data-nordy-item
                    href="#contact"
                    className="group inline-flex items-center gap-2 bg-brand-yellow text-brand-black font-heading font-bold px-7 py-4 rounded-full hover:bg-brand-yellow-light transition-all duration-200 cursor-pointer hover:scale-105 yellow-glow"
                  >
                    Quero o Nordy
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>

                {/* Right — stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((s) => {
                    const Icon = s.icon
                    return (
                      <div
                        data-nordy-item
                        key={s.label}
                        className="bg-brand-gray-mid border border-white/8 rounded-2xl p-6 hover:border-brand-yellow/30 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 flex items-center justify-center mb-4 group-hover:bg-brand-yellow/20 transition-colors duration-200">
                          <Icon size={20} className="text-brand-yellow" />
                        </div>
                        <p className="font-heading font-bold text-white text-xl mb-1">{s.value}</p>
                        <p className="font-body text-white/45 text-sm leading-snug">{s.label}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>

            {/* ── PANEL 2 — Features ──────────────────────── */}
            <div data-nordy-panel="1" className="w-screen h-full flex-shrink-0 flex items-center justify-center px-6 relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-yellow/15 to-transparent" />
              <div className="max-w-6xl w-full mx-auto">
                <div className="mb-12">
                  <p data-nordy-item className="font-body text-brand-yellow text-sm uppercase tracking-widest mb-3">O que o Nordy faz</p>
                  <h2 data-nordy-item className="font-heading font-bold text-white leading-tight mb-3" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
                    Menos trabalho repetitivo.<br />
                    <span className="gradient-text">Mais tempo para o que importa.</span>
                  </h2>
                  <p data-nordy-item className="font-body text-white/50 max-w-lg text-base leading-relaxed">
                    O Nordy cuida do atendimento para que você e sua equipe possam focar no crescimento do negócio.
                  </p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {features.map((f) => {
                    const Icon = f.icon
                    return (
                      <div
                        data-nordy-item
                        key={f.title}
                        className="group bg-brand-gray-mid border border-white/8 rounded-2xl p-5 hover:border-brand-yellow/30 transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 flex items-center justify-center mb-3 group-hover:bg-brand-yellow/20 transition-colors duration-200">
                          <Icon size={18} className="text-brand-yellow" />
                        </div>
                        <h3 className="font-heading font-semibold text-white text-sm mb-1.5">{f.title}</h3>
                        <p className="font-body text-white/45 text-xs leading-relaxed">{f.desc}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* ── PANEL 3 — Integrations chat mock ────────── */}
            <div data-nordy-panel="2" className="w-screen h-full flex-shrink-0 flex items-center justify-center px-6 relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-yellow/15 to-transparent" />
              <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-16 items-center">
                {/* Left text */}
                <div>
                  <p data-nordy-item className="font-body text-brand-yellow text-sm uppercase tracking-widest mb-3">Integrações</p>
                  <h2 data-nordy-item className="font-heading font-bold text-white leading-tight mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
                    Onde seus clientes<br />
                    <span className="gradient-text">estiverem, o Nordy está</span>
                  </h2>
                  <div data-nordy-item className="flex flex-col gap-3 mb-8">
                    {[
                      { label: 'WhatsApp', color: '#25D366', key: 'whatsapp', icon: MessageCircle },
                      { label: 'Telegram', color: '#2AABEE', key: 'telegram', icon: Send },
                      { label: 'Chat no Site', color: '#F5C518', key: 'site', icon: Globe },
                    ].map((ch) => {
                      const Icon = ch.icon
                      return (
                        <button
                          key={ch.key}
                          onClick={() => setActiveChannel(ch.key)}
                          className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                            activeChannel === ch.key
                              ? 'border-opacity-40 bg-white/5'
                              : 'border-white/8 hover:border-white/15'
                          }`}
                          style={activeChannel === ch.key ? { borderColor: `${ch.color}50` } : {}}
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `${ch.color}20` }}
                          >
                            <Icon size={18} style={{ color: ch.color }} />
                          </div>
                          <div>
                            <p className="font-heading font-semibold text-white text-sm">{ch.label}</p>
                            <p className="font-body text-white/40 text-xs">Atendimento automático 24/7</p>
                          </div>
                          {activeChannel === ch.key && (
                            <div
                              className="ml-auto w-2 h-2 rounded-full flex-shrink-0"
                              style={{ background: ch.color }}
                            />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Right: animated chat */}
                <div data-nordy-item className="flex justify-center lg:justify-end">
                  <div ref={chatShellRef} style={{ width: 360 }}>
                    <ChatMock key={activeChannel} channel={activeChannel} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── PANEL 4 — Segments + CTA ────────────────── */}
            <div data-nordy-panel="3" className="w-screen h-full flex-shrink-0 flex items-center justify-center px-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-yellow/15 to-transparent" />
              <div
                className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(245,197,24,0.08) 0%, transparent 70%)' }}
              />

              <div className="max-w-6xl w-full mx-auto">
                <div className="text-center mb-10">
                  <p data-nordy-item className="font-body text-brand-yellow text-sm uppercase tracking-widest mb-3">Feito para o seu negócio</p>
                  <h2 data-nordy-item className="font-heading font-bold text-white leading-tight mb-3" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
                    Não importa o segmento,<br />
                    <span className="gradient-text">o Nordy se adapta</span>
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
                  {segments.map((s) => {
                    const Icon = s.icon
                    return (
                      <div
                        data-nordy-item
                        key={s.label}
                        className="group bg-brand-gray-mid border border-white/8 rounded-2xl p-4 text-center hover:border-brand-yellow/30 hover:bg-brand-gray-light transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-yellow/20 transition-colors duration-200">
                          <Icon size={18} className="text-brand-yellow" />
                        </div>
                        <p className="font-heading font-semibold text-white text-sm mb-1.5">{s.label}</p>
                        <p className="font-body text-white/40 text-xs leading-snug">{s.desc}</p>
                      </div>
                    )
                  })}
                </div>

                {/* CTA strip */}
                <div data-nordy-item className="bg-brand-gray-mid border border-brand-yellow/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 yellow-glow">
                  <div>
                    <h3 className="font-heading font-bold text-white text-xl mb-1">
                      Pronto para ter o Nordy no seu negócio?
                    </h3>
                    <p className="font-body text-white/50 text-sm">
                      Entre em contato e coloque seu atendimento no piloto automático.
                    </p>
                  </div>
                  <a
                    href="https://nordy.nordex.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex-shrink-0 flex items-center gap-2 bg-brand-yellow text-brand-black font-heading font-bold px-7 py-4 rounded-full hover:bg-brand-yellow-light transition-all duration-200 cursor-pointer hover:scale-105"
                  >
                    Começar agora
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            </div>

          </div>{/* end track */}
        </div>{/* end sticky */}
      </div>{/* end outer */}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0) }
          50% { transform: translateY(-4px) }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px) }
          to { opacity: 1; transform: translateY(0) }
        }
      `}</style>
    </section>
  )
}
