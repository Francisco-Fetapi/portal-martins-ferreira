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
import { useSelector } from "react-redux";
import useValidateFunctions from "../../hooks/useValidateFunctions";
import { selectSignupData } from "../../store/App.selectors";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { strapi } from "../../api/strapi";
import { useRef, useEffect } from "react";
import { sleep } from "../../helpers/sleep";

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

export interface IConfirmationEmail {
  status: "success";
  code: string;
}

export function ConfirmEmailForm() {
  const { classes } = useStyles();
  const validate = useValidateFunctions();
  const [loading, setLoading] = useState(false);
  const codeConfirmation = useRef<string | null>(null);

  const formSigninData = useSelector(selectSignupData);
  const form = useForm({
    initialValues: {
      code: "",
    },
  });
  const router = useRouter();
  const haveNotEmail = !formSigninData.email;

  async function sendCodeConfirmation() {
    const { data } = await strapi.post<IConfirmationEmail>("/confirm-email", {
      email: formSigninData.email,
    });

    codeConfirmation.current = data.code || "12345";
    console.log("code", codeConfirmation.current);
    return data;
  }

  useEffect(() => {
    sendCodeConfirmation();
  }, []);

  async function resendCode() {
    await sendCodeConfirmation();
    showNotification({
      title: "Código reenvido",
      message:
        "O código de confirmação foi reenviado para o seu email, confirme-o.",
      color: "blue",
    });
  }

  async function handleSubmit(values: typeof form.values) {
    console.log(values);
    console.log(formSigninData);
    setLoading(true);
    await sleep(1.5);
    setLoading(false);
    if (values.code !== codeConfirmation.current) {
      form.setFieldError("code", "Codigo inválido");
    } else {
      showNotification({
        title: "Código validado",
        message: "O código foi validado com sucesso!",
        color: "green",
      });
      await sleep(1.5);
      if (formSigninData.isStudent) {
        router.push("/criar-conta/informacoes-adicionais");
      } else {
        router.replace("/criar-conta/foto-de-perfil");
      }
    }
  }

  return (
    <Container my={30}>
      <Title className={classes.title} align="center">
        Confirmação do Email
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Acabamos de enviar um código de confirmação para o seu email, insira-o
        na caixa de texto abaixo para confirmá-lo.
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
          {...form.getInputProps("code")}
          label="Código de confirmação"
          placeholder="xxx-xxx"
          required
          disabled={haveNotEmail}
        />
        <Group position="apart" mt="lg" className={classes.controls}>
          <Link href="/criar-conta">
            <Anchor<"a"> color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>Criar conta</Box>
              </Center>
            </Anchor>
          </Link>
          <Button
            disabled={haveNotEmail}
            loading={loading}
            type="submit"
            className={classes.control}
          >
            Confirmar email
          </Button>
        </Group>
      </Paper>

      {!haveNotEmail ? (
        <>
          <Text mt={10} color="yellow" size="sm">
            Procure o email na <b>Caixa de Spam</b> caso não o encontre na caixa
            principal.
          </Text>
          <Center mt={15}>
            <Anchor size="sm" onClick={resendCode}>
              Não recebi código nenhum, mesmo na caixa de spam
            </Anchor>
          </Center>
        </>
      ) : (
        <Text mt={10} color="yellow" size="sm">
          Preencha o formulário base antes de confirmar o email. Clique em{" "}
          <Link href="/criar-conta">
            <Anchor<"a">>Criar conta.</Anchor>
          </Link>
        </Text>
      )}
    </Container>
  );
}
