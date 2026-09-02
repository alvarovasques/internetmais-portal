import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

export default function AdminLogin() {
  const [, navegar] = useLocation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [codigo, setCodigo] = useState("");
  const [pedeCodigo, setPedeCodigo] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const entrar = trpc.auth.entrar.useMutation({
    onSuccess: resultado => {
      setErro(null);
      if (resultado.precisaCodigo) {
        setPedeCodigo(true);
        return;
      }
      navegar("/admin/rh");
    },
    onError: e => setErro(e.message),
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0D1B3E] px-4">
      <form
        className="w-full max-w-sm bg-white rounded-2xl p-8 flex flex-col gap-5"
        onSubmit={e => {
          e.preventDefault();
          entrar.mutate({ email, senha, codigo: codigo || undefined });
        }}
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black text-[#0D1B3E]">Área interna</h1>
          <p className="text-sm text-[#5F6B85]">Acesso restrito à equipe Internet Mais.</p>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-[#5F6B85]">E-mail</span>
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border-2 border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#1A5BA6]"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-[#5F6B85]">Senha</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={senha}
            onChange={e => setSenha(e.target.value)}
            className="border-2 border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#1A5BA6]"
          />
        </label>

        {pedeCodigo && (
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-[#5F6B85]">Código do aplicativo autenticador</span>
            <input
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              required
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              className="border-2 border-gray-200 rounded-lg px-4 py-3 tracking-[0.4em] text-center outline-none focus:border-[#1A5BA6]"
            />
          </label>
        )}

        {erro && <p className="text-sm text-red-600">{erro}</p>}

        <button
          type="submit"
          disabled={entrar.isPending}
          className="bg-[#3DD93D] text-[#08240A] font-bold rounded-full py-3 disabled:opacity-60"
        >
          {entrar.isPending ? "Entrando..." : pedeCodigo ? "Confirmar código" : "Entrar"}
        </button>
      </form>
    </main>
  );
}
