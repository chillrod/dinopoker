import { child, get, getDatabase, push, ref, set, update } from "firebase/database";
import { generate as uuid } from "short-uuid";

import { appFirebase } from "../../config/firebase/firebase";
import { IPlayerData } from "../../model/PlayerData";
import { setLocalStorage } from "../local-storage/handler";
import { PlayerService } from "../player/player.service";

const mountCharacterLocalStorage = (player: IPlayerData) => {
  setLocalStorage("character", {
    room: player.room,
    player,
  });
};

export const RoomsService = {
  generateUuid() {
    return uuid();
  },
  async createRoom({ name, character }: IPlayerData) {
    const db = getDatabase(appFirebase);
    const uuid = this.generateUuid();

    const player = PlayerService.preparePlayer({
      name,
      character,
      room: uuid,
    });

    try {
      await set(ref(db, "dinopoker-room/" + uuid), {
        id: uuid,
        roomStatus: "PENDING",
      });

      await RoomsService.joinPlayerToRoom(player);

      return { uuid, player };
    } catch (err: any) {
      throw new Error(err);
    }
  },

  async joinPlayerToRoom(player: IPlayerData) {
    if (!player) return;

    const db = getDatabase(appFirebase);

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

  async getCharacters(room?: string | string[]) {
    const db = getDatabase(appFirebase);

    const data = await get(
      child(ref(db), "dinopoker-room/" + room + "/players/")
    );

    return data.val();
  },

  async setCharacterToRoom(player: IPlayerData) {
    if (!player) return;

    const db = getDatabase(appFirebase);

    await set(
      child(ref(db), "dinopoker-room/" + player.room + "/players/" + player.id),
      {
        ...player,
      }
    );

    mountCharacterLocalStorage(player);
  },

  async resetPlayerVote(player: IPlayerData) {
    if (!player) return;

    const db = getDatabase(appFirebase);

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

    const db = getDatabase(appFirebase);

    await set(
      child(
        ref(db),
        "dinopoker-room/" + player.room + "/players/" + player.id + "/vote"
      ),
      player.vote
    );

    mountCharacterLocalStorage(player);
  },

  async updateRoomStatus(roomId?: string | string[], roomStatus?: string) {
    if (!roomId) return;

    const db = getDatabase(appFirebase);

    await set(
      child(ref(db), "dinopoker-room/" + roomId + "/roomStatus"),
      roomStatus
    );
  },

  async updatePlayerRaiseHand(player: IPlayerData, raiseHand: boolean) {
    if (!player) return;

    const db = getDatabase(appFirebase);

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

    const db = getDatabase(appFirebase);

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
    const db = getDatabase(appFirebase);

    const exists = await get(child(ref(db), "dinopoker-room/" + roomId)).then(
      (res) => res.exists()
    );

    return !!exists;
  },
};
