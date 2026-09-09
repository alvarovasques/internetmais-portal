import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const PASSO_SEGUNDOS = 30;
const DIGITOS = 6;
/** Aceita o código anterior e o seguinte, para tolerar relógio fora de sincronia. */
const JANELA = 1;

export function gerarSegredoTotp(bytes = 20): string {
  return base32Encode(randomBytes(bytes));
}

/** URI para o QR Code do app autenticador. */
export function uriTotp(segredo: string, conta: string, emissor: string): string {
  const rotulo = encodeURIComponent(`${emissor}:${conta}`);
  const params = new URLSearchParams({
    secret: segredo,
    issuer: emissor,
    algorithm: "SHA1",
    digits: String(DIGITOS),
    period: String(PASSO_SEGUNDOS),
  });
  return `otpauth://totp/${rotulo}?${params.toString()}`;
}

export function codigoTotp(segredo: string, contador: number): string {
  const chave = base32Decode(segredo);
  const buffer = Buffer.alloc(8);
  buffer.writeBigUInt64BE(BigInt(contador));
  const digest = createHmac("sha1", chave).update(buffer).digest();
  const offset = digest[digest.length - 1] & 0x0f;
  const binario =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);
  return String(binario % 10 ** DIGITOS).padStart(DIGITOS, "0");
}

export function verificarTotp(segredo: string, codigo: string, agora = Date.now()): boolean {
  const informado = codigo.replace(/\D/g, "");
  if (informado.length !== DIGITOS) return false;
  const contador = Math.floor(agora / 1000 / PASSO_SEGUNDOS);
  for (let i = -JANELA; i <= JANELA; i++) {
    const esperado = Buffer.from(codigoTotp(segredo, contador + i));
    const recebido = Buffer.from(informado);
    if (esperado.length === recebido.length && timingSafeEqual(esperado, recebido)) return true;
  }
  return false;
}

function base32Encode(buffer: Buffer): string {
  let bits = 0;
  let valor = 0;
  let saida = "";
  for (const byte of buffer) {
    valor = (valor << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      saida += ALFABETO[(valor >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) saida += ALFABETO[(valor << (5 - bits)) & 31];
  return saida;
}

function base32Decode(entrada: string): Buffer {
  let bits = 0;
  let valor = 0;
  const bytes: number[] = [];
  for (const char of entrada.toUpperCase().replace(/=+$/, "")) {
    const indice = ALFABETO.indexOf(char);
    if (indice === -1) continue;
    valor = (valor << 5) | indice;
    bits += 5;
    if (bits >= 8) {
      bytes.push((valor >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return Buffer.from(bytes);
}
