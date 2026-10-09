import { useCallback, useEffect, useState } from 'react';
import { Loader2, RefreshCw, CheckCircle, XCircle, MapPin } from 'lucide-react';
import { useJuegoStore } from '../store/useJuegoStore';
import { guardarRespuesta, obtenerActividades } from '../servicios/apiJuego';
import type { ActividadEmocional } from '../tipos/juego';
import { CuadroDialogo } from '../componentes/CuadroDialogo';
import { PERSONAJES_ASSETS } from '../assets/Personajes';

export default function EscenaActividad() {
  const {
    idJugador,
    nivelActual,
    registrarRespuesta,
    cambiarEscena,
    finalizarNivel,
    setTotalActividades,
  } = useJuegoStore();

  const [actividades, setActividades] = useState<ActividadEmocional[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [indiceActual, setIndiceActual] = useState(0);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<number | null>(null);
  const [retroalimentacionVisible, setRetroalimentacionVisible] = useState(false);
  const [tiempoInicioPregunta, setTiempoInicioPregunta] = useState(() => Date.now());

  const cargarActividades = useCallback(async () => {
    if (!nivelActual) return;
    setCargando(true);
    setError('');
    try {
      const datos = await obtenerActividades(nivelActual.idNivel);
      if (datos.length === 0) {
        setError('Este nivel aún no tiene actividades disponibles.');
      } else {
        setActividades(datos);
        setTotalActividades(datos.length);
      }
    } catch {
      setError('No se pudieron cargar las actividades. Revisa la conexión con el servidor.');
    } finally {
      setCargando(false);
    }
  }, [nivelActual, setTotalActividades]);

  useEffect(() => {
    cargarActividades();
  }, [cargarActividades]);

  const actividad = actividades[indiceActual];

  const handleSeleccionarOpcion = async (indiceOpcion: number) => {
    if (!actividad || opcionSeleccionada !== null) return;

    setOpcionSeleccionada(indiceOpcion);
    setRetroalimentacionVisible(true);

    const opcion = actividad.opciones[indiceOpcion];
    registrarRespuesta(opcion.esCorrecta, opcion.esEstrategiaSaludable);

    if (idJugador) {
      const tiempoInvertido = Math.max(
        1,
        Math.round((Date.now() - tiempoInicioPregunta) / 1000),
      );
      try {
        await guardarRespuesta({
          idJugador,
          idActividad: actividad.idActividad,
          respuestaSeleccionada: opcion.texto,
          esCorrecta: opcion.esCorrecta,
          esEstrategiaSaludable: opcion.esEstrategiaSaludable,
          tiempoRespuestaSegundos: tiempoInvertido,
        });
      } catch {
        // Silenciar errores de red en el MVP
      }
    }
  };

  const handleSiguiente = () => {
    const siguienteIndice = indiceActual + 1;

    if (siguienteIndice >= actividades.length) {
      const { progreso } = useJuegoStore.getState();
      const cristalObtenido = progreso.equilibrioEmocional >= 70;
      finalizarNivel(cristalObtenido);
      cambiarEscena('resultados');
      return;
    }

    setIndiceActual(siguienteIndice);
    setOpcionSeleccionada(null);
    setRetroalimentacionVisible(false);
    setTiempoInicioPregunta(Date.now());
  };

  const obtenerColorOpcion = (indice: number) => {
    if (opcionSeleccionada === null) return '';
    if (indice === opcionSeleccionada) {
      return actividad.opciones[indice].esCorrecta
        ? 'border-emerald-500 bg-emerald-500/10'
        : 'border-red-400 bg-red-50';
    }
    if (actividad.opciones[indice].esCorrecta && retroalimentacionVisible) {
      return 'border-emerald-500/50 bg-emerald-500/5';
    }
    return 'border-slate-600 opacity-50';
  };

  if (!nivelActual) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 px-6 text-center">
        <p className="font-cuerpo text-sm text-gray-500">
          Selecciona un nivel desde el mapa para comenzar.
        </p>
        <button
          onClick={() => cambiarEscena('mapa')}
          className="flex items-center gap-2 bg-kuxtalTurquesa hover:bg-teal-600 text-white font-titulo text-sm py-2.5 px-6 rounded-xl shadow transition-all"
        >
          <MapPin className="w-4 h-4" />
          Ir al Mapa
        </button>
      </div>
    );
  }

  if (cargando) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20">
        <Loader2 className="w-7 h-7 text-kuxtalTurquesa animate-spin" />
        <p className="font-cuerpo text-sm text-gray-500">Cargando actividades...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 px-6 text-center">
        <p className="font-cuerpo text-sm text-red-500">{error}</p>
        <button
          onClick={cargarActividades}
          className="flex items-center gap-2 bg-kuxtalTurquesa hover:bg-teal-600 text-white font-titulo text-sm py-2.5 px-6 rounded-xl shadow transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Reintentar
        </button>
      </div>
    );
  }

  const imagenKuxtal = retroalimentacionVisible
    ? actividad.opciones[opcionSeleccionada!].esCorrecta
      ? PERSONAJES_ASSETS.kuxtal.happy
      : PERSONAJES_ASSETS.kuxtal.preocupado
    : PERSONAJES_ASSETS.kuxtal.thinking;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {nivelActual.nombre} · Situación {indiceActual + 1} de {actividades.length}
          </span>
        </div>

        <CuadroDialogo
          nombrePersonaje="Kuxtal"
          imagenSrc={imagenKuxtal}
          texto={actividad.situacion}
        />

        <div className="flex flex-col gap-3">
          {actividad.opciones.map((opcion, i) => (
            <button
              key={i}
              onClick={() => handleSeleccionarOpcion(i)}
              disabled={opcionSeleccionada !== null}
              className={`text-left p-4 rounded-xl border-2 transition-all duration-300 text-sm ${
                obtenerColorOpcion(i)
              } ${
                opcionSeleccionada === null
                  ? 'hover:border-teal-400 hover:shadow-sm cursor-pointer'
                  : 'cursor-default'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-teal-400/10 flex items-center justify-center text-xs font-bold text-teal-400 shrink-0 mt-0.5">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-slate-200">{opcion.texto}</span>
              </div>
            </button>
          ))}
        </div>

        {retroalimentacionVisible && (
          <div className="bg-slate-800/80 rounded-2xl p-4 border-l-4 border-emerald-500 backdrop-blur-sm">
            <div className="flex items-start gap-2">
              {actividad.opciones[opcionSeleccionada!].esCorrecta ? (
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              )}
              <p className="text-sm text-slate-300">
                {actividad.opciones[opcionSeleccionada!].retroalimentacion}
              </p>
            </div>
          </div>
        )}

        {retroalimentacionVisible && (
          <button
            onClick={handleSiguiente}
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm py-3 px-6 rounded-xl shadow transition-all active:scale-95 border border-teal-400/30"
          >
            {indiceActual + 1 >= actividades.length ? 'Ver Resultados' : 'Siguiente Situación'} →
          </button>
        )}
      </div>
    </div>
  );
}
