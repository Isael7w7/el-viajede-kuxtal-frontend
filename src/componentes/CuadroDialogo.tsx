import React from 'react';

interface Props {
  nombrePersonaje: string;
  imagenSrc: string;
  texto: string;
  alHacerClicSiguiente?: () => void;
  textoBoton?: string;
}

export const CuadroDialogo: React.FC<Props> = ({
  nombrePersonaje,
  imagenSrc,
  texto,
  alHacerClicSiguiente,
  textoBoton = 'Continuar',
}) => {
  return (
    <div className="flex flex-col items-center justify-end h-full w-full relative">
      <div className="w-52 h-68 md:w-60 md:h-76 relative z-10 -mb-6 transition-transform duration-300 transform hover:scale-105">
        <img
          src={imagenSrc}
          alt={nombrePersonaje}
          className="w-full h-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.75)]"
        />
      </div>

      <div className="w-full bg-slate-900/90 border-2 border-amber-400/40 rounded-2xl p-4 md:p-5 shadow-2xl backdrop-blur-md relative z-20 flex flex-col justify-between">
        <div className="absolute -top-3 left-6 bg-amber-500 text-slate-950 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
          {nombrePersonaje}
        </div>
        <p className="text-slate-100 text-sm md:text-base leading-relaxed mt-2 mb-4 font-medium">
          {texto}
        </p>
        {alHacerClicSiguiente && (
          <button
            onClick={alHacerClicSiguiente}
            className="self-end bg-teal-600 hover:bg-teal-500 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all shadow-lg active:scale-95 border border-teal-300/30"
          >
            {textoBoton} →
          </button>
        )}
      </div>
    </div>
  );
};
