import "dotenv/config";

function opcional(name: string, fallback = ""): string {
  return process.env[name] ?? fallback;
}

export const ENV = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  isProduction: process.env.NODE_ENV === "production",
  port: parseInt(process.env.PORT ?? "3000", 10),
  siteUrl: process.env.SITE_URL ?? "http://localhost:3000",

  /** postgres://usuario:senha@host:5432/banco */
  databaseUrl: opcional("DATABASE_URL"),
  /** Segredo de assinatura das sessões. Trocar invalida todos os logins. */
  sessionSecret: opcional("SESSION_SECRET"),
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

/**
 * O site institucional não depende de banco: as páginas são estáticas e o
 * login da MaisTV é um proxy para um serviço externo. Só as vagas e o painel
 * administrativo precisam do Postgres.
 *
 * Por isso a ausência de DATABASE_URL não impede a subida. Ela desliga esses
 * dois recursos e escreve no log o que ficou de fora, de forma barulhenta o
 * bastante para ninguém descobrir por acaso três semanas depois.
 *
 * O contrário, recusar subir, transformava toda publicação do site em uma
 * virada de infraestrutura: o container novo não subia, o Swarm reiniciava em
 * laço e o site saía do ar por causa de um recurso que aquela página nem usa.
 */
export function assertProductionEnv() {
  if (!ENV.isProduction) return;

  const desligado: string[] = [];
  if (!ENV.databaseUrl) desligado.push("banco: página de vagas fica vazia");
  if (!ENV.sessionSecret) desligado.push("sessões: painel administrativo indisponível");

  if (desligado.length) {
    console.warn(
      "[config] rodando em modo reduzido —\n  " +
        desligado.join("\n  ") +
        "\n  Para ligar: DATABASE_URL e SESSION_SECRET (ver DEPLOY.md).",
    );
  }
}
