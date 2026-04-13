import { useReveal } from '../hooks/useReveal'
import { Linkedin } from 'lucide-react'

const team = [
  {
    initials: 'GM',
    name: 'Gustavo Montenegro',
    role: 'Co-Founder & CTO',
    bio: 'Arquiteto de Software e desenvolvedor Fullcycle. Responsável pelo ciclo de vida completo das aplicações e na tradução de necessidades de negócio em soluções técnicas.',
    tags: ['Arquitetura', 'Fullcycle', 'Backend'],
    color: '#F5C518',
    linkedin: '#',
  },
  {
    initials: 'DS',
    name: 'Deyvid Silva',
    role: 'Co-Founder & CTO',
    bio: 'Especialista em Inteligência Artificial e automação de fluxos. Responsável pela persistência, modelagem e integridade de dados das aplicações.',
    tags: ['IA', 'Automação', 'Dados'],
    color: '#FFD93D',
    linkedin: '#',
  },
  {
    initials: 'AV',
    name: 'Adson Vicente',
    role: 'Co-Founder & CTO',
    bio: 'Gestor de Operações, Cloud e orquestração de serviços de deploy. Garante a alta disponibilidade, performance de rede e segurança da infraestrutura.',
    tags: ['Cloud', 'DevOps', 'Infra'],
    color: '#D4A017',
    linkedin: '#',
  },
]

export default function Team() {
  const sectionRef = useReveal({ stagger: 150 })

  return (
    <section id="team" className="py-28 bg-brand-black relative overflow-hidden" ref={sectionRef}>
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-yellow/20 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="reveal font-body text-brand-yellow text-sm uppercase tracking-widest mb-3">
            Fundadores
          </p>
          <h2
            className="reveal font-heading font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            As pessoas por trás da{' '}
            <span className="gradient-text">Nordex Tech</span>
          </h2>
        </div>

        {/* Team grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <article
              key={member.name}
              className="reveal group bg-brand-gray-dark border border-white/8 rounded-3xl p-8 hover:border-brand-yellow/30 transition-all duration-300 flex flex-col"
            >
              {/* Avatar */}
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center font-heading font-bold text-xl text-brand-black select-none"
                  style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}aa)` }}
                  aria-hidden="true"
                >
                  {member.initials}
                </div>
                <a
                  href={member.linkedin}
                  aria-label={`LinkedIn de ${member.name}`}
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-brand-yellow hover:border-brand-yellow/30 transition-all duration-200 cursor-pointer"
                >
                  <Linkedin size={16} />
                </a>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="font-heading font-bold text-white text-lg mb-1">
                  {member.name}
                </h3>
                <p className="font-body text-brand-yellow text-sm mb-4">{member.role}</p>
                <p className="font-body text-white/50 text-sm leading-relaxed mb-5">
                  {member.bio}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {member.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-xs bg-brand-yellow/8 text-brand-yellow/80 border border-brand-yellow/15 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
