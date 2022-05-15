import { Route, Routes } from "react-router-dom";

import { App } from "./home";
import { GameRoom } from "./gameroom";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="room">
        <Route path=":id" element={<GameRoom />} />
      </Route>
    </Routes>
  );
};
