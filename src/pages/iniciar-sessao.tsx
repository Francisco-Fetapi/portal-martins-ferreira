import { Box, Center } from "@mantine/core";
import Head from "next/head";
import React from "react";
import { SignInForm } from "../components/forms/SignInForm";

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Iniciar Sessão</title>
      </Head>
      <Center sx={{ minHeight: "100vh" }}>
        <Box className="page-container">
          <SignInForm />
        </Box>
      </Center>
    </>
  );
}
