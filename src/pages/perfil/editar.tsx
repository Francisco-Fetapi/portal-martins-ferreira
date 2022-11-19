import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import AppScheme from "../../components/AppScheme";
import FormProfileEdit from "../../components/forms/FormProfileEdit";
import { redirectIfNoUser } from "../../helpers/redirectIfNoUser";
import { IUserLogged } from "../../interfaces/IUser";

interface PageProps {
  user: IUserLogged;
}

export default function ProfileEdit() {
  const router = useRouter();
  const postId = router.query.id;
  return (
    <AppScheme>
      <h1>Editar Perfil</h1>

      <Box
        sx={{
          maxWidth: 550,
        }}
      >
        <FormProfileEdit />
      </Box>
    </AppScheme>
  );
}

export const getServerSideProps = redirectIfNoUser;
