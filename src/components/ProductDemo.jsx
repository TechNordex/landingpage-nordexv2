import { useState, useRef, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import { Monitor, Smartphone, Database, Brain, Cloud, ArrowRight } from 'lucide-react'

const products = [
  {
    id: 'web',
    icon: Monitor,
    title: 'Sistemas Web',
    subtitle: 'Aplicações robustas e escaláveis',
    description:
      'Desenvolvemos plataformas web completas, desde dashboards gerenciais até portais complexos com integrações e automações personalizadas para o seu negócio.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'API REST'],
    mockup: <WebMockup />,
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Apps Mobile',
    subtitle: 'iOS e Android com performance nativa',
    description:
      'Criamos aplicativos móveis com experiências fluidas e design premium, entregando performance nativa com React Native e tecnologias modernas.',
    tags: ['React Native', 'Expo', 'Push Notifications', 'Offline-first'],
    mockup: <MobileMockup />,
  },
  {
    id: 'ai',
    icon: Brain,
    title: 'IA & Automação',
    subtitle: 'Fluxos inteligentes que trabalham por você',
    description:
      'Implementamos soluções de inteligência artificial e automação de processos que eliminam tarefas repetitivas e potencializam a produtividade da sua equipe.',
    tags: ['LLMs', 'N8N', 'Python', 'Processamento de dados'],
    mockup: <AIMockup />,
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud & Infra',
    subtitle: 'Infraestrutura segura e de alta disponibilidade',
    description:
      'Orquestramos toda a infraestrutura cloud com foco em segurança, performance e disponibilidade, garantindo que seus sistemas estejam sempre no ar.',
    tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    mockup: <CloudMockup />,
  },
]

export default function ProductDemo() {
  const [active, setActive] = useState(0)
  const sectionRef = useReveal({ stagger: 120 })

  return (
    <section id="products" className="py-28 bg-brand-black relative" ref={sectionRef}>
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <p className="reveal font-body text-brand-yellow text-sm uppercase tracking-widest mb-3">
          Soluções
        </p>
        <h2 className="reveal font-heading font-bold text-white leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
          O que a Nordex<br />
          <span className="gradient-text">constrói para você</span>
        </h2>
        <p className="reveal font-body text-white/50 max-w-xl text-lg leading-relaxed">
          Tecnologia acessível para empresas de todos os tamanhos, com entregas ágeis e suporte próximo.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: product tabs */}
          <div className="flex flex-col gap-3">
            {products.map((p, i) => {
              const Icon = p.icon
              const isActive = active === i
              return (
                <div key={p.id} className="reveal">
                <button
                  onClick={() => setActive(i)}
                  className={`group w-full flex items-start gap-4 text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-brand-gray-mid border-brand-yellow/40 yellow-glow'
                      : 'bg-transparent border-white/8 hover:border-brand-yellow/20 hover:bg-brand-gray-dark'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                      isActive ? 'bg-brand-yellow text-brand-black' : 'bg-brand-gray-light text-white/50 group-hover:text-brand-yellow'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className={`font-heading font-semibold text-base transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                        {p.title}
                      </h3>
                    </div>
                    <p className={`font-body text-sm transition-colors duration-200 ${isActive ? 'text-white/60' : 'text-white/35'}`}>
                      {p.subtitle}
                    </p>
                    {isActive && (
                      <div className="mt-3">
                        <p className="font-body text-sm text-white/60 leading-relaxed mb-3">
                          {p.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="font-body text-xs bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 rounded-full px-3 py-1"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </button>
                </div>
              )
            })}
            <a
              href="#contact"
              className="reveal mt-2 group flex items-center gap-2 font-heading font-semibold text-brand-yellow text-sm hover:gap-3 transition-all duration-200 cursor-pointer px-5"
            >
              Quero uma solução personalizada
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>

          {/* Right: animated mockup */}
          <div className="reveal-right sticky top-28 rounded-2xl overflow-hidden border border-brand-yellow/10 bg-brand-gray-dark">
            <div className="p-2">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5 mb-2">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="flex-1 text-center font-body text-xs text-white/20">
                  nordex.tech — {products[active].title}
                </span>
              </div>
              {/* Mockup content */}
              <div className="min-h-[380px] flex items-center justify-center transition-all duration-500">
                {products[active].mockup}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────── Mockup components ────────── */

function WebMockup() {
  return (
    <div className="w-full p-4 space-y-3 animate-fade-in">
      {/* Topbar */}
      <div className="flex items-center gap-3 p-3 bg-brand-gray-light rounded-xl">
        <div className="w-6 h-6 rounded-md bg-brand-yellow/20 flex-shrink-0" />
        <div className="h-2.5 bg-white/10 rounded flex-1" />
        <div className="w-16 h-6 bg-brand-yellow/20 rounded-lg" />
      </div>
      {/* Grid cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Receita', val: 'R$ 84k', trend: '+12%' },
          { label: 'Usuários', val: '2.4k', trend: '+8%' },
          { label: 'Conversão', val: '3.7%', trend: '+0.4%' },
        ].map((c) => (
          <div key={c.label} className="bg-brand-gray-light rounded-xl p-3">
            <p className="font-body text-xs text-white/40 mb-1">{c.label}</p>
            <p className="font-heading font-bold text-white text-sm">{c.val}</p>
            <p className="font-body text-xs text-green-400">{c.trend}</p>
          </div>
        ))}
      </div>
      {/* Chart bars */}
      <div className="bg-brand-gray-light rounded-xl p-4">
        <p className="font-body text-xs text-white/40 mb-3">Crescimento mensal</p>
        <div className="flex items-end gap-2 h-20">
          {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-brand-yellow/30 rounded-t-sm transition-all duration-300 hover:bg-brand-yellow/60"
              style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
      </div>
      {/* Table row */}
      <div className="bg-brand-gray-light rounded-xl p-3 space-y-2">
        {['Pedido #1042', 'Pedido #1041', 'Pedido #1040'].map((r, i) => (
          <div key={r} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-brand-yellow' : i === 1 ? 'bg-green-400' : 'bg-white/20'}`} />
            <span className="font-body text-xs text-white/60 flex-1">{r}</span>
            <span className="font-body text-xs text-white/40">R$ {(Math.random() * 500 + 100).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MobileMockup() {
  return (
    <div className="flex justify-center p-4 animate-fade-in">
      <div className="w-48 bg-brand-gray-light rounded-3xl border border-white/10 overflow-hidden">
        {/* Phone top notch */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-20 h-4 bg-brand-black rounded-full" />
        </div>
        {/* Screen content */}
        <div className="bg-brand-black mx-1 rounded-2xl p-3 min-h-72 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-heading text-xs text-white font-semibold">Dashboard</span>
            <div className="w-6 h-6 rounded-full bg-brand-yellow/20" />
          </div>
          <div className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-xl p-3">
            <p className="font-body text-xs text-brand-yellow mb-1">Saldo atual</p>
            <p className="font-heading font-bold text-white text-lg">R$ 12.400</p>
          </div>
          <div className="space-y-2">
            {['Transferência', 'Pagamento', 'Recarga'].map((item, i) => (
              <div key={item} className="flex items-center gap-2 bg-brand-gray-light rounded-lg p-2">
                <div className={`w-5 h-5 rounded-md ${i === 0 ? 'bg-brand-yellow/30' : i === 1 ? 'bg-blue-500/30' : 'bg-purple-500/30'}`} />
                <span className="font-body text-xs text-white/70">{item}</span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-brand-yellow/20 rounded-full">
            <div className="h-1 bg-brand-yellow rounded-full w-3/4" />
          </div>
        </div>
        {/* Bottom bar */}
        <div className="flex justify-around py-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`w-5 h-5 rounded-md ${i === 0 ? 'bg-brand-yellow/40' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

function AIMockup() {
  return (
    <div className="w-full p-4 space-y-3 animate-fade-in">
      <div className="bg-brand-gray-light rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse-slow" />
          <span className="font-body text-xs text-white/50">Agente IA ativo</span>
        </div>
        {/* Chat bubble user */}
        <div className="flex justify-end mb-3">
          <div className="bg-brand-yellow/15 border border-brand-yellow/20 rounded-2xl rounded-tr-sm px-3 py-2 max-w-48">
            <p className="font-body text-xs text-white/80">Analise os dados de vendas do último trimestre</p>
          </div>
        </div>
        {/* Chat bubble AI */}
        <div className="flex gap-2">
          <div className="w-6 h-6 rounded-full bg-brand-yellow flex-shrink-0 flex items-center justify-center">
            <Brain size={12} className="text-brand-black" />
          </div>
          <div className="bg-brand-gray-mid rounded-2xl rounded-tl-sm px-3 py-2 max-w-56">
            <p className="font-body text-xs text-white/70">Crescimento de 23% em relação ao trimestre anterior. Principais drivers: segmento B2B e região Nordeste...</p>
          </div>
        </div>
      </div>
      {/* Flow nodes */}
      <div className="bg-brand-gray-light rounded-xl p-4">
        <p className="font-body text-xs text-white/40 mb-3">Fluxo de automação</p>
        <div className="flex items-center gap-2">
          {['Trigger', 'Filtro', 'IA', 'Ação', 'Slack'].map((node, i) => (
            <div key={node} className="flex items-center gap-2">
              <div className={`rounded-lg px-2.5 py-1.5 text-center ${i === 2 ? 'bg-brand-yellow text-brand-black' : 'bg-brand-gray-mid border border-white/10 text-white/50'}`}>
                <span className="font-body text-xs font-medium">{node}</span>
              </div>
              {i < 4 && <div className="w-3 h-px bg-white/20 flex-shrink-0" />}
            </div>
          ))}
        </div>
        <div className="mt-3 h-1.5 bg-brand-gray-mid rounded-full overflow-hidden">
          <div className="h-full bg-brand-yellow rounded-full w-3/5 animate-pulse-slow" />
        </div>
        <p className="font-body text-xs text-white/30 mt-1">62% processado — 1.240 registros</p>
      </div>
    </div>
  )
}

function CloudMockup() {
  return (
    <div className="w-full p-4 space-y-3 animate-fade-in">
      {/* Status indicators */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'API Gateway', status: 'online', uptime: '99.98%' },
          { label: 'Database', status: 'online', uptime: '99.99%' },
          { label: 'CDN Edge', status: 'online', uptime: '100%' },
          { label: 'Worker', status: 'scaling', uptime: '99.9%' },
        ].map((s) => (
          <div key={s.label} className="bg-brand-gray-light rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${s.status === 'online' ? 'bg-green-400' : 'bg-brand-yellow'} animate-pulse-slow`} />
              <span className="font-body text-xs text-white/60">{s.label}</span>
            </div>
            <p className="font-heading text-sm font-semibold text-white">{s.uptime}</p>
          </div>
        ))}
      </div>
      {/* Network graph */}
      <div className="bg-brand-gray-light rounded-xl p-4">
        <p className="font-body text-xs text-white/40 mb-3">Latência (ms)</p>
        <div className="flex items-end gap-1 h-16">
          {[28, 32, 25, 30, 22, 35, 28, 24, 30, 26, 23, 27, 31, 25, 29, 24].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${(h / 40) * 100}%`,
                background: h > 30 ? 'rgba(245,197,24,0.5)' : 'rgba(74, 222, 128, 0.4)',
              }}
            />
          ))}
        </div>
      </div>
      {/* Deploy log */}
      <div className="bg-brand-gray-light rounded-xl p-3 font-mono">
        {[
          { line: '✓ Build concluído', color: 'text-green-400' },
          { line: '✓ Testes passando', color: 'text-green-400' },
          { line: '→ Deploy em prod...', color: 'text-brand-yellow' },
        ].map((l) => (
          <p key={l.line} className={`text-xs ${l.color} mb-1`}>{l.line}</p>
        ))}
      </div>
    </div>
  )
}
