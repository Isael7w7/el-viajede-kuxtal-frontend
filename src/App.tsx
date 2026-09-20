export default function App() {
  return (
    <div className="min-h-screen bg-kuxtalArena flex flex-col items-center justify-center p-4">
      {/* Contenedor responsivo centrado */}
      <div className="w-full max-w-[430px] tablet:max-w-[720px] laptop:max-w-[1140px] desktop:max-w-[1200px] bg-kuxtalNiebla p-6 rounded-2xl shadow-xl text-center border-2 border-kuxtalTurquesa">
        <h1 className="font-titulo text-2xl tablet:text-4xl font-bold text-kuxtalVerde mb-3">
          El Viaje de Kuxtal 🌿
        </h1>

        <p className="font-cuerpo text-base tablet:text-lg text-gray-700 mb-6">
          Frontend configurado correctamente con React, Vite, TypeScript y
          Tailwind CSS.
        </p>

        <div className="flex flex-col tablet:flex-row gap-3 justify-center">
          <button className="bg-kuxtalVerde hover:bg-emerald-600 text-white font-titulo py-3 px-6 rounded-xl shadow transition-all">
            Comenzar Aventura
          </button>
          <button className="bg-kuxtalAzulSerenidad hover:bg-blue-500 text-white font-titulo py-3 px-6 rounded-xl shadow transition-all">
            Ver Mapa
          </button>
        </div>
      </div>
    </div>
  );
}
