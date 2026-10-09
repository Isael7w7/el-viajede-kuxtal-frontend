import { useCallback, useEffect, useState } from 'react';
import { MapPin, Lock, CheckCircle, Loader2, RefreshCw } from 'lucide-react';
import { useJuegoStore } from '../store/useJuegoStore';
import { obtenerNiveles } from '../servicios/apiJuego';
import type { NivelViaje } from '../tipos/juego';

export default function EscenaMapa() {
  const { idJugador, cambiarEscena, seleccionarNivel } = useJuegoStore();
  const [niveles, setNiveles] = useState<NivelViaje[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargarNiveles = useCallback(async () => {
    setCargando(true);
    setError('');
    try {
      const datos = await obtenerNiveles(idJugador ?? undefined);
      setNiveles(datos);
    } catch {
      setError('No se pudo cargar el mapa. Revisa la conexión con el servidor.');
    } finally {
      setCargando(false);
    }
  }, [idJugador]);

  useEffect(() => {
    cargarNiveles();
  }, [cargarNiveles]);

  const handleSeleccionarNivel = (nivel: NivelViaje) => {
    if (!nivel.desbloqueado || nivel.totalActividades === 0) return;
    seleccionarNivel(nivel);
    cambiarEscena('actividad');
  };

  if (cargando) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20">
        <Loader2 className="w-7 h-7 text-kuxtalTurquesa animate-spin" />
        <p className="font-cuerpo text-sm text-gray-500">Cargando el mapa...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 px-6 text-center">
        <p className="font-cuerpo text-sm text-red-500">{error}</p>
        <button
          onClick={cargarNiveles}
          className="flex items-center gap-2 bg-kuxtalTurquesa hover:bg-teal-600 text-white font-titulo text-sm py-2.5 px-6 rounded-xl shadow transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8 px-4">
      <div className="text-center">
        <h2 className="font-titulo text-xl tablet:text-2xl font-bold text-kuxtalVerde">
          Mapa del Viaje
        </h2>
        <p className="font-cuerpo text-sm text-gray-500 mt-1">
          Selecciona un nivel para comenzar
        </p>
      </div>

      <div className="w-full flex flex-col gap-4">
        {niveles.map((nivel) => {
          const jugable = nivel.desbloqueado && nivel.totalActividades > 0;
          return (
            <button
              key={nivel.idNivel}
              onClick={() => handleSeleccionarNivel(nivel)}
              disabled={!jugable}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                jugable
                  ? 'border-kuxtalTurquesa bg-white hover:shadow-md hover:border-kuxtalVerde cursor-pointer'
                  : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  nivel.completado
                    ? 'bg-kuxtalVerde/20'
                    : jugable
                    ? 'bg-kuxtalTurquesa/20'
                    : 'bg-gray-200'
                }`}
              >
                {nivel.completado ? (
                  <CheckCircle size={24} className="text-kuxtalVerde" />
                ) : jugable ? (
                  <MapPin size={24} className="text-kuxtalTurquesa" />
                ) : (
                  <Lock size={24} className="text-gray-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-titulo text-sm font-bold text-gray-800 truncate">
                  Nivel {nivel.orden}: {nivel.nombre}
                </h3>
                <p className="font-cuerpo text-xs text-gray-500 mt-0.5">
                  {nivel.totalActividades > 0
                    ? nivel.descripcion
                    : 'Próximamente disponible'}
                </p>
              </div>

              <span className="font-titulo text-xs font-bold text-gray-400 shrink-0">
                {nivel.orden}/{niveles.length}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
