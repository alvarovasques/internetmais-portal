/**
 * Popula o catálogo a partir dos dados que hoje estão escritos à mão nos
 * componentes. Depois disso, o site passa a ler daqui e mudar um preço vira
 * uma linha no banco em vez de quatro arquivos.
 *
 * Rodar com: npm run db:seed
 * É idempotente: reexecutar atualiza, não duplica.
 */
import { closeDb, requireDb } from "../server/core/db";
import { aplicativos, planos } from "../drizzle/schema";

const APPS: Array<{ slug: string; nome: string; tipo: "standard" | "premium" | "incluso" }> = [
  { slug: "ubook-plus", nome: "Ubook Plus", tipo: "standard" },
  { slug: "zen", nome: "Zen", tipo: "standard" },
  { slug: "leitura-360", nome: "Leitura 360", tipo: "standard" },
  { slug: "estuda-mais", nome: "Estuda+", tipo: "standard" },
  { slug: "pequenos-leitores", nome: "Pequenos Leitores", tipo: "standard" },
  { slug: "o-jornalista", nome: "O Jornalista", tipo: "standard" },
  { slug: "playlist", nome: "Playlist", tipo: "standard" },
  { slug: "kiddle-pass", nome: "Kiddle Pass", tipo: "standard" },
  { slug: "playkids-plus", nome: "PlayKids+", tipo: "standard" },
  { slug: "sky-plus-light", nome: "Sky+ Light", tipo: "standard" },
  { slug: "deezer", nome: "Deezer", tipo: "standard" },
  { slug: "social-comics", nome: "Social Comics", tipo: "standard" },
  { slug: "kaspersky-standard", nome: "Kaspersky Standard (3 licenças)", tipo: "standard" },
  { slug: "qnutri", nome: "Qnutri", tipo: "standard" },
  { slug: "looke", nome: "Looke", tipo: "standard" },
  { slug: "curtaon", nome: "Curta!On", tipo: "standard" },
  { slug: "revistaria", nome: "Revistaria", tipo: "standard" },
  { slug: "fluid", nome: "Fluid", tipo: "standard" },
  { slug: "hub-vantagens", nome: "Hub Vantagens", tipo: "standard" },

  { slug: "smart-content", nome: "Smart Content", tipo: "premium" },
  { slug: "ritual-fit", nome: "Ritual Fit", tipo: "premium" },
  { slug: "kaspersky-plus", nome: "Kaspersky Plus (5 licenças)", tipo: "premium" },
  { slug: "docway", nome: "Docway", tipo: "premium" },
  { slug: "hotgo", nome: "HotGo", tipo: "premium" },
  { slug: "queima-diaria", nome: "Queima Diária", tipo: "premium" },
  { slug: "hbo-max", nome: "HBO Max", tipo: "premium" },
  { slug: "disney-plus", nome: "Disney+", tipo: "premium" },

  { slug: "ubook-go", nome: "Ubook Go", tipo: "incluso" },
  { slug: "kaspersky", nome: "Kaspersky", tipo: "incluso" },
  { slug: "globoplay", nome: "Globoplay", tipo: "incluso" },
  { slug: "telecine", nome: "Telecine", tipo: "incluso" },
];

const BENEFICIOS_FIBRA = [
  "Wi-Fi 6 incluso",
  "MaisTV com mais de 160 canais",
  "Ubook e Kaspersky inclusos",
  "Sem fidelidade obrigatória",
];

const PLANOS = [
  // Internet + Velocidade
  { slug: "fibra-400", familia: "internet", nome: "400 Mega", velocidadeMbps: 400, precoCheio: "109.90", precoComDesconto: "89.90", ordem: 1 },
  { slug: "fibra-600", familia: "internet", nome: "600 Mega", velocidadeMbps: 600, precoCheio: "119.90", precoComDesconto: "99.90", destaque: true, ordem: 2 },
  { slug: "fibra-800", familia: "internet", nome: "800 Mega", velocidadeMbps: 800, precoCheio: "129.90", precoComDesconto: "109.90", ordem: 3 },

  // Internet + Aplicativos
  { slug: "fibra-apps-400", familia: "internet_aplicativos", nome: "400 Mega + Apps", velocidadeMbps: 400, precoCheio: "129.90", precoComDesconto: "109.90", appsStandard: 1, ordem: 1 },
  { slug: "fibra-apps-600", familia: "internet_aplicativos", nome: "600 Mega + Apps", velocidadeMbps: 600, precoCheio: "149.90", precoComDesconto: "129.90", appsStandard: 1, appsPremium: 1, destaque: true, ordem: 2 },
  { slug: "fibra-apps-800", familia: "internet_aplicativos", nome: "800 Mega + Apps", velocidadeMbps: 800, precoCheio: "169.90", precoComDesconto: "149.90", appsStandard: 1, appsPremium: 1, ordem: 3 },

  // Empresarial
  { slug: "empresarial-400", familia: "empresarial", nome: "Empresarial 400 Mega", velocidadeMbps: 400, precoCheio: "229.90", ordem: 1 },
  { slug: "empresarial-600", familia: "empresarial", nome: "Empresarial 600 Mega", velocidadeMbps: 600, precoCheio: "269.90", ordem: 2 },
  { slug: "empresarial-800", familia: "empresarial", nome: "Empresarial 800 Mega", velocidadeMbps: 800, precoCheio: "309.90", ordem: 3 },

  // Chip 5G
  { slug: "movel-1gb", familia: "movel_5g", nome: "1GB", precoCheio: "24.99", ordem: 1 },
  { slug: "movel-3gb", familia: "movel_5g", nome: "3GB", precoCheio: "39.99", ordem: 2 },
  { slug: "movel-5gb", familia: "movel_5g", nome: "5GB", precoCheio: "49.99", ordem: 3 },
  { slug: "movel-10gb", familia: "movel_5g", nome: "10GB", precoCheio: "59.99", ordem: 4 },
  { slug: "movel-15gb", familia: "movel_5g", nome: "15GB", precoCheio: "64.99", ordem: 5 },
  { slug: "movel-25gb", familia: "movel_5g", nome: "25GB", precoCheio: "89.99", ordem: 6 },

  // Telefonia fixa
  { slug: "fixo-ilimitado", familia: "telefonia_fixa", nome: "Linha Fixa Ilimitada", precoCheio: "59.90", ordem: 1 },
] as const;

async function main() {
  const db = requireDb();

  for (const app of APPS) {
    await db
      .insert(aplicativos)
      .values({ ...app, logo: `/images/apps/${app.slug}.png` })
      .onConflictDoUpdate({
        target: aplicativos.slug,
        set: { nome: app.nome, tipo: app.tipo, logo: `/images/apps/${app.slug}.png` },
      });
  }
  console.log(`${APPS.length} aplicativos gravados`);

  for (const plano of PLANOS) {
    const valores = {
      slug: plano.slug,
      familia: plano.familia,
      nome: plano.nome,
      velocidadeMbps: "velocidadeMbps" in plano ? plano.velocidadeMbps : null,
      precoCheio: plano.precoCheio,
      precoComDesconto: "precoComDesconto" in plano ? plano.precoComDesconto : null,
      appsStandard: "appsStandard" in plano ? plano.appsStandard : 0,
      appsPremium: "appsPremium" in plano ? plano.appsPremium : 0,
      destaque: "destaque" in plano ? plano.destaque : false,
      ordem: plano.ordem,
      beneficios: plano.familia === "internet" || plano.familia === "internet_aplicativos" ? BENEFICIOS_FIBRA : [],
    };
    await db.insert(planos).values(valores).onConflictDoUpdate({
      target: planos.slug,
      set: { ...valores, atualizadoEm: new Date() },
    });
  }
  console.log(`${PLANOS.length} planos gravados`);

  console.log("\nATENÇÃO: os preços vieram do código do site atual e precisam ser conferidos");
  console.log("contra a tabela comercial vigente antes de o site vender por eles.");
}

main()
  .then(() => closeDb())
  .then(() => process.exit(0))
  .catch(async erro => {
    console.error("Falha no seed:", erro);
    await closeDb();
    process.exit(1);
  });
