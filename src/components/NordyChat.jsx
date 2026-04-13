import { useState, useRef, useEffect } from 'react'
import { animate, stagger } from 'animejs'
import { X, Send, MessageCircle, RotateCcw } from 'lucide-react'
import logo from '../../nordex.jpeg'

const WELCOME = 'Olá! Sou o **Nordy**, assistente da Nordex Tech. Como posso te ajudar hoje? 😊'
const BOOT_LINES = [
  'Inicializando núcleo conversacional',
  'Carregando contexto da Nordex Tech',
  'Sincronizando canais de atendimento',
  'Sessão pronta',
]
const CHAT_WIDTH = 360
const CHAT_HEIGHT = 520
const LAUNCHER_SIZE = 56
const START_CLIP = `inset(${CHAT_HEIGHT - LAUNCHER_SIZE}px 0px 0px ${CHAT_WIDTH - LAUNCHER_SIZE}px round 24px)`
const HORIZONTAL_CLIP = `inset(${CHAT_HEIGHT - LAUNCHER_SIZE}px 0px 0px 0px round 24px)`
const FULL_CLIP = 'inset(0px 0px 0px 0px round 24px)'

function parseMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(
      /(https?:\/\/[^\s<>"')\]]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:#F5C518;text-decoration:underline;word-break:break-all;">$1</a>'
    )
    .replace(/\n/g, '<br>')
}

export default function NordyChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [pulse, setPulse] = useState(true)
  const [booting, setBooting] = useState(false)
  const [opening, setOpening] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)
  const bootOverlayRef = useRef(null)

  // Stop pulsing after first open
  useEffect(() => {
    if (open) setPulse(false)
  }, [open])

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input when opened
  useEffect(() => {
    if (open && !booting) setTimeout(() => inputRef.current?.focus(), 150)
  }, [open, booting])

  // Opening animation
  useEffect(() => {
    if (!open) return

    const dialog = dialogRef.current
    const trigger = triggerRef.current
    if (!dialog || !trigger) return

    const parts = dialog.querySelectorAll('[data-chat-part]')
    const bootOverlay = bootOverlayRef.current

    setBooting(true)

    animate(trigger, {
      scale: [1, 0.94, 1],
      duration: 420,
      ease: 'out(4)',
    })

    animate(dialog, {
      opacity: [0, 1],
      duration: 160,
      ease: 'linear',
    })

    if (bootOverlay) {
      const bootLines = bootOverlay.querySelectorAll('[data-boot-line]')
      const bootBar = bootOverlay.querySelector('[data-boot-bar]')
      const bootMeta = bootOverlay.querySelector('[data-boot-meta]')

      const phaseOne = animate(dialog, {
        clipPath: [START_CLIP, HORIZONTAL_CLIP],
        duration: 320,
        ease: 'inOut(2)',
      })

      const revealTimer = setTimeout(() => {
        animate(dialog, {
          clipPath: [HORIZONTAL_CLIP, FULL_CLIP],
          duration: 430,
          ease: 'out(3)',
        })

        animate(bootOverlay, {
          opacity: [0, 1],
          duration: 180,
          ease: 'linear',
        })

        animate(bootLines, {
          opacity: [0, 1],
          x: ['-0.5rem', 0],
          delay: stagger(150),
          duration: 320,
          ease: 'out(3)',
        })

        if (bootBar) {
          animate(bootBar, {
            width: ['0%', '100%'],
            duration: 1100,
            ease: 'inOut(2)',
          })
        }

        if (bootMeta) {
          animate(bootMeta, {
            opacity: [0, 1],
            delay: 620,
            duration: 260,
            ease: 'linear',
          })
        }
      }, 300)

      const completeTimer = setTimeout(() => {
        setOpening(false)

        animate(bootOverlay, {
          opacity: [1, 0],
          duration: 220,
          ease: 'linear',
          onComplete: () => setBooting(false),
        })

        animate(parts, {
          opacity: [0, 1],
          y: ['0.75rem', 0],
          delay: stagger(60),
          duration: 360,
          ease: 'out(3)',
        })
      }, 1580)

      return () => {
        phaseOne?.pause?.()
        clearTimeout(revealTimer)
        clearTimeout(completeTimer)
      }
    }

    setOpening(false)
    setBooting(false)
  }, [open])

  useEffect(() => {
    if (!open) {
      setBooting(false)
      setOpening(false)
    }
  }, [open])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro')
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: 'Ops, tive um problema. Tente novamente em instantes.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const reset = () => setMessages([])
  const shellHidden = opening || booting
  const toggleOpen = () => {
    if (open) {
      setOpen(false)
      return
    }

    setOpening(true)
    setOpen(true)
  }

  return (
    <>
      {/* Chat window */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-label="Chat com o Nordy"
        aria-hidden={!open}
        className="fixed bottom-24 right-5 z-50 flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-brand-yellow/20"
        style={{
          width: CHAT_WIDTH,
          height: CHAT_HEIGHT,
          background: '#111111',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(16px)',
          pointerEvents: open ? 'all' : 'none',
          transformOrigin: 'bottom right',
          clipPath: open ? (opening ? START_CLIP : FULL_CLIP) : START_CLIP,
        }}
      >
        <div
          ref={bootOverlayRef}
          className="absolute inset-0 z-10 px-5 py-5 flex flex-col justify-between pointer-events-none"
          style={{
            opacity: open && (opening || booting) ? 1 : 0,
            background: 'linear-gradient(180deg, rgba(9,9,9,0.98), rgba(17,17,17,0.94))',
            display: open && (opening || booting) ? 'flex' : 'none',
          }}
        >
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="font-heading font-bold text-brand-yellow text-sm tracking-[0.2em] uppercase">
                  Nordy Boot
                </p>
                <p className="font-body text-white/35 text-[11px] mt-1">
                  Sistema de atendimento inicializando
                </p>
              </div>
              <div className="w-10 h-10 rounded-2xl border border-brand-yellow/25 bg-brand-yellow/5 flex items-center justify-center">
                <span className="font-heading text-brand-yellow text-xs">N</span>
              </div>
            </div>

            <div className="space-y-2">
              {BOOT_LINES.map((line, index) => (
                <div key={line} data-boot-line className="flex items-center gap-2 opacity-0">
                  <span className={`w-1.5 h-1.5 rounded-full ${index === BOOT_LINES.length - 1 ? 'bg-brand-yellow' : 'bg-brand-yellow/55'}`} />
                  <p className="font-body text-xs text-white/72 tracking-[0.08em] uppercase">
                    {line}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="h-px w-full bg-white/8 mb-3" />
            <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
              <div
                data-boot-bar
                className="h-full rounded-full"
                style={{
                  width: '0%',
                  background: 'linear-gradient(90deg, rgba(245,197,24,0.35), rgba(245,197,24,1))',
                }}
              />
            </div>
            <div data-boot-meta className="opacity-0 flex items-center justify-between mt-3">
              <p className="font-body text-[11px] text-white/30 tracking-[0.14em] uppercase">
                Handshake seguro concluído
              </p>
              <p className="font-body text-[11px] text-brand-yellow/70 tracking-[0.18em] uppercase">
                online
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div
          data-chat-part
          className="flex items-center gap-3 px-4 py-3 border-b border-white/8 flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #1A1A1A, #111)',
            opacity: shellHidden ? 0 : undefined,
          }}
        >
          <div className="relative">
            <img src={logo} alt="Nordy" className="w-9 h-9 rounded-xl object-contain bg-brand-black p-0.5" />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#111]" />
          </div>
          <div className="flex-1">
            <p className="font-heading font-bold text-white text-sm leading-none">Nordy</p>
            <p className="font-body text-xs text-white/40 mt-0.5">Assistente da Nordex Tech</p>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 0 && (
              <button
                onClick={reset}
                aria-label="Reiniciar conversa"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/8 transition-all cursor-pointer"
              >
                <RotateCcw size={14} />
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar chat"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/8 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          data-chat-part
          className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth"
          style={{ opacity: shellHidden ? 0 : undefined }}
        >
          {/* Welcome bubble — always shown */}
          <div className="flex items-end gap-2">
            <div className="w-6 h-6 rounded-full bg-brand-yellow/20 flex-shrink-0 flex items-center justify-center mb-0.5">
              <span className="text-brand-yellow text-xs font-bold">N</span>
            </div>
            <div
              className="max-w-[85%] bg-brand-gray-light rounded-2xl rounded-bl-sm px-3 py-2 font-body text-sm text-white/85 leading-snug"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(WELCOME) }}
            />
          </div>

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-end gap-2 ${m.role === 'user' ? 'justify-end' : ''}`}
              style={{ animation: 'chatFadeUp 0.25s ease forwards' }}
            >
              {m.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-brand-yellow/20 flex-shrink-0 flex items-center justify-center mb-0.5">
                  <span className="text-brand-yellow text-xs font-bold">N</span>
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 font-body text-sm leading-snug ${
                  m.role === 'user'
                    ? 'bg-brand-yellow/20 text-white/90 rounded-br-sm'
                    : 'bg-brand-gray-light text-white/85 rounded-bl-sm'
                }`}
                dangerouslySetInnerHTML={{ __html: parseMarkdown(m.content) }}
              />
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex items-end gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-yellow/20 flex-shrink-0 flex items-center justify-center">
                <span className="text-brand-yellow text-xs font-bold">N</span>
              </div>
              <div className="bg-brand-gray-light rounded-2xl rounded-bl-sm px-3 py-2.5 flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-brand-yellow/50"
                    style={{ animation: `typingBounce 1s ease ${i * 0.2}s infinite` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div
          data-chat-part
          className="px-3 pb-3 pt-2 border-t border-white/8 flex-shrink-0"
          style={{ opacity: shellHidden ? 0 : undefined }}
        >
          <div className="flex items-end gap-2 bg-brand-gray-mid border border-white/10 rounded-2xl px-3 py-2 focus-within:border-brand-yellow/30 transition-colors duration-200">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escreva sua mensagem..."
              rows={1}
              aria-label="Mensagem para o Nordy"
              className="flex-1 bg-transparent font-body text-sm text-white placeholder:text-white/25 resize-none focus:outline-none leading-snug max-h-28"
              style={{ scrollbarWidth: 'none' }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              aria-label="Enviar mensagem"
              className="w-8 h-8 rounded-xl bg-brand-yellow flex items-center justify-center flex-shrink-0 hover:bg-brand-yellow-light transition-colors duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={14} className="text-brand-black" />
            </button>
          </div>
          <p className="font-body text-xs text-white/20 text-center mt-1.5">
            Powered by <span className="text-brand-yellow/40">Nordex Tech</span>
          </p>
        </div>
      </div>

      {/* Floating trigger button */}
      <button
        ref={triggerRef}
        onClick={toggleOpen}
        aria-label={open ? 'Fechar chat do Nordy' : 'Abrir chat do Nordy'}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-2xl bg-brand-yellow flex items-center justify-center shadow-lg hover:bg-brand-yellow-light hover:scale-110 transition-all duration-200 cursor-pointer"
        style={{
          boxShadow: pulse
            ? '0 0 0 0 rgba(245,197,24,0.7)'
            : '0 4px 20px rgba(245,197,24,0.4)',
          animation: pulse ? 'chatPulse 2s ease-in-out infinite' : 'none',
        }}
      >
        {open
          ? <X size={22} className="text-brand-black" />
          : <MessageCircle size={22} className="text-brand-black" fill="currentColor" />
        }
      </button>

      <style>{`
        @keyframes chatPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,197,24,0.5), 0 4px 20px rgba(245,197,24,0.3); }
          50% { box-shadow: 0 0 0 12px rgba(245,197,24,0), 0 4px 20px rgba(245,197,24,0.3); }
        }
        @keyframes chatFadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  )
}
