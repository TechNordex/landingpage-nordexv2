import { useReveal } from '../hooks/useReveal'
import { Check, Star, ArrowRight, Zap } from 'lucide-react'

const plans = [
  {
    id: 'starter',
    badge: null,
    name: 'Starter',
    subtitle: 'Essencial',
    desc: 'Perfeito para quem quer começar a automatizar o atendimento sem complicação.',
    price: 'R$ 400',
    period: '/mês',
    cta: 'Começar agora',
    href: 'https://nordy.nordex.tech',
    highlight: false,
    features: [
      '1 instância do Nordy (WhatsApp e Telegram)',
      'Uso ideal para fluxo moderado de atendimentos',
      'Ensine o Nordy com seus materiais básicos',
      'Agendamentos e gestão pelo sistema',
      'Visão geral do atendimento',
    ],
    idealFor: 'Personal trainers, nutricionistas, psicólogos, autônomos e negócios locais.',
  },
  {
    id: 'pro',
    badge: 'Mais Escolhido',
    name: 'Pro',
    subtitle: 'Mais Popular',
    desc: 'Para empresas que querem crescer com atendimento setorizado e muito mais capacidade.',
    price: 'R$ 900',
    period: '/mês',
    cta: 'Quero o Pro',
    href: 'https://nordy.nordex.tech',
    highlight: true,
    features: [
      'Até 3 instâncias do Nordy independentes',
      'Cada instância conecta ao WhatsApp e Telegram',
      'Muito mais capacidade que o Starter',
      'Ensine com volumes maiores de informação',
      'Agendamentos e gestão completa pelo sistema',
      'Relatórios e histórico de atendimentos',
    ],
    idealFor: 'Clínicas, academias, lojas de médio porte, equipes de suporte e vendas.',
  },
  {
    id: 'enterprise',
    badge: null,
    name: 'Enterprise',
    subtitle: 'Sob Medida',
    desc: 'Para operações grandes que precisam de máxima capacidade, segurança e acompanhamento dedicado.',
    price: 'Combinar',
    period: '/mês',
    cta: 'Falar com time',
    href: '#contact',
    highlight: false,
    features: [
      'Instâncias ilimitadas conforme demanda',
      'Capacidade máxima para alta demanda',
      'Base de conhecimento ilimitada',
      'Agendamentos e gestão avançada pelo sistema',
      'Acompanhamento VIP na implantação',
      'Configuração e suporte dedicado',
    ],
    idealFor: 'Grandes e-commerces, lojas com filiais, franquias e grandes operações.',
  },
]

export default function NordyPricing() {
  const sectionRef = useReveal({ stagger: 140 })

  return (
    <section
      id="nordy-pricing"
      className="py-28 bg-brand-gray-dark relative overflow-hidden"
      ref={sectionRef}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-yellow/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute -top-60 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, rgba(245,197,24,0.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="reveal font-body text-brand-yellow text-sm uppercase tracking-widest mb-3">
            Planos do Nordy
          </p>
          <h2
            className="reveal font-heading font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Escolha o plano ideal<br />
            <span className="gradient-text">para o seu negócio</span>
          </h2>
          <p className="reveal font-body text-white/50 max-w-xl mx-auto text-base leading-relaxed">
            Automatize seu atendimento, gerencie agendamentos e foque no que realmente importa.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`reveal relative flex flex-col rounded-3xl border transition-all duration-300 ${
                plan.highlight
                  ? 'bg-brand-black border-brand-yellow/50 yellow-glow scale-[1.02]'
                  : 'bg-brand-gray-mid border-white/8 hover:border-brand-yellow/25'
              }`}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1.5 bg-brand-yellow text-brand-black font-heading font-bold text-xs px-4 py-1.5 rounded-full shadow-lg">
                    <Star size={11} fill="currentColor" />
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Plan name */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-heading font-bold text-white text-xl">{plan.name}</h3>
                      <p className={`font-body text-sm ${plan.highlight ? 'text-brand-yellow' : 'text-white/40'}`}>
                        {plan.subtitle}
                      </p>
                    </div>
                    {plan.highlight && (
                      <div className="w-8 h-8 rounded-xl bg-brand-yellow/15 flex items-center justify-center">
                        <Zap size={16} className="text-brand-yellow" />
                      </div>
                    )}
                  </div>
                  <p className="font-body text-white/50 text-sm leading-relaxed mt-3">{plan.desc}</p>
                </div>

                {/* Price */}
                <div className="mb-8 pb-8 border-b border-white/8">
                  <div className="flex items-end gap-1">
                    <span className={`font-heading font-bold leading-none ${
                      plan.id === 'enterprise' ? 'text-3xl text-white' : 'text-4xl text-white'
                    }`}>
                      {plan.price}
                    </span>
                    <span className="font-body text-white/40 text-sm mb-1">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check
                        size={15}
                        className={`flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-brand-yellow' : 'text-brand-yellow/70'}`}
                      />
                      <span className="font-body text-sm text-white/65 leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Ideal for */}
                <div className={`rounded-2xl p-4 mb-6 ${plan.highlight ? 'bg-brand-yellow/8 border border-brand-yellow/15' : 'bg-white/4 border border-white/8'}`}>
                  <p className="font-body text-xs text-white/40 mb-1 uppercase tracking-wide">Ideal para</p>
                  <p className="font-body text-xs text-white/60 leading-relaxed">{plan.idealFor}</p>
                </div>

                {/* CTA */}
                <a
                  href={plan.href}
                  target={plan.href.startsWith('http') ? '_blank' : undefined}
                  rel={plan.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`group flex items-center justify-center gap-2 font-heading font-bold py-4 rounded-2xl transition-all duration-200 cursor-pointer ${
                    plan.highlight
                      ? 'bg-brand-yellow text-brand-black hover:bg-brand-yellow-light hover:scale-[1.02]'
                      : 'border border-brand-yellow/30 text-brand-yellow hover:bg-brand-yellow/10'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <p className="reveal text-center font-body text-white/25 text-xs mt-10">
          Todos os planos incluem agendamentos integrados e gestão pelo painel Nordex Tech.
        </p>
      </div>
    </section>
  )
}
