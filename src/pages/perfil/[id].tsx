import AppScheme from "../../components/AppScheme";
import { UserInfo } from "../../components/UserInfo";
import { Text, Box, Title } from "@mantine/core";
import PostArea from "../../components/PostArea";
import ArticlesList from "../../components/ArticlesList";
import { getToken, redirectIfNoUser } from "../../helpers/redirectIfNoUser";
import { IUserLogged } from "../../interfaces/IUser";
import { GetServerSideProps } from "next";
import { strapi } from "../../api/strapi";
import UserProvider from "../../context/UserProvider";
import usePost from "../../hooks/usePost";
import { useEffect } from "react";

interface PageProps {
  user: IUserLogged;
  otherUser: IUserLogged;
}

export default function ProfileUserPage({ otherUser, user }: PageProps) {
  const { othersPosts } = usePost();

  return (
    <UserProvider user={user}>
      <AppScheme>
        {otherUser ? (
          <>
            <UserInfo user={otherUser} isMine={false} />

            <Box mt={30}>
              <Title order={2}>Noticias</Title>
              <Text color="dimmed" size="xs" mt={5}>
                Todas as noticias publicadas por <b>Nome do Usuario</b> são
                exibidas nesta seção desde a mais recente à mais antiga.
              </Text>
            </Box>

            <Box mt={30}>
              <ArticlesList posts={othersPosts.data} />
            </Box>
          </>
        ) : (
          <p>Nenhum usuario encontrado</p>
        )}
      </AppScheme>
    </UserProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = getToken(ctx);
  const isNotLogged = !token;

  if (isNotLogged) {
    return redirectIfNoUser(ctx);
  }

  try {
    const userId = ctx.query.id;

    const { data: user } = await strapi.get<IUserLogged>(
      `/users/me?populate=photo`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const { data: otherUser } = await strapi.get<IUserLogged>(
      `/users/${userId}?populate=photo`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return {
      props: {
        otherUser,
        user,
      },
    };
  } catch (e: any) {
    console.error(e.message);
    return {
      props: {
        otherUser: undefined,
      },
    };
  }
};
