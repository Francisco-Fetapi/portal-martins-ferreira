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
import { useDispatch } from "react-redux";
import { ApiIsEmailVerified } from "../../api/interfaces";
import { serverless } from "../../api/serverless";
import useValidateFunctions from "../../hooks/useValidateFunctions";
import { selectSignupData } from "../../store/App.selectors";
import { setSignUpData } from "../../store/App.store";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";

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

export function ConfirmEmailForm() {
  const { classes } = useStyles();
  const validate = useValidateFunctions();
  const [loading, setLoading] = useState(false);

  const formSigninData = useSelector(selectSignupData);
  const form = useForm({
    initialValues: {
      code: "",
    },
  });
  const router = useRouter();
  async function handleSubmit(values: typeof form.values) {
    console.log(values);
    console.log(formSigninData);
    setLoading(true);
    const res = await serverless.get<ApiIsEmailVerified>("/isemailverified", {
      params: {
        confirmationCode: values.code,
      },
    });
    setLoading(false);
    if (res.data.status === "error") {
      form.setFieldError("code", "Codigo inválido");
    } else {
      showNotification({
        title: "Código validado",
        message: "O código foi validado com sucesso!",
        color: "green",
      });
      setTimeout(() => {
        if (formSigninData.isStudent) {
          router.push("/criar-conta/informacoes-adicionais");
        } else {
          router.replace("/criar-conta/foto-de-perfil");
        }
      }, 2000);
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
          <Button loading={loading} type="submit" className={classes.control}>
            Confirmar email
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
