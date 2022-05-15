import { emitter } from "../emitter/emitter";

export interface IPlayerData {
  clientId?: string;
  raiseHand?: boolean;
  character?: number;
  name?: string;
  vote?: number;
  room?: string;
}

export const PlayerService = {
  PLAYER_NAME(name: string) {
    emitter.emit("PLAYER_NAME", name);
  },

  PLAYER_CHARACTER(characterId: number) {
    emitter.emit("PLAYER_CHARACTER", characterId);
  },
};
