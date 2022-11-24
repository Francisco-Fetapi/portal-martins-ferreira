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
import { courses, glades } from "../../helpers/ObadiasFakeDatabase";
import useUser from "../../hooks/useUser";
import { IGenre, IUserLogged } from "../../interfaces/IUser";

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

      let { data: user1 } = await strapi.get<[IUserLogged[], number]>(
        "/validation/username",
        {
          params: {
            username: values.username,
          },
        }
      );
      let { data: user2 } = await strapi.get<[IUserLogged[], number]>(
        "/validation/phonenumber",
        {
          params: {
            phoneNumber: values.phoneNumber,
          },
        }
      );

      console.log("user1", user1);
      console.log("user2", user2);

      const usernameExists = user1[0].some((currentUser) => {
        return (
          currentUser.id !== user.id &&
          form.values.username === currentUser.username
        );
      });
      const phoneNumberExists = user2[0].some((currentUser) => {
        return (
          currentUser.id !== user.id &&
          form.values.phoneNumber == currentUser.phoneNumber
        );
      });

      if (usernameExists) {
        form.setFieldError("username", "Este nome de usuario já existe.");
      }

      if (phoneNumberExists) {
        form.setFieldError("phoneNumber", "Este número de telefone já existe.");
      }

      if (!usernameExists && !phoneNumberExists) {
        let res = await strapi.put(`/users/${user.id}`, values);
        console.log(res.data);
        showNotification({
          title: "Perfil Editado",
          message: "Perfil editado com sucesso.",
          color: "green",
        });
        setTimeout(() => {
          router.push("/perfil");
        }, 2000);
      }
    } catch (e: any) {
      showNotification({
        title: "Perfil Editar - Erro",
        message:
          "Houve um erro ao tentar editar o seu perfil. Certifique-se de que o NOME e o NÚMERO DE TELEFONE devem ser únicos.",
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
                  data={courses}
                  {...form.getInputProps("myCourse")}
                  placeholder="Escolha um curso"
                  label="Selecione seu curso"
                  required
                />
                <Select
                  data={glades}
                  {...form.getInputProps("myGlade")}
                  placeholder="Escolha sua classe"
                  label="Selecione sua classe"
                  required
                />
              </Stack>
            </div>
          )}

          <Center mt={15}>
            <Button onClick={() => handleSubmit(form.values)} loading={loading}>
              Concluido
            </Button>
          </Center>
        </Stack>
      </Stack>
    </div>
  );
}
