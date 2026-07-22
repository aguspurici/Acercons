import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Algunas extensiones del navegador (traductores automáticos, gestores de
 * contraseñas, ad-blockers, etc.) modifican el DOM por fuera del control de
 * React. Cuando React intenta luego hacer removeChild/insertBefore sobre un
 * nodo que ya fue movido o eliminado por esa extensión, tira un
 * NotFoundError durante su fase de "commit" interna.
 *
 * Ese error NO burbujea como un error de JS común, así que un
 * window.addEventListener("error") no alcanza para frenarlo. Hace falta un
 * Error Boundary de React que lo capture directamente y fuerce una
 * recuperación (re-render limpio) en vez de dejar que toda la app se
 * desmonte y la pantalla quede en blanco.
 */
export class DomErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State | null {
    const msg = error?.message || "";
    const isBenignDomError =
      msg.includes("removeChild") ||
      msg.includes("insertBefore") ||
      error?.name === "NotFoundError";

    if (isBenignDomError) {
      return { hasError: true };
    }

    // Si es un error distinto (un bug real de la app), lo dejamos
    // propagar normalmente para no ocultar problemas genuinos.
    throw error;
  }

  componentDidCatch(error: Error) {
    if (
      error?.message?.includes("removeChild") ||
      error?.message?.includes("insertBefore") ||
      error?.name === "NotFoundError"
    ) {
      // Recuperación automática: volvemos a renderizar normalmente
      // casi al instante, en vez de dejar la pantalla en blanco.
      setTimeout(() => {
        this.setState({ hasError: false });
      }, 50);
    }
  }

  render() {
    // Mientras se recupera (50ms), no mostramos nada raro, simplemente
    // esperamos el siguiente render limpio.
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}