import { Box, Center } from "@mantine/core";
import Head from "next/head";
import React from "react";
import AppSchemeSimple from "../../components/AppSchemeSimple";
import { SignUpForm } from "../../components/forms/SignUpForm";

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>Criar Conta</title>
      </Head>
      <AppSchemeSimple>
        <Center sx={{ minHeight: "100vh" }}>
          <Box className="page-container">
            <SignUpForm />
          </Box>
        </Center>
      </AppSchemeSimple>
    </>
  );
}
