import React from 'react';
import bgAnxietyValley from '../assets/Escenarios/Activo B0003 - Valle de la Ansiedad.png';
import HeaderJuego from './HeaderJuego';

interface Props {
  children: React.ReactNode;
}

export const LayoutJuego: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950 flex items-center justify-center font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md scale-105 opacity-40 hidden md:block"
        style={{ backgroundImage: `url(${bgAnxietyValley})` }}
      />

      <main className="relative w-full max-w-md h-full md:h-[92vh] md:max-h-[850px] md:rounded-3xl md:border-2 md:border-amber-400/40 md:shadow-[0_0_50px_rgba(38,166,154,0.35)] overflow-hidden flex flex-col justify-between bg-slate-900/80 backdrop-blur-md">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 opacity-90"
          style={{ backgroundImage: `url(${bgAnxietyValley})` }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/50 to-slate-950/85 z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full w-full">
          <HeaderJuego />
          <div className="flex-1 overflow-y-auto p-4 flex flex-col">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
