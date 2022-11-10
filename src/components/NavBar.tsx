import {
  Navbar,
  Divider,
  Text,
  ScrollArea,
  TextInput,
  Stack,
} from "@mantine/core";
import {
  IconHome,
  IconNotes,
  IconPaperBag,
  IconSearch,
  IconUser,
} from "@tabler/icons";
import React from "react";
import NavBarLink from "./NavBarLink";
import { UserButton } from "./UserButton";

interface NavBarProps {
  opened: boolean;
}

export default function NavBar({ opened }: NavBarProps) {
  return (
    <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ lg: 300, sm: 250 }}>
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
        </Stack>
        <NavBarLink Icon={IconHome} label="Página Inicial" link="/" />
        <NavBarLink Icon={IconUser} label="Perfil" link="/" />
        <NavBarLink Icon={IconNotes} label="Guardadas" link="/" />
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
