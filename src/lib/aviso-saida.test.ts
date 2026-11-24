import { describe, expect, it } from "vitest";
import { MICRO_REGIOES, type MicroRegiao } from "@/data/micro-regioes";
import { MOTORISTAS, type Motorista } from "@/data/motoristas";
import { diasGratis, registrarAvisoSaida } from "./aviso-saida";
import { ocupacaoDaRegiao } from "./ocupacao";

const comPontos = (pontos: number): Motorista[] =>
  MOTORISTAS.map((m) => (m.id === "motorista-a" ? { ...m, pontos } : m));

describe("RN06 — aviso de saída atualiza a ocupação", () => {
  it("CA05: Santo Antônio passa de 60 para 59 de 120 (49%)", () => {
    const r = registrarAvisoSaida(MICRO_REGIOES, MOTORISTAS, "santo-antonio", "motorista-a");
    if (!r.ok) throw new Error(r.erro);
    expect(r.regiao.vagasOcupadas).toBe(59);
    expect(r.regiao.vagasTotais).toBe(120);
    expect(ocupacaoDaRegiao(r.regiao)).toBe(49);
  });

  it("só muda a micro-região do aviso", () => {
    const r = registrarAvisoSaida(MICRO_REGIOES, MOTORISTAS, "santo-antonio", "motorista-a");
    if (!r.ok) throw new Error(r.erro);
    expect(r.regioes.find((x) => x.id === "sao-jose")!.vagasOcupadas).toBe(85);
  });

  it("CA07: sem vaga ocupada, recusa o aviso e não muda ocupação nem pontos", () => {
    const vazias: MicroRegiao[] = MICRO_REGIOES.map((x) =>
      x.id === "boa-vista" ? { ...x, vagasOcupadas: 0 } : x,
    );
    const r = registrarAvisoSaida(vazias, comPontos(40), "boa-vista", "motorista-a");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.erro).toContain("Não há vaga ocupada");
    expect(vazias.find((x) => x.id === "boa-vista")!.vagasOcupadas).toBe(0);
  });
});

describe("RN07 — pontos por aviso de saída", () => {
  it("CA05: Motorista A sai de 0 para 10 pontos", () => {
    const r = registrarAvisoSaida(MICRO_REGIOES, comPontos(0), "santo-antonio", "motorista-a");
    if (!r.ok) throw new Error(r.erro);
    expect(r.motorista.pontos).toBe(10);
  });

  it("CA06: de 90 para 100 pontos soma 1 dia grátis", () => {
    const r = registrarAvisoSaida(MICRO_REGIOES, comPontos(90), "recife-antigo", "motorista-a");
    if (!r.ok) throw new Error(r.erro);
    expect(r.motorista.pontos).toBe(100);
    expect(diasGratis(r.motorista.pontos)).toBe(1);
  });

  it("99 pontos ainda não dão dia grátis; 200 dão 2", () => {
    expect(diasGratis(99)).toBe(0);
    expect(diasGratis(200)).toBe(2);
  });
});
