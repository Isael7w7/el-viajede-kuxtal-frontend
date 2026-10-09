import { useEffect, useRef, useState } from 'react';
import { useJuegoStore } from '../store/useJuegoStore';
import { finalizarNivel, obtenerMetricas } from '../servicios/apiJuego';
import { RotateCcw, Trophy, Heart, Brain, AlertTriangle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OBJETOS_ASSETS } from '../assets/Objetos del Juego';
import type { ResumenMetricas } from '../tipos/juego';

export default function EscenaResultados() {
  const {
    idJugador,
    nombreUsuario,
    progreso,
    tiempoInicioNivel,
    totalActividades,
    reiniciarJuego,
    cambiarEscena,
  } = useJuegoStore();

  const [cargando, setCargando] = useState(true);
  const [resumen, setResumen] = useState<ResumenMetricas | null>(null);
  const envioFinalizacion = useRef(false);

  const [tiempoTotal] = useState(() =>
    tiempoInicioNivel
      ? Math.max(1, Math.round((Date.now() - tiempoInicioNivel) / 1000))
      : 0,
  );

  useEffect(() => {
    if (!idJugador || envioFinalizacion.current) {
      if (!idJugador) setCargando(false);
      return;
    }
    envioFinalizacion.current = true;

    let cancelado = false;

    (async () => {
      try {
        await finalizarNivel(idJugador, tiempoTotal);
      } catch {
        // Silenciar errores de red en el MVP
      }

      try {
        const datos = await obtenerMetricas(idJugador);
        if (!cancelado) setResumen(datos);
      } catch {
        // Silenciar errores de red en el MVP
      } finally {
        if (!cancelado) setCargando(false);
      }
    })();

    return () => {
      cancelado = true;
    };
  }, [idJugador, tiempoTotal]);

  const progresoResumen = resumen?.progreso ?? progreso;
  const { equilibrioEmocional, respuestasCorrectas, eleccionesSaludables, erroresCometidos, cristalObtenido } =
    progresoResumen;

  useEffect(() => {
    if (cargando || !cristalObtenido) return;

    const disparar = () => {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    };
    disparar();
    const timer = setTimeout(disparar, 400);
    return () => clearTimeout(timer);
  }, [cargando, cristalObtenido]);

  const handleReiniciar = () => {
    reiniciarJuego();
    cambiarEscena('inicio');
  };

  if (cargando) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 py-20">
        <Loader2 className="w-8 h-8 text-kuxtalTurquesa animate-spin" />
        <p className="font-cuerpo text-sm text-gray-500">Calculando tus resultados...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-5 py-6">
      {cristalObtenido ? (
        <>
          <div className="w-28 h-28 mx-auto my-2 relative animate-pulse">
            <img
              src={OBJETOS_ASSETS.cristalSerenidad}
              alt="Cristal de la Serenidad"
              className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(38,166,154,0.8)]"
            />
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
          <div className="w-28 h-28 mx-auto my-2 relative">
            <img
              src={OBJETOS_ASSETS.nubePreocupacion}
              alt="Nube de la Preocupación"
              className="w-full h-full object-contain opacity-80"
            />
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
                {respuestasCorrectas}/{totalActividades}
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
