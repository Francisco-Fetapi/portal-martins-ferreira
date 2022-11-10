import {
  useMantineColorScheme,
  Header as HeaderMantine,
  MediaQuery,
  Burger,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ opened, setOpened }: HeaderProps) {
  const theme = useMantineTheme();

  return (
    <HeaderMantine height={70} p="md">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Text>Application header</Text>
      </div>
    </HeaderMantine>
  );
}
