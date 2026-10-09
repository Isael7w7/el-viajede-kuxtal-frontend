import { useState } from 'react';
import { useJuegoStore } from '../store/useJuegoStore';
import { CuadroDialogo } from '../componentes/CuadroDialogo';
import { PERSONAJES_ASSETS } from '../assets/Personajes';

const dialogos = [
  {
    emisor: 'Noh Ek',
    imagen: PERSONAJES_ASSETS.nohEk.ansioso,
    texto:
      '¡Ayuda! La neblina en el Valle de la Ansiedad se está haciendo cada vez más densa y los pensamientos no me dejan ver el camino...',
  },
  {
    emisor: 'Ixchel',
    imagen: PERSONAJES_ASSETS.ixchel.explicando,
    texto:
      'Tranquilo Noh Ek. Recuerda que la ansiedad nos hace creer que las cosas son peores de lo que realmente son. Para avanzar, Kuxtal debe aprender a escuchar y regular sus emociones.',
  },
  {
    emisor: 'Ixchel',
    imagen: PERSONAJES_ASSETS.ixchel.sonriendo,
    texto:
      'Kuxtal, te acompañaremos en este viaje. Si logras tomar decisiones con claridad, restauraremos el Equilibrio Emocional y obtendremos el Cristal de la Serenidad.',
  },
  {
    emisor: 'Noh Ek',
    imagen: PERSONAJES_ASSETS.nohEk.sereno,
    texto: 'Inhalemos profundo... Estoy listo. ¡Vamos juntos al Valle!',
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
