import type { KeyboardEvent } from "react";
import type { MicroRegiao } from "@/data/micro-regioes";
import { formatarVagas } from "@/lib/ocupacao";

type Forma = {
  path: string;
  /** Linhas do nome e posição do rótulo dentro da forma. */
  nome: string[];
  x: number;
  y: number;
};

// Desenho esquemático (não geográfico) do Centro do Recife.
const FORMAS: Record<MicroRegiao["id"], Forma> = {
  "boa-vista": {
    path: "M40 54 L232 40 L240 150 L226 292 L58 304 L34 180 Z",
    nome: ["Boa Vista"],
    x: 136,
    y: 168,
  },
  "santo-antonio": {
    path: "M290 112 L418 96 L430 258 L284 272 Z",
    nome: ["Santo", "Antônio"],
    x: 356,
    y: 172,
  },
  "sao-jose": {
    path: "M284 290 L431 276 L446 436 L278 452 Z",
    nome: ["São José"],
    x: 362,
    y: 360,
  },
  "recife-antigo": {
    path: "M470 40 L548 32 L560 250 L486 266 L462 150 Z",
    nome: ["Recife", "Antigo"],
    x: 511,
    y: 132,
  },
};

type Props = {
  regioes: readonly MicroRegiao[];
  destinoId: MicroRegiao["id"] | null;
  onEscolher: (id: MicroRegiao["id"]) => void;
};

export function MapaEsquematico({ regioes, destinoId, onEscolher }: Props) {
  const handleKey = (e: KeyboardEvent, id: MicroRegiao["id"]) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onEscolher(id);
    }
  };

  return (
    <svg
      viewBox="0 0 640 480"
      className="block h-auto w-full"
      role="group"
      aria-label="Mapa esquemático do Centro do Recife"
    >
      {/* Água: rios Capibaribe e Beberibe e o mar */}
      <rect width="640" height="480" className="fill-water" />

      {/* Continente (não selecionável) */}
      <path d="M0 0 H262 L256 120 L250 316 Q150 334 0 340 Z" className="fill-land-muted" />
      <path d="M0 382 Q140 372 250 352 L262 480 H0 Z" className="fill-land-muted" />

      {/* Arrecifes */}
      <path
        d="M590 10 Q582 120 592 240 T586 470"
        className="fill-none stroke-water-foreground"
        strokeWidth="3"
        strokeDasharray="2 9"
        strokeLinecap="round"
      />

      {/* Pontes */}
      <g className="stroke-foreground" strokeWidth="5" strokeLinecap="round" opacity="0.55">
        <line x1="238" y1="200" x2="287" y2="196" />
        <line x1="424" y1="180" x2="468" y2="176" />
        <line x1="436" y1="350" x2="460" y2="268" />
      </g>

      <text x="70" y="366" className="fill-water-foreground text-[13px] italic" transform="rotate(-3 70 366)">
        Rio Capibaribe
      </text>
      <text x="628" y="400" className="fill-water-foreground text-[12px] italic" transform="rotate(-90 628 400)">
        Oceano Atlântico
      </text>

      {regioes.map((r) => {
        const f = FORMAS[r.id];
        const selecionada = r.id === destinoId;
        return (
          <g
            key={r.id}
            className="map-region"
            role="button"
            tabIndex={0}
            aria-pressed={selecionada}
            aria-label={`${r.nome}: ${formatarVagas(r.vagasOcupadas, r.vagasTotais)} vagas ocupadas`}
            onClick={() => onEscolher(r.id)}
            onKeyDown={(e) => handleKey(e, r.id)}
          >
            <path d={f.path} className="map-shape" />
            {f.nome.map((linha, i) => (
              <text key={linha} x={f.x} y={f.y + i * 22} textAnchor="middle" className="map-label text-[19px]">
                {linha}
              </text>
            ))}
            <text
              x={f.x}
              y={f.y + f.nome.length * 22 + 6}
              textAnchor="middle"
              className="map-count text-[13px]"
            >
              {formatarVagas(r.vagasOcupadas, r.vagasTotais)}
            </text>
            <text
              x={f.x}
              y={f.y + f.nome.length * 22 + 22}
              textAnchor="middle"
              className="map-count text-[10px] uppercase tracking-wider"
            >
              ocupadas
            </text>
          </g>
        );
      })}
    </svg>
  );
}
