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

export function ChangePasswordForm() {
  const validate = useValidateFunctions();
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
      code(code) {
        return validate.code(code);
      },
    },
  });
  const router = useRouter();
  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
    // router.push("/");
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
            REDEFINIR SENHA
          </Title>

          <TextInput
            type={"text"}
            label="Código de confirmação"
            // placeholder="Código enviado para os "
            about="Ola Mundo"
            required
            {...form.getInputProps("code")}
          />
          <PasswordInput
            label="Senha"
            placeholder="6 digitos no minimo"
            required
            {...form.getInputProps("password1")}
          />
          <PasswordInput
            label="Confirmar senha"
            placeholder="Deve ser igual ao campo anterior"
            required
            {...form.getInputProps("password2")}
          />
          <Center>
            <Button type="submit">Concluido</Button>
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
