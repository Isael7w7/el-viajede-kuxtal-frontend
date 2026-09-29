import type { DatosRespuesta, MetricasResumen } from '../tipos/juego';

const BASE_URL = 'http://localhost:3000/api';

async function manejarRespuesta<T>(respuesta: Response): Promise<T> {
  if (!respuesta.ok) {
    const error = await respuesta.json().catch(() => ({ mensaje: 'Error desconocido' }));
    throw new Error(error.mensaje || `Error HTTP ${respuesta.status}`);
  }
  return respuesta.json();
}

export async function registrarJugador(nombreUsuario: string) {
  const respuesta = await fetch(`${BASE_URL}/jugadores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombreUsuario }),
  });
  return manejarRespuesta<{ idJugador: string; nombreUsuario: string }>(respuesta);
}

export async function guardarRespuesta(datosRespuesta: DatosRespuesta) {
  const respuesta = await fetch(`${BASE_URL}/respuestasJugador`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosRespuesta),
  });
  return manejarRespuesta<{ guardado: boolean }>(respuesta);
}

export async function finalizarNivel(idJugador: string, tiempoTotalSegundos: number) {
  const respuesta = await fetch(`${BASE_URL}/juego/finalizar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idJugador, tiempoTotalSegundos }),
  });
  return manejarRespuesta<{ completado: boolean; cristalObtenido: boolean }>(respuesta);
}

export async function obtenerMetricas(idJugador: string) {
  const respuesta = await fetch(`${BASE_URL}/metricas/resumen/${idJugador}`);
  return manejarRespuesta<MetricasResumen>(respuesta);
}
