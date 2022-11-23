import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { strapi } from "../../api/strapi";
import useValidateFunctions from "../../hooks/useValidateFunctions";
import { IUserLogged } from "../../interfaces/IUser";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

export function ForgotMyPasswordForm() {
  const { classes } = useStyles();
  const validate = useValidateFunctions();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email(value) {
        return validate.email(value);
      },
    },
  });

  const router = useRouter();
  async function handleSubmit(values: typeof form.values) {
    console.log(values);
    // ir para redefinir senha
    setLoading(true);
    try {
      let { data: user } = await strapi.get<[IUserLogged[], number]>(
        "/validation/email",
        {
          params: {
            email: values.email,
          },
        }
      );

      if (user[1] < 1) {
        form.setFieldError(
          "email",
          "Não existe nenhum usuário com este email cadastrado."
        );
      } else {
        const userId = user[0][0].id;
        console.log("Tudo ok", userId);
        router.push(`/alterar-senha?email=${values.email}&id=${userId}`);
      }
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container my={30}>
      <Title className={classes.title} align="center">
        Esqueceu sua senha?
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Insira o seu email e receba um código de confirmação para inserir uma
        nova senha.
      </Text>

      <Paper
        component="form"
        autoComplete="off"
        onSubmit={form.onSubmit(handleSubmit)}
        withBorder
        shadow="md"
        p={30}
        radius="md"
        mt="xl"
      >
        <TextInput
          {...form.getInputProps("email")}
          label="Seu email"
          placeholder="meu@email.com"
          required
        />
        <Group position="apart" mt="lg" className={classes.controls}>
          <Link href="/iniciar-sessao">
            <Anchor<"a"> color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>Iniciar sessão</Box>
              </Center>
            </Anchor>
          </Link>
          <Button loading={loading} type="submit" className={classes.control}>
            Redefinir senha
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
