import { useJuegoStore } from '../store/useJuegoStore';
import { Gem } from 'lucide-react';
import { LOGOTIPOS_ASSETS } from '../assets/Logotipos';

export default function HeaderJuego() {
  const { nombreUsuario, progreso } = useJuegoStore();
  const { equilibrioEmocional, cristalObtenido } = progreso;

  return (
    <header className="w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-4 mb-4 border border-kuxtalTurquesa/20">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <img
            src={LOGOTIPOS_ASSETS.isotipo}
            alt="Isotipo Kuxtal"
            className="w-7 h-7 object-contain"
          />
          <h2 className="font-titulo text-sm tablet:text-base font-bold text-kuxtalVerde">
            Valle de la Ansiedad
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {cristalObtenido && (
            <Gem className="w-4 h-4 text-kuxtalAzulSerenidad" />
          )}
          <span className="font-cuerpo text-xs text-gray-500">
            {nombreUsuario}
          </span>
        </div>
      </div>

      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${equilibrioEmocional}%`,
            backgroundColor:
              equilibrioEmocional > 60
                ? '#4CAF50'
                : equilibrioEmocional > 30
                ? '#FFC107'
                : '#7DA7D9',
          }}
        />
      </div>

      <div className="flex justify-between mt-1">
        <span className="font-cuerpo text-[10px] text-gray-400">
          Equilibrio Emocional
        </span>
        <span className="font-titulo text-[10px] font-bold text-kuxtalVerde">
          {equilibrioEmocional}%
        </span>
      </div>
    </header>
  );
}
