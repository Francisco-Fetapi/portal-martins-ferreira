import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import AppScheme from "../../components/AppScheme";
import { ArticleCardFooter } from "../../components/ArticleCardFooter";
import { CommentSimple } from "../../components/CommentSimple";
import { InputWithButton } from "../../components/InputWithButton";

export default function Noticia() {
  const router = useRouter();
  const postId = +(router.query.id as string);
  return (
    <AppScheme>
      <Box mb={30}>
        <ArticleCardFooter
          long
          post={{
            id: postId,
            title: "Titulo da Noticia " + postId,
            content:
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex inventore exercitationem commodi ullam excepturi maiores aperiam accusamus, sint mollitia? Dolores voluptatibus quis neque? Quis amet quae, molestias doloremque beatae ab?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex inventore exercitationem commodi ullam excepturi maiores aperiam accusamus, sint mollitia? Dolores voluptatibus quis neque? Quis amet quae, molestias doloremque beatae ab?",
            comments: 12 * postId,
            created_at: new Date(2022, 11, postId),
            disLikes: 2 * postId,
            likes: 1 * postId,
            image: postId === 4 ? undefined : `/img/image${postId}.jpg`,
          }}
          user={{
            image: postId === 4 ? "/user.jpg" : `/user${postId}.jpg`,
            name: "Nome do Usuario " + postId,
          }}
        />
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
              likes={item * 2}
              dislikes={item}
              author={{
                image: item > 3 ? "/user.jpg" : `/user${item}.jpg`,
                name: `Nome do Usuario ${item}`,
              }}
              body="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit mollitia, repudiandae libero, voluptatum nostrum provident magni at quisquam dolor fuga ad assumenda ut rerum excepturi animi aspernatur aut alias doloremque!"
              created_at={new Date(2022, 11, item)}
            />
          </Box>
        ))}
      </Box>
    </AppScheme>
  );
}
