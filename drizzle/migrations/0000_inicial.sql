CREATE TYPE "public"."etapa_sincronizacao" AS ENUM('cliente', 'contrato', 'ordem_servico');--> statement-breakpoint
CREATE TYPE "public"."familia_plano" AS ENUM('internet', 'internet_aplicativos', 'empresarial', 'movel_5g', 'telefonia_fixa');--> statement-breakpoint
CREATE TYPE "public"."meio_pagamento" AS ENUM('cartao_credito', 'pix', 'boleto');--> statement-breakpoint
CREATE TYPE "public"."papel_usuario" AS ENUM('admin', 'operador');--> statement-breakpoint
CREATE TYPE "public"."resultado_sincronizacao" AS ENUM('pendente', 'sucesso', 'erro');--> statement-breakpoint
CREATE TYPE "public"."status_candidatura" AS ENUM('recebida', 'em_analise', 'aprovada', 'recusada');--> statement-breakpoint
CREATE TYPE "public"."status_cobranca" AS ENUM('aberta', 'recebida', 'parcial', 'cancelada');--> statement-breakpoint
CREATE TYPE "public"."status_pedido" AS ENUM('rascunho', 'aguardando_pagamento', 'pago', 'em_analise', 'agendado', 'instalado', 'cancelado', 'recusado');--> statement-breakpoint
CREATE TYPE "public"."tipo_aplicativo" AS ENUM('standard', 'premium', 'incluso');--> statement-breakpoint
CREATE TYPE "public"."tipo_vaga" AS ENUM('clt', 'estagio', 'temporario', 'pj');--> statement-breakpoint
CREATE TYPE "public"."turno_instalacao" AS ENUM('manha', 'tarde');--> statement-breakpoint
CREATE TABLE "aplicativos" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(80) NOT NULL,
	"nome" varchar(120) NOT NULL,
	"tipo" "tipo_aplicativo" NOT NULL,
	"logo" varchar(200) NOT NULL,
	"descricao" text,
	"preco_avulso" numeric(10, 2),
	"ativo" boolean DEFAULT true NOT NULL,
	"ordem" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "candidaturas" (
	"id" serial PRIMARY KEY NOT NULL,
	"vaga_id" integer NOT NULL,
	"nome" varchar(200) NOT NULL,
	"email" varchar(320) NOT NULL,
	"telefone" varchar(20) NOT NULL,
	"curriculo_url" text,
	"apresentacao" text,
	"status" "status_candidatura" DEFAULT 'recebida' NOT NULL,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cobrancas" (
	"id" serial PRIMARY KEY NOT NULL,
	"pedido_id" integer,
	"ixc_areceber_id" varchar(40) NOT NULL,
	"ixc_cliente_id" varchar(40),
	"valor" numeric(10, 2) NOT NULL,
	"vencimento" date,
	"status" "status_cobranca" DEFAULT 'aberta' NOT NULL,
	"tipo_recebimento" varchar(40),
	"gateway_link" text,
	"linha_digitavel" varchar(80),
	"pix_txid" varchar(80),
	"sincronizado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consultas_cobertura" (
	"id" serial PRIMARY KEY NOT NULL,
	"cep" varchar(9) NOT NULL,
	"logradouro" varchar(200),
	"numero" varchar(20),
	"bairro" varchar(120),
	"tem_viabilidade" boolean,
	"resposta_ixc" jsonb,
	"telefone" varchar(20),
	"email" varchar(320),
	"avisar_quando_chegar" boolean DEFAULT false NOT NULL,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "conteudo_site" (
	"id" serial PRIMARY KEY NOT NULL,
	"chave" varchar(200) NOT NULL,
	"valor" jsonb NOT NULL,
	"atualizado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pedidos" (
	"id" serial PRIMARY KEY NOT NULL,
	"protocolo" varchar(20) NOT NULL,
	"status" "status_pedido" DEFAULT 'rascunho' NOT NULL,
	"plano_id" integer,
	"aplicativos" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"nome" varchar(160),
	"cpf_cnpj" varchar(18),
	"data_nascimento" date,
	"email" varchar(320),
	"telefone" varchar(20),
	"cep" varchar(9),
	"logradouro" varchar(200),
	"numero" varchar(20),
	"complemento" varchar(80),
	"bairro" varchar(120),
	"cidade" varchar(120) DEFAULT 'Campo Grande',
	"uf" varchar(2) DEFAULT 'MS',
	"viabilidade" jsonb,
	"data_instalacao" date,
	"turno_instalacao" "turno_instalacao",
	"valor_mensal" numeric(10, 2),
	"meio_pagamento" "meio_pagamento",
	"ixc_cliente_id" varchar(40),
	"ixc_contrato_id" varchar(40),
	"ixc_os_id" varchar(40),
	"origem" varchar(60),
	"observacoes" text,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "planos" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(80) NOT NULL,
	"familia" "familia_plano" NOT NULL,
	"nome" varchar(120) NOT NULL,
	"velocidade_mbps" integer,
	"preco_cheio" numeric(10, 2) NOT NULL,
	"preco_com_desconto" numeric(10, 2),
	"apps_standard" integer DEFAULT 0 NOT NULL,
	"apps_premium" integer DEFAULT 0 NOT NULL,
	"destaque" boolean DEFAULT false NOT NULL,
	"ativo" boolean DEFAULT true NOT NULL,
	"ordem" integer DEFAULT 0 NOT NULL,
	"beneficios" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"ixc_plano_id" varchar(40),
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sincronizacoes_ixc" (
	"id" serial PRIMARY KEY NOT NULL,
	"pedido_id" integer NOT NULL,
	"etapa" "etapa_sincronizacao" NOT NULL,
	"resultado" "resultado_sincronizacao" DEFAULT 'pendente' NOT NULL,
	"ixc_id" varchar(40),
	"requisicao" jsonb,
	"resposta" jsonb,
	"tentativas" integer DEFAULT 0 NOT NULL,
	"erro" text,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(320) NOT NULL,
	"nome" varchar(160) NOT NULL,
	"senha_hash" text NOT NULL,
	"papel" "papel_usuario" DEFAULT 'operador' NOT NULL,
	"totp_segredo" text,
	"totp_ativo" boolean DEFAULT false NOT NULL,
	"ativo" boolean DEFAULT true NOT NULL,
	"ultimo_acesso" timestamp with time zone,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vagas" (
	"id" serial PRIMARY KEY NOT NULL,
	"titulo" varchar(200) NOT NULL,
	"descricao" text NOT NULL,
	"requisitos" text NOT NULL,
	"salario" varchar(100),
	"local" varchar(200) NOT NULL,
	"tipo" "tipo_vaga" NOT NULL,
	"ativa" boolean DEFAULT true NOT NULL,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	"atualizado_em" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "candidaturas" ADD CONSTRAINT "candidaturas_vaga_id_vagas_id_fk" FOREIGN KEY ("vaga_id") REFERENCES "public"."vagas"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cobrancas" ADD CONSTRAINT "cobrancas_pedido_id_pedidos_id_fk" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_plano_id_planos_id_fk" FOREIGN KEY ("plano_id") REFERENCES "public"."planos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sincronizacoes_ixc" ADD CONSTRAINT "sincronizacoes_ixc_pedido_id_pedidos_id_fk" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "aplicativos_slug_idx" ON "aplicativos" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "candidaturas_vaga_idx" ON "candidaturas" USING btree ("vaga_id","status");--> statement-breakpoint
CREATE UNIQUE INDEX "cobrancas_ixc_idx" ON "cobrancas" USING btree ("ixc_areceber_id");--> statement-breakpoint
CREATE INDEX "cobrancas_pedido_idx" ON "cobrancas" USING btree ("pedido_id");--> statement-breakpoint
CREATE INDEX "consultas_bairro_idx" ON "consultas_cobertura" USING btree ("bairro","tem_viabilidade");--> statement-breakpoint
CREATE UNIQUE INDEX "conteudo_chave_idx" ON "conteudo_site" USING btree ("chave");--> statement-breakpoint
CREATE UNIQUE INDEX "pedidos_protocolo_idx" ON "pedidos" USING btree ("protocolo");--> statement-breakpoint
CREATE INDEX "pedidos_status_idx" ON "pedidos" USING btree ("status","criado_em");--> statement-breakpoint
CREATE INDEX "pedidos_cpf_idx" ON "pedidos" USING btree ("cpf_cnpj");--> statement-breakpoint
CREATE UNIQUE INDEX "planos_slug_idx" ON "planos" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "planos_familia_idx" ON "planos" USING btree ("familia","ativo");--> statement-breakpoint
CREATE UNIQUE INDEX "sincronizacoes_pedido_etapa_idx" ON "sincronizacoes_ixc" USING btree ("pedido_id","etapa");--> statement-breakpoint
CREATE UNIQUE INDEX "usuarios_email_idx" ON "usuarios" USING btree ("email");