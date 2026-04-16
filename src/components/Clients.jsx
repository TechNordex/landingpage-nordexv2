import { useReveal } from '../hooks/useReveal'
import { ArrowUpRight } from 'lucide-react'
import bibiscuit from '../assets/bibiscuit-logo.avif'
import vinum from '../assets/logo-vinum.png'

const cases = [
  {
    logo: bibiscuit,
    name: 'Bi Biscuit',
    segment: 'Loja de Moldes',
    deliverable: 'Sistema de Gestão',
    description: 'Sistema de gestão de produção sob medida: controle de moldes, gestão de insumos e envio de relatórios automatizados via e-mail para uma das principais lojas de moldes para confeitaria do Nordeste.',
    url: 'https://bibiscuitaloja.com/',
    bg: '#f3eefb',
  },
  {
    logo: vinum,
    name: 'Vinum Comunicação',
    segment: 'Comunicação Visual',
    deliverable: 'Site institucional',
    description: 'Presença digital completa para uma empresa de comunicação visual e serviços gráficos, com identidade forte e geração de leads.',
    url: 'https://vinumcomunicacao.com.br/',
    bg: '#1a1a2e',
  },
]

export default function Clients() {
  const sectionRef = useReveal({ stagger: 150 })

  return (
    <section id="cases" className="py-24 bg-brand-black relative overflow-hidden" ref={sectionRef}>
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-yellow/15 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="reveal font-body text-brand-yellow text-sm uppercase tracking-widest mb-3">
            Cases reais
          </p>
          <h2
            className="reveal font-heading font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Empresas que confiam na{' '}
            <span className="gradient-text">Nordex Tech</span>
          </h2>
        </div>

        {/* Cases grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {cases.map((c) => (
            <article
              key={c.name}
              className="reveal group bg-brand-gray-mid border border-white/8 rounded-3xl overflow-hidden hover:border-brand-yellow/25 transition-all duration-300"
            >
              {/* Logo strip */}
              <div
                className="flex items-center justify-center h-32 px-8"
                style={{ background: c.bg }}
              >
                <img
                  src={c.logo}
                  alt={`Logo ${c.name}`}
                  className="max-h-16 max-w-[180px] object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-body text-xs text-brand-yellow uppercase tracking-widest">
                      {c.segment}
                    </span>
                    <h3 className="font-heading font-bold text-white text-lg mt-0.5">{c.name}</h3>
                  </div>
                  <span className="font-body text-xs bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 rounded-full px-3 py-1 flex-shrink-0 ml-3 mt-1">
                    {c.deliverable}
                  </span>
                </div>
                <p className="font-body text-white/50 text-sm leading-relaxed mb-5">
                  {c.description}
                </p>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-heading font-semibold text-sm text-brand-yellow/70 hover:text-brand-yellow transition-colors duration-200 cursor-pointer group-hover:gap-2"
                >
                  Ver projeto
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Subtle tagline */}
        <p className="reveal text-center font-body text-white/20 text-sm mt-10">
          Cada projeto entregue com qualidade, prazo e suporte contínuo.
        </p>
      </div>
    </section>
  )
}
