import { ChakraProvider } from "@chakra-ui/react";

import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

import { MessageBox } from "../components/molecules/message-box/message-box";
import { Nav } from "../components/molecules/nav/nav";
import theme from "../config/theme/theme";
import { ToastProvider } from "../providers/toast-provider";

import Head from "next/head";


import { useRouter } from "next/router";
import { NotificationsService } from "../providers/notifications/notifications.service";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    NotificationsService.emitMessageBoxClose();
  }, [router]);


  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>dinopoker - Online planningpoker for agile teams</title>
        <link rel="canonical" href="/" />
        <meta
          name="description"
          content="Create a room and invite your team to join. Start planning your sprints and get feedback from your team."
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />


      <ToastProvider />
      <MessageBox />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
