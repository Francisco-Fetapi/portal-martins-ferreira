import { Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import PostArea from "../PostArea";

export default function FormPostEdit() {
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
      photo: "",
    },
  });
  return (
    <div>
      <Stack style={{ flexDirection: "column" }}>
        <TextInput
          label="Titulo"
          placeholder="Titulo da noticia"
          required
          {...form.getInputProps("title")}
          // width="100%"
        />
        <PostArea buttonText="Concluido" />
      </Stack>
    </div>
  );
}
