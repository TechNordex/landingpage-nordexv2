import { ArrowRight, CheckCircle2, Sparkles, Zap } from 'lucide-react'

const supportChips = ['24/7', 'Sem fila', 'Resposta imediata', 'Multicanal']

const actionRows = [
  'Triagem da conversa concluida',
  'Lead salvo no funil comercial',
  'Agenda confirmada com retorno automatico',
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
          Um hero de produto que mostra conversa, automacao e resultado em uma unica
          cena, sem depender de uma grade de cards para explicar valor.
        </p>

        <a
          data-nordy-item
          href="#contact"
          className="yellow-glow mt-7 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-7 py-4 font-heading font-bold text-brand-black transition-all duration-200 hover:bg-brand-yellow-light"
        >
          Quero o Nordy
          <ArrowRight size={18} />
        </a>
      </div>

      <div data-nordy-item className="relative mx-auto w-full max-w-[620px] xl:max-w-[660px]">
        <div className="nordy-hero-glow absolute inset-[-10%] rounded-[2.5rem]" />

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#121212]/95 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/8 px-4 py-3.5 xl:px-5 xl:py-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <p className="font-heading text-sm font-semibold text-white">
                  Nordy online
                </p>
              </div>
              <p className="mt-1 font-body text-xs text-white/45">
                Operando atendimento, qualificacao e agenda
              </p>
            </div>

            <div className="rounded-full border border-brand-yellow/20 bg-brand-yellow/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-brand-yellow">
              Estado estavel
            </div>
          </div>

          <div
            className={`grid gap-4 p-4 ${
              isMobile
                ? 'grid-cols-1'
                : 'grid-cols-[minmax(0,1fr)_minmax(240px,0.88fr)] xl:grid-cols-[minmax(0,1.04fr)_minmax(250px,0.9fr)] xl:p-5'
            }`}
          >
            <div className="rounded-[1.5rem] border border-white/8 bg-brand-gray-dark/80 p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-body text-[11px] uppercase tracking-[0.22em] text-white/35">
                  Conversa ativa
                </span>
                <Sparkles size={15} className="text-brand-yellow" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-yellow/15 px-3 py-2 text-sm leading-snug text-white/90">
                    Quero agendar para quinta e saber os valores.
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-brand-gray-light px-3 py-3 text-sm leading-snug text-white/80">
                    Encontrei quinta, 10h. Reservei o horario, registrei o interesse
                    comercial e enviei a confirmacao.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-body text-[11px] uppercase tracking-[0.22em] text-white/35">
                  Acoes em andamento
                </span>
                <Zap size={15} className="text-brand-yellow" />
              </div>

              <div className="space-y-2.5">
                {actionRows.map((row) => (
                  <div
                    key={row}
                    className="rounded-xl border border-brand-yellow/20 bg-brand-yellow/10 px-3 py-2.5"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="mt-0.5 text-brand-yellow" />
                      <p className="font-body text-xs leading-snug text-white/80">{row}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-green-400/25 bg-green-400/10 px-4 py-3">
                <p className="font-body text-[11px] uppercase tracking-[0.22em] text-green-300/80">
                  Resultado
                </p>
                <p className="mt-1 font-heading text-base font-semibold text-white">
                  Lead captado
                </p>
                <p className="mt-1 font-body text-xs text-white/55">
                  Agenda confirmada e contexto entregue ao time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            isMobile ? 'mt-4 flex flex-wrap gap-2' : 'pointer-events-none absolute inset-0'
          }`}
        >
          {supportChips.map((chip, index) => {
            const desktopPositions = [
              'left-[-0.6rem] top-[2rem]',
              'right-[0.4rem] top-[-0.75rem]',
              'left-[1.1rem] bottom-[0.9rem]',
              'right-[-0.8rem] bottom-[1.4rem]',
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
