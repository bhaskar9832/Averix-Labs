'use server'

import { sql } from '@/lib/db'

export async function submitContact(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const company = (formData.get('company') as string) || null
  const project_type = formData.get('project_type') as string
  const message = formData.get('message') as string

  const first_name = name.split(' ')[0]
  const last_name = name.split(' ').slice(1).join(' ') || null

  let leadId: string | null = null;
  let dbSuccess = false;

  try {
    // Insert lead
    const leads = await sql`
      INSERT INTO leads (first_name, last_name, full_name, email, company, project_type, source, status)
      VALUES (${first_name}, ${last_name}, ${name}, ${email}, ${company}, ${project_type}, 'Contact Form', 'NEW')
      RETURNING id
    `
    if (leads && leads.length > 0) {
      leadId = leads[0].id
      dbSuccess = true
    }
  } catch(err: any) {
    console.error('Lead DB error:', err.message || err)
  }

  if (leadId) {
    try {
      // Insert message
      await sql`
        INSERT INTO messages (lead_id, name, email, company, project, message, status)
        VALUES (${leadId}, ${name}, ${email}, ${company}, ${project_type}, ${message}, 'UNREAD')
      `
    } catch(err: any) {
      console.error('Message DB error:', err.message || err)
    }
  }

  // Backup fallback: forward to FormSubmit email delivery if DB or Telegram fails
  if (!dbSuccess) {
    try {
      await fetch("https://formsubmit.co/ajax/averixlabs001@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          company: company || 'N/A',
          project_type,
          message,
          _subject: `New Project Inquiry from ${name} (Web Direct)`,
          _template: "table"
        })
      });
    } catch (fallbackErr: any) {
      console.error('Fallback email notification error:', fallbackErr.message || fallbackErr);
    }
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
