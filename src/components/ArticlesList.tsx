import { Box } from "@mantine/core";
import React from "react";
import { ApiPaginated, ApiPost } from "../api/interfaces";
import { IUserLogged } from "../interfaces/IUser";
import { ArticleCardFooter } from "./ArticleCardFooter";

interface ArticlesListProps {
  posts?: ApiPaginated<ApiPost[]>;
  user?: IUserLogged;
}

export default function ArticlesList({ posts, user }: ArticlesListProps) {
  if (!posts) {
    return <p>Carregando...</p>;
  }

  return (
    <Box>
      {posts.results.map((post) => (
        <Box key={post.id} mb={30}>
          <ArticleCardFooter post={post} user={user} />
        </Box>
      ))}
    </Box>
  );
}
