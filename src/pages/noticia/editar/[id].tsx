import { Box, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import AppScheme from "../../../components/AppScheme";
import FormPostEdit from "../../../components/forms/FormPostEdit";
import UserProvider from "../../../context/UserProvider";
import { redirectIfNoUser } from "../../../helpers/redirectIfNoUser";
import usePost from "../../../hooks/usePost";
import { IUserLogged } from "../../../interfaces/IUser";

interface PageProps {
  user: IUserLogged;
}

export default function Noticia({ user }: PageProps) {
  const router = useRouter();
  const { getPostById, posts, myPosts } = usePost();
  const postId = router.query.id;
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
            {post && (
              <>
                <h1>Editar Noticia</h1>

                <Box
                  sx={{
                    maxWidth: 550,
                  }}
                >
                  <FormPostEdit post={post} />
                </Box>
              </>
            )}
          </>
        )}
      </AppScheme>
    </UserProvider>
  );
}

export const getServerSideProps = redirectIfNoUser;
