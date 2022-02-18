import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import { ChakraProvider } from "@chakra-ui/react";
import ChakraTheme from "./config/theme";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={ChakraTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
