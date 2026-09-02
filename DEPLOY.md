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
