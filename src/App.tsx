import { useJuegoStore } from './store/useJuegoStore';
import { LayoutJuego } from './componentes/LayoutJuego';
import EscenaInicio from './escenas/EscenaInicio';
import EscenaHistoria from './escenas/EscenaHistoria';
import EscenaMapa from './escenas/EscenaMapa';
import EscenaActividad from './escenas/EscenaActividad';
import EscenaResultados from './escenas/EscenaResultados';

function App() {
  const escenaActual = useJuegoStore((s) => s.escenaActual);

  const renderizarEscena = () => {
    switch (escenaActual) {
      case 'inicio':
        return <EscenaInicio />;
      case 'historia':
        return <EscenaHistoria />;
      case 'mapa':
        return <EscenaMapa />;
      case 'actividad':
        return <EscenaActividad />;
      case 'resultados':
        return <EscenaResultados />;
      default:
        return <EscenaInicio />;
    }
  };

  if (escenaActual === 'inicio') {
    return <EscenaInicio />;
  }

  return (
    <LayoutJuego>
      {renderizarEscena()}
    </LayoutJuego>
  );
}

export default App;
