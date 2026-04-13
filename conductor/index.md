# Conductor Index

Este diretório é a fonte canônica de contexto do projeto.

## Leitura obrigatória no início de cada sessão

1. `conductor/product.md`
2. `conductor/product-guidelines.md`
3. `conductor/tech-stack.md`
4. `conductor/workflow.md`
5. `conductor/tracks.md`
6. Handoff mais recente em `.claude/handoffs/`, quando existir

## Artefatos

- `product.md`: visão do produto, objetivos e escopo
- `product-guidelines.md`: voz, posicionamento e diretrizes de comunicação
- `tech-stack.md`: stack real do projeto e integrações
- `workflow.md`: regras de trabalho, atualização de contexto e handoff
- `tracks.md`: registro de trilhas de trabalho
- `tracks/<track-id>/`: especificação e plano por frente de trabalho

## Contexto externo relevante

- `nordy-context.md`: prompt operacional do assistente Nordy usado no backend

## Regras

- Não criar documentação paralela para o mesmo assunto sem atualizar este índice.
- Toda mudança relevante de produto, stack, workflow ou decisão técnica deve refletir aqui.
- Toda sessão longa deve terminar com atualização do track ativo e um handoff em `.claude/handoffs/`.
