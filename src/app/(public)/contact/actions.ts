'use server'

import { sql } from '@/lib/db'

export async function submitContact(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const company = (formData.get('company') as string) || null
  const project_type = formData.get('project_type') as string
  const message = formData.get('message') as string

  const first_name = name.split(' ')[0]
  const last_name = name.split(' ').slice(1).join(' ') || null

  let lead;
  try {
    // Insert lead
    const leads = await sql`
      INSERT INTO leads (first_name, last_name, full_name, email, company, project_type, source, status)
      VALUES (${first_name}, ${last_name}, ${name}, ${email}, ${company}, ${project_type}, 'Contact Form', 'NEW')
      RETURNING id
    `
    lead = leads[0]
  } catch(err) {
    console.error('Lead error:', err)
    return { error: 'Failed to submit your inquiry. Please try again later.' }
  }

  try {
    // Insert message
    await sql`
      INSERT INTO messages (lead_id, name, email, company, project, message, status)
      VALUES (${lead.id}, ${name}, ${email}, ${company}, ${project_type}, ${message}, 'UNREAD')
    `
  } catch(err) {
    console.error('Message error:', err)
    return { error: 'Failed to save your message.' }
  }

  // Send Telegram Notification
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  if (telegramBotToken && telegramChatId) {
    const text = `🎉 *New Contact Request* 🎉\n\n*Name:* ${name}\n*Email:* ${email}\n*Company:* ${company || 'N/A'}\n*Project Type:* ${project_type}\n\n*Message:*\n${message}`;
    
    try {
      await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: text,
          parse_mode: 'Markdown',
        }),
      });
    } catch (err) {
      console.error('Failed to send Telegram notification:', err);
    }
  }

  return { success: true }
}
