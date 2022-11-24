export const courses = [
  "Ensino Primário",
  "Primeiro Ciclo",
  "Informática de Gestão",
  "Enfermagem Geral",
  "Estomatologia",
];

export const glades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(
  (item) => ({
    value: item,
    label: item ? `${item}ª classe` : "Pré classe",
  })
);
