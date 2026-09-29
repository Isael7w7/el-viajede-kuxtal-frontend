export interface Jugador {
  idJugador: string;
  nombreUsuario: string;
  puntajeTotal: number;
  nivelCompletado: boolean;
  tiempoTotalSegundos: number;
}

export interface ProgresoNivel {
  equilibrioEmocional: number;
  respuestasCorrectas: number;
  eleccionesSaludables: number;
  erroresCometidos: number;
  cristalObtenido: boolean;
}

export type EscenaActual = 'inicio' | 'historia' | 'mapa' | 'actividad' | 'resultados';

export interface OpcionActividad {
  texto: string;
  esCorrecta: boolean;
  esEstrategiaSaludable: boolean;
  retroalimentacion: string;
}

export interface ActividadEmocional {
  idActividad: number;
  situacion: string;
  opciones: OpcionActividad[];
}

export interface DatosRespuesta {
  idJugador: string;
  idActividad: number;
  respuestaSeleccionada: number;
  esCorrecta: boolean;
  esEstrategiaSaludable: boolean;
  tiempoRespuestaSegundos: number;
}

export interface MetricasResumen {
  totalRespuestas: number;
  respuestasCorrectas: number;
  eleccionesSaludables: number;
  equilibrioEmocional: number;
  cristalObtenido: boolean;
  tiempoTotalSegundos: number;
}
