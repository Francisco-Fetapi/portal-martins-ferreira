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

interface PageProps {
  user: IUserLogged;
  post: ApiResponse<ApiSinglePost>;
}

// get also all comments

export default function Noticia({ user, post }: PageProps) {
  console.log(post);

  const postParsed = {
    ...parserResponse<ApiSinglePost>(post),
    photo: parserResponse<ApiUploadDataResponse>(post.data.attributes.photo!),
    user: parserResponse<IUserLogged>(post.data.attributes.user),
    post_comments: post.data.attributes.post_comments.data.map((comment) =>
      parserResponse<ApiComment>({ data: comment })
    ),
    post_reacts: post.data.attributes.post_reacts.data.map((comment) =>
      parserResponse<ApiReact>({ data: comment })
    ),
  };

  console.log(postParsed);

  // return <pre>{JSON.stringify(postParsed, null, 2)}</pre>;

  return (
    <UserProvider user={user}>
      <AppScheme>
        {post ? (
          <>
            <Box mb={30}>
              <ArticleCardFooter long post={postParsed as ApiPost} />
            </Box>
            <InputWithButton
              onClick={() => console.log("Ola Mundo")}
              placeholder="Escreva um comentário"
            />
            <Box mt={30}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Box key={item} mb={30}>
                  <CommentSimple
                    key={item}
                    liked={item % 2 === 0}
                    disliked={item % 2 !== 0}
                    isMine={item % 2 !== 0}
                    likes={item * 2}
                    dislikes={item}
                    author={{
                      image: item > 3 ? "/user.jpg" : `/user${item}.jpg`,
                      name: `Nome do Usuario ${item}`,
                    }}
                    body="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit mollitia, repudiandae libero, voluptatum nostrum provident magni at quisquam dolor fuga ad assumenda ut rerum excepturi animi aspernatur aut alias doloremque!"
                    created_at={new Date(2022, 10, item)}
                  />
                </Box>
              ))}
            </Box>
          </>
        ) : (
          <p>Postagem não encontrada</p>
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
    const postId = ctx.query.id;
    const { data } = await strapi.get<ApiResponse<ApiSinglePost>>(
      `/posts/${postId}?populate=*`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const { data: user } = await strapi.get<IUserLogged>(
      "/users/me?populate=photo",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return {
      props: {
        post: data,
        user,
      },
    };
  } catch (e: any) {
    console.error(e.message);
    return {
      props: {
        post: undefined,
      },
    };
  }
};
