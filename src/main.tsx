import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";

import { ChakraProvider } from "@chakra-ui/react";

import ChakraTheme from "./config/theme";
import { ToastProvider } from "./service/toast-provider";
import "./dino.css";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={ChakraTheme}>
      <ToastProvider />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
