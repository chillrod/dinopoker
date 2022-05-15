import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
