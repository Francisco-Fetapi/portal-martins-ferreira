import { Box } from "@mantine/core";
import React from "react";
import { ArticleCardFooter } from "./ArticleCardFooter";

export default function ArticlesList() {
  return (
    <Box>
      {[4, 1, 2, 3].map((item) => (
        <Box key={item} mb={30}>
          <ArticleCardFooter
            post={{
              id: item,
              title: "Titulo da Noticia " + item,
              content:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex inventore exercitationem commodi ullam excepturi maiores aperiam accusamus, sint mollitia? Dolores voluptatibus quis neque? Quis amet quae, molestias doloremque beatae ab?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex inventore exercitationem commodi ullam excepturi maiores aperiam accusamus, sint mollitia? Dolores voluptatibus quis neque? Quis amet quae, molestias doloremque beatae ab?",
              comments: 12 * item,
              created_at: new Date(2022, 11, item),
              disLikes: 2 * item,
              likes: 1 * item,
              image: item === 4 ? undefined : `/img/image${item}.jpg`,
              isMine: item % 2 === 0,
            }}
            user={{
              image: item === 4 ? "" : `/user${item}.jpg`,
              name: "Nome do Usuario " + item,
            }}
          />
        </Box>
      ))}
    </Box>
  );
}
