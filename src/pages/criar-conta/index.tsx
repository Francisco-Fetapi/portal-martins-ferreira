import { Box, Center } from "@mantine/core";
import Head from "next/head";
import React from "react";
import { SignUpForm } from "../../components/forms/SignUpForm";

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>Criar conta</title>
      </Head>
      <Center sx={{ minHeight: "100vh" }}>
        <Box style={{ width: "90%", maxWidth: 500 }}>
          <SignUpForm />
        </Box>
      </Center>
    </>
  );
}
