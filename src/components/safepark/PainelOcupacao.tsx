import type { MicroRegiao } from "@/data/micro-regioes";
import { formatarVagas, ocupacaoDaRegiao, totaisZonaAzul } from "@/lib/ocupacao";

function Medidor({
  titulo,
  percentual,
  vagasOcupadas,
  vagasTotais,
  destaque = false,
}: {
  titulo: string;
  percentual: number;
  vagasOcupadas: number;
  vagasTotais: number;
  destaque?: boolean;
}) {
  return (
    <div className={destaque ? "rounded-xl bg-primary p-5 text-primary-foreground" : "rounded-xl border bg-card p-5"}>
      <p className={destaque ? "text-sm font-medium opacity-80" : "text-sm font-medium text-muted-foreground"}>
        {titulo}
      </p>
      <p className="mt-1 font-display text-6xl font-extrabold leading-none tracking-tight">
        {percentual}%
      </p>
      <div
        className={destaque ? "mt-4 h-2.5 overflow-hidden rounded-full bg-primary-foreground/20" : "mt-4 h-2.5 overflow-hidden rounded-full bg-muted"}
        role="progressbar"
        aria-valuenow={percentual}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Ocupação ${titulo}`}
      >
        <div
          className={destaque ? "h-full rounded-full bg-signal transition-all duration-500" : "h-full rounded-full bg-primary transition-all duration-500"}
          style={{ width: `${percentual}%` }}
        />
      </div>
      <p className={destaque ? "mt-3 font-mono text-sm opacity-90" : "mt-3 font-mono text-sm text-muted-foreground"}>
        {formatarVagas(vagasOcupadas, vagasTotais)} vagas ocupadas
      </p>
    </div>
  );
}

export function PainelOcupacao({
  regioes,
  destino,
}: {
  regioes: readonly MicroRegiao[];
  destino: MicroRegiao | null;
}) {
  if (!destino) {
    return (
      <div className="rounded-xl border border-dashed bg-card/60 p-6 text-center">
        <p className="font-display text-lg font-bold">Para onde você vai?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Toque numa micro-região do mapa ou da lista para ver a ocupação.
        </p>
      </div>
    );
  }

  const zona = totaisZonaAzul(regioes);
  return (
    <div key={destino.id} className="animate-rise space-y-3">
      <Medidor
        titulo={`Destino: ${destino.nome}`}
        percentual={ocupacaoDaRegiao(destino)}
        vagasOcupadas={destino.vagasOcupadas}
        vagasTotais={destino.vagasTotais}
        destaque
      />
      <Medidor
        titulo="Zona Azul (todas as micro-regiões)"
        percentual={zona.ocupacao}
        vagasOcupadas={zona.vagasOcupadas}
        vagasTotais={zona.vagasTotais}
      />
    </div>
  );
}
