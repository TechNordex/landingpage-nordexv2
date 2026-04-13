# Workflow

## Fluxo padrão

1. Ler `conductor/index.md` e artefatos principais
2. Verificar `conductor/tracks.md`
3. Abrir ou atualizar o track da tarefa atual
4. Implementar
5. Atualizar contexto afetado
6. Encerrar com handoff se a sessão parar antes de concluir tudo

## Antes de começar uma tarefa

- Confirmar se existe track ativo para o tema
- Se não existir, criar um diretório em `conductor/tracks/<track-id>/`
- Registrar objetivo, escopo e critérios mínimos em `spec.md`
- Registrar passos executáveis em `plan.md`

## Durante a implementação

- Se produto mudar, atualizar `product.md`
- Se tom, posicionamento ou regras do Nordy mudarem, atualizar `product-guidelines.md` e `nordy-context.md`
- Se stack, scripts, integrações ou env vars mudarem, atualizar `tech-stack.md`

## Encerramento de sessão

- Atualizar o `plan.md` do track ativo com o ponto real de parada
- Registrar bloqueios, decisões e próximos passos
- Criar novo handoff em `.claude/handoffs/`

## Handoff padrão

Nome do arquivo:

- `YYYY-MM-DD-HHMMSS-slug.md`

Conteúdo mínimo:

- resumo do estado atual
- decisões importantes
- arquivos críticos
- o que falta
- primeiro próximo passo
- riscos ou bloqueios

## Qualidade mínima

- Não deixar TODOs vagos sem dono ou sem próximo passo claro
- Não encerrar sessão longa sem registrar contexto
- Não alterar escopo importante sem refletir em `product.md` ou `tracks.md`

## Git

- Não assumir worktree limpa sem verificar
- Não reverter mudanças alheias
- Commitar contexto junto com a mudança de código quando fizer sentido

## Testes

- Quando houver mudança funcional, rodar ao menos a validação mais próxima disponível
- Se não houver teste automatizado, registrar isso explicitamente no handoff ou no track
