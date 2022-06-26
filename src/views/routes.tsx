import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Poker } from "./Poker";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:id" element={<Poker  />} />
    </Routes>
  );
};
