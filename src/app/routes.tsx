import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { emitter } from "../service/emitter/emitter";

import { IPlayerData } from "../components/organisms/dto/playerdata";
import { Home } from "../components/organisms/home";
import { GameRoom } from "./gameroom";

export const Router = () => {
  const [currentPlayer, setCurrentPlayer] = useState<IPlayerData>();

  useEffect(() => {
    emitter.on("CURRENT_PLAYER", (data) => {
      setCurrentPlayer(data);
      localStorage.setItem("character", JSON.stringify(data));
      
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/room/:id"
        element={<GameRoom currentPlayer={currentPlayer} />}
      />
    </Routes>
  );
};
