import { Box, Center } from "@mantine/core";
import Head from "next/head";
import AppSchemeSimple from "../../components/AppSchemeSimple";
import { ProfilePhotoForm } from "../../components/forms/ProfilePhotoForm";

export default function ProfilePhotoPage() {
  return (
    <>
      <Head>
        <title>Criar Conta - Foto de Perfil</title>
      </Head>
      <AppSchemeSimple>
        <Center sx={{ minHeight: "100vh" }}>
          <Box className="page-container">
            <ProfilePhotoForm />
          </Box>
        </Center>
      </AppSchemeSimple>
    </>
  );
}
