import { IUser } from "../interfaces/IUser";

const message = {
  required: "Este campo não pode estar vazio",
};

export default function useValidateFunctions() {
  return {
    username($value: string) {
      const value = $value.trim();
      if (value.length < 10) return "Nome demasiado curto.";
      if (value.split(" ").length > 3)
        return "Insira apenas o primeiro e último nome.";
    },
    password1(value: string) {
      if (value.length < 6) return "Senha demasiado curta.";
    },
    password2(value: string, values: IUser | string) {
      const message = "Senha e confirmar senha não batem.";
      if (typeof values === "string") {
        if (value !== values) {
          return message;
        }
      } else {
        if (value !== values.password1) {
          return message;
        }
      }
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
    code(value: string) {
      if (value === "123") return;
      return "Codigo inválido";
    },
    phoneNumber(value: string) {
      if (!/^9\d{8}$/.test(value)) {
        return "Número de telefone inválido.";
      }
    },
    myClass(value: string) {
      if (!value) return message.required;
    },
  };
}
