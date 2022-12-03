import { Box, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";
import AppScheme from "../components/AppScheme";
import ArticlesList from "../components/ArticlesList";
import UserProvider from "../context/UserProvider";
import { redirectIfNoUser } from "../helpers/redirectIfNoUser";
import usePost from "../hooks/usePost";
import { IUserLogged } from "../interfaces/IUser";
import { useMemo } from "react";

interface PageProps {
  user: IUserLogged;
}

export default function IndexPage({ user }: PageProps) {
  const { posts, myPosts, getPostsQuery } = usePost();
  const router = useRouter();
  const search = router.query.q as string | undefined;
  const postsSearched = useMemo(() => {
    if (!search) return;
    return getPostsQuery(search);
  }, [search, posts.data, myPosts.data]);

  return (
    <UserProvider user={user}>
      <AppScheme>
        {search ? (
          <ArticlesList
            posts={postsSearched}
            title={`"${search}" - ${postsSearched?.length} Resultado(s)`}
            text={
              <>
                Veja as notícias em que o <i>titulo</i>, <i>conteúdo</i> e{" "}
                <i>nome do úsuario</i> correspondem ao termo pesquisado.
              </>
            }
          />
        ) : (
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
        )}
      </AppScheme>
    </UserProvider>
  );
}

export const getServerSideProps = redirectIfNoUser;
