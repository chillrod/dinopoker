import React from "react";
import ReactDOM from "react-dom";

import { App } from "./app";

import { ChakraProvider } from "@chakra-ui/react";

import ChakraTheme from "./config/theme";
import { ToastProvider } from "./service/toast-provider";
import "./dino.css";
import { MessageBox } from "./components/molecules/message-box/message-box";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={ChakraTheme}>
      <ToastProvider />
      <MessageBox />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
