import { emitter } from "../emitter/emitter";

export const PlayerService = {
  PLAYER_NAME(name: string) {
    emitter.emit("PLAYER_NAME", name);
  },

  PLAYER_CHARACTER(characterId: number) {
    emitter.emit("PLAYER_CHARACTER", characterId);
  },
};
