import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Avatar,
  Title,
  Text,
  Group,
  Button,
  Box,
  Center,
  Stack,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import useValidateFunctions from "../../hooks/useValidateFunctions";
import Link from "next/link";
import { useRouter } from "next/router";
import FormHeader from "../FormHeader";
import { IUserLogged } from "../../interfaces/IUser";
import getPhoto from "../../helpers/getPhoto";
import { useState, useRef, useEffect } from "react";
import { strapi } from "../../api/strapi";
import { IConfirmationEmail } from "./ConfirmEmailForm";
import { showNotification } from "@mantine/notifications";
import { sleep } from "../../helpers/sleep";
import { NO_PHOTO } from "../../helpers/constants";

interface ChangePasswordFormProps {
  user: IUserLogged;
}

export function ChangePasswordForm({ user }: ChangePasswordFormProps) {
  const validate = useValidateFunctions();
  const codeConfirmation = useRef<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      code: "",
      password1: "",
      password2: "",
    },
    validate: {
      password1(value) {
        return validate.password1(value);
      },
      password2(password2, { password1 }) {
        return validate.password2(password2, password1);
      },
    },
  });

  const codeNotMatch = codeConfirmation.current !== form.values.code;

  async function sendCodeConfirmation() {
    const { email } = router.query;
    const { data } = await strapi.post<IConfirmationEmail>("/confirm-email", {
      email,
    });

    codeConfirmation.current = data.code;
    console.log("code", codeConfirmation.current);
  }

  useEffect(() => {
    sendCodeConfirmation();
  }, []);

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setLoading(true);
      const { id, email } = router.query;
      let res = await strapi.put("/users/" + id, {
        password: values.password1,
      });

      console.log("put", res.data);

      const { data: user } = await strapi.post("/auth/local", {
        identifier: email,
        password: values.password1,
      });

      console.log("user auth", user);
      showNotification({
        title: "Senha alterada",
        message: "A sua senha foi alterada com sucesso.",
        color: "green",
      });
      await sleep(2);
      router.push("/");
    } catch (e: any) {
      showNotification({
        title: "Erro ao alterar senha",
        message: "Houve um erro ao tentar altera a senha. Tente mais tarde",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack my={50}>
      <FormHeader title="Redefinição da Senha">
        <br />
        <Center>
          <Group spacing={8}>
            <Avatar
              src={getPhoto(user.photo!, "small") || NO_PHOTO}
              alt="Foto do usuario"
              sx={{
                width: 35,
                height: 35,
                borderRadius: "50%",
              }}
            />
            <Text>{user.username}</Text>
          </Group>
        </Center>
      </FormHeader>
      <Paper
        component="form"
        autoComplete="off"
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <Stack style={{ flexDirection: "column" }}>
          <Title
            align="center"
            sx={() => ({
              fontWeight: 600,
              fontSize: 25,
            })}
            mb="md"
          >
            ALTERAR SENHA
          </Title>

          <TextInput
            type={"text"}
            label="Código de confirmação"
            // placeholder="Código enviado para os "
            description="Insira o código que foi enviado para o seu email neste campo."
            required
            {...form.getInputProps("code")}
            disabled={!codeNotMatch}
          />
          <PasswordInput
            label="Nova Senha"
            placeholder="6 digitos no minimo"
            required
            {...form.getInputProps("password1")}
            disabled={codeNotMatch}
          />
          <PasswordInput
            label="Confirmar senha"
            placeholder="Deve ser igual ao campo anterior"
            required
            {...form.getInputProps("password2")}
            disabled={codeNotMatch}
          />
          <Center>
            <Button loading={loading} disabled={codeNotMatch} type="submit">
              Concluido
            </Button>
          </Center>
        </Stack>
      </Paper>
    </Stack>
  );
}
