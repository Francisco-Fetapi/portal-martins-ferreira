import { Box, Text, Title } from "@mantine/core";
import AppScheme from "../components/AppScheme";
import ArticlesList from "../components/ArticlesList";
import UserProvider from "../context/UserProvider";
import { redirectIfNoUser } from "../helpers/redirectIfNoUser";
import usePost from "../hooks/usePost";
import { IUserLogged } from "../interfaces/IUser";

interface PageProps {
  user: IUserLogged;
}

export default function IndexPage({ user }: PageProps) {
  const { posts } = usePost();

  // console.log("post list", posts.data);

  return (
    <UserProvider user={user}>
      <AppScheme>
        <ArticlesList
          posts={posts.data}
          title="Noticias"
          text={
            <>
              Veja as últimas noticias do <b>Obadias Malaquias</b> em primeira
              mão.
            </>
          }
        />
      </AppScheme>
    </UserProvider>
  );
}

export const getServerSideProps = redirectIfNoUser;
