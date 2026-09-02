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

  /**
   * O IXC é o dono do cadastro, do contrato e do faturamento. A Cielo já está
   * integrada lá, então o site nunca fala com a Cielo: cria o contrato no IXC
   * e mostra ao cliente o link de pagamento que o IXC devolve.
   */
  ixc: {
    /** Sem barra no fim. Ex.: https://sistema.internetmais.net */
    host: (process.env.IXC_HOST ?? "").replace(/\/+$/, ""),
    /** Formato id:hash, gerado no cadastro do usuário de API do IXC. */
    token: process.env.IXC_TOKEN ?? "",
    /** Aceitar certificado autoassinado. Só ligar se o IXC for on-premise sem CA. */
    permitirCertificadoInvalido: process.env.IXC_TLS_INSEGURO === "true",
    /**
     * Ids que variam por instalação e precisam ser conferidos no IXC antes de
     * qualquer escrita: chutar id gera OS órfã ou erro.
     */
    idFilial: process.env.IXC_ID_FILIAL ?? "",
    idAssuntoInstalacao: process.env.IXC_ID_ASSUNTO_INSTALACAO ?? "",
    setorInstalacao: process.env.IXC_SETOR_INSTALACAO ?? "",
    /**
     * Tabela de arquivos anexados ao cadastro do cliente. A aba "Arquivos" do
     * cliente existe no IXC, mas o nome da tabela no webservice não está na
     * wiki. Fica configurável: enquanto estiver vazio, o documento é recebido
     * e guardado para envio manual, sem tentar adivinhar endpoint.
     */
    tabelaArquivosCliente: process.env.IXC_TABELA_ARQUIVOS_CLIENTE ?? "",
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
