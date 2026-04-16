import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const { name, email, company, message } = req.body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(400).json({ error: 'E-mail inválido.' })
  }

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL || 'contato@nordex.tech',
      replyTo: email,
      subject: `[Nordex Site] Nova mensagem de ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0A0A0A;padding:24px 32px;border-radius:12px 12px 0 0;">
            <h2 style="color:#F5C518;margin:0;font-size:20px;">Nova mensagem pelo site</h2>
          </div>
          <div style="background:#1A1A1A;padding:32px;border-radius:0 0 12px 12px;color:#fff;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="color:#aaa;padding:8px 0;width:120px;">Nome</td><td style="color:#fff;">${name}</td></tr>
              <tr><td style="color:#aaa;padding:8px 0;">E-mail</td><td><a href="mailto:${email}" style="color:#F5C518;">${email}</a></td></tr>
              ${company ? `<tr><td style="color:#aaa;padding:8px 0;">Empresa</td><td style="color:#fff;">${company}</td></tr>` : ''}
              <tr><td style="color:#aaa;padding:8px 0;vertical-align:top;">Mensagem</td><td style="color:#fff;line-height:1.6;">${message.replace(/\n/g, '<br>')}</td></tr>
            </table>
          </div>
          <p style="color:#555;font-size:12px;text-align:center;margin-top:16px;">Nordex Tech — nordex.tech</p>
        </div>
      `,
    })

    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: 'Recebemos sua mensagem — Nordex Tech',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0A0A0A;padding:24px 32px;border-radius:12px 12px 0 0;">
            <h2 style="color:#F5C518;margin:0;font-size:20px;">Recebemos sua mensagem!</h2>
          </div>
          <div style="background:#1A1A1A;padding:32px;border-radius:0 0 12px 12px;color:#fff;line-height:1.7;">
            <p>Olá, <strong>${name}</strong>!</p>
            <p>Obrigado por entrar em contato com a <strong>Nordex Tech</strong>. Recebemos sua mensagem e nossa equipe entrará em contato em breve.</p>
            <p style="color:#aaa;font-size:14px;">Sua mensagem:<br><em style="color:#ddd;">"${message.slice(0, 200)}${message.length > 200 ? '...' : ''}"</em></p>
            <div style="margin-top:24px;text-align:center;">
              <a href="https://nordy.nordex.tech" style="background:#F5C518;color:#0A0A0A;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:bold;font-size:14px;">Conheça o Nordy</a>
            </div>
          </div>
          <p style="color:#555;font-size:12px;text-align:center;margin-top:16px;">Nordex Tech — Moreno, Pernambuco — nordex.tech</p>
        </div>
      `,
    })

    res.json({ ok: true })
  } catch (err) {
    console.error('[contact]', err)
    res.status(500).json({ error: 'Erro ao enviar mensagem. Tente novamente.' })
  }
}
