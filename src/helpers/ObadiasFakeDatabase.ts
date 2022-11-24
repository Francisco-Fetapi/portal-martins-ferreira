export type ICourses =
  | "Ensino Primário"
  | "Primeiro Ciclo"
  | "Informática de Gestão"
  | "Enfermagem Geral"
  | "Estomatologia";

export type IGlades = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export const courses: ICourses[] = [
  "Informática de Gestão",
  "Enfermagem Geral",
  "Estomatologia",
];
const allGlades: IGlades[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

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
