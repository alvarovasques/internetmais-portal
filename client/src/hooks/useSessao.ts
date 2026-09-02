import { useCallback, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { ROTA_LOGIN } from "@/const";
import { trpc } from "@/lib/trpc";

type Opcoes = {
  /** Manda para a tela de login quando não há sessão. */
  exigirLogin?: boolean;
};

export function useSessao({ exigirLogin = false }: Opcoes = {}) {
  const utils = trpc.useUtils();
  const [, navegar] = useLocation();

  const consulta = trpc.auth.eu.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const mutacaoSair = trpc.auth.sair.useMutation({
    onSuccess: () => utils.auth.eu.setData(undefined, null),
  });

  const sair = useCallback(async () => {
    try {
      await mutacaoSair.mutateAsync();
    } finally {
      utils.auth.eu.setData(undefined, null);
      await utils.auth.eu.invalidate();
      navegar(ROTA_LOGIN);
    }
  }, [mutacaoSair, utils, navegar]);

  const estado = useMemo(
    () => ({
      usuario: consulta.data ?? null,
      carregando: consulta.isLoading || mutacaoSair.isPending,
      erro: consulta.error ?? mutacaoSair.error ?? null,
      autenticado: Boolean(consulta.data),
      ehAdmin: consulta.data?.papel === "admin",
    }),
    [consulta.data, consulta.error, consulta.isLoading, mutacaoSair.error, mutacaoSair.isPending],
  );

  useEffect(() => {
    if (!exigirLogin || estado.carregando || estado.usuario) return;
    navegar(ROTA_LOGIN);
  }, [exigirLogin, estado.carregando, estado.usuario, navegar]);

  return { ...estado, recarregar: () => consulta.refetch(), sair };
}
