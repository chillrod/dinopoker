import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import { ToastProvider } from "./service/toast-provider";
import { MessageBox } from "./components/molecules/message-box/message-box";
import { Router } from "./app/routes";

import ChakraTheme from "./config/theme";

import "./dino.css";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={ChakraTheme}>
      <ToastProvider />
      <MessageBox />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
