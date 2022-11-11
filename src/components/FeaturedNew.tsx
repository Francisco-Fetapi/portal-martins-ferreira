import { Box, Text, UnstyledButton } from "@mantine/core";
import React from "react";
import useGlobalStyles from "../hooks/useGlobalStyles";

interface FeaturedNewProps {
  title: React.ReactNode;
  children: string;
  time: React.ReactNode;
  author: string;
}

export default function FeaturedNew({
  title,
  children,
  time,
  author,
}: FeaturedNewProps) {
  const { classes } = useGlobalStyles();
  const words = children.trim().split(" ");
  const wordsToShow = 15;
  const isLarger = words.length > wordsToShow;
  let content = words.slice(0, wordsToShow).join(" ");
  if (isLarger) {
    content += "...";
  }

  return (
    <UnstyledButton className={classes.buttonHovered} p="xs">
      <Text size="md" weight={700} color="blue">
        {title}
      </Text>
      <Text size="xs" color="dimmed" mt={-1}>
        {author}
      </Text>
      <Box mt={3}>
        <Text size="xs">{content}</Text>
      </Box>
      <Text size="xs" color="dimmed" mt={-5} align="right">
        {time}
      </Text>
    </UnstyledButton>
  );
}
