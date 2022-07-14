import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "../config/theme/theme";
import { MessageBox } from "../components/molecules/message-box/message-box";
import { ToastProvider } from "../services/toast-provider";
import { Nav } from "../components/molecules/nav/nav";
import ScreenLoading from "../components/templates/_create";
import { useEffect, useState } from "react";
import { emitter } from "../services/emitter/emitter";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<{ show: boolean; message?: string }>({
    show: false,
  });

  useEffect(() => {
    emitter.on("EMIT_SCREENLOADING", (data) => {
      setLoading(data);
    });

    return () => {
      emitter.off("EMIT_SCREENLOADING");
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Nav />
      {loading.show && <ScreenLoading action={loading.message} />}
      {!loading.show && (
        <>
          <ToastProvider />
          <MessageBox />
          <Component {...pageProps} />
        </>
      )}
    </ChakraProvider>
  );
}

export default MyApp;
