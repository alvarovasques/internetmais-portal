/**
 * Recebe os documentos do checkout e os encaminha ao cadastro do cliente no
 * IXC. O arquivo passa pelo servidor, não fica nele: guardamos o rastro
 * (nome, tipo, tamanho, hash) e o id do anexo no IXC.
 *
 * O conteúdo só é retido quando o envio falha, para permitir reenvio, e é
 * apagado assim que o IXC aceita. RG e selfie parados no nosso banco seriam
 * uma base de dados sensíveis sem finalidade, e a LGPD cobra finalidade.
 */
import { createHash } from "crypto";
import { and, eq } from "drizzle-orm";
import { requireDb } from "../core/db";
import { ENV } from "../core/env";
import { documentos, type Documento } from "../../drizzle/schema";
import { criar, ErroIxc } from "../integrations/ixc";

export const TAMANHO_MAXIMO_BYTES = 8 * 1024 * 1024;

/**
 * Aceita só o que o IXC consegue exibir na aba Arquivos, e confere pela
 * assinatura do arquivo em vez do rótulo enviado pelo navegador: extensão e
 * content-type são escolhidos por quem envia e não provam nada.
 */
const ASSINATURAS: Array<{ mime: string; bytes: number[]; deslocamento?: number }> = [
  { mime: "application/pdf", bytes: [0x25, 0x50, 0x44, 0x46] },        // %PDF
  { mime: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
  { mime: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
];

export function detectarTipo(buffer: Buffer): string | null {
  for (const a of ASSINATURAS) {
    const inicio = a.deslocamento ?? 0;
    if (a.bytes.every((b, i) => buffer[inicio + i] === b)) return a.mime;
  }
  return null;
}

const ROTULO: Record<Documento["tipo"], string> = {
  identidade: "Documento com foto",
  comprovante_residencia: "Comprovante de residência",
  selfie_documento: "Selfie com documento",
};

export type EntradaDocumento = {
  pedidoId: number;
  protocolo: string;
  tipo: Documento["tipo"];
  nomeArquivo: string;
  /** Conteúdo em base64, sem o prefixo data:. */
  conteudoBase64: string;
};

export async function receberDocumento(entrada: EntradaDocumento): Promise<Documento> {
  const buffer = Buffer.from(entrada.conteudoBase64, "base64");

  if (buffer.length === 0) throw new Error("Arquivo vazio.");
  if (buffer.length > TAMANHO_MAXIMO_BYTES) {
    throw new Error("Arquivo maior que 8 MB. Reduza a qualidade da foto e envie de novo.");
  }
  const tipoMime = detectarTipo(buffer);
  if (!tipoMime) {
    throw new Error("Formato não aceito. Envie uma foto em JPG ou PNG, ou um PDF.");
  }

  const hash = createHash("sha256").update(buffer).digest("hex");
  const db = requireDb();

  const base = {
    pedidoId: entrada.pedidoId,
    tipo: entrada.tipo,
    nomeArquivo: entrada.nomeArquivo.slice(0, 200),
    tipoMime,
    tamanhoBytes: buffer.length,
    hash,
  };

  // Grava o rastro antes de tentar o IXC: se a chamada falhar, o registro
  // existe e o conteúdo fica retido para reenvio.
  const [registro] = await db
    .insert(documentos)
    .values({ ...base, status: "recebido", conteudo: entrada.conteudoBase64, erro: null, ixcArquivoId: null, anexadoEm: null })
    .onConflictDoUpdate({
      target: [documentos.pedidoId, documentos.tipo],
      set: { ...base, status: "recebido", conteudo: entrada.conteudoBase64, erro: null, ixcArquivoId: null, anexadoEm: null },
    })
    .returning();

  return registro;
}

/**
 * Envia ao IXC um documento já recebido. Separado do recebimento de propósito:
 * o cliente não fica esperando a resposta do ERP para saber que o upload deu
 * certo, e a falha do IXC não vira erro na tela dele.
 */
export async function anexarNoIxc(documentoId: number, ixcClienteId: string): Promise<Documento | null> {
  const db = requireDb();
  const [doc] = await db.select().from(documentos).where(eq(documentos.id, documentoId)).limit(1);
  if (!doc || doc.status === "anexado") return doc ?? null;

  if (!ENV.ixc.tabelaArquivosCliente) {
    // Sem o nome da tabela confirmado, não inventamos endpoint: o documento
    // fica retido e o time anexa pelo painel do IXC.
    const [atualizado] = await db
      .update(documentos)
      .set({ status: "erro", erro: "IXC_TABELA_ARQUIVOS_CLIENTE não configurado: anexar manualmente pelo painel." })
      .where(eq(documentos.id, documentoId))
      .returning();
    return atualizado;
  }

  try {
    const resposta = await criar(ENV.ixc.tabelaArquivosCliente, {
      id_cliente: ixcClienteId,
      descricao: `${ROTULO[doc.tipo]} — enviado pelo site`,
      nome_arquivo: doc.nomeArquivo,
      arquivo: doc.conteudo,
    });
    if (!resposta.id) throw new ErroIxc("IXC não devolveu o id do arquivo", resposta);

    const [atualizado] = await db
      .update(documentos)
      .set({
        status: "anexado",
        ixcArquivoId: resposta.id,
        // O conteúdo sai do nosso banco assim que está guardado no IXC.
        conteudo: null,
        erro: null,
        anexadoEm: new Date(),
      })
      .where(eq(documentos.id, documentoId))
      .returning();
    return atualizado;
  } catch (erro) {
    const [atualizado] = await db
      .update(documentos)
      .set({ status: "erro", erro: erro instanceof Error ? erro.message : String(erro) })
      .where(eq(documentos.id, documentoId))
      .returning();
    return atualizado;
  }
}

/** Envia tudo que está pendente de um pedido. Chamado depois de criar o cliente. */
export async function anexarDocumentosDoPedido(pedidoId: number, ixcClienteId: string): Promise<void> {
  const db = requireDb();
  const pendentes = await db
    .select()
    .from(documentos)
    .where(and(eq(documentos.pedidoId, pedidoId)));
  for (const doc of pendentes) {
    if (doc.status !== "anexado") await anexarNoIxc(doc.id, ixcClienteId);
  }
}

export async function listarDocumentosDoPedido(pedidoId: number) {
  const db = requireDb();
  return db
    .select({
      id: documentos.id,
      tipo: documentos.tipo,
      status: documentos.status,
      nomeArquivo: documentos.nomeArquivo,
      tamanhoBytes: documentos.tamanhoBytes,
      criadoEm: documentos.criadoEm,
    })
    .from(documentos)
    .where(eq(documentos.pedidoId, pedidoId));
}
