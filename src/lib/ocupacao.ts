import type { MicroRegiao } from "@/data/micro-regioes";

/** RN02: ocupadas ÷ totais × 100, arredondado ao inteiro mais próximo. */
export function calcularOcupacao(vagasOcupadas: number, vagasTotais: number): number {
  if (vagasTotais <= 0) return 0;
  return Math.round((vagasOcupadas / vagasTotais) * 100);
}

export function ocupacaoDaRegiao(regiao: MicroRegiao): number {
  return calcularOcupacao(regiao.vagasOcupadas, regiao.vagasTotais);
}

/** RN03: soma das ocupadas ÷ soma das totais, com o mesmo arredondamento. */
export function totaisZonaAzul(regioes: readonly MicroRegiao[]) {
  const vagasTotais = regioes.reduce((s, r) => s + r.vagasTotais, 0);
  const vagasOcupadas = regioes.reduce((s, r) => s + r.vagasOcupadas, 0);
  return { vagasTotais, vagasOcupadas, ocupacao: calcularOcupacao(vagasOcupadas, vagasTotais) };
}

/** RNF02: vagas no formato "120 de 200". */
export function formatarVagas(vagasOcupadas: number, vagasTotais: number): string {
  return `${vagasOcupadas} de ${vagasTotais}`;
}
