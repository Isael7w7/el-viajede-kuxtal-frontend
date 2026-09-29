# CONTEXT.md — El Viaje de Kuxtal (Frontend)

## 1. Resumen del Proyecto

- **Nombre:** El Viaje de Kuxtal — MVP: El Valle de la Ansiedad
- **Propósito:** Videojuego educativo responsivo orientado a la alfabetización emocional y gestión de la ansiedad en niñas, niños y adolescentes.
- **Enfoque UI/UX:** Mobile-First con contenedor vertical adaptativo para tablet y desktop.
- **Guía del jugador:** Noh Ek, un alebrije sabio que acompaña al jugador durante la narrativa.

---

## 2. Stack Técnico

| Capa | Tecnología |
|------|-----------|
| Framework | React 18/19 + Vite |
| Lenguaje | TypeScript (~5.6) |
| Estilos | Tailwind CSS v3.4 |
| Estado global | Zustand v5 |
| HTTP | Fetch API nativo → `http://localhost:3000/api` |
| Iconos | lucide-react |
| Confetti | canvas-confetti |
| Gestor de paquetes | pnpm |

---

## 3. Convenciones de Nomenclatura

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Variables y propiedades | camelCase | `idJugador`, `equilibrioEmocional` |
| Componentes | PascalCase | `HeaderJuego`, `EscenaInicio` |
| Archivos | kebab-case | `use-juego-store.ts`, `escena-actividad.tsx` |
| Interfaces/Types | PascalCase | `Jugador`, `ProgresoNivel` |

---

## 4. Paleta de Colores (Tailwind)

| Token | Hex | Uso |
|-------|-----|-----|
| `kuxtalArena` | `#F4E9D8` | Fondo principal, arena del desierto |
| `kuxtalVerde` | `#4CAF50` | Elementos positivos, botones principales |
| `kuxtalTurquesa` | `#26A69A` | Acentos, bordes, elementos activos |
| `kuxtalAzulSerenidad` | `#5C9EED` | Calma, serenidad, equilibrio |
| `kuxtalAnsiedad` | `#7DA7D9` | Indicadores de ansiedad, alertas |
| `kuxtalNiebla` | `#FAFAFA` | Superficies, tarjetas |

---

## 5. Fuentes Tipográficas

- **Títulos:** Poppins (weights 600, 700) → `font-titulo`
- **Cuerpo:** Nunito Sans (weights 400, 600, 700) → `font-cuerpo`

---

## 6. Estructura del Proyecto

```
src/
├── App.tsx                    # Componente raíz — layout responsivo + enrutador de escenas
├── main.tsx                   # Punto de entrada React
├── index.css                  # Estilos globales + Tailwind directives
├── vite-env.d.ts
├── tipos/
│   └── juego.ts               # Interfaces y types del dominio del juego
├── servicios/
│   └── apiJuego.ts            # Cliente HTTP para endpoints del backend
├── store/
│   └── useJuegoStore.ts       # Store Zustand — estado global del juego
├── componentes/
│   └── HeaderJuego.tsx        # Barra superior (nombre zona + barra equilibrio)
└── escenas/
    ├── EscenaInicio.tsx       # Formulario de nombre de usuario
    ├── EscenaHistoria.tsx     # Diálogo introductorio de Noh Ek
    ├── EscenaMapa.tsx         # Selección de nivel
    ├── EscenaActividad.tsx    # Situaciones psicoeducativas interactivas
    └── EscenaResultados.tsx   # Resumen de métricas y reinicio
```

---

## 7. Flujo del Juego (MVP)

```
[Inicio] → [Historia] → [Mapa] → [Actividad (Nivel 1)] → [Resultados]
   │                                                    │
   └──────────────────── Reiniciar ─────────────────────┘
```

### Escenas

1. **EscenaInicio** — El jugador ingresa su nombre y se registra en el backend.
2. **EscenaHistoria** — Noh Ek presenta la narrativa y la misión del Valle de la Ansiedad.
3. **EscenaMapa** — Selección del nivel (Nivel 1: El Valle de la Ansiedad).
4. **EscenaActividad** — El jugador enfrenta situaciones que generan ansiedad y elige respuestas. Cada elección afecta el equilibrio emocional.
5. ** cristalObtenido + reinicio.**

---

## 8. Estado Global (Zustand)

El store `useJuegoStore` gestiona:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `idJugador` | `string \| null` | ID devuelto por el backend al registrar |
| `nombreUsuario` | `string` | Nombre ingresado por el jugador |
| `escenaActual` | `EscenaActual` | Escena visible actualmente |
| `progreso` | `ProgresoNivel` | Métricas de avance del nivel actual |

### Acciones del Store

- `setJugador(id, nombre)` — Registra el jugador tras el POST al backend.
- `cambiarEscena(escena)` — Navega a la escena indicada.
- `actualizarEquilibrio(delta)` — Ajusta el equilibrio emocional (+/-).
- `registrarRespuesta(correcta, saludable)` — Incrementa contadores de progreso.
- `finalizarNivel(tiempo)` — Marca nivel completado y guarda tiempo.
- `reiniciarJuego()` — Resetea todo el estado a valores iniciales.

---

## 9. Endpoints del Backend (NestJS)

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/jugadores` | Registra un nuevo jugador |
| POST | `/api/respuestasJugador` | Guarda una respuesta del jugador |
| POST | `/api/juego/finalizar` | Finaliza un nivel |
| GET | `/api/metricas/resumen/:idJugador` | Obtiene métricas del jugador |

---

## 10. Diseño Responsivo

El contenedor principal se ajusta con max-widths progresivos:

| Breakpoint | Clase Tailwind | Max-width |
|-----------|---------------|-----------|
| Mobile (default) | — | `max-w-[430px]` |
| Tablet | `tablet:` | `max-w-[720px]` |
| Laptop | `laptop:` | `max-w-[1140px]` |
| Desktop | `desktop:` | `max-w-[1200px]` |
