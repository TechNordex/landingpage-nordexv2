# Nordy Intro Hero Design Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the first panel of `src/components/NordySection.jsx` with a product-dominant hero that makes Nordy feel concrete, premium, and visually stronger than the current text-plus-stats layout.

**Architecture:** Extract the intro panel into a focused `NordyIntroHero` component so desktop and mobile share one source of truth for copy, hero-frame structure, and support chips. Keep the existing section flow, animations, and integrations panel intact while swapping only panel 1 markup and adding a small frontend test harness so the redesign has regression coverage.

**Tech Stack:** React 18, Vite 6, Tailwind CSS 3, Anime.js, Vitest, Testing Library, jsdom

---

## File Structure

- Create: `src/components/nordy/NordyIntroHero.jsx`
  Responsibility: shared intro hero markup for mobile and desktop, including text support content, the hybrid hero frame, result cue, and attached support chips.
- Create: `src/components/nordy/NordyIntroHero.test.jsx`
  Responsibility: verify desktop/mobile intro hierarchy, hero-frame content, CTA, and support-chip behavior.
- Create: `src/test/setup.js`
  Responsibility: Testing Library and `jest-dom` setup for Vitest.
- Create: `vitest.config.js`
  Responsibility: jsdom test environment and frontend test file discovery.
- Modify: `src/components/NordySection.jsx`
  Responsibility: replace the current intro stats grid panel with `NordyIntroHero` in both desktop and mobile branches without altering later panels.
- Modify: `src/index.css`
  Responsibility: add only the hero-specific keyframes/classes that are awkward in Tailwind utility form.
- Modify: `package.json`
  Responsibility: add `test` script plus frontend test devDependencies.
- Modify: `conductor/tech-stack.md`
  Responsibility: document the new frontend testing stack added by this change.

## Task 1: Add Frontend Test Harness

**Files:**
- Modify: `package.json`
- Create: `vitest.config.js`
- Create: `src/test/setup.js`
- Test: `src/components/nordy/NordyIntroHero.test.jsx`

- [ ] **Step 1: Write the failing test for the future intro hero**

```jsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { NordyIntroHero } from './NordyIntroHero'

describe('NordyIntroHero', () => {
  it('renders the product-led desktop hero content', () => {
    render(<NordyIntroHero layout="desktop" />)

    expect(
      screen.getByRole('heading', {
        name: /nordy atende, organiza e confirma em segundos/i,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText(/lead captado/i),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: /quero o nordy/i }),
    ).toHaveAttribute('href', '#contact')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/components/nordy/NordyIntroHero.test.jsx`
Expected: FAIL with either `Missing script: "test"` or `Cannot find module './NordyIntroHero'`

- [ ] **Step 3: Add the test tooling dependencies and script**

Update `package.json` to:

```json
{
  "scripts": {
    "dev": "concurrently \"vite\" \"node server.js\"",
    "server": "node server.js",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "concurrently": "^9.0.0",
    "jsdom": "^25.0.1",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.15",
    "vite": "^6.0.1",
    "vitest": "^2.1.5"
  }
}
```

Install the new packages:

```bash
npm install
```

- [ ] **Step 4: Configure Vitest for React components**

Create `vitest.config.js`:

```js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
  },
})
```

Create `src/test/setup.js`:

```js
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 5: Run test to verify it now fails for the right reason**

Run: `npm test -- --run src/components/nordy/NordyIntroHero.test.jsx`
Expected: FAIL with `Failed to resolve import "./NordyIntroHero"` because the component does not exist yet

- [ ] **Step 6: Commit the test harness**

```bash
git add package.json package-lock.json vitest.config.js src/test/setup.js src/components/nordy/NordyIntroHero.test.jsx
git commit -m "test: add frontend component test harness"
```

## Task 2: Build the Shared Nordy Intro Hero Component

**Files:**
- Create: `src/components/nordy/NordyIntroHero.jsx`
- Test: `src/components/nordy/NordyIntroHero.test.jsx`

- [ ] **Step 1: Expand the failing test to lock the intended hierarchy**

Replace `src/components/nordy/NordyIntroHero.test.jsx` with:

```jsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { NordyIntroHero } from './NordyIntroHero'

describe('NordyIntroHero', () => {
  it('renders the desktop hero with one dominant product frame', () => {
    render(<NordyIntroHero layout="desktop" />)

    expect(
      screen.getByRole('heading', {
        name: /nordy atende, organiza e confirma em segundos/i,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText(/assistente de atendimento multicanal com orquestracao ativa/i),
    ).toBeInTheDocument()

    expect(screen.getByText('Conversa ativa')).toBeInTheDocument()
    expect(screen.getByText('Acoes em andamento')).toBeInTheDocument()
    expect(screen.getByText('Lead captado')).toBeInTheDocument()
    expect(screen.getAllByText(/24\/7|sem fila|resposta imediata|multicanal/i)).toHaveLength(4)
    expect(screen.queryByText(/clientes atendidos sem fila/i)).not.toBeInTheDocument()
  })

  it('renders the mobile variant without losing the CTA or proof cues', () => {
    render(<NordyIntroHero layout="mobile" />)

    expect(screen.getByRole('link', { name: /quero o nordy/i })).toHaveAttribute('href', '#contact')
    expect(screen.getByText(/agenda confirmada/i)).toBeInTheDocument()
    expect(screen.getByText(/nordy online/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/components/nordy/NordyIntroHero.test.jsx`
Expected: FAIL with `Failed to resolve import "./NordyIntroHero"`

- [ ] **Step 3: Write the minimal shared hero component**

Create `src/components/nordy/NordyIntroHero.jsx`:

```jsx
import { ArrowRight, CheckCircle2, Sparkles, Zap } from 'lucide-react'

const supportChips = ['24/7', 'Sem fila', 'Resposta imediata', 'Multicanal']

const actionRows = [
  'Triagem da conversa concluida',
  'Lead salvo no funil comercial',
  'Agenda confirmada com retorno automatico',
]

export function NordyIntroHero({ layout = 'desktop' }) {
  const isMobile = layout === 'mobile'

  return (
    <div
      className={`relative ${isMobile ? 'space-y-8' : 'grid lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] gap-8 xl:gap-14 items-center'}`}
    >
      <div className="relative z-10">
        <div
          data-nordy-item
          className="inline-flex items-center gap-2 rounded-full border border-brand-yellow/30 bg-brand-yellow/10 px-4 py-1.5"
        >
          <span className="h-2 w-2 rounded-full bg-brand-yellow animate-pulse" />
          <span className="font-body text-xs uppercase tracking-[0.22em] text-brand-yellow">
            Conheca o Nordy
          </span>
        </div>

        <p data-nordy-item className="mt-5 font-body text-sm uppercase tracking-[0.26em] text-white/45">
          Assistente de atendimento multicanal com orquestracao ativa
        </p>

        <h2
          data-nordy-item
          className="mt-4 max-w-xl font-heading font-bold leading-[0.95] text-white"
          style={{ fontSize: isMobile ? 'clamp(2.4rem, 11vw, 4rem)' : 'clamp(3.4rem, 6vw, 6.2rem)' }}
        >
          Nordy atende, organiza e confirma em segundos.
        </h2>

        <p
          data-nordy-item
          className={`mt-4 font-body leading-relaxed text-white/60 ${isMobile ? 'max-w-none text-base' : 'max-w-md text-lg'}`}
        >
          Um hero de produto que mostra conversa, automacao e resultado em uma unica cena, sem depender
          de uma grade de cards para explicar valor.
        </p>

        <a
          data-nordy-item
          href="#contact"
          className="yellow-glow mt-7 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-7 py-4 font-heading font-bold text-brand-black transition-all duration-200 hover:bg-brand-yellow-light"
        >
          Quero o Nordy
          <ArrowRight size={18} />
        </a>
      </div>

      <div data-nordy-item className="relative mx-auto w-full max-w-[680px]">
        <div className="nordy-hero-glow absolute inset-[-10%] rounded-[2.5rem]" />

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#121212]/95 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <p className="font-heading text-sm font-semibold text-white">Nordy online</p>
              </div>
              <p className="mt-1 font-body text-xs text-white/45">Operando atendimento, qualificacao e agenda</p>
            </div>

            <div className="rounded-full border border-brand-yellow/20 bg-brand-yellow/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-brand-yellow">
              Estado estavel
            </div>
          </div>

          <div className={`grid gap-4 p-4 ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] p-5'}`}>
            <div className="rounded-[1.5rem] border border-white/8 bg-brand-gray-dark/80 p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-body text-[11px] uppercase tracking-[0.22em] text-white/35">Conversa ativa</span>
                <Sparkles size={15} className="text-brand-yellow" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-yellow/15 px-3 py-2 text-sm leading-snug text-white/90">
                    Quero agendar para quinta e saber os valores.
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-brand-gray-light px-3 py-3 text-sm leading-snug text-white/80">
                    Encontrei quinta, 10h. Reservei o horario, registrei o interesse comercial e enviei a confirmacao.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-body text-[11px] uppercase tracking-[0.22em] text-white/35">Acoes em andamento</span>
                <Zap size={15} className="text-brand-yellow" />
              </div>

              <div className="space-y-2.5">
                {actionRows.map((row) => (
                  <div key={row} className="rounded-xl border border-brand-yellow/20 bg-brand-yellow/10 px-3 py-2.5">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="mt-0.5 text-brand-yellow" />
                      <p className="font-body text-xs leading-snug text-white/80">{row}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-green-400/25 bg-green-400/10 px-4 py-3">
                <p className="font-body text-[11px] uppercase tracking-[0.22em] text-green-300/80">Resultado</p>
                <p className="mt-1 font-heading text-base font-semibold text-white">Lead captado</p>
                <p className="mt-1 font-body text-xs text-white/55">Agenda confirmada e contexto entregue ao time.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${isMobile ? 'mt-4 flex flex-wrap gap-2' : 'pointer-events-none absolute inset-0'}`}>
          {supportChips.map((chip, index) => {
            const desktopPositions = [
              'left-[-1.2rem] top-[2.5rem]',
              'right-[1rem] top-[-0.9rem]',
              'left-[2rem] bottom-[1.2rem]',
              'right-[-1.3rem] bottom-[2rem]',
            ]

            return (
              <div
                key={chip}
                data-nordy-item
                className={`nordy-hero-chip rounded-full border border-white/10 bg-white/6 px-3.5 py-2 font-body text-xs text-white/75 backdrop-blur ${
                  isMobile ? '' : `absolute ${desktopPositions[index]}`
                }`}
              >
                {chip}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run src/components/nordy/NordyIntroHero.test.jsx`
Expected: PASS with `2 passed`

- [ ] **Step 5: Commit the new intro hero component**

```bash
git add src/components/nordy/NordyIntroHero.jsx src/components/nordy/NordyIntroHero.test.jsx
git commit -m "feat: add shared nordy intro hero component"
```

## Task 3: Replace the Existing Intro Panel in `NordySection`

**Files:**
- Modify: `src/components/NordySection.jsx`
- Test: `src/components/nordy/NordyIntroHero.test.jsx`

- [ ] **Step 1: Add the failing integration test for legacy stats removal**

Append to `src/components/nordy/NordyIntroHero.test.jsx`:

```jsx
it('does not render the legacy intro stats copy in the new hero', () => {
  render(<NordyIntroHero layout="desktop" />)

  expect(screen.queryByText(/resposta em segundos/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/mais barato que um funcionario/i)).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it passes before integration**

Run: `npm test -- --run src/components/nordy/NordyIntroHero.test.jsx`
Expected: PASS with `3 passed`

- [ ] **Step 3: Replace the desktop and mobile intro markup with the shared component**

Update `src/components/NordySection.jsx` imports and panel-1 blocks to:

```jsx
import { NordyIntroHero } from './nordy/NordyIntroHero'
```

Replace the mobile panel 1 body with:

```jsx
<div data-nordy-panel="0" className="px-5 py-16 relative overflow-hidden">
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: 'radial-gradient(ellipse 80% 55% at 50% 8%, rgba(245,197,24,0.09) 0%, transparent 72%)',
    }}
  />
  <div className="relative">
    <NordyIntroHero layout="mobile" />
  </div>
</div>
```

Replace the desktop panel 1 body with:

```jsx
<div data-nordy-panel="0" className="w-screen h-full flex-shrink-0 flex items-center justify-center relative overflow-hidden px-6">
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: 'radial-gradient(ellipse 68% 64% at 68% 48%, rgba(245,197,24,0.1) 0%, transparent 74%)',
    }}
  />
  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-yellow/20 to-transparent" />

  <div className="max-w-7xl w-full mx-auto">
    <NordyIntroHero layout="desktop" />
  </div>
</div>
```

Delete the now-unused `stats` constant entirely from `src/components/NordySection.jsx`.

- [ ] **Step 4: Run the component tests and production build**

Run: `npm test -- --run src/components/nordy/NordyIntroHero.test.jsx`
Expected: PASS with `3 passed`

Run: `npm run build`
Expected: PASS with Vite build output ending in `built in`

- [ ] **Step 5: Commit the panel integration**

```bash
git add src/components/NordySection.jsx src/components/nordy/NordyIntroHero.jsx src/components/nordy/NordyIntroHero.test.jsx
git commit -m "feat: replace nordy intro stats grid with product hero"
```

## Task 4: Add Motion Polish, Document the Test Stack, and Manually Validate

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/nordy/NordyIntroHero.jsx`
- Modify: `conductor/tech-stack.md`
- Test: `src/components/nordy/NordyIntroHero.test.jsx`

- [ ] **Step 1: Add the failing visual-regression test for support chips**

Append to `src/components/nordy/NordyIntroHero.test.jsx`:

```jsx
it('renders support chips as attached hero reinforcements', () => {
  render(<NordyIntroHero layout="desktop" />)

  const chips = screen.getAllByTestId('nordy-support-chip')

  expect(chips).toHaveLength(4)
  expect(chips[0]).toHaveTextContent('24/7')
  expect(chips[1]).toHaveTextContent('Sem fila')
  expect(chips[2]).toHaveTextContent('Resposta imediata')
  expect(chips[3]).toHaveTextContent('Multicanal')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/components/nordy/NordyIntroHero.test.jsx`
Expected: FAIL with `Unable to find an element by: [data-testid="nordy-support-chip"]`

- [ ] **Step 3: Add the hero-specific motion classes and document the stack**

Append to `src/index.css`:

```css
@keyframes nordyHeroFloat {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -6px, 0); }
}

@keyframes nordyHeroGlowPulse {
  0%, 100% { opacity: 0.45; transform: scale(0.98); }
  50% { opacity: 0.8; transform: scale(1.02); }
}

.nordy-hero-glow {
  background: radial-gradient(circle, rgba(245, 197, 24, 0.22) 0%, rgba(245, 197, 24, 0.08) 38%, transparent 74%);
  filter: blur(28px);
  animation: nordyHeroGlowPulse 5s ease-in-out infinite;
}

.nordy-hero-chip {
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28);
  animation: nordyHeroFloat 5.6s ease-in-out infinite;
}

.nordy-hero-chip:nth-of-type(2) {
  animation-delay: 0.4s;
}

.nordy-hero-chip:nth-of-type(3) {
  animation-delay: 0.8s;
}

.nordy-hero-chip:nth-of-type(4) {
  animation-delay: 1.2s;
}
```

Update the chip loop in `src/components/nordy/NordyIntroHero.jsx` to:

```jsx
<div
  key={chip}
  data-testid="nordy-support-chip"
  data-nordy-item
  className={`nordy-hero-chip rounded-full border border-white/10 bg-white/6 px-3.5 py-2 font-body text-xs text-white/75 backdrop-blur ${
    isMobile ? '' : `absolute ${desktopPositions[index]}`
  }`}
>
  {chip}
</div>
```

Update the testing section of `conductor/tech-stack.md` to:

```md
## Testes

- Frontend component tests: Vitest + Testing Library + jsdom
- `npm test`: executa a suíte de componentes React
- `npm run build`: valida o bundle final da landing
```

- [ ] **Step 4: Run automated and manual validation**

Run: `npm test -- --run src/components/nordy/NordyIntroHero.test.jsx`
Expected: PASS with `4 passed`

Run: `npm run build`
Expected: PASS with Vite build output ending in `built in`

Run: `npm run dev`
Expected: local Vite + Express servers start successfully

Manual checklist:

```md
- Desktop: the hero frame is the first focal point, clearly larger than the text column
- Desktop: support chips read as attached labels, not a replacement stats grid
- Desktop: CTA remains above the fold and visually distinct
- Mobile: copy appears before the hero frame and the frame remains the dominant object
- Mobile: support chips collapse into a tight stack below or around the frame without overlap
- Continuity: panel 2 integrations demo still feels more procedural than the aspirational intro hero
```

- [ ] **Step 5: Commit the visual polish and docs**

```bash
git add src/index.css conductor/tech-stack.md src/components/nordy/NordyIntroHero.jsx src/components/nordy/NordyIntroHero.test.jsx
git commit -m "style: polish nordy intro hero motion and docs"
```

## Self-Review

- Spec coverage:
  - Intro panel only: covered by Tasks 2 and 3.
  - Product-dominant hero frame replacing the stats grid: covered by Tasks 2 and 3.
  - Hybrid chat + system panel with one result cue: covered by Task 2.
  - Support chips replacing the separate right-side stats block: covered by Tasks 2 and 4.
  - Desktop asymmetry and mobile stacking: covered by Tasks 2, 3, and 4.
  - Motion sequencing and manual validation: covered by Task 4.
  - Continuity with the integrations panel: covered by Task 4 manual checklist.
- Placeholder scan:
  - No `TODO`, `TBD`, or “handle later” placeholders remain.
  - Every code-changing step includes exact code blocks.
  - Every validation step includes an exact command and expected outcome.
- Type consistency:
  - Shared component name is consistently `NordyIntroHero`.
  - Layout prop is consistently `desktop` / `mobile`.
  - Hero utility classes are consistently `nordy-hero-glow` and `nordy-hero-chip`.
