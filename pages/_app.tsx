import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

import { MessageBox } from "../components/molecules/message-box/message-box";
import { Nav } from "../components/molecules/nav/nav";
import theme from "../config/theme/theme";
import { ToastProvider } from "../services/toast-provider";

import ScreenLoading from "../components/templates/_screen-loading";
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
