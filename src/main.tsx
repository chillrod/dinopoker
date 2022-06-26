import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./views/routes";

import "./config/locale/";

import { ChakraProvider } from "@chakra-ui/react";
import ChakraTheme from "./config/theme";

import "./dino.css";

import { initializeApp } from "firebase/app";
import { MessageBox } from "./components/molecules/message-box/message-box";
import { ToastProvider } from "./services/toast-provider";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC5OZzYbBmxvnGxTj-m3U98S1o6S0GQk0Y",
  authDomain: "dinopokerapp.firebaseapp.com",
  databaseURL: "https://dinopokerapp-default-rtdb.firebaseio.com/",
  projectId: "dinopokerapp",
  storageBucket: "dinopokerapp.appspot.com",
  messagingSenderId: "524389525362",
  appId: "1:524389525362:web:31e72c281474b411b9dfeb",
  measurementId: "G-0ERBZRHF15",
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={ChakraTheme}>
      <BrowserRouter>
        <Router />
        <MessageBox />
        <ToastProvider />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
