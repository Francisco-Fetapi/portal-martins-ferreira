import { Box, Center } from "@mantine/core";
import Head from "next/head";
import AppSchemeSimple from "../components/AppSchemeSimple";
import { ConfirmEmailForm } from "../components/forms/ConfirmEmailForm";

export default function EmailConfirmPage() {
  return (
    <>
      <Head>
        <title>Confirmar email</title>
      </Head>
      <AppSchemeSimple>
        <Center sx={{ minHeight: "100vh" }}>
          <Box className="page-container">
            <ConfirmEmailForm />
          </Box>
        </Center>
      </AppSchemeSimple>
    </>
  );
}
