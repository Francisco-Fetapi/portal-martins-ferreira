import { Box, Center } from "@mantine/core";
import Head from "next/head";
import React from "react";
import { ChangePasswordForm } from "../components/forms/ChangePasswordForm";
import { SignInForm } from "../components/forms/SignInForm";

export default function ChangePasswordPage() {
  return (
    <>
      <Head>
        <title>Alterar Senha</title>
      </Head>
      <Center sx={{ minHeight: "100vh" }}>
        <Box className="page-container">
          <ChangePasswordForm />
        </Box>
      </Center>
    </>
  );
}
