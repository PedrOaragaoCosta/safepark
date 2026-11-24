// Entrada do site estático (GitHub Pages). Usa a mesma tela do app, sem servidor.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "../src/styles.css";
import { SafeparkApp } from "../src/components/safepark/SafeparkApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SafeparkApp />
  </StrictMode>,
);
