# Nordy Integrations Demo Design

Date: 2026-04-13
Status: Draft approved in chat, pending user review of written spec

## Goal

Increase the visual impact of the Nordy section by turning the current integrations panel into the strongest product-demo moment on the page.

The target outcome is a demo that feels technological and operational, not decorative. Users should quickly understand that Nordy does more than answer messages: it interprets requests, checks context, executes a workflow, and returns a result.

## Scope

This design changes only the integrations panel inside `src/components/NordySection.jsx`.

In scope:
- Replace the current simple chat mock emphasis with a stronger operational demo
- Keep the channel selector as the entry point for switching scenarios
- Add visible system-state steps tied to each scenario
- Add a final outcome/result block
- Preserve responsive behavior on mobile and desktop

Out of scope:
- Redesigning the full Nordy section structure
- Reintroducing GlowCard or similar hover-only visual effects
- Backend/API changes
- New analytics or persistence

## Problem

The current integrations panel communicates channel coverage, but it does not create a strong memorable product moment. The user sees a chat mock and channel pills, but the product intelligence remains mostly implied.

This weakens the premium perception of Nordy and misses an opportunity to show operational capability in motion.

## Design Direction

The integrations panel should feel like a compact operations console.

It should communicate:
- active channel
- current system status
- sequential execution of internal actions
- visible business outcome

The tone is technological and operational. Motion should feel deliberate and efficient, not playful or futuristic for its own sake.

## Proposed Experience

### Left Column

The existing integration selector remains, but each channel card should feel like an active route rather than a passive tab.

Each channel option should continue to show:
- platform identity
- short support descriptor
- active state

Optional visual upgrades within the same structure:
- a micro status label such as `roteando`, `ativo`, or `pronto`
- stronger active-state contrast

### Right Column

The current chat mock becomes a more structured demo shell with four parts:

1. Demo header
- Channel active
- Nordy online
- Operational micro-metric such as latency or processing state

2. Conversation panel
- User request
- Nordy response
- Timing and sequencing still visible through staggered message reveal

3. Execution rail
- Short system steps shown in order
- Example steps:
  - `Detectando intencao`
  - `Consultando contexto`
  - `Validando disponibilidade`
  - `Confirmando resposta`

4. Outcome block
- A compact result panel with business value
- Example outcomes:
  - `Agendamento confirmado`
  - `Lead qualificado`
  - `Horario enviado ao cliente`

## Interaction Model

Each channel should map to its own mini scenario.

### WhatsApp
- Scenario focused on appointment scheduling
- Outcome: confirmed booking

### Telegram
- Scenario focused on rescheduling or internal coordination
- Outcome: schedule changed and parties notified

### Site
- Scenario focused on pre-sales or quick service availability
- Outcome: lead qualified or slot reserved

When the user changes channels:
- the demo state resets cleanly
- the conversation animates in again
- the execution rail progresses in sequence
- the final outcome updates to match the selected channel

Automatic cycling may remain, but manual interaction should feel authoritative and restart the scenario immediately.

## Visual Language

The panel should feel closer to a SaaS operations interface than to a consumer messenger mock.

Guidelines:
- Keep the dark base already used in the project
- Use brand yellow as an accent for active and completed states
- Use restrained green/blue channel colors only where they help platform distinction
- Prefer small labels, separators, status dots, and metric chips over large decorative effects
- Avoid reintroducing glowing borders or novelty effects

## Mobile Behavior

On mobile, the integrations panel should remain vertically stacked:
- selector first
- demo shell after

The execution rail should stack under the conversation instead of competing horizontally for space.

The final result block should stay visible without requiring the user to infer the outcome from the chat alone.

## Component Boundaries

The existing `ChatMock` should be refactored or replaced with a more explicit demo component inside `NordySection.jsx` unless extraction becomes clearly cleaner.

Recommended internal structure:
- channel selector UI
- demo shell wrapper
- conversation area
- execution steps area
- result block

If the file becomes harder to reason about, extract the demo shell into a focused local component.

## Animation Principles

Animation should support clarity.

Recommended sequence:
1. Header/status becomes active
2. User message appears
3. Execution steps light up one by one
4. Nordy response appears
5. Outcome block resolves last

Animation should be short, readable, and deterministic. No excessive looping beyond the existing channel cycle.

## Error Handling

This is a static frontend demo, so runtime complexity is low.

Requirements:
- Switching channels mid-animation should not leave stale UI states visible
- Re-renders should not stack duplicate timers
- Mobile and desktop should share the same scenario data model where possible

## Testing

Manual validation is required for:
- desktop panel switching
- mobile stacking and readability
- repeated channel changes during animation
- initial render with default channel
- no layout overlap with sticky desktop panel behavior

## Success Criteria

- The integrations panel becomes the most memorable product moment in the Nordy section
- Users can understand in 3 to 5 seconds that Nordy executes workflows, not only chat replies
- The visual style feels technological and operational
- The panel remains readable on mobile
- The implementation preserves the current brand system and does not introduce visual gimmicks

## Recommended Implementation Approach

Recommended approach: evolve the existing integrations panel in place instead of rebuilding the whole Nordy section.

Reasoning:
- smallest scope for the desired impact
- preserves current structure and scroll behavior
- keeps the work centered on the exact panel identified as weak

## Risks

- Overloading the panel with too many states can reduce clarity
- Excess motion can make the demo feel fake instead of premium
- If channel scenarios are too similar, the interaction will feel cosmetic

The implementation should bias toward fewer, stronger signals.
