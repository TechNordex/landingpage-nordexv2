import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { Mail, MapPin, Send, CheckCircle, ArrowRight } from 'lucide-react'

export default function Contact() {
  const sectionRef = useReveal({ stagger: 120 })
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Nome é obrigatório'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'E-mail inválido'
    if (!form.message.trim()) e.message = 'Mensagem é obrigatória'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao enviar')
      setSent(true)
    } catch (err) {
      setErrors({ submit: err.message })
    } finally {
      setSending(false)
    }
  }

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }))
  }

  return (
    <section id="contact" className="py-28 bg-brand-gray-dark relative overflow-hidden" ref={sectionRef}>
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-yellow/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-60 -left-60 w-96 h-96 rounded-full pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(245,197,24,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="reveal font-body text-brand-yellow text-sm uppercase tracking-widest mb-3">
            Contato
          </p>
          <h2
            className="reveal font-heading font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Vamos construir algo{' '}
            <span className="gradient-text">incrível juntos</span>
          </h2>
          <p className="reveal font-body text-white/50 max-w-lg mx-auto text-base leading-relaxed">
            Conte-nos sobre o seu projeto e entraremos em contato para conversar sobre como podemos ajudar.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left: contact info */}
          <div className="flex flex-col gap-6">
            {[
              {
                icon: MapPin,
                label: 'Localização',
                value: 'Moreno, Pernambuco | Brasil',
              },
              {
                icon: Mail,
                label: 'E-mail',
                value: 'contato@nordex.tech',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="reveal flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-yellow/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-brand-yellow" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-white/40 mb-0.5 uppercase tracking-wide">{item.label}</p>
                    <p className="font-body text-white text-base">{item.value}</p>
                  </div>
                </div>
              )
            })}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/5581989023679"
              target="_blank"
              rel="noopener noreferrer"
              className="reveal group flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/25 hover:border-[#25D366]/50 hover:bg-[#25D366]/15 rounded-2xl px-5 py-4 transition-all duration-200 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.117 1.528 5.845L.057 23.155a.75.75 0 0 0 .921.921l5.31-1.471A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.726 9.726 0 0 1-4.965-1.362l-.356-.211-3.685 1.02 1.02-3.594-.232-.371A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-heading font-semibold text-white text-sm">Fale conosco no WhatsApp</p>
                <p className="font-body text-white/40 text-xs">(81) 98902-3679 · Resposta rápida</p>
              </div>
              <ArrowRight size={16} className="text-[#25D366] group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" />
            </a>

            {/* Feature list */}
            <div className="reveal mt-4 bg-brand-gray-mid border border-white/8 rounded-2xl p-6">
              <p className="font-heading font-semibold text-white text-sm mb-4">
                Por que a Nordex Tech?
              </p>
              {[
                'Tecnologia acessível para todos os portes',
                'Time especializado e focado em resultados',
                'Entregas ágeis com qualidade e transparência',
                'Suporte próximo em todo o projeto',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 mb-3 last:mb-0">
                  <CheckCircle size={15} className="text-brand-yellow flex-shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-white/60">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal-right">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center bg-brand-gray-mid border border-brand-yellow/20 rounded-3xl p-10 yellow-glow">
                <CheckCircle size={48} className="text-brand-yellow mb-4" />
                <h3 className="font-heading font-bold text-white text-xl mb-2">Mensagem enviada!</h3>
                <p className="font-body text-white/50 text-sm">
                  Em breve nossa equipe entrará em contato com você.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-brand-gray-mid border border-white/8 rounded-3xl p-8 space-y-5"
              >
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block font-body text-sm text-white/60 mb-2">
                    Nome *
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange('name')}
                    placeholder="Seu nome completo"
                    className={`w-full bg-brand-gray-light border rounded-xl px-4 py-3 font-body text-white text-sm placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-brand-yellow/40 transition-all duration-200 ${
                      errors.name ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {errors.name && (
                    <p className="font-body text-xs text-red-400 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-body text-sm text-white/60 mb-2">
                    E-mail *
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="seu@email.com"
                    className={`w-full bg-brand-gray-light border rounded-xl px-4 py-3 font-body text-white text-sm placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-brand-yellow/40 transition-all duration-200 ${
                      errors.email ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {errors.email && (
                    <p className="font-body text-xs text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block font-body text-sm text-white/60 mb-2">
                    Empresa
                  </label>
                  <input
                    id="company"
                    type="text"
                    autoComplete="organization"
                    value={form.company}
                    onChange={handleChange('company')}
                    placeholder="Nome da sua empresa (opcional)"
                    className="w-full bg-brand-gray-light border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 font-body text-white text-sm placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-brand-yellow/40 transition-all duration-200"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block font-body text-sm text-white/60 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange('message')}
                    placeholder="Conte-nos sobre o seu projeto..."
                    className={`w-full bg-brand-gray-light border rounded-xl px-4 py-3 font-body text-white text-sm placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-brand-yellow/40 transition-all duration-200 resize-none ${
                      errors.message ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {errors.message && (
                    <p className="font-body text-xs text-red-400 mt-1">{errors.message}</p>
                  )}
                </div>

                {errors.submit && (
                  <p className="font-body text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    {errors.submit}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 bg-brand-yellow text-brand-black font-heading font-bold py-4 rounded-xl hover:bg-brand-yellow-light transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02]"
                >
                  {sending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-brand-black/30 border-t-brand-black rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Enviar mensagem
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
