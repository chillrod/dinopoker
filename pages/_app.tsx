import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "../config/theme/theme";
import { MessageBox } from "../components/molecules/message-box/message-box";
import { ToastProvider } from "../services/toast-provider";
import { Nav } from "../components/molecules/nav/nav";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ToastProvider />
      <MessageBox />
      <Nav />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
