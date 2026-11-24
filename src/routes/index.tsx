import { createFileRoute } from "@tanstack/react-router";

import { SafeparkApp } from "@/components/safepark/SafeparkApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Safepark — Vagas na Zona Azul do Centro do Recife" },
      {
        name: "description",
        content: "Escolha seu destino no Centro do Recife e veja a ocupação da Zona Azul antes de sair de casa.",
      },
      { property: "og:title", content: "Safepark — Vagas na Zona Azul do Centro do Recife" },
      {
        property: "og:description",
        content: "Escolha seu destino no Centro do Recife e veja a ocupação da Zona Azul antes de sair de casa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SafeparkApp,
});

