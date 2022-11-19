import { useState } from "react";
import { Box, AppShell, useMantineTheme } from "@mantine/core";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Aside from "./Aside";
import Header from "./Header";
import { useRouter } from "next/router";

interface AppSchemeProps {
  children: React.ReactNode;
}

export default function AppScheme({ children }: AppSchemeProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="md"
      asideOffsetBreakpoint="md"
      navbar={<NavBar opened={opened} />}
      aside={<Aside />}
      footer={<Footer />}
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      {children}
    </AppShell>
  );
}
