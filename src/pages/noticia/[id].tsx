import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import AppScheme from "../../components/AppScheme";
import { ArticleCardFooter } from "../../components/ArticleCardFooter";
import { CommentSimple } from "../../components/CommentSimple";

import UserProvider from "../../context/UserProvider";
import { redirectIfNoUser } from "../../helpers/redirectIfNoUser";
import { IUserLogged } from "../../interfaces/IUser";
import usePost from "../../hooks/usePost";
import { Text } from "@mantine/core";

import FormComment from "../../components/forms/FormComment";

interface PageProps {
  user: IUserLogged;
  // post: ApiResponse<ApiSinglePost>;
}

export default function Noticia({ user }: PageProps) {
  const { postComments, getPostById, posts, myPosts } = usePost();
  const router = useRouter();
  const postId = router.query.id as string | undefined;
  const post = getPostById(postId ? +postId : undefined);

  const isLoading = posts.isLoading || myPosts.isLoading;

  return (
    <UserProvider user={user}>
      <AppScheme>
        {isLoading ? (
          <Text color="dimmed" mt={20} size="xs" align="center">
            Carregando dados da noticia...
          </Text>
        ) : (
          <>
            {post ? (
              <>
                <Box mb={30}>
                  <ArticleCardFooter long post={post} />
                </Box>
                <FormComment post={post} />

                <Box mt={50}>
                  {postComments.isLoading && (
                    <Box mb={20}>
                      <Text size="xs" color="dimmed" align="center">
                        Carregando comentários...
                      </Text>
                    </Box>
                  )}
                  {postComments.data?.length === 0 && (
                    <Box mb={20}>
                      <Text size="xs" color="dimmed" align="center">
                        Nenhum comentário encontrado. <br />
                        Seja o primeiro a comentar.
                      </Text>
                    </Box>
                  )}
                  {postComments.data?.map((comment) => (
                    <CommentSimple comment={comment} key={comment.id} />
                  ))}
                </Box>
              </>
            ) : (
              <Text color="dimmed" mt={20} size="xs" align="center">
                Noticia não encontrada.
              </Text>
            )}
          </>
        )}
      </AppScheme>
    </UserProvider>
  );
}

export const getServerSideProps = redirectIfNoUser;
