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

type FuncFormSubmit = React.FormEventHandler<HTMLFormElement> | undefined;

export function SignUpForm() {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password1: "",
      password2: "",
      birthday: "",
      isStudent: false,
    },
  });

  const handleSubmit: FuncFormSubmit = (e) => {
    e.preventDefault();

    console.log(form.values);
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
        onSubmit={handleSubmit}
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
            placeholder="Sua senha"
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
