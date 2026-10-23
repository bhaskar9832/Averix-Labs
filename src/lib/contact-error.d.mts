export function contactFailureDetails(error: unknown, env?: Record<string, string | undefined>): { code: string; databaseConfigured: boolean };
export function logContactFailure(error: unknown): string;
