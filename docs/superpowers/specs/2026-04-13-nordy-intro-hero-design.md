# Nordy Intro Hero Design

Date: 2026-04-13
Status: Draft approved in chat, pending user review of written spec

## Goal

Make the introduction of the Nordy section more attention-grabbing and less generic by turning it into a stronger product hero.

The target outcome is a first panel that immediately communicates presence, product identity, and visual authority before the user even finishes reading the copy.

## Scope

This design changes only the introductory panel of the Nordy section in `src/components/NordySection.jsx`.

In scope:
- Redesign the opening composition of the Nordy section
- Replace the current balanced text-plus-stats layout with a product-dominant hero
- Introduce a main hybrid frame that mixes chat and system cues
- Reduce the prominence of the current stats grid
- Preserve current CTA intent and section continuity

Out of scope:
- Reworking the entire Nordy section
- Backend or data changes
- Replacing the integrations panel design already specified separately
- Adding unrelated hover gimmicks or decorative-only components

## Problem

The current intro panel does not command enough attention and feels too generic. Its visual hierarchy is split between left-side copy and a right-side grid of cards with similar weight.

As a result:
- there is no single dominant focal point
- the Nordy product feels implied rather than embodied
- the opening reads more like a standard landing section than a distinct product hero

## Design Direction

The intro should become a true product hero.

It should feel:
- product-led
- visually dominant
- asymmetrical
- more ownable and less template-like

The visual emphasis must shift from small distributed cards to one main hero frame.

## Proposed Experience

### Text Column

The text column should remain on the left, but become more compact and more supportive of the hero frame rather than competing with it.

Recommended contents:
- badge
- stronger headline
- concise subheadline
- CTA

The copy block should sit higher in the composition and consume less total visual area than it does today.

### Hero Frame

The right side becomes the dominant visual anchor of the panel.

This hero frame should be a hybrid between:
- a live chat surface
- a light operational system panel

It should communicate in a single view:
- Nordy is an actual product
- Nordy handles conversation
- Nordy performs action and orchestration

The frame should be more aspirational than the integrations demo. It should feel iconic and presentational, not procedural.

## Hero Frame Structure

Recommended internal layers:

1. Product header
- Nordy status
- short product descriptor
- subtle system state

2. Chat area
- one compact incoming message
- one strong outgoing Nordy response

3. System support layer
- small side or embedded panel showing compact action states
- fewer details than the integrations panel

4. Result cue
- one visual proof of successful operation such as:
  - `Atendimento concluido`
  - `Lead captado`
  - `Agenda confirmada`

## Supporting Elements

The current stats grid should stop being a separate right-side block.

Recommended replacement:
- floating chips
- micro cards
- anchored info tags attached to the hero frame

Examples:
- `24/7`
- `Sem fila`
- `Resposta imediata`
- `Multicanal`

These elements should reinforce the frame, not compete with it.

## Composition

Recommended layout:
- left: compact copy stack
- right: large hybrid product frame
- support elements attached to or orbiting the frame

The section should feel asymmetrical on desktop, with the product clearly dominating more horizontal and vertical space than the text.

The current visual split should be intentionally broken.

## Visual Language

The intro should feel premium and product-specific, not noisy.

Guidelines:
- concentrate background light behind the hero frame
- use stronger framing around the product surface
- keep brand yellow for focus, completion, and key accents
- use restrained white/gray layers for structure
- avoid turning the hero into a busy dashboard

The product frame should feel like one authored object, not multiple disconnected cards.

## Motion

Motion should reinforce hero presence, not create spectacle for its own sake.

Recommended sequence:
1. hero frame settles into place
2. chips/support labels appear with slight stagger
3. internal chat/system signals activate subtly

The motion should feel composed and premium.

## Mobile Behavior

On mobile:
- copy remains first
- hero frame follows directly after
- support chips collapse into a tighter stack around or below the frame

The composition should still preserve a clear main focal object rather than dissolving back into a list of small cards.

## Component Boundaries

This change should likely replace the current intro stats grid with a focused hero component or a well-bounded local substructure inside `NordySection.jsx`.

If the opening panel becomes too large or difficult to maintain, extract the hero into a dedicated local component with:
- text support content
- main hero frame
- support chips

## Testing

Manual validation is required for:
- desktop focal hierarchy
- mobile stacking and readability
- hero frame alignment inside the existing panel system
- CTA visibility without being visually buried
- continuity between intro panel and integrations panel

## Success Criteria

- The Nordy intro becomes immediately more attention-grabbing
- The opening no longer feels like a generic “text + cards” landing composition
- Users perceive Nordy as a concrete product in the first glance
- The product hero feels visually stronger than the current intro without becoming cluttered

## Recommended Implementation Approach

Recommended approach: redesign only the first Nordy panel while preserving the current section flow and subsequent panels.

Reasoning:
- highest visual upside for contained effort
- avoids cascading redesign of the whole section
- directly addresses the identified weakness in the intro

## Risks

- Too many support chips can recreate the same fragmented feel as the current stats grid
- Too much system detail can steal differentiation from the integrations panel
- Over-animating the hero can make it feel less premium

The implementation should bias toward one dominant object and minimal supporting noise.
