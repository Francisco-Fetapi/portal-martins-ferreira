import { Box, Center } from "@mantine/core";
import Head from "next/head";
import { ForgotMyPasswordForm } from "../components/forms/ForgotMyPasswordForm";

export default function ForgotMyPasswordPage() {
  return (
    <>
      <Head>
        <title>Esqueci minha senha</title>
      </Head>
      <Center sx={{ minHeight: "100vh" }}>
        <Box style={{ width: "90%", maxWidth: 500 }}>
          <ForgotMyPasswordForm />
        </Box>
      </Center>
    </>
  );
}
