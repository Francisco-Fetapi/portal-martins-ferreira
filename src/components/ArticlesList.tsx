import { Box } from "@mantine/core";
import React from "react";
import { ApiPaginated, ApiPost } from "../api/interfaces";
import { ArticleCardFooter } from "./ArticleCardFooter";

interface ArticlesListProps {
  posts?: ApiPaginated<ApiPost[]>;
}

export default function ArticlesList({ posts }: ArticlesListProps) {
  if (!posts) {
    return <p>Carregando...</p>;
  }

  return (
    <Box>
      {posts.results.map((post) => (
        <Box key={post.id} mb={30}>
          <ArticleCardFooter post={post} />
        </Box>
      ))}
    </Box>
  );
}
