import { IUser } from "../interfaces/IUser";

const message = {
  required: "Este campo não pode estar vazio",
};

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
    password2(value: string, values: IUser) {
      if (value !== values.password1)
        return "Senha e confirmar senha não batem.";
    },
    birthday(value: string) {
      const date = new Date(value);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - date.getFullYear();
      if (age < 14) {
        return "Deves ter uma idade superior à 13 anos para aderir ao sistema.";
      }
    },
    email(value: string) {
      if (!value) return message.required;
      if (!value.includes("@")) {
        return "Email inválido";
      }
    },
  };
}
