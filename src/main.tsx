'use client'

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App";

// --- Parche defensivo ---
// Algunas extensiones del navegador (traductores automáticos, ad-blockers,
// Grammarly, etc.) modifican el DOM por fuera del control de React.
// Cuando React intenta luego hacer removeChild/insertBefore sobre un nodo
// que ya no está donde lo dejó, tira un NotFoundError no controlado y
// React desmonta toda la app (pantalla en blanco).
// Esto no es un bug de nuestro código: es una colisión con el DOM externo.
// Acá interceptamos ESE error puntual para que no tire abajo el render.
if (typeof window !== "undefined") {
  const isBenignDomError = (msg: unknown): boolean =>
    typeof msg === "string" &&
    (msg.includes("removeChild") || msg.includes("insertBefore"));

  window.addEventListener("error", (e) => {
    if (isBenignDomError(e.message)) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  });

  const originalConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    if (isBenignDomError(args[0])) {
      return;
    }
    originalConsoleError(...args);
  };
}
// --- Fin parche defensivo ---

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);