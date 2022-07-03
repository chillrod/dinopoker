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
import { setLocalStorage } from "../local-storage/handler";
import { PlayerService } from "../player/player.service";

const mountCharacterLocalStorage = (player: IPlayerData) => {
  setLocalStorage("character", {
    room: player.room,
    player,
  });
};

export const RoomsService = {
  async createRoom({ name, character }: IPlayerData) {
    const db = getDatabase(app);

    const roomId = uuid();

    const player = PlayerService.preparePlayer({
      name,
      character,
      room: roomId,
    });

    try {
      await set(ref(db, "dinopoker-room/" + roomId), {
        id: roomId,
        roomStatus: "PENDING",
      });

      await RoomsService.joinPlayerToRoom(player);

      return { roomId, player };
    } catch (err: any) {
      throw new Error(err);
    }
  },

  async joinPlayerToRoom(player: IPlayerData) {
    if (!player) return;

    const db = getDatabase(app);

    const preparedPlayer = PlayerService.preparePlayer({
      name: player.name,
      character: player.character,
      room: player.room,
    });

    const checkIfRoomExists = await RoomsService.checkIfRoomExists({
      roomId: player.room,
    });

    if (!checkIfRoomExists) {
      throw new Error("Room does not exist");
    }

    try {
      const data = await push(
        ref(db, "dinopoker-room/" + player.room + "/players"),
        preparedPlayer
      ).then((res) => res);

      const playerData = {
        room: player.room,
        player: {
          ...preparedPlayer,
          id: data.key,
        },
      };

      mountCharacterLocalStorage({ ...player, id: data.key || "" });

      return playerData;
    } catch (err: any) {
      throw new Error(err);
    }
  },

  async setCharacterToRoom(player: IPlayerData) {
    if (!player) return;

    const db = getDatabase(app);

    await update(
      child(ref(db), "dinopoker-room/" + player.room + "/players/" + player.id),
      {
        ...player,
      }
    );

    mountCharacterLocalStorage(player);
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

    mountCharacterLocalStorage(player);
  },

  async changePlayerVote(player: IPlayerData) {
    if (!player) return;

    const db = getDatabase(app);

    await set(
      child(
        ref(db),
        "dinopoker-room/" + player.room + "/players/" + player.id + "/vote"
      ),
      player.vote
    );

    mountCharacterLocalStorage(player);
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

    mountCharacterLocalStorage(player);
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

    mountCharacterLocalStorage({ ...player, team });
  },

  async checkIfRoomExists({ roomId }: { roomId?: string }): Promise<boolean> {
    const db = getDatabase(app);

    const exists = await get(child(ref(db), "dinopoker-room/" + roomId)).then(
      (res) => res.exists()
    );

    return !!exists;
  },
};
