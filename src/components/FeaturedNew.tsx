import { Avatar, Box, Grid, Text, UnstyledButton } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { ApiPost } from "../api/interfaces";
import {
  ADMINISTRATOR_NAME,
  ADMINISTRATOR_PHOTO,
  NO_PHOTO,
} from "../helpers/constants";
import dateDistance from "../helpers/dateDistance";
import getPhoto from "../helpers/getPhoto";
import getShortText from "../helpers/getShortText";
import useGlobalStyles from "../hooks/useGlobalStyles";

interface FeaturedNewProps {
  post: ApiPost;
}

export default function FeaturedNew({ post }: FeaturedNewProps) {
  const { classes } = useGlobalStyles();
  const content = getShortText(post.content, 15);
  const router = useRouter();
  const author = post.user;

  function goToNew() {
    router.push("/noticia/" + post.id);
  }

  const isAdmin = !post.user;

  return (
    <UnstyledButton onClick={goToNew} className={classes.buttonHovered} p="xs">
      <Grid align="start">
        <Grid.Col span={2}>
          <Avatar
            src={
              getPhoto(author?.photo!) ||
              (isAdmin ? ADMINISTRATOR_PHOTO : NO_PHOTO)
            }
            sx={{
              borderRadius: "50%",
            }}
          />
        </Grid.Col>
        <Grid.Col span={10}>
          {post.title ? (
            <Text size="md" weight={700} color="blue">
              {post.title}
            </Text>
          ) : (
            <Text size="md" weight={700} color="dimmed">
              Sem titulo
            </Text>
          )}
          <Text size="xs" color="dimmed" mt={-1}>
            {post.user?.username || ADMINISTRATOR_NAME}
          </Text>
          <Box mt={3}>
            <Text size="xs">{content}</Text>
          </Box>
          <Text size="xs" color="dimmed" mt={2} align="right">
            {dateDistance(new Date(post.createdAt))}
          </Text>
        </Grid.Col>
      </Grid>
    </UnstyledButton>
  );
}
