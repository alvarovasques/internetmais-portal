import express, { type Express } from "express";
import fs from "fs";
import path from "path";

/**
 * Serve o build do cliente.
 *
 * Antes daqui, qualquer caminho caía no `dist/public/index.html` da home. Como
 * esse arquivo traz canonical, título e Open Graph fixos da home, as 47 rotas
 * se declaravam cópia dela — e uma URL inexistente respondia 200 com a home,
 * que é o clássico soft-404.
 *
 * Agora `scripts/gerar-heads.py` grava um `index.html` por rota depois do build.
 * Este servidor entrega o arquivo da rota pedida quando ele existe, e devolve
 * 404 de verdade quando não existe.
 */
export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // `redirect: false` é importante: com o padrão, `express.static` responde 301
  // de /sobre-nos para /sobre-nos/, criando duas URLs para a mesma página e
  // brigando com o canonical, que aponta para a versão sem barra.
  app.use(express.static(distPath, { redirect: false }));

  const dentro = (caminho: string) => {
    // Nunca deixar um caminho com ".." escapar da pasta do build.
    const alvo = path.resolve(distPath, "." + caminho);
    return alvo === distPath || alvo.startsWith(distPath + path.sep) ? alvo : null;
  };

  app.use("*", (req, res) => {
    const caminho = decodeURIComponent((req.originalUrl || "/").split("?")[0].split("#")[0]);

    const alvo = dentro(caminho);
    if (alvo) {
      const arquivo = path.join(alvo, "index.html");
      if (fs.existsSync(arquivo)) {
        return res.sendFile(arquivo);
      }
    }

    // Rota desconhecida: 404 de verdade, com a casca do cliente para o usuário
    // ver a página de erro. O status é o que importa para o buscador.
    const paginaErro = path.resolve(distPath, "404", "index.html");
    const casca = fs.existsSync(paginaErro)
      ? paginaErro
      : path.resolve(distPath, "index.html");
    return res.status(404).sendFile(casca);
  });
}
