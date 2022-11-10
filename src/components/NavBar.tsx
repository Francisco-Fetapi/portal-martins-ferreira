import {
  Navbar,
  Divider,
  Text,
  ScrollArea,
  TextInput,
  Stack,
} from "@mantine/core";
import { IconHome, IconSearch } from "@tabler/icons";
import React from "react";
import NavBarLink from "./NavBarLink";
import { UserButton } from "./UserButton";

interface NavBarProps {
  opened: boolean;
}

export default function NavBar({ opened }: NavBarProps) {
  return (
    <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <Navbar.Section grow component={ScrollArea} p="md">
        {/* Os itens do menu */}
        <Stack>
          <TextInput
            placeholder="Procurar noticias"
            size="xs"
            icon={<IconSearch size={12} stroke={1.5} />}
            rightSectionWidth={70}
            mb="sm"
          />
          <NavBarLink Icon={IconHome} label="Home" link="/" />
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Divider />
        <UserButton
          name="Nome do usuario"
          email="emaildousuario@gmail.com"
          image="/user.jpg"
        />
      </Navbar.Section>
    </Navbar>
  );
}
