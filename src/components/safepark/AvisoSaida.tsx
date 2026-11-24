import { useEffect, useState, type FormEvent } from "react";
import { CircleAlert, CircleCheck, LogOut } from "lucide-react";

import type { MicroRegiao } from "@/data/micro-regioes";
import type { Motorista } from "@/data/motoristas";
import { PONTOS_POR_AVISO, type ResultadoAviso } from "@/lib/aviso-saida";
import { formatarVagas, ocupacaoDaRegiao } from "@/lib/ocupacao";
import { cn } from "@/lib/utils";

type Props = {
  regioes: readonly MicroRegiao[];
  motoristas: readonly Motorista[];
  destinoId: MicroRegiao["id"] | null;
  onRegistrar: (regiaoId: MicroRegiao["id"], motoristaId: Motorista["id"]) => ResultadoAviso;
};

type Mensagem = { tipo: "sucesso" | "erro"; texto: string; id: number };

const campo =
  "h-11 w-full rounded-lg border bg-background px-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function AvisoSaida({ regioes, motoristas, destinoId, onRegistrar }: Props) {
  const [motoristaId, setMotoristaId] = useState<Motorista["id"]>(motoristas[0]?.id ?? "motorista-a");
  const [regiaoId, setRegiaoId] = useState<MicroRegiao["id"] | "">(destinoId ?? "");
  const [mensagem, setMensagem] = useState<Mensagem | null>(null);

  // Ao trocar o destino no mapa, sugere a mesma micro-região para o aviso.
  useEffect(() => {
    if (destinoId) setRegiaoId(destinoId);
  }, [destinoId]);

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    if (!regiaoId) {
      setMensagem({ tipo: "erro", texto: "Escolha a micro-região onde você liberou a vaga.", id: Date.now() });
      return;
    }
    const r = onRegistrar(regiaoId, motoristaId);
    setMensagem(
      r.ok
        ? {
            tipo: "sucesso",
            texto: `Saída registrada em ${r.regiao.nome}: agora ${formatarVagas(
              r.regiao.vagasOcupadas,
              r.regiao.vagasTotais,
            )} ocupadas (${ocupacaoDaRegiao(r.regiao)}%). ${r.motorista.nome} ganhou ${PONTOS_POR_AVISO} pontos.`,
            id: Date.now(),
          }
        : { tipo: "erro", texto: r.erro, id: Date.now() },
    );
  };

  return (
    <section aria-labelledby="saida-titulo" className="rounded-xl border bg-card p-5">
      <h2 id="saida-titulo" className="flex items-center gap-2 text-lg font-bold">
        <LogOut className="size-5 text-primary" aria-hidden />
        Avisar saída de vaga
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Liberou uma vaga? Avise para atualizar a ocupação e ganhe {PONTOS_POR_AVISO} pontos.
      </p>

      <form onSubmit={enviar} className="mt-4 space-y-3">
        <fieldset>
          <legend className="mb-1.5 text-sm font-semibold">Motorista</legend>
          <div className="grid grid-cols-2 gap-2">
            {motoristas.map((m) => {
              const ativo = m.id === motoristaId;
              return (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={ativo}
                  onClick={() => setMotoristaId(m.id)}
                  className={cn(
                    "h-11 rounded-lg border text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    ativo ? "border-foreground bg-foreground text-background" : "bg-background hover:bg-secondary",
                  )}
                >
                  {m.nome}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor="saida-regiao" className="mb-1.5 block text-sm font-semibold">
            Micro-região da vaga
          </label>
          <select
            id="saida-regiao"
            value={regiaoId}
            onChange={(e) => setRegiaoId(e.target.value as MicroRegiao["id"])}
            className={campo}
          >
            <option value="" disabled>
              Escolha a micro-região
            </option>
            {regioes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nome} — {formatarVagas(r.vagasOcupadas, r.vagasTotais)} ocupadas
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="h-12 w-full rounded-lg bg-primary font-display text-base font-bold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Liberei a vaga
        </button>
      </form>

      <div aria-live="polite" className="mt-3">
        {mensagem && (
          <p
            key={mensagem.id}
            role={mensagem.tipo === "erro" ? "alert" : "status"}
            className={cn(
              "animate-rise flex items-start gap-2 rounded-lg border p-3 text-sm",
              mensagem.tipo === "sucesso"
                ? "border-primary/30 bg-secondary text-secondary-foreground"
                : "border-destructive/40 bg-destructive/10 text-destructive",
            )}
          >
            {mensagem.tipo === "sucesso" ? (
              <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
            ) : (
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            )}
            <span>{mensagem.texto}</span>
          </p>
        )}
      </div>
    </section>
  );
}
