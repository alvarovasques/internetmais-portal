/**
 * Cria o primeiro acesso à área interna.
 * Uso: npm run usuario:criar -- "Alvaro" alvaro@opt3.com.br admin
 * A senha é pedida no terminal, sem eco, e nunca fica no histórico do shell.
 */
import { createInterface } from "readline";
import { closeDb } from "../server/core/db";
import { hashSenha } from "../server/core/password";
import { buscarUsuarioPorEmail, criarUsuario } from "../server/repositories/usuarios";

function perguntarSenha(rotulo: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
  return new Promise(resolve => {
    process.stdout.write(rotulo);
    const stdin = process.stdin as NodeJS.ReadStream & { isTTY?: boolean };
    const eraTTY = stdin.isTTY;
    if (eraTTY) stdin.setRawMode?.(true);
    let senha = "";
    const aoDigitar = (buf: Buffer) => {
      const ch = buf.toString("utf8");
      if (ch === "\r" || ch === "\n") {
        stdin.removeListener("data", aoDigitar);
        if (eraTTY) stdin.setRawMode?.(false);
        process.stdout.write("\n");
        rl.close();
        resolve(senha);
      } else if (ch === "") {
        process.exit(1);
      } else if (ch === "") {
        senha = senha.slice(0, -1);
      } else {
        senha += ch;
      }
    };
    stdin.on("data", aoDigitar);
  });
}

async function main() {
  const [nome, email, papel = "operador"] = process.argv.slice(2);
  if (!nome || !email) {
    console.error('Uso: npm run usuario:criar -- "Nome Completo" email@dominio.com [admin|operador]');
    process.exit(1);
  }
  if (papel !== "admin" && papel !== "operador") {
    console.error("Papel precisa ser admin ou operador.");
    process.exit(1);
  }
  if (await buscarUsuarioPorEmail(email)) {
    console.error(`Já existe usuário com o e-mail ${email}.`);
    process.exit(1);
  }

  const senha = await perguntarSenha("Senha (mínimo 10 caracteres): ");
  if (senha.length < 10) {
    console.error("Senha curta demais.");
    process.exit(1);
  }
  const confirmacao = await perguntarSenha("Confirme a senha: ");
  if (senha !== confirmacao) {
    console.error("As senhas não conferem.");
    process.exit(1);
  }

  const usuario = await criarUsuario({ nome, email, papel, senhaHash: await hashSenha(senha) });
  console.log(`\nUsuário ${usuario.email} criado como ${usuario.papel}.`);
  console.log("Ative o segundo fator no primeiro login: a conta fica sem 2FA até isso ser feito.");
}

main()
  .then(() => closeDb())
  .then(() => process.exit(0))
  .catch(async erro => {
    console.error(erro);
    await closeDb();
    process.exit(1);
  });
