import { character } from "../../components/atoms/character-card/hooks";
import { IPlayerData } from "../../components/organisms/dto/playerdata";
import { emitter } from "../emitter/emitter";
import { socket } from "../socket";

export const PlayerService = {
  setCharacterName(name: string) {
    emitter.emit("CHARACTER_NAME", name);
  },

  setSelectedCharacter(character?: character) {
    emitter.emit("SELECTED_CHARACTER", character);
  },

  JoinRoom(data: IPlayerData) {
    socket.emit("ROOM_JOIN", data, (cb: any) => {
      emitter.emit("EMIT_TOAST", cb);

      if (cb !== "Attempting to add a character to non existing room") {
        emitter.emit("CHANGE_ROUTE", {
          event: "JOIN",
          path: data.room,
        });
      }
    });
  },

  CreateRoom(data: IPlayerData) {
    socket.emit("ROOM_CREATE", data);

    socket.emit("PickRoomData", data);

    emitter.emit("CHANGE_ROUTE", {
      event: "CREATE",
      path: data.room,
    });
  },
};
