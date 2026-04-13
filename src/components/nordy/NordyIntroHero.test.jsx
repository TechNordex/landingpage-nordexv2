import { cleanup, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import NordySection from '../NordySection'
import { NordyIntroHero } from './NordyIntroHero'

function setViewportWidth(width) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: width,
    writable: true,
  })
  window.dispatchEvent(new Event('resize'))
}

describe('NordyIntroHero', () => {
  it('renders the desktop hero with one dominant product frame', () => {
    render(<NordyIntroHero layout="desktop" />)

    expect(
      screen.getByRole('heading', {
        name: /nordy atende, organiza e confirma em segundos/i,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        /assistente de atendimento multicanal com orquestracao ativa/i,
      ),
    ).toBeInTheDocument()

    expect(screen.getByText('Conversa ativa')).toBeInTheDocument()
    expect(screen.getByText('Acoes em andamento')).toBeInTheDocument()
    expect(screen.getByText('Lead captado')).toBeInTheDocument()
    expect(screen.getByText('24/7')).toBeInTheDocument()
    expect(screen.getByText('Sem fila')).toBeInTheDocument()
    expect(screen.getByText('Resposta imediata')).toBeInTheDocument()
    expect(screen.getByText('Multicanal')).toBeInTheDocument()
    expect(
      screen.queryByText(/clientes atendidos sem fila/i),
    ).not.toBeInTheDocument()
  })

  it('renders the mobile variant without losing the CTA or proof cues', () => {
    render(<NordyIntroHero layout="mobile" />)

    expect(
      screen.getByRole('link', { name: /quero o nordy/i }),
    ).toHaveAttribute('href', '#contact')
    expect(
      screen.getByText('Agenda confirmada com retorno automatico'),
    ).toBeInTheDocument()
    expect(screen.getByText(/nordy online/i)).toBeInTheDocument()
  })

  it('renders the shared hero in both NordySection intro branches without the legacy stats grid', () => {
    class MockIntersectionObserver {
      observe() {}
      disconnect() {}
      unobserve() {}
      takeRecords() {
        return []
      }
    }

    const originalObserver = globalThis.IntersectionObserver
    globalThis.IntersectionObserver = MockIntersectionObserver

    try {
      setViewportWidth(1440)
      const desktopView = render(<NordySection />)

      expect(
        within(desktopView.container).getByRole('heading', {
          name: /nordy atende, organiza e confirma em segundos\./i,
        }),
      ).toBeInTheDocument()
      expect(within(desktopView.container).getByText('Lead captado')).toBeInTheDocument()
      expect(within(desktopView.container).queryByText(/clientes atendidos sem fila/i)).not.toBeInTheDocument()

      desktopView.unmount()

      setViewportWidth(390)
      const mobileView = render(<NordySection />)

      expect(
        within(mobileView.container).getByRole('heading', {
          name: /nordy atende, organiza e confirma em segundos\./i,
        }),
      ).toBeInTheDocument()
      expect(
        within(mobileView.container).getByText('Agenda confirmada com retorno automatico'),
      ).toBeInTheDocument()
      expect(within(mobileView.container).queryByText(/clientes atendidos sem fila/i)).not.toBeInTheDocument()

      mobileView.unmount()
    } finally {
      cleanup()
      globalThis.IntersectionObserver = originalObserver
      setViewportWidth(1024)
    }
  })

  it('renders support chips as attached hero reinforcements', () => {
    render(<NordyIntroHero layout="desktop" />)

    const chips = screen.getAllByTestId('nordy-support-chip')

    expect(chips).toHaveLength(4)
    expect(chips[0]).toHaveTextContent('24/7')
    expect(chips[1]).toHaveTextContent('Sem fila')
    expect(chips[2]).toHaveTextContent('Resposta imediata')
    expect(chips[3]).toHaveTextContent('Multicanal')
  })
})
