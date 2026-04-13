# Handoffs

Este diretório guarda o estado operacional entre sessões de chat.

## Quando criar um handoff

- ao encerrar uma sessão com trabalho incompleto
- após uma mudança grande de arquitetura, fluxo ou copy
- quando houver vários arquivos editados e contexto acumulado

## Convenção de nome

- `YYYY-MM-DD-HHMMSS-slug.md`

Exemplo:

- `2026-04-13-114500-ajuste-copy-hero.md`

## Conteúdo mínimo

- resumo do estado atual
- o que foi concluído
- arquivos alterados ou críticos
- decisões tomadas
- bloqueios e riscos
- próximos passos em ordem

## Relação com o Conductor

- `conductor/` guarda o contexto estável do projeto
- `handoffs/` guarda o estado transitório da sessão

Leia sempre o handoff mais recente junto com `conductor/index.md` antes de retomar uma frente de trabalho.
