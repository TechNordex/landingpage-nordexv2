import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../../nordex.jpeg'

const links = [
  { label: 'Início', href: '#hero' },
  { label: 'Soluções', href: '#products' },
  { label: 'Quem Somos', href: '#about' },
  { label: 'Time', href: '#team' },
  { label: 'Contato', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-md border-b border-brand-yellow/10 py-3"
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group cursor-pointer">
          <img
            src={logo}
            alt="Nordex Tech logo"
            className="w-9 h-9 object-contain rounded-sm"
          />
          <span className="font-heading font-bold text-lg tracking-tight">
            nordex<span className="text-brand-yellow">.tech</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="font-body text-sm text-white/70 hover:text-brand-yellow transition-colors duration-200 cursor-pointer"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://portal.nordex.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/20 text-white/70 font-heading font-semibold text-sm px-5 py-2.5 rounded-full hover:border-brand-yellow/40 hover:text-brand-yellow transition-colors duration-200 cursor-pointer"
          >
            Portal do cliente
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-brand-yellow text-brand-black font-heading font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-brand-yellow-light transition-colors duration-200 cursor-pointer"
          >
            Fale conosco
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/80 hover:text-brand-yellow transition-colors cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-brand-gray-dark border-t border-brand-yellow/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-body text-white/80 hover:text-brand-yellow transition-colors duration-200 py-2 cursor-pointer"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://portal.nordex.tech"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 border border-white/20 text-white/70 font-heading font-semibold text-sm px-5 py-3 rounded-full text-center hover:border-brand-yellow/40 hover:text-brand-yellow transition-colors duration-200 cursor-pointer"
          >
            Portal do cliente
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="bg-brand-yellow text-brand-black font-heading font-semibold text-sm px-5 py-3 rounded-full text-center hover:bg-brand-yellow-light transition-colors duration-200 cursor-pointer"
          >
            Fale conosco
          </a>
        </div>
      </div>
    </header>
  )
}
