import {
  MediaQuery,
  Text,
  Aside as AsideMantine,
  Title,
  ScrollArea,
  Box,
} from "@mantine/core";
import React from "react";
import usePost from "../hooks/usePost";
import FeaturedNew from "./FeaturedNew";

export default function Aside() {
  const { feauturedPosts, posts } = usePost();
  const isLoading = posts.isLoading;

  if (isLoading) {
    return <div />;
  }

  console.log(feauturedPosts);

  return (
    <MediaQuery smallerThan="md" styles={{ display: "none" }}>
      <AsideMantine hiddenBreakpoint="md" width={{ lg: 350, sm: 270 }}>
        <Box p="xs">
          <Title order={3}>Em Destaque</Title>
          <Text mt={2} size="xs" color="dimmed" mb={10}>
            Lista das noticias com o maior número de comentários e reações.
          </Text>
        </Box>
        {feauturedPosts ? (
          <ScrollArea>
            {feauturedPosts.map((post) => (
              <Box key={post.id} mb={5}>
                <FeaturedNew post={post} />
              </Box>
            ))}
          </ScrollArea>
        ) : (
          <Text color="dimmed" size="xs" align="center">
            Nenhuma noticia para ser exibida aqui
          </Text>
        )}
      </AsideMantine>
    </MediaQuery>
  );
}
