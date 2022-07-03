import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./views/routes";

import "./config/locale/";

import { ChakraProvider } from "@chakra-ui/react";
import ChakraTheme from "./config/theme";

import "./dino.css";

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  databaseURL: import.meta.env.VITE_databaseURL,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={ChakraTheme}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ChakraProvider>
);
