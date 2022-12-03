import { Navbar, Divider, ScrollArea, Stack, MediaQuery } from "@mantine/core";
import { IconHome, IconNotes, IconUser } from "@tabler/icons";
import React from "react";
import NavBarLink from "./NavBarLink";
import NavBarSearch from "./NavBarSearch";
import { UserButton } from "./UserButton";

interface NavBarProps {
  opened: boolean;
}

export default function NavBar({ opened }: NavBarProps) {
  return (
    <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ lg: 300, sm: 320 }}>
      <Navbar.Section grow component={ScrollArea} p="md">
        {/* Os itens do menu */}
        <Stack>
          <NavBarSearch />
        </Stack>
        <NavBarLink Icon={IconHome} label="Página Inicial" link="/" />
        <NavBarLink Icon={IconUser} label="Perfil" link="/perfil" />
        <NavBarLink
          Icon={IconNotes}
          label="Guardadas"
          link="/noticias-guardadas"
        />
      </Navbar.Section>
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Navbar.Section>
          <Divider />
          <UserButton />
        </Navbar.Section>
      </MediaQuery>
    </Navbar>
  );
}
