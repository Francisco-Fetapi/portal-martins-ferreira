import { Navbar, Text, ScrollArea } from "@mantine/core";
import { IconHome } from "@tabler/icons";
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
        <NavBarLink Icon={IconHome} label="Home" link="/" />
      </Navbar.Section>
      <Navbar.Section>
        <UserButton
          name="Nome do usuario"
          email="emaildousuario@gmail.com"
          image="/user.jpg"
        />
      </Navbar.Section>
    </Navbar>
  );
}
