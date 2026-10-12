'use server'

import { saveContact, validateContact } from '@/lib/contact-store.mjs';

export async function submitContact(formData: FormData) {
  const inquiry = validateContact(Object.fromEntries(formData));
  if (!inquiry) return { error: 'Please check your contact details and message.' };
  try {
    await saveContact(inquiry);
  } catch {
    console.error('[Averix Labs] Failed to save contact submission');
    return { error: 'Failed to save your message. Please try again later.' };
  }
  const { name, email, company, project_type, message } = inquiry;

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
