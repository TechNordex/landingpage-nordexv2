import { MapPin } from 'lucide-react'
import logo from '../../nordex.jpeg'

const links = {
  Empresa: [
    { label: 'Quem Somos', href: '#about' },
    { label: 'Time', href: '#team' },
    { label: 'Contato', href: '#contact' },
  ],
  Soluções: [
    { label: 'Sistemas Web', href: '#products' },
    { label: 'Apps Mobile', href: '#products' },
    { label: 'IA & Automação', href: '#products' },
    { label: 'Cloud & Infra', href: '#products' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Nordex Tech logo" className="w-9 h-9 object-contain rounded-sm" />
              <span className="font-heading font-bold text-lg text-white">
                nordex<span className="text-brand-yellow">.tech</span>
              </span>
            </div>
            <p className="font-body text-white/40 text-sm leading-relaxed max-w-xs mb-5">
              Tecnologia nordestina com alcance nacional. Construindo o futuro digital das empresas brasileiras.
            </p>
            <div className="flex items-center gap-2 text-white/30">
              <MapPin size={13} className="text-brand-yellow" />
              <span className="font-body text-xs">Moreno, Pernambuco | Brasil</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p className="font-heading font-semibold text-white text-sm mb-4">{title}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="font-body text-sm text-white/40 hover:text-brand-yellow transition-colors duration-200 cursor-pointer"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/25">
            © {new Date().getFullYear()} Nordex Tech. Todos os direitos reservados.
          </p>
          <p className="font-body text-xs text-white/20">
            Feito com orgulho no Nordeste 🌵
          </p>
        </div>
      </div>
    </footer>
  )
}
