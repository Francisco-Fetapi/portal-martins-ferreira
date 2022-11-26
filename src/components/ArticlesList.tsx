import { Box, Group, Skeleton, Space, Stack, Text, Title } from "@mantine/core";
import React, { useMemo } from "react";
import { ApiPaginated, ApiPost } from "../api/interfaces";
import { IUserLogged } from "../interfaces/IUser";
import { ArticleCardFooter } from "./ArticleCardFooter";

interface ArticlesListProps {
  // posts?: ApiPaginated<ApiPost[]>;
  posts?: ApiPost[];
  user?: IUserLogged;
  title?: React.ReactNode;
  text?: React.ReactNode;
}

export default function ArticlesList({
  posts,
  user,
  title,
  text,
}: ArticlesListProps) {
  const listPosts = useMemo(() => {
    return (
      <>
        {posts?.map((post) => (
          <Box key={post.id} mb={30}>
            <ArticleCardFooter post={post} user={user} />
          </Box>
        ))}
      </>
    );
  }, [posts]);

  if (!posts) {
    return (
      <Stack>
        <TitleAndTextSkelton />
        <Space mt={10} />
        {[1, 2, 3, 4, 5].map((item) => (
          <ArticlesSkelton key={item} />
        ))}
      </Stack>
    );
  }

  const NoPostFound = (
    <Text color="dimmed" size="xs" align="center">
      Nenhuma noticia encontrada
    </Text>
  );

  return (
    <Box mt={30}>
      {title && text && (
        <Box mb={30}>
          <Title order={2}>{title}</Title>
          <Text color="dimmed" size="xs" mt={5}>
            {text}
          </Text>
        </Box>
      )}
      {posts.length === 0 ? NoPostFound : listPosts}
    </Box>
  );
}

function ArticlesSkelton() {
  return (
    <Box mb={30}>
      <Skeleton radius="md" height={200} mb={8} />
      <Group
        sx={{
          justifyContent: "flex-end",
        }}
      >
        {[1, 2, 3, 4].map((item) => (
          <Skeleton height={10} width={50} key={item} />
        ))}
      </Group>
    </Box>
  );
}

function TitleAndTextSkelton() {
  return (
    <div>
      <Skeleton mb={10} height={10} width="45%" />
      <Skeleton height={20} />
    </div>
  );
}
