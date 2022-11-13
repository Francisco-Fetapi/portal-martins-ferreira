import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import AppScheme from "../../../components/AppScheme";
import FormPostEdit from "../../../components/forms/FormPostEdit";

export default function Noticia() {
  const router = useRouter();
  const postId = router.query.id;
  return (
    <AppScheme>
      <h1>Editar Noticia</h1>

      <Box
        sx={{
          maxWidth: 550,
        }}
      >
        <FormPostEdit />
      </Box>
    </AppScheme>
  );
}
