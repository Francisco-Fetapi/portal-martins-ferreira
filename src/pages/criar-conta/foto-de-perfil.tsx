import { Box, Center } from "@mantine/core";
import Head from "next/head";
import { ProfilePhotoForm } from "../../components/forms/ProfilePhotoForm";

export default function ProfilePhotoPage() {
  return (
    <>
      <Head>
        <title>Criar Conta - Foto de Perfil</title>
      </Head>
      <Center sx={{ minHeight: "100vh" }}>
        <Box style={{ width: "90%", maxWidth: 500 }}>
          <ProfilePhotoForm />
        </Box>
      </Center>
    </>
  );
}
