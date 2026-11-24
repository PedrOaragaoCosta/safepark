/**
 * Camada de dados da v0.1 (RN01): quatro micro-regiões fixas do Centro do Recife,
 * com os dados simulados da tabela de referência. A interface só lê daqui.
 */
export type MicroRegiao = {
  id: "recife-antigo" | "santo-antonio" | "sao-jose" | "boa-vista";
  nome: string;
  vagasTotais: number;
  vagasOcupadas: number;
};

export const MICRO_REGIOES: readonly MicroRegiao[] = [
  { id: "recife-antigo", nome: "Recife Antigo (CESAR School)", vagasTotais: 200, vagasOcupadas: 120 },
  { id: "santo-antonio", nome: "Santo Antônio", vagasTotais: 120, vagasOcupadas: 60 },
  { id: "sao-jose", nome: "São José", vagasTotais: 100, vagasOcupadas: 85 },
  { id: "boa-vista", nome: "Boa Vista", vagasTotais: 180, vagasOcupadas: 72 },
];
