import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import AppScheme from "../../../components/AppScheme";
import FormPostEdit from "../../../components/forms/FormPostEdit";
import UserProvider from "../../../context/UserProvider";
import { redirectIfNoUser } from "../../../helpers/redirectIfNoUser";
import { IUserLogged } from "../../../interfaces/IUser";

interface PageProps {
  user: IUserLogged;
}

export default function Noticia({ user }: PageProps) {
  const router = useRouter();
  const postId = router.query.id;
  return (
    <UserProvider user={user}>
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
    </UserProvider>
  );
}

export const getServerSideProps = redirectIfNoUser;
