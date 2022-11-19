import {
  Button,
  Center,
  Checkbox,
  Group,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { strapi } from "../../api/strapi";
import useUser from "../../hooks/useUser";
import { IGenre } from "../../interfaces/IUser";
import { courses } from "./MoreInformationForm";

export const genres = [
  { value: "m", label: "Masculino" },
  { value: "f", label: "Feminino" },
];

export default function FormProfileEdit() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      username: user.username || "",
      birthday: user.birthday || "",
      isStudent: user.isStudent,
      genre: user.genre || ("m" as IGenre),
      myClass: user.myClass || "",
      myCourse: user.myCourse || "",
      myGlade: user.myGlade || 10,
      phoneNumber: user.phoneNumber || "",
    },
  });
  const router = useRouter();

  async function handleSubmit(values: typeof form.values) {
    try {
      setLoading(true);
      await strapi.put(`/users/${user.id}`, values);
      showNotification({
        title: "Perfil Editado",
        message: "Perfil editado com sucesso.",
        color: "green",
      });
      setTimeout(() => {
        router.push("/perfil");
      }, 2000);
    } catch (e: any) {
      showNotification({
        title: "Perfil Editar - Erro",
        message:
          "Houve um erro ao tentar editar o seu perfil. Tente novamente mais tarde.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Stack style={{ flexDirection: "column" }}>
        <Stack style={{ flexDirection: "column" }}>
          <form autoComplete="off" onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Nome"
              placeholder="Nome e sobrenome"
              required
              {...form.getInputProps("username")}
              // width="100%"
            />
            <TextInput
              type="date"
              label="Data de nascimento"
              placeholder="DD/MM/AAAA"
              required
              {...form.getInputProps("birthday")}
            />
            <Select
              style={{ zIndex: 2 }}
              data={genres}
              {...form.getInputProps("genre")}
              // placeholder=""
              label="Selecione seu genero"
              required
            />
            <Group position="apart">
              <Checkbox
                label={
                  <p>
                    Sou um(a) aluno(a) do <b>Obadias Malaquias</b>
                  </p>
                }
                checked={form.values.isStudent}
                {...form.getInputProps("isStudent")}
              />
            </Group>
            {form.values.isStudent && (
              <div>
                <h3>Informações Adicionais</h3>
                <Stack style={{ flexDirection: "column" }}>
                  <TextInput
                    type="number"
                    label="Número de telefone"
                    placeholder="+244 9xx-xxx-xxx"
                    required
                    {...form.getInputProps("phoneNumber")}
                  />
                  <TextInput
                    label="Minha turma/sala"
                    placeholder="Turma 1, sala B...."
                    {...form.getInputProps("myClass")}
                    required
                  />
                  <Select
                    style={{ zIndex: 2 }}
                    data={courses}
                    {...form.getInputProps("myCourse")}
                    placeholder="Escolha um curso"
                    label="Selecione seu curso"
                    required
                  />
                </Stack>
              </div>
            )}

            <Center mt={15}>
              <Button loading={loading} type="submit">
                Concluido
              </Button>
            </Center>
          </form>
        </Stack>
      </Stack>
    </div>
  );
}
