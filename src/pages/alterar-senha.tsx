import { Box, Center } from "@mantine/core";
import Head from "next/head";
import React from "react";
import { ChangePasswordForm } from "../components/forms/ChangePasswordForm";

interface PageProps {
  user: IUserLogged;
}

export default function ChangePasswordPage({ user }: PageProps) {
  return (
    <>
      <Head>
        <title>Alterar Senha</title>
      </Head>
      <Center sx={{ minHeight: "100vh" }}>
        <Box className="page-container">
          <ChangePasswordForm user={user} />
        </Box>
      </Center>
    </>
  );
}

import { GetServerSideProps } from "next";
import { strapi } from "../api/strapi";
import { IUserLogged } from "../interfaces/IUser";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { email, id } = ctx.query;
  const redirect = {
    props: {},
    redirect: {
      destination: "/esqueci-minha-senha",
    },
  };
  if (!email || !id) {
    console.log("/alterar-senha - Sem email nem id");
    return redirect;
  }

  try {
    // let fields_array = ["username", "photo"] as (keyof IUserLogged)[];
    // const fields = fields_array.join(",");
    const { data } = await strapi.get<IUserLogged>(
      `/users/${id}?populate=photo`
    );

    return {
      props: {
        user: data,
      },
    };
  } catch (e: any) {
    console.log(e.message);
    console.log("/alterar-senha - Erro inseperado");
    return redirect;
  }
};
