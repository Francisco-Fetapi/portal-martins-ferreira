import { Box, Center } from "@mantine/core";
import Head from "next/head";
import React from "react";
import { MoreInformationForm } from "../../components/forms/MoreInformationForm";

export default function MoreInformationPage() {
  return (
    <>
      <Head>
        <title>Informações Adicionais</title>
      </Head>
      <Center sx={{ minHeight: "100vh" }}>
        <Box style={{ width: "90%", maxWidth: 500 }}>
          <MoreInformationForm />
        </Box>
      </Center>
    </>
  );
}
