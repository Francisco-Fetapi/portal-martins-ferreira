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

export function SignInForm() {
  const validate = useValidateFunctions();
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
            <Button type="submit">Iniciar sessão</Button>
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
        Bem-vindo de Volta!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Ainda não tens uma conta?{" "}
        <Link href="/criar-conta">
          <Anchor<"a"> size="sm">Criar conta</Anchor>
        </Link>
      </Text>
    </Box>
  );
}
