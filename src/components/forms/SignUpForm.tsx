import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Group,
  Button,
  Box,
  Center,
  Stack,
  Select,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { strapi } from "../../api/strapi";
import useValidateFunctions from "../../hooks/useValidateFunctions";
import { IUser } from "../../interfaces/IUser";
import { setSignUpData } from "../../store/App.store";
import FormHeader from "../FormHeader";
import { genres } from "./FormProfileEdit";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";

export function SignUpForm() {
  const validate = useValidateFunctions();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const form = useForm<IUser>({
    initialValues: {
      username: "",
      email: "",
      password1: "",
      password2: "",
      birthday: "",
      isStudent: false,
      genre: "m",
    },
    validate: {
      username($value) {
        return validate.username($value);
      },
      password1(value) {
        return validate.password1(value);
      },
      password2(value, values) {
        return validate.password2(value, values);
      },
      birthday(value) {
        return validate.birthday(value);
      },
      email(value) {
        return validate.email(value);
      },
    },
  });
  const router = useRouter();

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    let { data: usernameExists } = await strapi.get("/validation/username", {
      params: {
        username: values.username,
      },
    });

    let { data: emailExists } = await strapi.get("/validation/email", {
      params: {
        email: values.email,
      },
    });

    if (usernameExists[1]) {
      form.setFieldError("username", "Este nome de usuario já existe.");
    }
    if (emailExists[1]) {
      form.setFieldError("email", "Este email já existe.");
    }
    setLoading(false);
    console.log("username", usernameExists);
    console.log("email", emailExists);

    showNotification({
      title: "Dados validados",
      message: "Todos os dados foram validados com sucesso!",
      color: "green",
    });

    if (!usernameExists[1] && !emailExists[1]) {
      dispatch(
        setSignUpData({
          ...values,
          password: values.password1,
        })
      );
      router.push("/confirmar-email");
    }
  };

  return (
    <Stack my={50}>
      <FormHeader title="Seja Bem-vindo!">
        Você já tem uma conta?{" "}
        <Link href="/iniciar-sessao">
          <Anchor<"a"> size="sm">Iniciar sessão</Anchor>
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
            CRIAR CONTA
          </Title>
          <TextInput
            label="Nome"
            placeholder="Nome e sobrenome"
            required
            {...form.getInputProps("username")}
            // width="100%"
          />
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
          <PasswordInput
            label="Confirmar senha"
            placeholder="Confirme sua senha"
            required
            {...form.getInputProps("password2")}
          />
          <TextInput
            type="date"
            label="Data de nascimento"
            placeholder="DD/MM/AAAA"
            required
            {...form.getInputProps("birthday")}
          />
          <Select
            style={{ zIndex: 2 }}
            data={genres}
            {...form.getInputProps("genre")}
            // placeholder=""
            label="Selecione seu genero"
            required
          />
          <Group position="apart">
            <Checkbox
              label={
                <p>
                  Sou aluno(a) do <b>Obadias Malaquias</b>
                </p>
              }
              {...form.getInputProps("isStudent")}
            />
            {/* <Link href="/esqueci-minha-senha">
              <Anchor<"a"> size="sm">Esqueceste sua senha?</Anchor>
            </Link> */}
          </Group>
          <Center>
            <Button loading={loading} type="submit">
              Criar conta
            </Button>
          </Center>
        </Stack>
      </Paper>
    </Stack>
  );
}
