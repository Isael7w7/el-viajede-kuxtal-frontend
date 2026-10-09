import kuxtalIdle from './P001_Kuxtal_idle.png';
import kuxtalHappy from './P002_kuxtal_happy-sinfondo.png';
import kuxtalThinking from './P003_kuxtal_thinking-sinfondo.png';
import kuxtalSorprendido from './P004_kuxtal_sorprendido-sinfondo.png';
import kuxtalPreocupado from './P005_kuxtal_preocupado-sinfondo.png';

import ixchelNeutral from './P006_Ixchel_Neutral.png';
import ixchelExplicando from './P007_Ixchel_Explicando-sinfondo.png';
import ixchelSonriendo from './P008_Ixchel_Sonriendo-sinfondo.png';

import nohEkAnsioso from './P009_Noh_Ek_Ansioso-sinfondo.png';
import nohEkNeutral from './P010_Noh_Ek_Neutral-sinfondo.png';
import nohEkSereno from './P011_Noh_Ek_Sereno-sinfondo.png';

export const PERSONAJES_ASSETS = {
  kuxtal: {
    idle: kuxtalIdle,
    happy: kuxtalHappy,
    thinking: kuxtalThinking,
    sorprendido: kuxtalSorprendido,
    preocupado: kuxtalPreocupado,
  },
  ixchel: {
    neutral: ixchelNeutral,
    explicando: ixchelExplicando,
    sonriendo: ixchelSonriendo,
  },
  nohEk: {
    ansioso: nohEkAnsioso,
    neutral: nohEkNeutral,
    sereno: nohEkSereno,
  },
} as const;

export type PersonajeId = keyof typeof PERSONAJES_ASSETS;
export type Expresion<K extends PersonajeId> = keyof (typeof PERSONAJES_ASSETS)[K];

export function obtenerSpritePersonaje(personaje: string, expresion: string): string {
  const grupo = PERSONAJES_ASSETS[personaje as PersonajeId];
  if (!grupo) return PERSONAJES_ASSETS.kuxtal.idle;
  const sprite = (grupo as Record<string, string>)[expresion];
  return sprite ?? Object.values(grupo)[0];
}
