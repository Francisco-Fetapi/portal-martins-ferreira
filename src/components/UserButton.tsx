import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  MediaQuery,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import Link from "next/link";
import { useQuery } from "react-query";
import { IUserContext, UserContext } from "../context/UserProvider";
import getPhoto from "../helpers/getPhoto";
import useUser from "../hooks/useUser";
import { useContext } from "react";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

export function UserButton({
  image,
  name,
  email,
  icon,
  ...others
}: UserButtonProps) {
  const { classes } = useStyles();
  const { user } = useUser();
  const { photoPreviewURL } = useContext(UserContext) as Required<IUserContext>;

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Link href="/perfil">
        <Group>
          <Avatar src={photoPreviewURL || getPhoto(user?.photo!)} radius="xl" />

          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {user?.username}
            </Text>

            <Text color="dimmed" size="xs">
              {user?.email}
            </Text>
          </div>

          <MediaQuery smallerThan="lg" styles={{ display: "none" }}>
            {icon || <IconChevronRight size={14} stroke={1.5} />}
          </MediaQuery>
        </Group>
      </Link>
    </UnstyledButton>
  );
}
