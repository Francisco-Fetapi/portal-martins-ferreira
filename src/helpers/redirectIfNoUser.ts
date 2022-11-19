import { GetServerSideProps } from "next";
import { strapi } from "../api/strapi";
import { IUserLogged } from "../interfaces/IUser";
import nookies from "nookies";

export const redirectIfNoUser: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const token = cookies.token;
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
