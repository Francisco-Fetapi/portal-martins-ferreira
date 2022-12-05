import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import { strapi } from "../api/strapi";
import { IUserLogged } from "../interfaces/IUser";
import nookies from "nookies";
import { ParsedUrlQuery } from "querystring";
import { AxiosError, AxiosResponse } from "axios";

export function getToken(
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
  const cookies = nookies.get(ctx);
  const token = cookies.token;
  return token;
}

export const redirectIfNoUser: GetServerSideProps = async (ctx) => {
  const token = getToken(ctx);
  const isNotLogged = !token;

  const redirectToLogin = {
    props: {},
    redirect: {
      destination: "/iniciar-sessao",
    },
  };

  if (isNotLogged) {
    return redirectToLogin;
  }

  try {
    const res = await strapi.get<IUserLogged>("/users/me?populate=photo", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const user = res?.data;
    // 401 unauthorized
    // 400 bad request
    if (!user) {
      throw new Error("");
    }

    return {
      props: {
        user,
      },
    };
  } catch (e: any) {
    const err = e as Error;
    console.log("!error", err.message);
    nookies.destroy(ctx, "token");
    return redirectToLogin;
  }
};
