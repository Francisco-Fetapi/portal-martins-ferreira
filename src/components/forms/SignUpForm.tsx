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
} from "@mantine/core";

export function SignUpForm() {
  return (
    <Box>
      <FormHeader />
      <Paper
        component="form"
        autoComplete="off"
        autoSave="off"
        autoCorrect="off"
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
      >
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput label="Senha" placeholder="Sua senha" mt="md" required />
        <Group position="apart" mt="md">
          <Checkbox label="Sou um aluno" />
          <Anchor<"a"> href="/esqueci-minha-senha" size="sm">
            Esqueceste sua senha?
          </Anchor>
        </Group>
        <Center>
          <Button mt="xl">Criar conta</Button>
        </Center>
      </Paper>
    </Box>
  );
}

function FormHeader() {
  return (
    <>
      <Title
        align="center"
        sx={() => ({
          fontWeight: 900,
        })}
      >
        Bem-vindo de volta
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
    </>
  );
}
