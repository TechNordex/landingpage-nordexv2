import { ArrowRight, Activity, Clock, Star, MessageSquare, TrendingUp, Zap } from 'lucide-react'

const stats = [
  { value: '< 2s', label: 'Tempo de resposta', icon: Clock, accent: '#F5C518' },
  { value: '98%', label: 'Satisfação', icon: Star, accent: '#4ade80' },
  { value: '24/7', label: 'Disponibilidade', icon: Activity, accent: '#60a5fa' },
]

const channels = [
  { label: 'WhatsApp', color: '#25D366', count: '1.2k msgs/dia' },
  { label: 'Telegram', color: '#2AABEE', count: '840 msgs/dia' },
  { label: 'Site', color: '#F5C518', count: '630 msgs/dia' },
]

export function NordyIntroHero({ layout = 'desktop' }) {
  const isMobile = layout === 'mobile'

  return (
    <div
      className={`relative ${
        isMobile
          ? 'space-y-8'
          : 'grid grid-cols-[minmax(280px,0.74fr)_minmax(0,1fr)] gap-6 xl:gap-10 items-center'
      }`}
    >
      {/* ── Left copy ── */}
      <div className="relative z-10">
        <div
          data-nordy-item
          className="inline-flex items-center gap-2 rounded-full border border-brand-yellow/30 bg-brand-yellow/10 px-4 py-1.5"
        >
          <span className="h-2 w-2 rounded-full bg-brand-yellow animate-pulse" />
          <span className="font-body text-xs uppercase tracking-[0.22em] text-brand-yellow">
            Conheca o Nordy
          </span>
        </div>

        <p
          data-nordy-item
          className="mt-5 font-body text-sm uppercase tracking-[0.26em] text-white/45"
        >
          Assistente de atendimento multicanal com orquestracao ativa
        </p>

        <h2
          data-nordy-item
          className="mt-4 max-w-xl font-heading font-bold leading-[0.95] text-white"
          style={{
            fontSize: isMobile
              ? 'clamp(2.4rem, 11vw, 4rem)'
              : 'clamp(2.9rem, 4.8vw, 5.3rem)',
          }}
        >
          Nordy atende, organiza e confirma em segundos.
        </h2>

        <p
          data-nordy-item
          className={`mt-4 font-body leading-relaxed text-white/60 ${
            isMobile ? 'max-w-none text-base' : 'max-w-md text-lg'
          }`}
        >
          Seu negócio atendendo clientes em todos os canais, ao mesmo tempo, sem perder nenhuma conversa.
        </p>

        <a
          data-nordy-item
          href="https://nordy.nordex.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="yellow-glow mt-7 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-7 py-4 font-heading font-bold text-brand-black transition-all duration-200 hover:bg-brand-yellow-light"
        >
          Quero o Nordy
          <ArrowRight size={18} />
        </a>
      </div>

      {/* ── Right visual — metrics dashboard ── */}
      <div data-nordy-item className="relative mx-auto w-full max-w-[620px] xl:max-w-[660px]">
        <div className="nordy-hero-glow absolute inset-[-10%] rounded-[2.5rem]" />

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#121212]/95 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/8 px-4 py-3.5 xl:px-5 xl:py-4">
            <div className="min-w-0">
              <p className="font-heading text-sm font-semibold text-white">Painel do Nordy</p>
              <p className="mt-1 font-body text-xs text-white/45">
                Visao geral em tempo real
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-body text-xs text-green-300/80">Operando agora</span>
            </div>
          </div>

          <div className="p-4 xl:p-5 space-y-4">
            {/* Stats row */}
            <div className={`grid gap-3 ${isMobile ? 'grid-cols-3' : 'grid-cols-3'}`}>
              {stats.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.label}
                    className="rounded-[1.25rem] border border-white/8 bg-brand-gray-dark/80 px-3 py-4 flex flex-col items-center text-center gap-1.5"
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center mb-1"
                      style={{ background: `${s.accent}18` }}
                    >
                      <Icon size={15} style={{ color: s.accent }} />
                    </div>
                    <p
                      className="font-heading font-bold leading-none text-white"
                      style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
                    >
                      {s.value}
                    </p>
                    <p className="font-body text-[10px] uppercase tracking-[0.16em] text-white/40 leading-tight">
                      {s.label}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Channels */}
            <div className="rounded-[1.25rem] border border-white/8 bg-black/20 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-body text-[11px] uppercase tracking-[0.2em] text-white/35">
                  Canais ativos
                </span>
                <Zap size={14} className="text-brand-yellow" />
              </div>
              <div className="space-y-2">
                {channels.map((ch) => (
                  <div key={ch.label} className="flex items-center gap-3">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: ch.color }}
                    />
                    <span className="font-body text-sm text-white/75 flex-1">{ch.label}</span>
                    <span className="font-body text-xs text-white/35">{ch.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Volume bar */}
            <div className="rounded-[1.25rem] border border-white/8 bg-brand-gray-dark/80 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-body text-[11px] uppercase tracking-[0.2em] text-white/35">
                  Volume de atendimentos hoje
                </span>
                <TrendingUp size={14} className="text-brand-yellow" />
              </div>
              <div className="flex items-end gap-1.5 h-12">
                {[40, 55, 48, 70, 62, 80, 74, 90, 82, 95, 88, 76].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${h}%`,
                      background:
                        i === 11
                          ? 'rgba(245,197,24,0.9)'
                          : i >= 9
                          ? 'rgba(245,197,24,0.45)'
                          : 'rgba(255,255,255,0.1)',
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-body text-[10px] text-white/25">00h</span>
                <span className="font-body text-[10px] text-white/25">agora</span>
              </div>
            </div>

            {/* Active conversations ticker */}
            <div className="flex items-center gap-3 rounded-2xl border border-brand-yellow/20 bg-brand-yellow/8 px-4 py-3">
              <MessageSquare size={16} className="text-brand-yellow flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-body text-xs text-white/70 truncate">
                  <span className="font-heading font-bold text-white">47</span> conversas ativas agora
                </p>
              </div>
              <div className="rounded-full bg-green-400/15 border border-green-400/25 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-green-300 whitespace-nowrap">
                Ao vivo
              </div>
            </div>
          </div>
        </div>

        {/* Floating chips */}
        <div
          className={`${
            isMobile ? 'mt-4 flex flex-wrap gap-2' : 'pointer-events-none absolute inset-0'
          }`}
        >
          {['24/7', 'Sem fila', 'Resposta imediata', 'Multicanal'].map((chip, index) => {
            const desktopPositions = [
              'left-[-3rem] top-[2rem]',
              'right-[-2.5rem] top-[-0.75rem]',
              'left-[-5rem] bottom-[-1rem]',
              'right-[-3rem] bottom-[1.4rem]',
            ]

            return (
              <div
                key={chip}
                data-testid="nordy-support-chip"
                data-nordy-item
                className={`nordy-hero-chip rounded-full border border-white/10 bg-white/6 px-3.5 py-2 font-body text-xs text-white/75 backdrop-blur ${
                  isMobile ? '' : `absolute ${desktopPositions[index]}`
                }`}
              >
                {chip}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
