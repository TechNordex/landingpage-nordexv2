import { useEffect, useRef } from 'react'

export function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: options.threshold || 0.15, ...options }
    )

    const targets = el.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    targets.forEach((t, i) => {
      t.style.transitionDelay = `${i * (options.stagger || 100)}ms`
      observer.observe(t)
    })

    return () => observer.disconnect()
  }, [options.threshold, options.stagger])

  return ref
}
