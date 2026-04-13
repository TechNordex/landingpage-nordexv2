import { useReveal } from '../hooks/useReveal'
import { Zap, Shield, Users, MessageCircle } from 'lucide-react'

const values = [
  {
    icon: Zap,
    title: 'Tecnologia acessível',
    desc: 'Soluções de alta qualidade para empresas de todos os tamanhos, sem burocracia.',
  },
  {
    icon: Shield,
    title: 'Entregas com qualidade',
    desc: 'Processos ágeis com transparência em cada etapa do desenvolvimento.',
  },
  {
    icon: Users,
    title: 'Time comprometido',
    desc: 'Especialistas focados em resultados reais para o seu negócio.',
  },
  {
    icon: MessageCircle,
    title: 'Suporte próximo',
    desc: 'Comunicação clara e suporte direto em todo o projeto.',
  },
]

export default function AboutUs() {
  const sectionRef = useReveal({ stagger: 130 })

  return (
    <section id="about" className="py-28 bg-brand-gray-dark relative overflow-hidden" ref={sectionRef}>
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-yellow/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(245,197,24,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <div>
            <p className="reveal font-body text-brand-yellow text-sm uppercase tracking-widest mb-3">
              Quem somos
            </p>
            <h2
              className="reveal font-heading font-bold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
              Tecnologia nordestina<br />
              <span className="gradient-text">com alcance nacional</span>
            </h2>
            <p className="reveal font-body text-white/60 text-lg leading-relaxed mb-5">
              A Nordex Tech nasceu com um propósito claro: levar soluções tecnológicas de alta
              qualidade para empresas que querem evoluir. Somos uma empresa de tecnologia com
              raízes no Nordeste do Brasil e visão voltada para o futuro.
            </p>
            <p className="reveal font-body text-white/50 text-base leading-relaxed mb-10">
              Combinamos criatividade local com as melhores tecnologias do mercado para construir
              produtos digitais que realmente funcionam e fazem diferença no dia a dia do seu
              negócio.
            </p>
            <a
              href="#contact"
              className="reveal inline-flex items-center gap-2 bg-brand-yellow text-brand-black font-heading font-bold px-7 py-3.5 rounded-full hover:bg-brand-yellow-light transition-all duration-200 cursor-pointer hover:scale-105"
            >
              Conheça nosso time
            </a>
          </div>

          {/* Right: values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className="reveal group bg-brand-gray-mid border border-white/8 rounded-2xl p-6 hover:border-brand-yellow/30 transition-all duration-300 cursor-default"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-yellow/10 flex items-center justify-center mb-4 group-hover:bg-brand-yellow/20 transition-colors duration-200">
                    <Icon size={20} className="text-brand-yellow" />
                  </div>
                  <h3 className="font-heading font-semibold text-white text-base mb-2">
                    {v.title}
                  </h3>
                  <p className="font-body text-white/50 text-sm leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
