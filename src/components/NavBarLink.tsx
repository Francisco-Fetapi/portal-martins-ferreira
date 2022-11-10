import {
  Box,
  createStyles,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { TablerIcon } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px 9px`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
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
  const router = useRouter();
  const isActive = router.pathname === link;

  return (
    <UnstyledButton
      className={classes.control}
      disabled={isActive}
      sx={{
        pointerEvents: isActive ? "none" : "initial",
        opacity: isActive ? 0.5 : 1,
      }}
    >
      <Link href={link}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ThemeIcon variant="light" size={30} color="red">
            <Icon size={18} />
          </ThemeIcon>
          <Box ml="md">{label}</Box>
        </Box>
      </Link>
    </UnstyledButton>
  );
}
