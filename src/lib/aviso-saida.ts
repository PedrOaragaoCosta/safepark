import type { MicroRegiao } from "@/data/micro-regioes";
import type { Motorista } from "@/data/motoristas";

/** RN07: pontos concedidos por aviso de saída válido. */
export const PONTOS_POR_AVISO = 10;
/** RN07: pontos necessários para cada dia grátis de Zona Azul. */
export const PONTOS_POR_DIA_GRATIS = 100;

export function diasGratis(pontos: number): number {
  return Math.floor(Math.max(0, pontos) / PONTOS_POR_DIA_GRATIS);
}

export type ResultadoAviso =
  | {
      ok: true;
      regioes: MicroRegiao[];
      motoristas: Motorista[];
      regiao: MicroRegiao;
      motorista: Motorista;
    }
  | { ok: false; erro: string };

/**
 * RF05: registra o aviso de saída de uma vaga.
 * RN06: um aviso válido reduz em 1 as vagas ocupadas; sem vaga ocupada, é recusado e nada muda.
 * RN07: um aviso válido concede 10 pontos ao motorista.
 */
export function registrarAvisoSaida(
  regioes: readonly MicroRegiao[],
  motoristas: readonly Motorista[],
  regiaoId: MicroRegiao["id"],
  motoristaId: Motorista["id"],
): ResultadoAviso {
  const regiaoAtual = regioes.find((r) => r.id === regiaoId);
  if (!regiaoAtual) return { ok: false, erro: "Micro-região não encontrada." };
  const motoristaAtual = motoristas.find((m) => m.id === motoristaId);
  if (!motoristaAtual) return { ok: false, erro: "Motorista não encontrado." };

  if (regiaoAtual.vagasOcupadas <= 0) {
    return {
      ok: false,
      erro: `Não há vaga ocupada em ${regiaoAtual.nome}. O aviso não foi registrado e nada mudou.`,
    };
  }

  const regiao = { ...regiaoAtual, vagasOcupadas: regiaoAtual.vagasOcupadas - 1 };
  const motorista = { ...motoristaAtual, pontos: motoristaAtual.pontos + PONTOS_POR_AVISO };
  return {
    ok: true,
    regioes: regioes.map((r) => (r.id === regiaoId ? regiao : r)),
    motoristas: motoristas.map((m) => (m.id === motoristaId ? motorista : m)),
    regiao,
    motorista,
  };
}
