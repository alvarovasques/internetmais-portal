import {
  boolean, date, index, integer, jsonb, numeric, pgEnum, pgTable,
  serial, text, timestamp, uniqueIndex, varchar,
} from "drizzle-orm/pg-core";

/* ─────────────────────────── Acesso interno ─────────────────────────── */

export const papelUsuario = pgEnum("papel_usuario", ["admin", "operador"]);

export const usuarios = pgTable(
  "usuarios",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 320 }).notNull(),
    nome: varchar("nome", { length: 160 }).notNull(),
    /** scrypt$N$r$p$sal$hash — ver server/core/password.ts */
    senhaHash: text("senha_hash").notNull(),
    papel: papelUsuario("papel").notNull().default("operador"),
    /** Segredo TOTP em base32. Nulo enquanto o segundo fator não for ativado. */
    totpSegredo: text("totp_segredo"),
    totpAtivo: boolean("totp_ativo").notNull().default(false),
    ativo: boolean("ativo").notNull().default(true),
    ultimoAcesso: timestamp("ultimo_acesso", { withTimezone: true }),
    criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
    atualizadoEm: timestamp("atualizado_em", { withTimezone: true }).notNull().defaultNow(),
  },
  t => [uniqueIndex("usuarios_email_idx").on(t.email)],
);

/* ─────────── Catálogo: fonte única de planos, hoje espalhada em 4 componentes ─────────── */

export const familiaPlano = pgEnum("familia_plano", [
  "internet",
  "internet_aplicativos",
  "empresarial",
  "movel_5g",
  "telefonia_fixa",
]);

export const planos = pgTable(
  "planos",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 80 }).notNull(),
    familia: familiaPlano("familia").notNull(),
    nome: varchar("nome", { length: 120 }).notNull(),
    /** Download em Mbps. Nulo nos planos que não são de banda larga. */
    velocidadeMbps: integer("velocidade_mbps"),
    precoCheio: numeric("preco_cheio", { precision: 10, scale: 2 }).notNull(),
    /** Preço com o desconto de pontualidade já aplicado. */
    precoComDesconto: numeric("preco_com_desconto", { precision: 10, scale: 2 }),
    /** Quantos aplicativos de cada tipo o plano permite escolher. */
    appsStandard: integer("apps_standard").notNull().default(0),
    appsPremium: integer("apps_premium").notNull().default(0),
    destaque: boolean("destaque").notNull().default(false),
    ativo: boolean("ativo").notNull().default(true),
    ordem: integer("ordem").notNull().default(0),
    /** Lista de diferenciais exibida no cartão. */
    beneficios: jsonb("beneficios").$type<string[]>().notNull().default([]),
    /** Código do plano no IXC, para abrir o contrato certo. */
    ixcPlanoId: varchar("ixc_plano_id", { length: 40 }),
    criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
    atualizadoEm: timestamp("atualizado_em", { withTimezone: true }).notNull().defaultNow(),
  },
  t => [
    uniqueIndex("planos_slug_idx").on(t.slug),
    index("planos_familia_idx").on(t.familia, t.ativo),
  ],
);

export const tipoAplicativo = pgEnum("tipo_aplicativo", ["standard", "premium", "incluso"]);

export const aplicativos = pgTable(
  "aplicativos",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 80 }).notNull(),
    nome: varchar("nome", { length: 120 }).notNull(),
    tipo: tipoAplicativo("tipo").notNull(),
    /** Caminho local, sempre sob /images/apps/. Nunca URL de CDN externo. */
    logo: varchar("logo", { length: 200 }).notNull(),
    descricao: text("descricao"),
    precoAvulso: numeric("preco_avulso", { precision: 10, scale: 2 }),
    ativo: boolean("ativo").notNull().default(true),
    ordem: integer("ordem").notNull().default(0),
  },
  t => [uniqueIndex("aplicativos_slug_idx").on(t.slug)],
);

/* ─────────────────────────── Funil de venda ─────────────────────────── */

export const statusPedido = pgEnum("status_pedido", [
  "rascunho",           // visitante começou e não terminou
  "aguardando_pagamento",
  "pago",
  "em_analise",         // análise de crédito ou de viabilidade manual
  "agendado",
  "instalado",
  "cancelado",
  "recusado",
]);

export const meioPagamento = pgEnum("meio_pagamento", ["cartao_credito", "pix", "boleto"]);
export const turnoInstalacao = pgEnum("turno_instalacao", ["manha", "tarde"]);

export const pedidos = pgTable(
  "pedidos",
  {
    id: serial("id").primaryKey(),
    /** Código curto mostrado ao cliente e usado no atendimento. */
    protocolo: varchar("protocolo", { length: 20 }).notNull(),
    status: statusPedido("status").notNull().default("rascunho"),
    planoId: integer("plano_id").references(() => planos.id),
    /** Aplicativos escolhidos, por slug. */
    aplicativos: jsonb("aplicativos").$type<string[]>().notNull().default([]),

    nome: varchar("nome", { length: 160 }),
    cpfCnpj: varchar("cpf_cnpj", { length: 18 }),
    dataNascimento: date("data_nascimento"),
    email: varchar("email", { length: 320 }),
    telefone: varchar("telefone", { length: 20 }),

    cep: varchar("cep", { length: 9 }),
    logradouro: varchar("logradouro", { length: 200 }),
    numero: varchar("numero", { length: 20 }),
    complemento: varchar("complemento", { length: 80 }),
    bairro: varchar("bairro", { length: 120 }),
    cidade: varchar("cidade", { length: 120 }).default("Campo Grande"),
    uf: varchar("uf", { length: 2 }).default("MS"),
    /** Resposta crua da consulta de viabilidade, para auditoria. */
    viabilidade: jsonb("viabilidade"),

    dataInstalacao: date("data_instalacao"),
    turnoInstalacao: turnoInstalacao("turno_instalacao"),

    valorMensal: numeric("valor_mensal", { precision: 10, scale: 2 }),
    meioPagamento: meioPagamento("meio_pagamento"),

    /** Identificadores no IXC, preenchidos quando o contrato é criado lá. */
    ixcClienteId: varchar("ixc_cliente_id", { length: 40 }),
    ixcContratoId: varchar("ixc_contrato_id", { length: 40 }),
    ixcOsId: varchar("ixc_os_id", { length: 40 }),

    origem: varchar("origem", { length: 60 }),
    observacoes: text("observacoes"),
    criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
    atualizadoEm: timestamp("atualizado_em", { withTimezone: true }).notNull().defaultNow(),
  },
  t => [
    uniqueIndex("pedidos_protocolo_idx").on(t.protocolo),
    index("pedidos_status_idx").on(t.status, t.criadoEm),
    index("pedidos_cpf_idx").on(t.cpfCnpj),
  ],
);

/**
 * Espelho das cobranças que vivem no IXC (fn_areceber). O IXC é o dono do
 * faturamento e a Cielo já está integrada lá: o site não processa pagamento,
 * só mostra o que o IXC gerou e guarda o vínculo com o pedido.
 */
export const statusCobranca = pgEnum("status_cobranca", [
  "aberta",     // A no IXC
  "recebida",   // R
  "parcial",    // P
  "cancelada",  // C
]);

export const cobrancas = pgTable(
  "cobrancas",
  {
    id: serial("id").primaryKey(),
    pedidoId: integer("pedido_id").references(() => pedidos.id, { onDelete: "set null" }),
    /** id do título em fn_areceber. É a chave de reconciliação. */
    ixcAreceberId: varchar("ixc_areceber_id", { length: 40 }).notNull(),
    ixcClienteId: varchar("ixc_cliente_id", { length: 40 }),
    valor: numeric("valor", { precision: 10, scale: 2 }).notNull(),
    vencimento: date("vencimento"),
    status: statusCobranca("status").notNull().default("aberta"),
    /** Boleto/Pix/Cartão, como o IXC classifica. */
    tipoRecebimento: varchar("tipo_recebimento", { length: 40 }),
    /** Link do checkout no gateway, gerado pelo IXC. É o que mostramos ao cliente. */
    gatewayLink: text("gateway_link"),
    linhaDigitavel: varchar("linha_digitavel", { length: 80 }),
    pixTxid: varchar("pix_txid", { length: 80 }),
    sincronizadoEm: timestamp("sincronizado_em", { withTimezone: true }).notNull().defaultNow(),
  },
  t => [
    uniqueIndex("cobrancas_ixc_idx").on(t.ixcAreceberId),
    index("cobrancas_pedido_idx").on(t.pedidoId),
  ],
);

/**
 * Registro de cada tentativa de escrever no IXC. Existe para duas coisas:
 * não criar cliente duplicado quando a rede cai no meio, e ter o que auditar
 * quando um pedido não virou contrato.
 */
export const etapaSincronizacao = pgEnum("etapa_sincronizacao", [
  "cliente", "contrato", "ordem_servico",
]);
export const resultadoSincronizacao = pgEnum("resultado_sincronizacao", [
  "pendente", "sucesso", "erro",
]);

export const sincronizacoesIxc = pgTable(
  "sincronizacoes_ixc",
  {
    id: serial("id").primaryKey(),
    pedidoId: integer("pedido_id").notNull().references(() => pedidos.id, { onDelete: "cascade" }),
    etapa: etapaSincronizacao("etapa").notNull(),
    resultado: resultadoSincronizacao("resultado").notNull().default("pendente"),
    /** id devolvido pelo IXC quando deu certo. */
    ixcId: varchar("ixc_id", { length: 40 }),
    /** Payload enviado e resposta crua, para auditoria e para reprocessar. */
    requisicao: jsonb("requisicao"),
    resposta: jsonb("resposta"),
    tentativas: integer("tentativas").notNull().default(0),
    erro: text("erro"),
    criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
    atualizadoEm: timestamp("atualizado_em", { withTimezone: true }).notNull().defaultNow(),
  },
  t => [
    // Uma etapa por pedido: reexecutar atualiza a linha, não cria outra.
    uniqueIndex("sincronizacoes_pedido_etapa_idx").on(t.pedidoId, t.etapa),
  ],
);

/** Consulta de cobertura que não virou pedido: é a lista de espera. */
export const consultasCobertura = pgTable(
  "consultas_cobertura",
  {
    id: serial("id").primaryKey(),
    cep: varchar("cep", { length: 9 }).notNull(),
    logradouro: varchar("logradouro", { length: 200 }),
    numero: varchar("numero", { length: 20 }),
    bairro: varchar("bairro", { length: 120 }),
    /** null quando o IXC respondeu algo que não deu para interpretar. */
    temViabilidade: boolean("tem_viabilidade"),
    /** Resposta crua de viabilidade_tecnica, para auditoria e conferência. */
    respostaIxc: jsonb("resposta_ixc"),
    telefone: varchar("telefone", { length: 20 }),
    email: varchar("email", { length: 320 }),
    avisarQuandoChegar: boolean("avisar_quando_chegar").notNull().default(false),
    criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
  },
  t => [index("consultas_bairro_idx").on(t.bairro, t.temViabilidade)],
);

/* ─────────────────────────── Vagas ─────────────────────────── */

export const tipoVaga = pgEnum("tipo_vaga", ["clt", "estagio", "temporario", "pj"]);
export const statusCandidatura = pgEnum("status_candidatura", [
  "recebida", "em_analise", "aprovada", "recusada",
]);

export const vagas = pgTable("vagas", {
  id: serial("id").primaryKey(),
  titulo: varchar("titulo", { length: 200 }).notNull(),
  descricao: text("descricao").notNull(),
  requisitos: text("requisitos").notNull(),
  salario: varchar("salario", { length: 100 }),
  local: varchar("local", { length: 200 }).notNull(),
  tipo: tipoVaga("tipo").notNull(),
  ativa: boolean("ativa").notNull().default(true),
  criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
  atualizadoEm: timestamp("atualizado_em", { withTimezone: true }).notNull().defaultNow(),
});

export const candidaturas = pgTable(
  "candidaturas",
  {
    id: serial("id").primaryKey(),
    vagaId: integer("vaga_id").notNull().references(() => vagas.id, { onDelete: "cascade" }),
    nome: varchar("nome", { length: 200 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    telefone: varchar("telefone", { length: 20 }).notNull(),
    /** Link para currículo hospedado pelo candidato, enquanto não há storage próprio. */
    curriculoUrl: text("curriculo_url"),
    apresentacao: text("apresentacao"),
    status: statusCandidatura("status").notNull().default("recebida"),
    criadoEm: timestamp("criado_em", { withTimezone: true }).notNull().defaultNow(),
  },
  t => [index("candidaturas_vaga_idx").on(t.vagaId, t.status)],
);

/* ─────────────────────────── Conteúdo editável ─────────────────────────── */

export const conteudoSite = pgTable(
  "conteudo_site",
  {
    id: serial("id").primaryKey(),
    chave: varchar("chave", { length: 200 }).notNull(),
    valor: jsonb("valor").notNull(),
    atualizadoEm: timestamp("atualizado_em", { withTimezone: true }).notNull().defaultNow(),
  },
  t => [uniqueIndex("conteudo_chave_idx").on(t.chave)],
);

/* ─────────────────────────── Tipos ─────────────────────────── */

export type Usuario = typeof usuarios.$inferSelect;
export type NovoUsuario = typeof usuarios.$inferInsert;
export type Plano = typeof planos.$inferSelect;
export type NovoPlano = typeof planos.$inferInsert;
export type Aplicativo = typeof aplicativos.$inferSelect;
export type Pedido = typeof pedidos.$inferSelect;
export type NovoPedido = typeof pedidos.$inferInsert;
export type Cobranca = typeof cobrancas.$inferSelect;
export type SincronizacaoIxc = typeof sincronizacoesIxc.$inferSelect;
export type Vaga = typeof vagas.$inferSelect;
export type NovaVaga = typeof vagas.$inferInsert;
export type Candidatura = typeof candidaturas.$inferSelect;
export type NovaCandidatura = typeof candidaturas.$inferInsert;
