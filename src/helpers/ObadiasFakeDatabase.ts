export type ICourses =
  | "Ensino Primário"
  | "Primeiro Ciclo"
  | "Gestão de Sistemas Informáticos"
  | "Contabilidade e Gestão"
  | "Energias e Instalações Electricas"
  | "Gestão Empresarial"
  | "Electromecânica";

export type IGlades = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export const courses: ICourses[] = [
  "Gestão de Sistemas Informáticos",
  "Contabilidade e Gestão",
  "Energias e Instalações Electricas",
  "Gestão Empresarial",
  "Electromecânica",
];
const allGlades: IGlades[] = [10, 11, 12, 13];

export const classes = ["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
  (classRoom) => `Turma ${classRoom}`
);

export const glades = allGlades.map((item) => ({
  value: item,
  label: item ? `${item}ª classe` : "Pré classe",
}));

export function thisGladeHaveACourse(glade: IGlades) {
  return glade >= 10;
}

export function getAlternativeCourse(glade: IGlades): ICourses {
  return glade <= 6 ? "Ensino Primário" : "Primeiro Ciclo";
}
