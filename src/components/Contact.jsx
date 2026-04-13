import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSending(true)
    // Simulate send
    setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 1500)
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
                value: 'Moreno, Pernambuco — Brasil',
              },
              {
                icon: Mail,
                label: 'E-mail',
                value: 'contato@nordex.tech',
              },
              {
                icon: Phone,
                label: 'WhatsApp',
                value: '+55 (81) 9 0000-0000',
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
