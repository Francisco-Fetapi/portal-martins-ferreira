import { AppProps } from "next/app";
import Head from "next/head";
import AppStore from "../core/AppStore";
import AppProvider from "../core/AppProvider";
import { ColorSchemeProvider } from "@mantine/core";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import nookies, { setCookie } from "nookies";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // cacheTime: 60 * 60 * 24 * 1, //1 hour
      // refetchOnMount: false,
    },
  },
});
interface WithColorScheme {
  preferredColorScheme: "light" | "dark";
}

const THEME_COOKIE = "theme_mantine";
export default function App(props: AppProps & WithColorScheme) {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useState(props.preferredColorScheme);

  function toggleColorScheme(value: "light" | "dark") {
    const nextColorScheme =
      value || (colorScheme === "light" ? "dark" : "light");
    setColorScheme(nextColorScheme);
    setCookie(null, THEME_COOKIE, nextColorScheme, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  }

  return (
    <>
      <Head>
        <title>Portal Martins Ferreira</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="Portal de noticias do colégio Martins Ferreira, saiba tudo em primeiro mão."
        />
      </Head>

      <QueryClientProvider client={queryClient}>
        <AppStore>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <AppProvider Page={<Component {...pageProps} />} />
          </ColorSchemeProvider>
        </AppStore>
      </QueryClientProvider>
    </>
  );
}
App.getInitialProps = ({ ctx }: { ctx: any }) => {
  const cookies = nookies.get(ctx);
  console.log("cookies", cookies);
  return {
    preferredColorScheme: cookies[THEME_COOKIE] || "light",
  };
};
