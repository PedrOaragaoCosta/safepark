/**
 * Motoristas simulados da v0.1 (sem login). A interface só lê daqui.
 */
export type Motorista = {
  id: "motorista-a" | "motorista-b";
  nome: string;
  pontos: number;
};

export const MOTORISTAS: readonly Motorista[] = [
  { id: "motorista-a", nome: "Motorista A", pontos: 0 },
  { id: "motorista-b", nome: "Motorista B", pontos: 0 },
];
