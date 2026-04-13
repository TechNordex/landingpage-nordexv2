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
import { NordyIntroHero } from './nordy/NordyIntroHero'

const PANELS = 4 // number of horizontal panels

// ── Nordy hint with animated arrow ──────────────────────────
function NordyHint() {
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!wrapRef.current) return
    animate(wrapRef.current, {
      opacity: [0, 1],
      y: ['0.75rem', 0],
      duration: 600,
      ease: 'out(3)',
      delay: 400,
    })
  }, [])

  const openChat = () => {
    window.dispatchEvent(new CustomEvent('nordy:open'))
  }

  return (
    <button
      ref={wrapRef}
      onClick={openChat}
      style={{ opacity: 0 }}
      className="group flex items-center gap-2 mx-auto cursor-pointer"
      aria-label="Abrir chat com o Nordy"
    >
      <span className="font-body text-white/40 text-xs group-hover:text-brand-yellow transition-colors duration-200">
        Em dúvida?{' '}
        <span className="text-white/60 group-hover:text-brand-yellow underline underline-offset-2 decoration-dotted">
          Converse com o Nordy agora
        </span>
      </span>
    </button>
  )
}

const integrationScenarios = {
  whatsapp: {
    label: 'WhatsApp',
    color: '#25D366',
    metric: 'Latencia 1.4s',
    mode: 'Agendamento automatico',
    userMessage: 'Oi! Quero agendar uma consulta com a Dra. Ana para quinta.',
    assistantMessage: 'Perfeito. Encontrei quinta-feira, 10h, com a Dra. Ana. Ja confirmei no sistema e vou te lembrar na vespera.',
    steps: [
      'Detectando intencao de agendamento',
      'Consultando agenda da profissional',
      'Validando disponibilidade',
      'Confirmando horario com o cliente',
    ],
    resultTitle: 'Agendamento confirmado',
    resultMeta: 'Quinta, 10h • lembrete automatico ativado',
    badge: 'Fluxo concluido',
  },
  telegram: {
    label: 'Telegram',
    color: '#2AABEE',
    metric: 'Latencia 1.1s',
    mode: 'Reagendamento assistido',
    userMessage: 'Preciso remarcar minha reuniao de amanha para sexta as 16h.',
    assistantMessage: 'Reagendamento concluido. Sexta-feira, 16h, ficou reservado e as partes ja foram notificadas.',
    steps: [
      'Lendo contexto da conversa',
      'Buscando compromisso existente',
      'Atualizando horario no sistema',
      'Notificando envolvidos',
    ],
    resultTitle: 'Horario atualizado',
    resultMeta: 'Sexta, 16h • notificacoes enviadas',
    badge: 'Operacao sincronizada',
  },
  site: {
    label: 'Chat no Site',
    color: '#F5C518',
    metric: 'Latencia 0.9s',
    mode: 'Qualificacao comercial',
    userMessage: 'Vocês atendem sábado? Quero marcar um horario e saber valores.',
    assistantMessage: 'Atendemos sabados das 9h as 13h. Reservei 10h para voce e ja deixei seu interesse comercial qualificado para o time.',
    steps: [
      'Classificando pergunta comercial',
      'Consultando horarios de atendimento',
      'Reservando slot de contato',
      'Encaminhando lead qualificado',
    ],
    resultTitle: 'Lead qualificado',
    resultMeta: 'Sabado, 10h • interesse comercial identificado',
    badge: 'Encaminhado ao time',
  },
}

// ── Operational integrations demo ───────────────────────────
function IntegrationDemo({ channel }) {
  const scenario = integrationScenarios[channel]
  const [showUser, setShowUser] = useState(false)
  const [stepsVisible, setStepsVisible] = useState(0)
  const [showAssistant, setShowAssistant] = useState(false)
  const [showOutcome, setShowOutcome] = useState(false)

  useEffect(() => {
    setShowUser(false)
    setStepsVisible(0)
    setShowAssistant(false)
    setShowOutcome(false)

    const timers = []
    const userDelay = 260
    const stepsStartDelay = 720
    const stepInterval = 340
    const assistantDelay = stepsStartDelay + (scenario.steps.length * stepInterval) + 220
    const outcomeDelay = assistantDelay + 420

    timers.push(setTimeout(() => setShowUser(true), userDelay))

    scenario.steps.forEach((_, index) => {
      timers.push(setTimeout(() => setStepsVisible(index + 1), stepsStartDelay + (index * stepInterval)))
    })

    timers.push(setTimeout(() => setShowAssistant(true), assistantDelay))
    timers.push(setTimeout(() => setShowOutcome(true), outcomeDelay))

    return () => timers.forEach(clearTimeout)
  }, [channel, scenario])

  return (
    <div className="w-full max-w-md lg:max-w-[520px] mx-auto bg-brand-gray-mid rounded-[1.75rem] overflow-hidden border border-white/10 shadow-2xl">
      <div className="px-4 py-3.5 border-b border-white/8 bg-gradient-to-r from-white/[0.03] to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${scenario.color}20` }}>
            {channel === 'whatsapp' && <MessageCircle size={17} style={{ color: scenario.color }} />}
            {channel === 'telegram' && <Send size={17} style={{ color: scenario.color }} />}
            {channel === 'site' && <Globe size={17} style={{ color: scenario.color }} />}
          </div>
          <div className="min-w-0">
            <p className="font-heading font-semibold text-white text-sm">{scenario.label}</p>
            <div className="flex items-center gap-2 text-[11px] font-body text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span>Nordy online</span>
              <span className="text-white/20">•</span>
              <span>{scenario.metric}</span>
            </div>
          </div>
          <div className="ml-auto hidden sm:block rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-brand-yellow/80 whitespace-nowrap">
            {scenario.mode}
          </div>
        </div>
      </div>

      <div className="p-4 md:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="rounded-2xl border border-white/8 bg-brand-gray-dark/70 p-3.5 min-h-[200px] lg:min-h-[240px] flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="font-body text-[11px] uppercase tracking-[0.2em] text-white/35">Conversa ativa</span>
              <span className="font-body text-[11px] text-white/30 text-right">{scenario.badge}</span>
            </div>

            <div className="mt-auto space-y-2">
              {showUser && (
                <div className="flex justify-end" style={{ animation: 'fadeUp 0.3s ease forwards' }}>
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-yellow/20 px-3 py-2 text-xs font-body leading-snug text-white/90">
                    {scenario.userMessage}
                  </div>
                </div>
              )}

              {!showAssistant && showUser && (
                <div className="flex justify-start" style={{ animation: 'fadeUp 0.3s ease forwards' }}>
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

              {showAssistant && (
                <div className="flex justify-start" style={{ animation: 'fadeUp 0.3s ease forwards' }}>
                  <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-brand-gray-light px-3 py-2 text-xs font-body leading-snug text-white/80">
                    {scenario.assistantMessage}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-black/20 p-3.5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-body text-[11px] uppercase tracking-[0.2em] text-white/35">Execucao</span>
              <span className="font-body text-[11px] text-white/30">{stepsVisible}/{scenario.steps.length}</span>
            </div>

            <div className="space-y-2.5">
              {scenario.steps.map((stepLabel, index) => {
                const completed = stepsVisible > index
                return (
                  <div
                    key={stepLabel}
                    className={`rounded-xl border px-3 py-2.5 transition-all duration-300 ${
                      completed
                        ? 'border-brand-yellow/30 bg-brand-yellow/10'
                        : 'border-white/8 bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-heading ${
                        completed ? 'bg-brand-yellow text-brand-black' : 'bg-white/8 text-white/35'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <p className={`font-body text-xs leading-snug ${completed ? 'text-white/85' : 'text-white/35'}`}>
                          {stepLabel}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div
          className={`mt-4 rounded-2xl border px-4 py-3.5 transition-all duration-300 ${
            showOutcome
              ? 'border-brand-yellow/30 bg-brand-yellow/10 opacity-100 translate-y-0'
              : 'border-white/8 bg-white/[0.02] opacity-40 translate-y-1'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-body text-[11px] uppercase tracking-[0.2em] text-white/35 mb-1">Resultado operacional</p>
              <p className="font-heading font-semibold text-white text-sm md:text-base">{scenario.resultTitle}</p>
              <p className="font-body text-white/45 text-xs md:text-sm mt-1">{scenario.resultMeta}</p>
            </div>
            <div className="rounded-full bg-green-400/12 border border-green-400/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-green-300">
              Ok
            </div>
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
            <NordyIntroHero layout="mobile" />
          </div>
        </div>

        {/* Panel 2 — Features */}
        <div data-nordy-panel="1" className="px-5 py-14 border-t border-white/8">
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
            <IntegrationDemo key={activeChannel} channel={activeChannel} />
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
          <div data-nordy-item className="mt-5 flex justify-center">
            <NordyHint />
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

              <div className="max-w-7xl w-full mx-auto">
                <NordyIntroHero layout="desktop" />
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
                  <div ref={chatShellRef} className="w-full max-w-[520px]">
                    <IntegrationDemo key={activeChannel} channel={activeChannel} />
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

                {/* Nordy chat hint */}
                <div data-nordy-item className="mt-5 flex justify-center">
                  <NordyHint />
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
