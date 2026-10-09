import { useState } from 'react';
import { useJuegoStore } from '../store/useJuegoStore';
import { guardarRespuesta } from '../servicios/apiJuego';
import type { ActividadEmocional } from '../tipos/juego';
import { CheckCircle, XCircle } from 'lucide-react';
import { CuadroDialogo } from '../componentes/CuadroDialogo';
import { PERSONAJES_ASSETS } from '../assets/Personajes';

const actividades: ActividadEmocional[] = [
  {
    idActividad: 1,
    situacion: 'Tienes un examen importante mañana y sientes que no estás preparado. Tu corazón late rápido y no puedes dormir.',
    opciones: [
      {
        texto: 'Respirar profundamente 10 veces y repasar lo que recuerdas tranquilamente',
        esCorrecta: true,
        esEstrategiaSaludable: true,
        retroalimentacion: 'Respirar profundamente calma tu sistema nervioso. Es una excelente estrategia.',
      },
      {
        texto: 'Seguir estudiando sin parar hasta el amanecer para cubrir todo',
        esCorrecta: false,
        esEstrategiaSaludable: false,
        retroalimentacion: 'El agotamiento empeora la ansiedad. El descanso es parte del aprendizaje.',
      },
      {
        texto: 'Ir a jugar videojuegos para no pensar en el examen',
        esCorrecta: false,
        esEstrategiaSaludable: false,
        retroalimentacion: 'Evitar el problema puede darte alivio momentáneo, pero aumenta la ansiedad después.',
      },
    ],
  },
  {
    idActividad: 2,
    situacion: 'Tu mejor amigo(a) no te habló hoy en la escuela y parece enojado(a). Te sientes preocupado(a) y confundido(a).',
    opciones: [
      {
        texto: 'En un momento tranquilo, preguntarle con sinceridad si está bien',
        esCorrecta: true,
        esEstrategiaSaludable: true,
        retroalimentacion: 'La comunicación directa y respetuosa fortalece las relaciones.',
      },
      {
        texto: 'Ignorar la situación y hacer como si nada hubiera pasado',
        esCorrecta: false,
        esEstrategiaSaludable: false,
        retroalimentacion: 'Ignorar los problemas no los resuelve y puede generar más malentendidos.',
      },
      {
        texto: 'Enfadarse y dejar de hablarle también',
        esCorrecta: false,
        esEstrategiaSaludable: false,
        retroalimentacion: 'Reaccionar con enojo puede dañar la amistad. Hay formas más saludables de manejarlo.',
      },
    ],
  },
  {
    idActividad: 3,
    situacion: 'Te sientes abrumado por todas las tareas de la escuela. Sientes que no tienes tiempo para nada y el estrés no para.',
    opciones: [
      {
        texto: 'Hacer una lista de prioridades, respirar y pedir ayuda si es necesario',
        esCorrecta: true,
        esEstrategiaSaludable: true,
        retroalimentacion: 'Organizarte y pedir ayuda son estrategias muy efectivas contra el estrés.',
      },
      {
        texto: 'No hacer nada porque no sabes por dónde empezar',
        esCorrecta: false,
        esEstrategiaSaludable: false,
        retroalimentacion: 'La parálisis por overwhelm es común, pero un pequeño paso es mejor que ninguno.',
      },
      {
        texto: 'Cerrar todo y acostarte a ver el celular todo el día',
        esCorrecta: false,
        esEstrategiaSaludable: false,
        retroalimentacion: 'Huir del problema no lo resuelve. Pequeños pasos pueden hacer gran diferencia.',
      },
    ],
  },
];

export default function EscenaActividad() {
  const [indiceActual, setIndiceActual] = useState(0);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<number | null>(null);
  const [retroalimentacionVisible, setRetroalimentacionVisible] = useState(false);
  const [tiempoInicioPregunta, setTiempoInicioPregunta] = useState(() => Date.now());

  const { idJugador, registrarRespuesta, cambiarEscena, finalizarNivel } = useJuegoStore();

  const actividad = actividades[indiceActual];

  const handleSeleccionarOpcion = async (indiceOpcion: number) => {
    if (opcionSeleccionada !== null) return;

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
            Situación {indiceActual + 1} de {actividades.length}
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
