import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "../config/theme/theme";
import { MessageBox } from "../components/molecules/message-box/message-box";
import { ToastProvider } from "../services/toast-provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ToastProvider />
      <MessageBox />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
