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
import useValidateFunctions from "../../hooks/useValidateFunctions";
import { selectSignupData } from "../../store/App.selectors";
import { setSignUpData } from "../../store/App.store";

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

  const formSigninData = useSelector(selectSignupData);
  const form = useForm({
    initialValues: {
      code: "",
    },
    validate: {
      code(value) {
        return validate.code(value);
      },
    },
  });
  const router = useRouter();
  function handleSubmit(values: typeof form.values) {
    console.log(values);
    console.log(formSigninData);
    if (formSigninData.isStudent) {
      router.push("/criar-conta/informacoes-adicionais");
    } else {
      router.push("/criar-conta/foto-de-perfil");
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
          <Button type="submit" className={classes.control}>
            Confirmar email
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
