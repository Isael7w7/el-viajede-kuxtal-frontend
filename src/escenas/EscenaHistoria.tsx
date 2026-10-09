import { useCallback, useEffect, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { useJuegoStore } from '../store/useJuegoStore';
import { CuadroDialogo } from '../componentes/CuadroDialogo';
import { obtenerSpritePersonaje } from '../assets/Personajes';
import { obtenerDialogos } from '../servicios/apiJuego';
import type { DialogoHistoria } from '../tipos/juego';

export default function EscenaHistoria() {
  const [dialogos, setDialogos] = useState<DialogoHistoria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [indiceDialogo, setIndiceDialogo] = useState(0);
  const cambiarEscena = useJuegoStore((s) => s.cambiarEscena);

  const cargarDialogos = useCallback(async () => {
    setCargando(true);
    setError('');
    try {
      const datos = await obtenerDialogos();
      if (datos.length === 0) {
        setError('No hay diálogos disponibles en el servidor.');
      } else {
        setDialogos(datos);
      }
    } catch {
      setError('No se pudo cargar la historia. Revisa la conexión con el servidor.');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarDialogos();
  }, [cargarDialogos]);

  const dialogoActual = dialogos[indiceDialogo];
  const esUltimo = indiceDialogo === dialogos.length - 1;

  const handleSiguiente = () => {
    if (esUltimo) {
      cambiarEscena('mapa');
    } else {
      setIndiceDialogo((prev) => prev + 1);
    }
  };

  if (cargando) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20">
        <Loader2 className="w-7 h-7 text-kuxtalTurquesa animate-spin" />
        <p className="font-cuerpo text-sm text-gray-500">Preparando la historia...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 px-6 text-center">
        <p className="font-cuerpo text-sm text-red-500">{error}</p>
        <button
          onClick={cargarDialogos}
          className="flex items-center gap-2 bg-kuxtalTurquesa hover:bg-teal-600 text-white font-titulo text-sm py-2.5 px-6 rounded-xl shadow transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-4 px-2 h-full">
      <CuadroDialogo
        nombrePersonaje={dialogoActual.emisor}
        imagenSrc={obtenerSpritePersonaje(dialogoActual.personaje, dialogoActual.expresion)}
        texto={dialogoActual.texto}
        alHacerClicSiguiente={handleSiguiente}
        textoBoton={esUltimo ? 'Iniciar Misión' : 'Continuar'}
      />

      <div className="flex items-center gap-2 mt-2">
        {dialogos.map((_, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i <= indiceDialogo ? 'bg-amber-400' : 'bg-slate-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
