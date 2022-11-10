import { Box, Text, UnstyledButton } from "@mantine/core";
import React from "react";
import useGlobalStyles from "../hooks/useGlobalStyles";

interface FeaturedNewProps {
  title: React.ReactNode;
  children: string;
  time: React.ReactNode;
}

export default function FeaturedNew({
  title,
  children,
  time,
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
      <Text size="md" weight={700}>
        {title}
      </Text>
      <Box mt={3}>
        <Text size="xs">{content}</Text>
      </Box>
      <Text size="xs" color="dimmed" mt={-3} align="right">
        {time}
      </Text>
    </UnstyledButton>
  );
}
