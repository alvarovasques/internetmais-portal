import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scrypt = promisify(scryptCb) as (
  senha: string | Buffer,
  sal: string | Buffer,
  tamanho: number,
  opcoes?: { N?: number; r?: number; p?: number; maxmem?: number }
) => Promise<Buffer>;

// Parâmetros conservadores: ~100ms por verificação em hardware de VPS.
const N = 2 ** 15;
const R = 8;
const P = 1;
const TAMANHO = 64;
const MAXMEM = 96 * 1024 * 1024;

/** Gera "scrypt$N$r$p$salBase64$hashBase64". */
export async function hashSenha(senha: string): Promise<string> {
  const sal = randomBytes(16);
  const hash = await scrypt(senha.normalize("NFKC"), sal, TAMANHO, { N, r: R, p: P, maxmem: MAXMEM });
  return ["scrypt", N, R, P, sal.toString("base64"), hash.toString("base64")].join("$");
}

/** Comparação em tempo constante. Nunca lança: entrada malformada é falha de senha. */
export async function verificarSenha(senha: string, armazenado: string): Promise<boolean> {
  try {
    const [algoritmo, n, r, p, salB64, hashB64] = armazenado.split("$");
    if (algoritmo !== "scrypt") return false;
    const sal = Buffer.from(salB64, "base64");
    const esperado = Buffer.from(hashB64, "base64");
    const obtido = await scrypt(senha.normalize("NFKC"), sal, esperado.length, {
      N: Number(n), r: Number(r), p: Number(p), maxmem: MAXMEM,
    });
    return obtido.length === esperado.length && timingSafeEqual(obtido, esperado);
  } catch {
    return false;
  }
}
