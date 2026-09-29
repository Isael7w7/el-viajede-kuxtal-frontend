import { MapPin, Lock, CheckCircle } from 'lucide-react';
import { useJuegoStore } from '../store/useJuegoStore';

interface NivelMapa {
  id: number;
  nombre: string;
  descripcion: string;
  desbloqueado: boolean;
  completado: boolean;
}

const niveles: NivelMapa[] = [
  {
    id: 1,
    nombre: 'El Valle de la Ansiedad',
    descripcion: 'Aprende a identificar y gestionar la ansiedad.',
    desbloqueado: true,
    completado: false,
  },
  {
    id: 2,
    nombre: 'El Bosque de la Calma',
    descripcion: 'Practica técnicas de relajación.',
    desbloqueado: false,
    completado: false,
  },
  {
    id: 3,
    nombre: 'La Cima de la Serenidad',
    descripcion: 'Consolida tus habilidades emocionales.',
    desbloqueado: false,
    completado: false,
  },
];

export default function EscenaMapa() {
  const cambiarEscena = useJuegoStore((s) => s.cambiarEscena);

  const handleSeleccionarNivel = (nivel: NivelMapa) => {
    if (!nivel.desbloqueado) return;
    if (nivel.id === 1) {
      cambiarEscena('actividad');
    }
  };

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
        {niveles.map((nivel) => (
          <button
            key={nivel.id}
            onClick={() => handleSeleccionarNivel(nivel)}
            disabled={!nivel.desbloqueado}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
              nivel.desbloqueado
                ? 'border-kuxtalTurquesa bg-white hover:shadow-md hover:border-kuxtalVerde cursor-pointer'
                : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                nivel.completado
                  ? 'bg-kuxtalVerde/20'
                  : nivel.desbloqueado
                  ? 'bg-kuxtalTurquesa/20'
                  : 'bg-gray-200'
              }`}
            >
              {nivel.completado ? (
                <CheckCircle size={24} className="text-kuxtalVerde" />
              ) : nivel.desbloqueado ? (
                <MapPin size={24} className="text-kuxtalTurquesa" />
              ) : (
                <Lock size={24} className="text-gray-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-titulo text-sm font-bold text-gray-800 truncate">
                Nivel {nivel.id}: {nivel.nombre}
              </h3>
              <p className="font-cuerpo text-xs text-gray-500 mt-0.5">
                {nivel.descripcion}
              </p>
            </div>

            <span className="font-titulo text-xs font-bold text-gray-400 shrink-0">
              {nivel.id}/3
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
