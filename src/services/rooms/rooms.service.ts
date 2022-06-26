import {
  child,
  get,
  getDatabase,
  push,
  ref,
  set,
  update,
} from "firebase/database";
import { app } from "../../main";
import { uuid } from "short-uuid";
import { uuidv4 } from "@firebase/util";
import { IPlayerData } from "../../model/PlayerData";

export const RoomsService = {
  async createRoom({ name, character }: IPlayerData) {
    const db = getDatabase(app);

    const roomId = uuid();

    const preparedPlayer: IPlayerData = {
      name,
      character,
      id: uuidv4(),
      vote: 0,
      room: roomId,
    };

    try {
      localStorage.setItem(
        "character",
        JSON.stringify({
          room: roomId,
          player: preparedPlayer,
        })
      );

      await set(ref(db, "dinopoker-room/" + roomId), {
        id: roomId,
        roomStatus: "PENDING",
        players: {
          [preparedPlayer.id]: {
            ...preparedPlayer,
          },
        },
      });

      return { roomId, preparedPlayer };
    } catch (err: any) {
      throw new Error(err);
    }
  },

  async updatePlayersFromRoom(player: IPlayerData) {
    const db = getDatabase(app);

    const roomData = await get(
      child(ref(db), "dinopoker-room/" + player.room)
    ).then((res) => res.val());

    await update(child(ref(db), "dinopoker-room/" + player.room), {
      ...roomData,
      players: { ...roomData.players, [player.id]: { ...player } },
    });
  },

  async joinRoom({
    playerData,
    roomId,
  }: {
    playerData: IPlayerData;
    roomId: string;
  }) {
    const db = getDatabase(app);

    const preparedPlayer = {
      name: playerData.name,
      character: playerData.character,
      id: uuidv4(),
      vote: 0,
      room: roomId,
    };

    try {
      localStorage.setItem(
        "character",
        JSON.stringify({
          room: roomId,
          player: preparedPlayer,
        })
      );

      await get(child(ref(db), "dinopoker-room/" + roomId)).then(
        async (res) => {
          if (res.exists()) {
            await RoomsService.updatePlayersFromRoom(preparedPlayer);
          }

          if (!res.exists()) throw new Error("Room does not exist");
        }
      );

      return preparedPlayer;
    } catch (err: any) {
      throw new Error(err);
    }
  },

  async checkIfRoomExists(roomId?: string) {
    const db = getDatabase(app);

    try {
      const data = await get(child(ref(db), "dinopoker-room/" + roomId)).then(
        async (res) => {
          if (res.exists()) return res.val();

          if (!res.exists()) throw new Error("Room does not exist");
        }
      );

      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  },
};
