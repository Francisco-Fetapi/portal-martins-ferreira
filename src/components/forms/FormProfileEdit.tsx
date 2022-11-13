import {
  Box,
  Button,
  Center,
  Checkbox,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useSelector } from "react-redux";
import { IGenre } from "../../interfaces/IUser";
import { selectUserData } from "../../store/App.selectors";
import { InputGenre } from "../InputGenre";

const genres = [
  { value: "m", label: "Masculino" },
  { value: "f", label: "Feminino" },
];

export default function FormProfileEdit() {
  const userLogged = useSelector(selectUserData);
  const form = useForm({
    initialValues: {
      name: userLogged.name || "",
      birthday: userLogged.birthday || "",
      isStudent: userLogged.isStudent || false,
      genre: userLogged.genre || ("m" as IGenre),
      myClass: userLogged.myClass || "",
      myCourse: userLogged.myCourse || "",
      myGlade: userLogged.myGlade || 10,
      phoneNumber: userLogged.phoneNumber || "",
    },
  });
  return (
    <div>
      <Stack style={{ flexDirection: "column" }}>
        <Stack style={{ flexDirection: "column" }}>
          <TextInput
            label="Nome"
            placeholder="Nome e sobrenome"
            required
            {...form.getInputProps("name")}
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
                  data={genres}
                  {...form.getInputProps("myCourse")}
                  placeholder="Escolha um curso"
                  label="Selecione seu curso"
                  required
                />
              </Stack>
            </div>
          )}

          <Center>
            <Button type="submit">Concluido</Button>
          </Center>
        </Stack>
      </Stack>
    </div>
  );
}
