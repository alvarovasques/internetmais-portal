# Deploy

Stack em Docker Swarm com Traefik na rede externa `di4e`, um Postgres com volume
próprio e um serviço de backup diário.

## Variáveis

Copie `.env.example` e preencha. Duas são obrigatórias em produção e o servidor
recusa subir sem elas:

- `DATABASE_URL`
- `SESSION_SECRET` — gere com `openssl rand -base64 48`. Trocar derruba todas as sessões.

## Subir

```bash
docker stack deploy -c docker-compose.yml internetmais
```

O serviço `app` sobe com duas réplicas e `order: start-first`, então o deploy não
tira o site do ar. O Postgres roda com uma réplica só, preso ao nó manager: o
volume é local e o banco não pode migrar de nó.

## Banco

Primeira subida, ou depois de mudar o schema:

```bash
npm run db:generate   # gera a migração a partir de drizzle/schema.ts
npm run db:migrate    # aplica no banco
npm run db:seed       # popula planos e aplicativos
```

O seed é idempotente. Os preços que ele grava vieram do código do site antigo e
precisam ser conferidos contra a tabela comercial antes de o site vender por eles.

## Primeiro acesso

```bash
npm run usuario:criar -- "Nome Completo" email@internetmais.net admin
```

A senha é pedida no terminal, sem eco. O segundo fator é ativado pelo próprio
usuário no primeiro login e só passa a ser exigido depois de confirmado.

## Backup

O serviço `backup` roda `pg_dump` uma vez por dia no volume `postgres_backup` e
apaga dumps com mais de 14 dias. Restaurar é manual, de propósito:

```bash
gunzip -c internetmais-AAAAMMDD-HHMM.sql.gz | psql -h postgres -U internetmais internetmais
```

Vale copiar esse volume para fora da VPS: backup no mesmo host não protege contra
perda do host.

## Saúde

`GET /api/saude` responde `{"ok":true}`. É o que o healthcheck do container e o
Traefik usam.

## Integração com o IXC

O site não fala com a Cielo. O IXC é o dono do cadastro, do contrato e do
faturamento, e a Cielo já está integrada lá. Quando um pedido é finalizado, o
site cria no IXC, nesta ordem: **cliente** (`cliente`), **contrato**
(`cliente_contrato`) e **ordem de serviço de instalação** (`su_oss_chamado`).
Os títulos aparecem em `fn_areceber` e o site só lê o `gateway_link` para
mostrar ao cliente onde pagar.

Antes de ligar a venda online, confirme no IXC e preencha no ambiente:

- `IXC_ID_FILIAL`
- `IXC_ID_ASSUNTO_INSTALACAO` — assunto da OS de instalação (`su_oss_assunto`)
- `IXC_SETOR_INSTALACAO` — setor responsável
- `planos.ixc_plano_id` de cada plano — o `id_vd_contrato` correspondente

Esses ids variam por instalação. Chutar valor gera OS órfã ou erro na criação,
então liste os cadastros no IXC e use os ids reais.

### Reprocessar um pedido que falhou

Cada passo fica em `sincronizacoes_ixc` com índice único por pedido e etapa.
Chamar `pedidos.finalizar` de novo retoma de onde parou e não duplica cliente.
Para ver onde travou:

```sql
select etapa, resultado, ixc_id, erro, atualizado_em
from sincronizacoes_ixc
where pedido_id = (select id from pedidos where protocolo = 'IM-XXXXXX');
```
