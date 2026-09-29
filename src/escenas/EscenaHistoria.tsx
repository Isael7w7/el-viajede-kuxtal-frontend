import { useState } from 'react';
import { useJuegoStore } from '../store/useJuegoStore';
import { CuadroDialogo } from '../componentes/CuadroDialogo';
import { PERSONAJES_ASSETS } from '../assets/Personajes';

const dialogos = [
  {
    texto: 'Saludos, viajero. Soy Noh Ek, tu guía en este viaje.',
    emisor: 'Noh Ek',
    imagen: PERSONAJES_ASSETS.nohEk.neutral,
  },
  {
    texto: 'El Valle de la Ansiedad es un lugar donde las emociones se sienten intensas y difíciles de manejar.',
    emisor: 'Noh Ek',
    imagen: PERSONAJES_ASSETS.nohEk.ansioso,
  },
  {
    texto: 'Tu misión es atravesar este valle, enfrentar situaciones desafiantes y recuperar tu equilibrio emocional.',
    emisor: 'Noh Ek',
    imagen: PERSONAJES_ASSETS.nohEk.sereno,
  },
  {
    texto: 'Recuerda: cada elección que tomes afectará tu equilibrio. Elige con sabiduría y compasión.',
    emisor: 'Noh Ek',
    imagen: PERSONAJES_ASSETS.nohEk.sereno,
  },
];

export default function EscenaHistoria() {
  const [indiceDialogo, setIndiceDialogo] = useState(0);
  const cambiarEscena = useJuegoStore((s) => s.cambiarEscena);

  const dialogoActual = dialogos[indiceDialogo];
  const esUltimo = indiceDialogo === dialogos.length - 1;

  const handleSiguiente = () => {
    if (esUltimo) {
      cambiarEscena('mapa');
    } else {
      setIndiceDialogo((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 py-4 px-2 h-full">
      <CuadroDialogo
        nombrePersonaje={dialogoActual.emisor}
        imagenSrc={dialogoActual.imagen}
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
