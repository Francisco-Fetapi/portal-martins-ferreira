import { Box, Center } from "@mantine/core";
import Head from "next/head";
import { ConfirmEmailForm } from "../components/forms/ConfirmEmailForm";

export default function EmailConfirmPage() {
  return (
    <>
      <Head>
        <title>Confirmar email</title>
      </Head>
      <Center sx={{ minHeight: "100vh" }}>
        <Box className="page-container">
          <ConfirmEmailForm />
        </Box>
      </Center>
    </>
  );
}
