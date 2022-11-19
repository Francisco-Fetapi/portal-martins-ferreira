import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
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
import { strapi } from "../../api/strapi";
import { ApiLogin } from "../../api/interfaces";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";

export function SignInForm() {
  const validate = useValidateFunctions();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password1: "",
    },
    validate: {
      password1(value) {
        return validate.password1(value);
      },
      email(value) {
        return validate.email(value);
      },
    },
  });
  const router = useRouter();
  const handleSubmit = async (values: typeof form.values) => {
    console.log(values);

    setLoading(true);
    try {
      let { data } = await strapi.post<ApiLogin>("/auth/local", {
        identifier: values.email,
        password: values.password1,
      });
      console.log(data.user);
      router.push("/");
    } catch (e: any) {
      showNotification({
        title: "Erro ao iniciar sessão",
        message:
          "Houve um erro ao tentar iniciar sessão, certifique-se de estar informando os dados corretos.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack my={50}>
      <FormHeader title="Bem-vindo de Volta!">
        Ainda não tens uma conta?{" "}
        <Link href="/criar-conta">
          <Anchor<"a"> size="sm">Criar conta</Anchor>
        </Link>
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
            INICIAR SESSÃO
          </Title>

          <TextInput
            label="Email"
            placeholder="seu@email.com"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Senha"
            placeholder="6 digitos no minimo"
            required
            {...form.getInputProps("password1")}
          />
          <Group position="apart">
            <Link href="/esqueci-minha-senha">
              <Anchor<"a"> size="sm">Esqueceste sua senha?</Anchor>
            </Link>
          </Group>
          <Center>
            <Button loading={loading} type="submit">
              Iniciar sessão
            </Button>
          </Center>
        </Stack>
      </Paper>
    </Stack>
  );
}
