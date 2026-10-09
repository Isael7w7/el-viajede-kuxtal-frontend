import { useState } from 'react';
import { useJuegoStore } from '../store/useJuegoStore';
import { registrarJugador } from '../servicios/apiJuego';
import { LOGOTIPOS_ASSETS } from '../assets/Logotipos';

export default function EscenaInicio() {
  const [nombre, setNombre] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const setJugador = useJuegoStore((s) => s.setJugador);
  const cambiarEscena = useJuegoStore((s) => s.cambiarEscena);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      setError('Ingresa tu nombre para comenzar');
      return;
    }

    setCargando(true);
    setError('');

    try {
      const { idJugador } = await registrarJugador(nombreLimpio);
      setJugador(idJugador, nombreLimpio);
      cambiarEscena('historia');
    } catch {
      setError('No se pudo conectar al servidor. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-10 px-4">
      <img
        src={LOGOTIPOS_ASSETS.principal}
        alt="El Viaje de Kuxtal"
        className="w-44 tablet:w-52 object-contain"
      />

      <div className="text-center">
        <h2 className="font-titulo text-2xl tablet:text-3xl font-bold text-kuxtalVerde mb-2">
          El Viaje de Kuxtal
        </h2>
        <p className="font-cuerpo text-sm tablet:text-base text-gray-600 max-w-xs">
          Un viaje para conocer tus emociones y aprender a gestionar la ansiedad.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="nombreUsuario"
            className="font-cuerpo text-sm font-semibold text-gray-700"
          >
            ¿Cómo te llamas?
          </label>
          <input
            id="nombreUsuario"
            type="text"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              if (error) setError('');
            }}
            placeholder="Escribe tu nombre"
            maxLength={30}
            className="w-full px-4 py-3 rounded-xl border-2 border-kuxtalTurquesa bg-white font-cuerpo text-base text-gray-800 placeholder-gray-400 outline-none focus:border-kuxtalVerde transition-colors"
          />
          {error && (
            <span className="font-cuerpo text-xs text-red-500">{error}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-kuxtalVerde hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-titulo text-base py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          {cargando ? 'Conectando...' : 'Comenzar Aventura'}
        </button>
      </form>
    </div>
  );
}
