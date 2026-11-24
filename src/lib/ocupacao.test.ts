import { describe, expect, it } from "vitest";
import { MICRO_REGIOES } from "@/data/micro-regioes";
import { calcularOcupacao, formatarVagas, ocupacaoDaRegiao, totaisZonaAzul } from "./ocupacao";

const regiao = (id: string) => MICRO_REGIOES.find((r) => r.id === id)!;

describe("RN01 — micro-regiões fixas", () => {
  it("trabalha com exatamente quatro micro-regiões", () => {
    expect(MICRO_REGIOES.map((r) => r.nome)).toEqual([
      "Recife Antigo (CESAR School)",
      "Santo Antônio",
      "São José",
      "Boa Vista",
    ]);
  });
});

describe("RN02 — ocupação de uma micro-região", () => {
  it("CA02: Recife Antigo com 120 de 200 dá 60%", () => {
    expect(ocupacaoDaRegiao(regiao("recife-antigo"))).toBe(60);
  });
  it("CA03: São José com 85 de 100 dá 85%", () => {
    expect(ocupacaoDaRegiao(regiao("sao-jose"))).toBe(85);
  });
  it("arredonda ao inteiro mais próximo", () => {
    expect(calcularOcupacao(59, 120)).toBe(49);
    expect(calcularOcupacao(1, 3)).toBe(33);
    expect(calcularOcupacao(2, 3)).toBe(67);
  });
});

describe("RN03 — ocupação da Zona Azul", () => {
  it("soma 337 ocupadas de 600 e arredonda 56,17% para 56%", () => {
    expect(totaisZonaAzul(MICRO_REGIOES)).toEqual({ vagasTotais: 600, vagasOcupadas: 337, ocupacao: 56 });
  });
});

describe("RNF02 — formato das vagas", () => {
  it('mostra "120 de 200"', () => {
    expect(formatarVagas(120, 200)).toBe("120 de 200");
  });
});
