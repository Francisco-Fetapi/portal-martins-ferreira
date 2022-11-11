import {
  useMantineColorScheme,
  Header as HeaderMantine,
  MediaQuery,
  Burger,
  Text,
  useMantineTheme,
  Group,
  ActionIcon,
  createStyles,
} from "@mantine/core";
import { IconSun, IconMoonStars, IconLogout } from "@tabler/icons";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

const useStyles = createStyles((theme) => ({
  background: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
  themeColor: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.yellow[4]
        : theme.colors.blue[6],
  },
}));

export default function Header({ opened, setOpened }: HeaderProps) {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const router = useRouter();

  function logout() {
    router.push("/iniciar-sessao");
  }

  return (
    <HeaderMantine height={70} p="md">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Text>Logo Do Sistema</Text>
        <Group>
          <ActionIcon
            onClick={() => toggleColorScheme()}
            size="lg"
            className={`${classes.background} ${classes.themeColor}`}
          >
            {colorScheme === "dark" ? (
              <IconSun size={20} />
            ) : (
              <IconMoonStars size={20} />
            )}
          </ActionIcon>
          <ActionIcon className={classes.background} size="lg" onClick={logout}>
            <IconLogout />
          </ActionIcon>
        </Group>
      </div>
    </HeaderMantine>
  );
}
