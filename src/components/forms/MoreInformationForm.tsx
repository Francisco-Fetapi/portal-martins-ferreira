import {
  TextInput,
  Paper,
  Title,
  Text,
  Button,
  Box,
  Center,
  Stack,
  Select,
  Anchor,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { strapi } from "../../api/strapi";
import useValidateFunctions from "../../hooks/useValidateFunctions";
import { selectSignupData } from "../../store/App.selectors";
import { IUserFormSigninData, setSignUpData } from "../../store/App.store";
import FormHeader from "../FormHeader";
import { useState, useEffect } from "react";
import { showNotification } from "@mantine/notifications";
import Link from "next/link";
import {
  courses,
  getAlternativeCourse,
  glades,
  ICourses,
  IGlades,
  thisGladeHaveACourse,
} from "../../helpers/ObadiasFakeDatabase";

export function MoreInformationForm() {
  const validate = useValidateFunctions();
  const formSigninData = useSelector(selectSignupData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const noEmail = !formSigninData.email;
  const form = useForm({
    initialValues: {
      myClass: "",
      myCourse: "" as ICourses,
      myGlade: 0 as IGlades,
      phoneNumber: "",
    },
    validate: {
      phoneNumber(value) {
        return validate.phoneNumber(value);
      },
      myClass(value) {
        return validate.myClass(value);
      },
    },
  });
  const myGladeHasACourse = thisGladeHaveACourse(form.values.myGlade);

  useEffect(() => {
    if (!myGladeHasACourse) {
      form.setFieldValue("myCourse", getAlternativeCourse(form.values.myGlade));
    }
  }, [form.values.myGlade, form.values.myClass]);

  const handleSubmit = async (values: typeof form.values) => {
    if (noEmail) {
      return;
    }
    console.log(values);

    return;
    setLoading(true);
    let res = await strapi.get("/validation/phonenumber", {
      params: {
        phoneNumber: values.phoneNumber,
      },
    });
    setLoading(false);
    console.log(res.data);
    if (res.data[1]) {
      form.setFieldError("phoneNumber", "Este número de telefone já existe.");
    } else {
      showNotification({
        title: "Campos validados",
        message: "O formulário foi validado com sucesso!",
        color: "green",
      });
      setTimeout(() => {
        dispatch(
          setSignUpData({
            ...formSigninData,
            ...values,
          } as IUserFormSigninData)
        );
        router.push("/criar-conta/foto-de-perfil");
      }, 2000);
    }
  };

  return (
    <Stack my={50}>
      <FormHeader title="Mais Sobre Você">
        Adicione mais detalhes sobre o seu perfil para uma melhor experiência.
      </FormHeader>
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
            INFORMAÇÕES ADICIONAIS
          </Title>
          <TextInput
            type="number"
            label="Número de telefone"
            placeholder="+244 9xx-xxx-xxx"
            required
            {...form.getInputProps("phoneNumber")}
            disabled={noEmail}
          />
          <TextInput
            label="Minha turma/sala"
            placeholder="Turma 1, sala B...."
            {...form.getInputProps("myClass")}
            required
            disabled={noEmail}
          />

          <Select
            data={glades}
            {...form.getInputProps("myGlade")}
            placeholder="Escolha sua classe"
            label="Selecione sua classe"
            required
            disabled={noEmail}
          />

          {myGladeHasACourse && (
            <Select
              data={courses}
              {...form.getInputProps("myCourse")}
              placeholder="Escolha um curso"
              label="Selecione seu curso"
              required
              disabled={noEmail}
            />
          )}

          <Center>
            <Button disabled={noEmail} loading={loading} type="submit">
              Concluir
            </Button>
          </Center>
        </Stack>
      </Paper>

      {noEmail && (
        <Text mt={10} color="yellow" size="sm">
          Preencha o formulário base antes de inserir mais informações.{" "}
          <Link href="/criar-conta">
            <Anchor<"a">>Criar conta.</Anchor>
          </Link>
        </Text>
      )}
    </Stack>
  );
}
