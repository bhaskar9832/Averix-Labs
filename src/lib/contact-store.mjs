import { getSql } from './postgres-client.mjs';

const projectTypes = new Set(['SaaS Platform', 'Web Application', 'Mobile Application', 'AI Product', 'API / Backend', 'Automation', 'Other']);

export function validateContact(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  const value = field => typeof data[field] === 'string' ? data[field].trim() : '';
  const inquiry = { name: value('name'), email: value('email'), company: value('company'), project_type: value('project_type'), message: value('message') };
  if (!inquiry.name || inquiry.name.length > 200 || inquiry.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email) || inquiry.company.length > 200 || !projectTypes.has(inquiry.project_type) || !inquiry.message || inquiry.message.length > 10000) return null;
  return inquiry;
}

export async function insertContact(transaction, inquiry) {
  const { name, email, company, project_type, message } = inquiry;
  const [firstName, ...rest] = name.split(/\s+/);
  const [lead] = await transaction`
    INSERT INTO public.leads (first_name, last_name, full_name, email, company, project_type, source, status)
    VALUES (${firstName}, ${rest.join(' ') || null}, ${name}, ${email}, ${company || null}, ${project_type}, 'Contact Form', 'NEW')
    RETURNING id
  `;
  await transaction`
    INSERT INTO public.messages (lead_id, name, email, company, project, message, status)
    VALUES (${lead.id}, ${name}, ${email}, ${company || null}, ${project_type}, ${message}, 'UNREAD')
  `;
  // Preserve the inquiry history used by the earlier website endpoint.
  await transaction`
    INSERT INTO public.project_inquiries (full_name, email, company_name, project_type, description)
    VALUES (${name}, ${email}, ${company || null}, ${project_type}, ${message})
  `;
  return lead.id;
}

export async function saveContact(inquiry) {
  return getSql().begin(transaction => insertContact(transaction, inquiry));
}
