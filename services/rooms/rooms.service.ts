import { child, get, getDatabase, push, ref, set } from "firebase/database";

import { appFirebase } from "../../config/firebase/firebase";
import { InitializePlayerData, IPlayerData } from "../../model/PlayerData";
import { RoomDataStatus } from "../../model/RoomData";
import { makeUuid } from "../../utils/MakeUuid";
import { getLocalStorage, setLocalStorage } from "../local-storage/handler";
import { NotificationsService } from "../notifications/notifications.service";

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

    const playerData = InitializePlayerData({
      ...player,
      room: roomId,
    });

    try {
      await set(ref(db, "dinopoker-room/" + roomId), {
        id: roomId,
        roomStatus: RoomDataStatus.PENDING,
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

      if (!room.exists() || !player.room) {
        throw new Error("Room not found");
      }

      const data = await push(
        ref(db, "dinopoker-room/" + player.room + "/players"),
        {
          ...player,
        }
      ).then((res) => res);

      setLocalStorage("user-client-key", data.key);
    } catch (err: any) {
      throw new Error(err);
    }
  },

  async CHANGE_PLAYER_VOTE(player: IPlayerData) {
    if (!player) return;

    await set(
      child(
        ref(db),
        "dinopoker-room/" + player.room + "/players/" + player.id + "/vote"
      ),
      player.vote
    );
  },

  async CHECK_STATE({ roomId }: { roomId?: string | string[] }) {
    const room = await get(ref(db, "dinopoker-room/" + roomId));

    const players = await get(
      ref(db, "dinopoker-room/" + roomId + "/players")
    ).then((res) => res);

    if (!getLocalStorage("user-client-key"))
      return NotificationsService.emitInvalidRoomState({
        hasPlayer: false,
        hasRoom: room.exists(),
      });

    const hasChild = players.hasChild(getLocalStorage("user-client-key"));

    return NotificationsService.emitInvalidRoomState({
      hasPlayer: hasChild,
      hasRoom: room.exists(),
    });
  },
};
