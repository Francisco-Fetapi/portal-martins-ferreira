import React from "react";
import { MantineProvider, useMantineColorScheme } from "@mantine/core";
import { GlobalStyles } from "../styles/GlobalStyles";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { RouterTransition } from "../components/RouterTransition";

interface MantineProviderInterface {
  Page: React.ReactNode;
}

export default function AppProvider({ Page }: MantineProviderInterface) {
  const mantine = useMantineColorScheme();
  const colorScheme = mantine.colorScheme;

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        fontFamily: "Roboto, sans-serif",
        colorScheme,
      }}
    >
      <RouterTransition />
      <GlobalStyles mode={colorScheme} />
      <NotificationsProvider>
        <ModalsProvider>{Page}</ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}
