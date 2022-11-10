import { Navbar, Text, ScrollArea } from "@mantine/core";
import React from "react";

interface NavBarProps {
  opened: boolean;
}

export default function NavBar({ opened }: NavBarProps) {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        Os itens do menu
      </Navbar.Section>
      <Navbar.Section>
        <Text>Footer with user</Text>
      </Navbar.Section>
    </Navbar>
  );
}
