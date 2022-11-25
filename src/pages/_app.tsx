import { AppProps } from "next/app";
import Head from "next/head";
import AppStore from "../core/AppStore";
import AppProvider from "../core/AppProvider";
import { ColorScheme, ColorSchemeProvider } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectTheme } from "../store/App.selectors";
import { useDispatch } from "react-redux";
import {
  setTheme,
  THEME_KEY_IN_LOCALSTORAGE,
  toggleTheme,
} from "../store/App.store";
import { useEffect } from "react";
import useStatePersist from "../hooks/useStatePersist";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // cacheTime: 60 * 60 * 24 * 1, //1 hour
      // refetchOnMount: false,
    },
  },
});

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Portal Obadias Malaquias</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="Portal de noticias do colégio Obadias Malaquias, saiba tudo em primeiro mão."
        />
      </Head>

      <QueryClientProvider client={queryClient}>
        <AppStore>
          <ColorSchemeContainer>
            <AppProvider Page={<Component {...pageProps} />} />
          </ColorSchemeContainer>
        </AppStore>
      </QueryClientProvider>
    </>
  );
}

function ColorSchemeContainer({ children }: { children: React.ReactNode }) {
  const darkMode = useSelector(selectTheme);
  const dispatch = useDispatch();
  const themeLocal = useStatePersist<boolean>(THEME_KEY_IN_LOCALSTORAGE);

  const toggleColorScheme = (value?: ColorScheme) => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    dispatch(setTheme(themeLocal.get()));
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={darkMode ? "dark" : "light"}
      toggleColorScheme={toggleColorScheme}
    >
      {children}
    </ColorSchemeProvider>
  );
}
