import { existsSync, readFileSync } from 'node:fs';

const DEFAULT_AIVEN_CA_CERT = `-----BEGIN CERTIFICATE-----
MIIERDCCAqygAwIBAgIUdETxLsvYjj6/MCpniQk3/AO1UPkwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvOWE4MjM2Y2QtN2NhMi00ZGRjLTliNjctMWVkZjJmZjQ5
NzI5IFByb2plY3QgQ0EwHhcNMjYxMDExMTg1MzU4WhcNMzYxMDA4MTg1MzU4WjA6
MTgwNgYDVQQDDC85YTgyMzZjZC03Y2EyLTRkZGMtOWI2Ny0xZWRmMmZmNDk3Mjkg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAJJDTV5A
GjsWe9WNNkcz3w8GoevuyTMylkQD9s2tqU1I03lkV3uqO+dhsgdxCI/UB3EYih7Q
yxHrnbd0xB6YBRtOBdYxcwGMYEFJxkGnaMWrytxZmOvfTvyOT/Y/aoacGQj05KEz
nFG2l1r+hehG45oWNpDJHfnVoHVdebiUKUcpujPF4QTXF4csUX9QNupjB40LEBvU
JhNeDj1M7lXx/7bhyF+7EIfqexuXVjLxb23eyiKs2SqpFexK00NDrlKR7uSuvSCL
+plRcwl/+qeqxxgDBzynfb674+Gi3dCYtBY3wuKcjoG/CbDhB9xQQBOd4kICQLBg
DILgmueDbx/KI0Jekd2WIr8v1dHq6K4QPtsIwDjgfPUHm4nSU/weMX6J8ZmtiiTL
t6YE3DAxOq4p3gvAfdDcdATkD5rB9FQjoGOu2ToodoKR7onnmytL6OjudM5LO6AI
RIPdf36aSH66QTGleyve+mFUuJSa43H73Q2xLyfed2L9YpmoVzXW3ZpscwIDAQAB
o0IwQDAdBgNVHQ4EFgQURGFMHAEIDg1pcDeXVVGyV5FaHZkwEgYDVR0TAQH/BAgw
BgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAAatd/7PJzox
e9OC3loo2V0Ye+olYRUx2tgSc0gFR/JEIlIUFRKczSpA/8l43X9w6wpPWwJj3a7u
vMzjKOnOEXnOUtDXLYBR2X5EmiqTyHBPm0ADGMCLMrBu3hi69yNzNOv/JwqYTH8O
8XxuCdaDKOKsLlnCKPHrI+HNqy3SGiG9qTZhfbU5AsyO1b5EQN8Kl2RQ4bV6wNAA
sUWpGBwgl/Fx7q13eTgA5PsG49sVj0MDGqcF1LTSj7amf7gEihYYn41igt8uRcHH
MN2HTemah2rzoxTgte5MLUP7fYMkZUqI93C2dG/N8eyGWaMrIJ1HASmhfTzcMGos
WhWj/+mcazc++HZkpGa8N750AYZNtH4ijvuZ7LW0acOac8KvLD/4D0z9Zf4wX8mR
2d60jg8lAiNkXbqwKUqqjWCNMmCmF2iuP/P7Br1gHSefWMNwcj8QbmM7jlBl+w3i
4VFyCQy3ZTrbraKLtjG4sgUmxuqFG31qK1nWfCHx0cVRW6Wv67VA0g==
-----END CERTIFICATE-----`;

export function getDatabaseConfig() {
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.NEON_DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not configured');
  const url = new URL(connectionString);
  // Explicit TLS options must not be overridden by connection-string parameters.
  for (const key of ['sslmode', 'sslcert', 'sslkey', 'sslrootcert']) url.searchParams.delete(key);
  const caPath = process.env.DATABASE_CA_CERT_PATH || './certs/aiven-ca.pem';
  const ca =
    process.env.DATABASE_CA_CERT?.replace(/\\n/g, '\n') ||
    (caPath && existsSync(caPath) ? readFileSync(caPath, 'utf8') : undefined) ||
    DEFAULT_AIVEN_CA_CERT;
  return {
    connectionString: url.toString(),
    ssl: { rejectUnauthorized: Boolean(ca), ...(ca ? { ca } : {}) },
    max: 2,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    statement_timeout: 10000,
  };
}
