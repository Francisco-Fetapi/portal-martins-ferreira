import {
  Box,
  createStyles,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { TablerIcon } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    // padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

interface NavBarLinkProps {
  Icon: TablerIcon;
  label: string;
  link: `/${string}`;
}

export default function NavBarLink({ Icon, label, link }: NavBarLinkProps) {
  const { classes } = useStyles();
  return (
    <UnstyledButton
      component="a"
      href={link}
      onClick={(event) => event.preventDefault()}
      className={classes.control}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ThemeIcon variant="light" size={30}>
          <Icon size={18} />
        </ThemeIcon>
        <Box ml="md">{label}</Box>
      </Box>
    </UnstyledButton>
  );
}
