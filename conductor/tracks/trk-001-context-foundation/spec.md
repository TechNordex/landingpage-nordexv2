# Spec

## Problema

O projeto dependia de contexto distribuído e de memória do chat, o que aumenta o risco de perder decisões, progresso e alinhamento entre sessões.

## Objetivo

Estabelecer uma fonte única de contexto e um processo simples de handoff para continuidade de desenvolvimento.

## Escopo

- criar estrutura `conductor/`
- consolidar visão de produto, stack e workflow
- registrar o primeiro track de documentação
- preparar pasta `.claude/handoffs/` para handoffs versionados

## Fora de escopo

- automatizar geração de handoff dentro do repositório
- criar testes automatizados
- redesenhar a landing

## Critérios de aceitação

- existe um diretório `conductor/` com artefatos principais
- existe um track inicial documentando a fundação
- existe uma pasta versionada para handoffs
- há instruções objetivas para iniciar e encerrar sessões
