import React from "react";
import {
  MantineProvider,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
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
        <ModalProvider>{Page}</ModalProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

interface ModalProviderProps {
  children: React.ReactNode;
}

function ModalProvider({ children }: ModalProviderProps) {
  const theme = useMantineTheme();

  return (
    <ModalsProvider
      modalProps={{
        overlayColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],

        overlayOpacity: 0.55,
        overlayBlur: 3,
      }}
    >
      {children}
    </ModalsProvider>
  );
}
