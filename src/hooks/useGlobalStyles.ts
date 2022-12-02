import { createStyles } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  buttonHovered: {
    display: "block",
    width: "100%",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[3],
    },
  },
  background: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
  },
}));

export default function useGlobalStyles() {
  const styles = useStyles();

  return styles;
}
