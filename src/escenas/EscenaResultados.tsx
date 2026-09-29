import { useEffect } from 'react';
import { useJuegoStore } from '../store/useJuegoStore';
import { finalizarNivel } from '../servicios/apiJuego';
import { Gem, RotateCcw, Trophy, Heart, Brain, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

const TOTAL_ACTIVIDADES = 3;

export default function EscenaResultados() {
  const { idJugador, nombreUsuario, progreso, tiempoInicioNivel, reiniciarJuego, cambiarEscena } =
    useJuegoStore();

  const { equilibrioEmocional, respuestasCorrectas, eleccionesSaludables, erroresCometidos, cristalObtenido } =
    progreso;

  const tiempoTotal = tiempoInicioNivel
    ? Math.round((Date.now() - tiempoInicioNivel) / 1000)
    : 0;

  useEffect(() => {
    if (idJugador) {
      finalizarNivel(idJugador, tiempoTotal).catch(() => {});
    }
  }, [idJugador, tiempoTotal]);

  useEffect(() => {
    if (cristalObtenido) {
      const disparar = () => {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      };
      disparar();
      const timer = setTimeout(disparar, 400);
      return () => clearTimeout(timer);
    }
  }, [cristalObtenido]);

  const handleReiniciar = () => {
    reiniciarJuego();
    cambiarEscena('inicio');
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 py-6">
      {cristalObtenido ? (
        <>
          <div className="w-20 h-20 rounded-full bg-kuxtalAzulSerenidad/20 flex items-center justify-center animate-bounce">
            <Gem className="w-10 h-10 text-kuxtalAzulSerenidad" />
          </div>
          <h2 className="font-titulo text-xl tablet:text-2xl font-bold text-kuxtalVerde text-center">
            ¡Felicidades, {nombreUsuario}!
          </h2>
          <p className="font-cuerpo text-sm text-gray-500 text-center max-w-xs">
            Has obtenido el Cristal de la Serenidad. Tu equilibrio emocional te permite avanzar.
          </p>
        </>
      ) : (
        <>
          <div className="w-20 h-20 rounded-full bg-kuxtalAnsiedad/20 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-kuxtalAnsiedad" />
          </div>
          <h2 className="font-titulo text-xl tablet:text-2xl font-bold text-gray-700 text-center">
            Sigue intentando, {nombreUsuario}
          </h2>
          <p className="font-cuerpo text-sm text-gray-500 text-center max-w-xs">
            Tu equilibrio emocional aún no es suficiente para obtener el cristal. ¡Intenta de nuevo con nuevas estrategias!
          </p>
        </>
      )}

      <div className="w-full bg-white rounded-2xl shadow-md p-5 border border-kuxtalTurquesa/10">
        <h3 className="font-titulo text-sm font-bold text-gray-700 mb-4 text-center">Resumen del Nivel</h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 bg-kuxtalArena/50 rounded-xl p-3">
            <Heart className="w-5 h-5 text-kuxtalVerde shrink-0" />
            <div>
              <span className="font-titulo text-lg font-bold text-kuxtalVerde block leading-tight">
                {equilibrioEmocional}%
              </span>
              <span className="font-cuerpo text-[10px] text-gray-400">Equilibrio</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-kuxtalArena/50 rounded-xl p-3">
            <Trophy className="w-5 h-5 text-kuxtalTurquesa shrink-0" />
            <div>
              <span className="font-titulo text-lg font-bold text-kuxtalTurquesa block leading-tight">
                {respuestasCorrectas}/{TOTAL_ACTIVIDADES}
              </span>
              <span className="font-cuerpo text-[10px] text-gray-400">Correctas</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-kuxtalArena/50 rounded-xl p-3">
            <Brain className="w-5 h-5 text-kuxtalAzulSerenidad shrink-0" />
            <div>
              <span className="font-titulo text-lg font-bold text-kuxtalAzulSerenidad block leading-tight">
                {eleccionesSaludables}
              </span>
              <span className="font-cuerpo text-[10px] text-gray-400">Saludables</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-kuxtalArena/50 rounded-xl p-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <div>
              <span className="font-titulo text-lg font-bold text-red-400 block leading-tight">
                {erroresCometidos}
              </span>
              <span className="font-cuerpo text-[10px] text-gray-400">Errores</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 text-center">
          <span className="font-cuerpo text-xs text-gray-400">
            Tiempo: {Math.floor(tiempoTotal / 60)}m {tiempoTotal % 60}s
          </span>
        </div>
      </div>

      <button
        onClick={handleReiniciar}
        className="flex items-center gap-2 bg-kuxtalVerde hover:bg-emerald-600 text-white font-titulo text-sm py-3 px-8 rounded-xl shadow transition-all"
      >
        <RotateCcw className="w-4 h-4" />
        Jugar de Nuevo
      </button>
    </div>
  );
}
