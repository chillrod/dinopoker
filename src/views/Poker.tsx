import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { RoomsService } from "../services/rooms/rooms.service";
import { NotificationsService } from "../services/notifications/notifications.service";

import {
  child,
  getDatabase,
  onDisconnect,
  onValue,
  ref,
} from "firebase/database";

import { app } from "../main";
import { IPlayerData } from "../model/PlayerData";

interface IPlayerState {
  player: IPlayerData;
}

export const Poker = () => {
  const { id } = useParams();
  const location = useLocation();

  const state = location.state as IPlayerState;

  const [loading, setLoading] = useState(false);

  const [currentPlayers, setCurrentPlayers] = useState<any>({});

  const checkIfRoomExists = async () => {
    setLoading(true);

    try {
      const { players } = await RoomsService.checkIfRoomExists(id);

      if (players) {
        setCurrentPlayers({ ...players });
      }
    } catch (err: any) {
      NotificationsService.emitToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderPlayers = () => {
    const players = Object.keys(currentPlayers).map((key) => {
      return { ...currentPlayers[key] };
    });

    return players;
  };

  const db = getDatabase(app);

  const getCurrentPlayer = JSON.parse(localStorage.getItem("character") || "");

  useEffect(() => {
    if (getCurrentPlayer.player) {
      const updatePlayer = async () =>
        await RoomsService.updatePlayersFromRoom(getCurrentPlayer.player);

      updatePlayer();
    }

    checkIfRoomExists();

    return () => {};
  }, []);

  useEffect(() => {
    const roomDbRef = child(ref(db), "dinopoker-room/" + id + "/players");

    const unsubRoomDbRef = onValue(roomDbRef, (data) => {
      setCurrentPlayers({ ...data.val() });
    });

    return () => {
      unsubRoomDbRef();
    };
  }, []);

  useEffect(() => {
    const dbRef = child(
      ref(db),
      "dinopoker-room/" + id + "/players/" + state.player.id
    );

    onDisconnect(dbRef).remove();
  }, []);

  return (
    <div>
      {loading ? "loading" : "loaded"}

      {renderPlayers().map((player) => (
        <p key={player.id}>{player.name}</p>
      ))}
    </div>
  );
};
