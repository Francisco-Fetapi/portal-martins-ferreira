export default function useValidateFunctions() {
  return {
    name($value: string) {
      const value = $value.trim();
      if (value.length < 10) return "Nome demasiado curto.";
      if (value.split(" ").length > 2)
        return "Insira apenas o primeiro e último nome.";
    },
    password1(value: string) {
      if (value.length < 6) return "Senha demasiado curta.";
    },
  };
}
