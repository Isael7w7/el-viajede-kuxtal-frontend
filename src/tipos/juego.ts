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

export interface NivelViaje {
  idNivel: number;
  orden: number;
  nombre: string;
  descripcion: string;
  totalActividades: number;
  desbloqueado: boolean;
  completado: boolean;
}

export interface DialogoHistoria {
  idDialogo: number;
  orden: number;
  emisor: string;
  personaje: string;
  expresion: string;
  texto: string;
}

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
  respuestaSeleccionada: string;
  esCorrecta: boolean;
  esEstrategiaSaludable: boolean;
  tiempoRespuestaSegundos: number;
}

export interface RespuestaJugador {
  idRespuesta: string;
  idJugador: string;
  idActividad: number;
  respuestaSeleccionada: string;
  esCorrecta: boolean;
  esEstrategiaSaludable: boolean;
  tiempoRespuestaSegundos: number | null;
  fechaRegistro: string;
}

export interface ResumenMetricas {
  jugador: Jugador;
  progreso: ProgresoNivel;
  respuestas: RespuestaJugador[];
}
