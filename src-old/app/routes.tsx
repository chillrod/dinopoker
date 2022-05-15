import { Route, Routes, useNavigate } from "react-router-dom";

import { App } from "./home";
import { GameRoom } from "./gameroom";
import { useEffect } from "react";
import { emitter } from "../service/emitter/emitter";
import { socket } from "../service/socket";

export const Router = () => {
  const navigate = useNavigate();

  useEffect(() => {
    emitter.on("CHANGE_ROUTE", ({ event, path }) => {
      navigate(`/${path}`);
    });

    socket.on("PickRoomData", (data) => {
      console.log(data);
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/:id" element={<GameRoom />} />
    </Routes>
  );
};
