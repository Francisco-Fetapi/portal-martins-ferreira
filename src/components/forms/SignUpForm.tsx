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
import useValidateFunctions from "../../hooks/useValidateFunctions";

export function SignUpForm() {
  const validate = useValidateFunctions();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password1: "",
      password2: "",
      birthday: "",
      isStudent: false,
    },
    validate: {
      name($value) {
        return validate.name($value);
      },
      password1(value) {
        return validate.password1(value);
      },
      password2(value, values) {
        if (value !== values.password1)
          return "Senha e confirmar senha não batem.";
      },
      birthday(value) {
        const date = new Date(value);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - date.getFullYear();
        console.log(age);
        if (age < 14) {
          return "Deves ter uma idade superior à 13 anos para aderir ao sistema.";
        }
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
        // onSubmit={handleSubmit}
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
            type="email"
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
          <Group position="apart">
            <Checkbox
              label="Sou um aluno"
              {...form.getInputProps("isStudent")}
            />
            <Anchor<"a"> href="/esqueci-minha-senha" size="sm">
              Esqueceste sua senha?
            </Anchor>
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
        Bem-vindo
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Você já tem uma conta?{" "}
        <Anchor<"a">
          href="/iniciar-sessao"
          size="sm"
          // onClick={(event) => event.preventDefault()}
        >
          Iniciar sessão
        </Anchor>
      </Text>
    </Box>
  );
}
