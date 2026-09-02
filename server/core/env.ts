import "dotenv/config";

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === "") {
    if (process.env.NODE_ENV === "production") {
      throw new Error(`Variável de ambiente obrigatória ausente: ${name}`);
    }
    return "";
  }
  return value;
}

export const ENV = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  isProduction: process.env.NODE_ENV === "production",
  port: parseInt(process.env.PORT ?? "3000", 10),
  siteUrl: process.env.SITE_URL ?? "http://localhost:3000",

  /** postgres://usuario:senha@host:5432/banco */
  databaseUrl: required("DATABASE_URL"),
  /** Segredo de assinatura das sessões. Trocar invalida todos os logins. */
  sessionSecret: required("SESSION_SECRET"),
  /** Rótulo mostrado no app autenticador ao cadastrar o segundo fator. */
  totpIssuer: process.env.TOTP_ISSUER ?? "Internet Mais",

  cielo: {
    merchantId: process.env.CIELO_MERCHANT_ID ?? "",
    merchantKey: process.env.CIELO_MERCHANT_KEY ?? "",
    /** sandbox | production */
    ambiente: process.env.CIELO_AMBIENTE ?? "sandbox",
  },
} as const;

export function assertProductionEnv() {
  if (!ENV.isProduction) return;
  const faltando: string[] = [];
  if (!ENV.databaseUrl) faltando.push("DATABASE_URL");
  if (!ENV.sessionSecret) faltando.push("SESSION_SECRET");
  if (faltando.length) {
    throw new Error(`Configuração incompleta em produção: ${faltando.join(", ")}`);
  }
}
