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
import { generate as uuid } from "short-uuid";
import { uuidv4 } from "@firebase/util";
import { IPlayerData, PlayerDataTeam } from "../../model/PlayerData";

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
      raiseHand: false,
      team: PlayerDataTeam.UNKNOWN,
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
      });

      await RoomsService.joinPlayerToRoom(preparedPlayer);

      return { roomId, preparedPlayer };
    } catch (err: any) {
      throw new Error(err);
    }
  },

  async updatePlayersFromRoom(player: IPlayerData) {
    if (!player) return;

    const db = getDatabase(app);

    await set(
      child(ref(db), "dinopoker-room/" + player.room + "/players/" + player.id),
      {
        ...player,
      }
    );
  },

  async joinPlayerToRoom(player: IPlayerData) {
    if (!player) return;

    const db = getDatabase(app);

    await set(
      child(ref(db), "dinopoker-room/" + player.room + /players/ + player.id),
      player
    );
  },

  async resetPlayerVote(player: IPlayerData) {
    if (!player) return;

    const db = getDatabase(app);

    await set(
      child(
        ref(db),
        "dinopoker-room/" + player.room + "/players/" + player.id + "/vote"
      ),
      0
    );
  },

  async updateRoomStatus(roomId?: string, roomStatus?: string) {
    if (!roomId) return;

    const db = getDatabase(app);

    await set(
      child(ref(db), "dinopoker-room/" + roomId + "/roomStatus"),
      roomStatus
    );
  },

  async updatePlayerRaiseHand(player: IPlayerData, raiseHand: boolean) {
    if (!player) return;

    const db = getDatabase(app);

    await set(
      child(
        ref(db),
        "dinopoker-room/" + player.room + "/players/" + player.id + "/raiseHand"
      ),
      raiseHand
    );
  },

  async updatePlayerTeam(player: IPlayerData, team: number) {
    if (!player) return;

    const db = getDatabase(app);

    await set(
      child(
        ref(db),
        "dinopoker-room/" + player.room + "/players/" + player.id + "/team"
      ),
      team
    );
  },

  async joinRoom({
    playerData,
    roomId,
  }: {
    playerData: IPlayerData;
    roomId: string;
  }) {
    if (!roomId) return;

    const db = getDatabase(app);

    const preparedPlayer = {
      name: playerData.name,
      character: playerData.character,
      id: uuidv4(),
      vote: 0,
      room: roomId,
      raiseHand: false,
      team: PlayerDataTeam.UNKNOWN,
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
            await RoomsService.joinPlayerToRoom(preparedPlayer);
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
    if (!roomId) return;

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
