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
} from "@mantine/core";

import { useForm } from "@mantine/form";
import Link from "next/link";
import useValidateFunctions from "../../hooks/useValidateFunctions";
import { IUser } from "../../interfaces/IUser";
import { InputGenre } from "../InputGenre";

export function SignUpForm() {
  const validate = useValidateFunctions();
  const form = useForm<IUser>({
    initialValues: {
      name: "",
      email: "",
      password1: "",
      password2: "",
      birthday: "",
      isStudent: false,
      genre: "m",
    },
    validate: {
      name($value) {
        return validate.name($value);
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

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
  };

  return (
    <Stack my={50}>
      <FormHeader />
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
            {...form.getInputProps("name")}
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
          <Stack
            align="center"
            sx={{
              flexDirection: "column",
              // flexDirection: "row",
              // justifyContent: "space-between",
            }}
          >
            <Text variant="text" size="md">
              Gênero
            </Text>
            <Box mt={-10} sx={{ zoom: 0.85 }}>
              <InputGenre
                genre={form.values.genre}
                setGenre={(value) => form.setFieldValue("genre", value)}
              />
            </Box>
          </Stack>
          <Group position="apart">
            <Checkbox
              label={
                <p>
                  Sou um(a) aluno(a) do <b>Obadias Malaquias</b>
                </p>
              }
              {...form.getInputProps("isStudent")}
            />
            {/* <Link href="/esqueci-minha-senha">
              <Anchor<"a"> size="sm">Esqueceste sua senha?</Anchor>
            </Link> */}
          </Group>
          <Center>
            <Button type="submit">Criar conta</Button>
          </Center>
        </Stack>
      </Paper>
    </Stack>
  );
}

function FormHeader() {
  return (
    <Box>
      <Title
        align="center"
        sx={() => ({
          fontWeight: 900,
        })}
      >
        Seja Bem-vindo!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Você já tem uma conta?{" "}
        <Link href="/iniciar-sessao">
          <Anchor<"a"> size="sm">Iniciar sessão</Anchor>
        </Link>
      </Text>
    </Box>
  );
}
