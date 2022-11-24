import { Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import PostArea from "../PostArea";
import { useState } from "react";

export default function FormPostEdit() {
  const form = useForm({
    initialValues: {
      content: "",
    },
  });
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit() {}

  return (
    <div>
      <Stack style={{ flexDirection: "column" }}>
        <PostArea
          buttonText="Concluido"
          file={file}
          setFile={setFile}
          handleSubmit={handleSubmit}
          form={form}
          isLoading={loading}
        />
      </Stack>
    </div>
  );
}
