# Tech Stack

## Aplicação

- Frontend: React 18 + Vite 6
- Estilo: Tailwind CSS 3 + CSS local
- Backend: Node.js com Express
- Runtime module system: ESM (`"type": "module"`)

## Dependências principais

- `react` / `react-dom`: interface da landing
- `express`: API local para contato e chat
- `cors`: política de origem do backend
- `dotenv`: leitura de variáveis de ambiente
- `resend`: envio de e-mails do formulário
- `lucide-react`: ícones
- `animejs`: animações programáticas de interface

## Scripts

- `npm run dev`: sobe Vite e `server.js` com `concurrently`
- `npm run server`: sobe apenas o backend
- `npm run build`: build do frontend
- `npm run preview`: preview do build
- `npm test`: executa a suíte de componentes React com Vitest

## Testes

- Frontend component tests: Vitest + Testing Library + jsdom
- `npm test`: executa a suíte de componentes React
- `npm run build`: valida o bundle final da landing

## Desenvolvimento em rede local

- Vite exposto em `0.0.0.0:5173` para testes em mobile na mesma rede
- Backend Express exposto em `0.0.0.0:3001`
- CORS liberado para `localhost`, `127.0.0.1` e faixas privadas comuns na porta `5173`

## Integrações externas

- Resend: envio de e-mail do formulário de contato
- OpenRouter: completions do chat Nordy

## Variáveis de ambiente esperadas

- `RESEND_API_KEY`
- `FROM_EMAIL`
- `CONTACT_EMAIL`
- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL`

## Estrutura relevante

- `src/`: frontend da landing
- `src/components/`: seções da página
- `src/components/NordySection.jsx`: integração de Anime.js na seção do Nordy
- `src/components/SplashScreen.jsx`: sequência inicial coordenada por Anime.js
- `src/components/NordyChat.jsx`: abertura do chat com Anime.js
- `server.js`: endpoints `/api/contact` e `/api/chat`
- `nordy-context.md`: prompt de sistema do chat

## Débitos e riscos atuais

- A cobertura automatizada ainda está concentrada na UI do Nordy e não cobre o backend
- Contexto do produto e workflow ainda estava fora de uma estrutura única
- O backend depende de serviços externos para funções críticas de contato e chat

## Regra de manutenção

- Toda nova dependência deve ser registrada aqui com justificativa curta
- Toda mudança de provider externo, endpoint ou variável de ambiente deve ser refletida aqui
