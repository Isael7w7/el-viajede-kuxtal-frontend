import kuxtalIdle from './P001_Kuxtal_idle.png';
import kuxtalHappy from './P002_kuxtal_happy.png';
import kuxtalThinking from './P003_kuxtal_thinking.png';
import kuxtalSorprendido from './P004_kuxtal_sorprendido.png';
import kuxtalPreocupado from './P005_kuxtal_preocupado.png';

import ixchelNeutral from './P006_Ixchel_Neutral.png';
import ixchelExplicando from './P007_Ixchel_Explicando.png';
import ixchelSonriendo from './P008_Ixchel_Sonriendo.png';

import nohEkAnsioso from './P009_Noh_Ek_Ansioso.png';
import nohEkNeutral from './P010_Noh_Ek_Neutral.png';
import nohEkSereno from './P011_Noh_Ek_Sereno.png';

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
