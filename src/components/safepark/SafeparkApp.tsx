import { useState } from "react";
import { Info, MapPin } from "lucide-react";

import { MICRO_REGIOES, type MicroRegiao } from "@/data/micro-regioes";
import { MOTORISTAS, type Motorista } from "@/data/motoristas";
import { formatarVagas } from "@/lib/ocupacao";
import { registrarAvisoSaida } from "@/lib/aviso-saida";
import { AvisoSaida } from "./AvisoSaida";
import { MapaEsquematico } from "./MapaEsquematico";
import { PainelOcupacao } from "./PainelOcupacao";
import { cn } from "@/lib/utils";

export function SafeparkApp() {
  const [destinoId, setDestinoId] = useState<MicroRegiao["id"] | null>(null);
  const [regioes, setRegioes] = useState<readonly MicroRegiao[]>(MICRO_REGIOES);
  const [motoristas, setMotoristas] = useState<readonly Motorista[]>(MOTORISTAS);
  const destino = regioes.find((r) => r.id === destinoId) ?? null;

  const avisarSaida = (regiaoId: MicroRegiao["id"], motoristaId: Motorista["id"]) => {
    const resultado = registrarAvisoSaida(regioes, motoristas, regiaoId, motoristaId);
    if (resultado.ok) {
      setRegioes(resultado.regioes);
      setMotoristas(resultado.motoristas);
    }
    return resultado;
  };

  return (
    <div className="min-h-screen">
      <div className="sign-stripe h-2" aria-hidden />
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-lg bg-primary font-display text-2xl font-extrabold text-primary-foreground">
            P
          </span>
          <div>
            <h1 className="text-2xl font-extrabold leading-none">Safepark</h1>
            <p className="mt-1 text-sm text-muted-foreground">Zona Azul · Centro do Recife</p>
          </div>
        </div>
        <p className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
          <Info className="size-3.5" aria-hidden />
          Dados simulados para teste (v0.1)
        </p>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
        <section aria-labelledby="mapa-titulo" className="overflow-hidden rounded-2xl border bg-card lg:self-start">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 border-b px-5 py-3">
            <h2 id="mapa-titulo" className="text-lg font-bold">
              Mapa das micro-regiões
            </h2>
            <span className="text-xs text-muted-foreground">Esquemático, sem escala</span>
          </div>
          <MapaEsquematico regioes={regioes} destinoId={destinoId} onEscolher={setDestinoId} />
        </section>

        <aside className="space-y-5">
          <section aria-labelledby="destino-titulo">
            <h2 id="destino-titulo" className="mb-3 flex items-center gap-2 text-lg font-bold">
              <MapPin className="size-5 text-primary" aria-hidden />
              Escolha o destino
            </h2>
            <ul className="grid grid-cols-2 gap-2">
              {regioes.map((r) => {
                const ativo = r.id === destinoId;
                return (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => setDestinoId(r.id)}
                      aria-pressed={ativo}
                      className={cn(
                        "flex h-full w-full flex-col items-start rounded-xl border px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        ativo
                          ? "border-foreground bg-signal text-signal-foreground"
                          : "bg-card hover:bg-secondary",
                      )}
                    >
                      <span className="text-sm font-semibold leading-tight">{r.nome}</span>
                      <span className="mt-1 font-mono text-xs text-muted-foreground">
                        {formatarVagas(r.vagasOcupadas, r.vagasTotais)} ocupadas
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <PainelOcupacao regioes={regioes} destino={destino} />

          <AvisoSaida
            regioes={regioes}
            motoristas={motoristas}
            destinoId={destinoId}
            onRegistrar={avisarSaida}
          />
        </aside>
      </main>
    </div>
  );
}
