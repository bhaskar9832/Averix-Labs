import type { TransactionSql } from 'postgres';
export type ContactInquiry = { name: string; email: string; company: string; project_type: string; message: string };
export function validateContact(data: unknown): ContactInquiry | null;
export function insertContact(transaction: TransactionSql, inquiry: ContactInquiry): Promise<string>;
export function saveContact(inquiry: ContactInquiry): Promise<string>;
