import { child, get, getDatabase, push, ref, set } from "firebase/database";

import { appFirebase } from "../../../../config/firebase/firebase";
import { IPlayerData } from "../../interface/PlayerData";
import { makeUuid } from "../../../../utils/Uuid";
import { setLocalStorage } from "../../../../providers/local-storage/handler";

const db = getDatabase(appFirebase);

export const RoomsService = {
  async CREATE_ROOM({
    player,
    voteSystem,
  }: {
    player: IPlayerData;
    voteSystem: string;
  }) {
    const roomId = makeUuid();

    const playerData = {
      ...player,
      room: roomId,
    };

    try {
      await set(ref(db, "dinopoker-room/" + roomId), {
        id: roomId,
        roomStatus: "PENDING",
        voteSystem: voteSystem,
      });

      return { playerFromCreateRoom: playerData };
    } catch (err: any) {
      throw new Error(err);
    }
  },

  async JOIN_ROOM({ player }: { player: IPlayerData }) {
    try {
      const room = await get(ref(db, "dinopoker-room/" + player.room));

      if (!room.exists()) {
        throw new Error("Room not found");
      }

      const data = await push(
        ref(db, "dinopoker-room/" + player.room + "/players"),
        {
          ...player,
        }
      ).then((res) => res);

      const playerFromJoinRoom = {
        room: player.room,
        player: {
          ...player,
          id: data.key,
        },
      };

      setLocalStorage("user-client", playerFromJoinRoom);

      return { playerFromJoinRoom };
    } catch (err: any) {
      throw new Error(err);
    }
  },

  async CHANGE_PLAYER_VOTE(player: IPlayerData) {
    if (!player) return;

    const db = getDatabase(appFirebase);

    await set(
      child(
        ref(db),
        "dinopoker-room/" + player.room + "/players/" + player.id + "/vote"
      ),
      player.vote
    );
  },
};
