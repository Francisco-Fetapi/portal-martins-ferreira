import { GetServerSideProps } from "next";
import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import {
  ApiComment,
  ApiPost,
  ApiReact,
  ApiResponse,
  ApiResponseData,
  ApiSinglePost,
  ApiUploadDataResponse,
} from "../../api/interfaces";
import AppScheme from "../../components/AppScheme";
import { ArticleCardFooter } from "../../components/ArticleCardFooter";
import { CommentSimple } from "../../components/CommentSimple";
import { InputWithButton } from "../../components/InputWithButton";
import UserProvider from "../../context/UserProvider";
import { getToken, redirectIfNoUser } from "../../helpers/redirectIfNoUser";
import { IUserLogged } from "../../interfaces/IUser";
import { strapi } from "../../api/strapi";
import parserResponse, { ResponseType } from "../../helpers/parserResponse";
import usePost from "../../hooks/usePost";
import { Text } from "@mantine/core";
import { useMemo } from "react";

interface PageProps {
  user: IUserLogged;
  post: ApiResponse<ApiSinglePost>;
}

// get also all comments

export default function Noticia({ user }: PageProps) {
  const { postComments, getPostById } = usePost();
  const router = useRouter();
  const postId = router.query.id as string | undefined;
  const post = getPostById(postId ? +postId : undefined);

  console.log(post);

  return (
    <UserProvider user={user}>
      <AppScheme>
        {post ? (
          <>
            <Box mb={30}>
              <ArticleCardFooter long post={post} />
            </Box>
            <InputWithButton
              onClick={() => console.log("Ola Mundo")}
              placeholder="Escreva um comentário"
            />

            <Box mt={50}>
              {postComments.isLoading && (
                <Box mb={20}>
                  <Text size="xs" color="dimmed" align="center">
                    Carregando comentários...
                  </Text>
                </Box>
              )}
              {postComments.data?.map((comment) => (
                <Box key={comment.id} mb={30}>
                  <CommentSimple comment={comment} />
                </Box>
              ))}
            </Box>
          </>
        ) : (
          <p>Noticia não encontrada</p>
        )}
      </AppScheme>
    </UserProvider>
  );
}

export const getServerSideProps = redirectIfNoUser;
