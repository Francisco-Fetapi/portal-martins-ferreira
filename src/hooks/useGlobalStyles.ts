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
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

export default function useGlobalStyles() {
  const styles = useStyles();

  return styles;
}
