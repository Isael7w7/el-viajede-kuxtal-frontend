import { create } from 'zustand';
import type { EscenaActual, ProgresoNivel } from '../tipos/juego';

const progresoInicial: ProgresoNivel = {
  equilibrioEmocional: 80,
  respuestasCorrectas: 0,
  eleccionesSaludables: 0,
  erroresCometidos: 0,
  cristalObtenido: false,
};

interface JuegoState {
  idJugador: string | null;
  nombreUsuario: string;
  escenaActual: EscenaActual;
  progreso: ProgresoNivel;
  tiempoInicioNivel: number | null;

  setJugador: (id: string, nombre: string) => void;
  cambiarEscena: (escena: EscenaActual) => void;
  actualizarEquilibrio: (delta: number) => void;
  registrarRespuesta: (correcta: boolean, saludable: boolean) => void;
  finalizarNivel: (cristalObtenido: boolean) => void;
  reiniciarJuego: () => void;
}

export const useJuegoStore = create<JuegoState>((set) => ({
  idJugador: null,
  nombreUsuario: '',
  escenaActual: 'inicio',
  progreso: { ...progresoInicial },
  tiempoInicioNivel: null,

  setJugador: (id, nombre) =>
    set({ idJugador: id, nombreUsuario: nombre }),

  cambiarEscena: (escena) =>
    set((state) => {
      const updates: Partial<JuegoState> = { escenaActual: escena };
      if (escena === 'actividad' && state.tiempoInicioNivel === null) {
        updates.tiempoInicioNivel = Date.now();
      }
      return updates;
    }),

  actualizarEquilibrio: (delta) =>
    set((state) => ({
      progreso: {
        ...state.progreso,
        equilibrioEmocional: Math.max(0, Math.min(100, state.progreso.equilibrioEmocional + delta)),
      },
    })),

  registrarRespuesta: (esCorrecta, esEstrategiaSaludable) =>
    set((state) => {
      const esPositiva = esCorrecta || esEstrategiaSaludable;
      const deltaEquilibrio = esPositiva ? 1 : -2;
      const nuevoEquilibrio = Math.min(
        100,
        Math.max(0, state.progreso.equilibrioEmocional + deltaEquilibrio),
      );

      return {
        progreso: {
          ...state.progreso,
          equilibrioEmocional: nuevoEquilibrio,
          respuestasCorrectas:
            state.progreso.respuestasCorrectas + (esCorrecta ? 1 : 0),
          eleccionesSaludables:
            state.progreso.eleccionesSaludables + (esEstrategiaSaludable ? 1 : 0),
          erroresCometidos:
            state.progreso.erroresCometidos + (!esPositiva ? 1 : 0),
        },
      };
    }),

  finalizarNivel: (cristalObtenido) =>
    set((state) => ({
      progreso: {
        ...state.progreso,
        cristalObtenido,
      },
    })),

  reiniciarJuego: () =>
    set({
      idJugador: null,
      nombreUsuario: '',
      escenaActual: 'inicio',
      progreso: { ...progresoInicial },
      tiempoInicioNivel: null,
    }),
}));
