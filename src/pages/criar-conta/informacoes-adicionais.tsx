import { Box, Center } from "@mantine/core";
import Head from "next/head";
import React from "react";

export default function MoreInformationPage() {
  return (
    <>
      <Head>
        <title>Informações Adicionais</title>
      </Head>
      <Center sx={{ minHeight: "100vh" }}>
        <Box style={{ width: "90%", maxWidth: 500 }}>
          <h1>Informações Adicionais</h1>
        </Box>
      </Center>
    </>
  );
}
