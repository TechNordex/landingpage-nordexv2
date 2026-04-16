import { readFileSync } from 'fs'
import { join } from 'path'

const nordyContext = readFileSync(join(process.cwd(), 'nordy-context.md'), 'utf-8')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const { messages } = req.body

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Mensagens inválidas.' })
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://nordex.tech',
        'X-Title': 'Nordy - Nordex Tech',
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || 'openai/gpt-4.5-nano',
        messages: [
          { role: 'system', content: nordyContext },
          ...messages,
        ],
        max_tokens: 4096,
        temperature: 0.7,
        reasoning: { effort: 'low' },
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('[chat] OpenRouter error:', errText)
      return res.status(502).json({ error: 'Erro ao conectar com o assistente.' })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content ?? 'Não consegui processar sua mensagem.'
    res.json({ reply })
  } catch (err) {
    console.error('[chat]', err)
    res.status(500).json({ error: 'Erro interno.' })
  }
}
