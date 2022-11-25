import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import { strapi } from "../api/strapi";
import { IUserLogged } from "../interfaces/IUser";
import nookies from "nookies";
import { ParsedUrlQuery } from "querystring";

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
    const { data } = await strapi.get<IUserLogged>("/users/me?populate=photo", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return {
      props: {
        user: data,
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return redirectToLogin;
  }
};
