import { AnimatePresence, m, motion } from "framer-motion";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { MessageBox } from "../components/molecules/message-box/message-box";
import { ToastProvider } from "../services/toast-provider";
import { Home } from "./Home";
import { Poker } from "./Poker";

export const Router = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(
      "🚀 ~ file: routes.tsx ~ line 13 ~ Router ~ location",
      location
    );
  }, [location]);

  return (
    <>
      <MessageBox />
      <ToastProvider />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" element={<Poker />} />
      </Routes>
    </>
  );
};
